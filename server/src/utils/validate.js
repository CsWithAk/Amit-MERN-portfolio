/** Lightweight input validation helpers (no external dependency). */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/.+/i;

class ValidationError extends Error {
  constructor(fields) {
    super('Validation failed');
    this.status = 422;
    this.fields = fields;
  }
}

function isStr(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

/**
 * validate(body, rules)
 * rules: { field: { required, type: 'string'|'number'|'boolean'|'email'|'url'|'array'|'date',
 *                    min, max, enum, of (item rule) } }
 * Returns sanitized value object; throws ValidationError.
 */
function validate(body, rules) {
  const errors = {};
  const out = {};

  for (const [field, rule] of Object.entries(rules)) {
    let v = body?.[field];

    if (v === undefined || v === null || v === '') {
      if (rule.required) errors[field] = `${field} is required`;
      else if (rule.default !== undefined) out[field] = rule.default;
      continue;
    }

    switch (rule.type) {
      case 'string': {
        if (typeof v !== 'string') { errors[field] = `${field} must be a string`; break; }
        v = v.trim();
        if (rule.min && v.length < rule.min) errors[field] = `${field} must be at least ${rule.min} characters`;
        if (rule.max && v.length > rule.max) errors[field] = `${field} must be at most ${rule.max} characters`;
        break;
      }
      case 'email': {
        v = String(v).trim();
        if (!EMAIL_RE.test(v)) errors[field] = `${field} must be a valid email address`;
        break;
      }
      case 'url': {
        v = String(v).trim();
        if (v && !URL_RE.test(v) && !v.startsWith('data:')) errors[field] = `${field} must be a valid URL`;
        break;
      }
      case 'number': {
        v = Number(v);
        if (Number.isNaN(v)) { errors[field] = `${field} must be a number`; break; }
        if (rule.min !== undefined && v < rule.min) errors[field] = `${field} must be >= ${rule.min}`;
        if (rule.max !== undefined && v > rule.max) errors[field] = `${field} must be <= ${rule.max}`;
        break;
      }
      case 'boolean': {
        v = v === true || v === 'true' || v === 1 || v === '1';
        break;
      }
      case 'array': {
        if (!Array.isArray(v)) { errors[field] = `${field} must be an array`; break; }
        if (rule.max && v.length > rule.max) errors[field] = `${field} must contain at most ${rule.max} items`;
        if (rule.of === 'string') v = v.map((s) => String(s).trim()).filter(Boolean);
        break;
      }
      case 'date': {
        const d = new Date(v);
        if (Number.isNaN(d.getTime())) errors[field] = `${field} must be a valid date`;
        else v = d;
        break;
      }
      case 'object': {
        if (typeof v !== 'object') errors[field] = `${field} must be an object`;
        break;
      }
      default:
        break;
    }

    if (rule.enum && !errors[field] && !rule.enum.includes(v)) {
      errors[field] = `${field} must be one of: ${rule.enum.join(', ')}`;
    }

    if (!errors[field]) out[field] = v;
  }

  if (Object.keys(errors).length) throw new ValidationError(errors);
  return out;
}

/** Escape a string for use inside a RegExp (used for search filters). */
function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = { validate, ValidationError, escapeRegex, EMAIL_RE };
