const asyncHandler = require('../utils/asyncHandler');
const { success, failure } = require('../utils/apiResponse');
const { escapeRegex } = require('../utils/validate');

/**
 * Build standard list/get/create/update/delete handlers for a Mongoose model.
 * Supports: search (regex over `searchFields`), equality filters, sort, pagination.
 */
function crudHandlers({
  model,
  searchFields = [],
  defaultSort = 'order createdAt',
  publicOnly = false, // when true, public reads filter visible:true
}) {
  const baseQuery = (query = {}, { admin = false } = {}) => {
    const q = { ...query };
    if (!admin && publicOnly) q.visible = true;
    return q;
  };

  const list = asyncHandler(async (req, res) => {
    const { search, page, limit, ...filters } = req.query;
    const isAdmin = req.baseUrl && req.baseUrl.includes('/admin');
    const q = baseQuery({}, { admin: isAdmin });

    // equality filters from query (only keys present in model schema paths)
    for (const [k, v] of Object.entries(filters)) {
      if (model.schema.path(k)) q[k] = v;
    }

    if (search && searchFields.length) {
      const rx = new RegExp(escapeRegex(search), 'i');
      q.$or = searchFields.map((f) => ({ [f]: rx }));
    }

    const lim = Math.min(parseInt(limit || '100', 10), 200);
    const skip = (Math.max(parseInt(page || '1', 10), 1) - 1) * lim;

    const [items, total] = await Promise.all([
      model.find(q).sort(defaultSort).skip(skip).limit(lim),
      model.countDocuments(q),
    ]);
    return success(res, { items, total, page: Number(page || 1), limit: lim });
  });

  const getOne = asyncHandler(async (req, res) => {
    const item = await model.findById(req.params.id);
    if (!item) return failure(res, 'Not found', 404, 'NOT_FOUND');
    if (!req.baseUrl.includes('/admin') && publicOnly && item.visible === false) {
      return failure(res, 'Not found', 404, 'NOT_FOUND');
    }
    return success(res, item);
  });

  const create = asyncHandler(async (req, res) => {
    const item = await model.create(req.body);
    return success(res, item, 'Created', 201);
  });

  const update = asyncHandler(async (req, res) => {
    const item = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return failure(res, 'Not found', 404, 'NOT_FOUND');
    return success(res, item, 'Updated');
  });

  const remove = asyncHandler(async (req, res) => {
    const item = await model.findByIdAndDelete(req.params.id);
    if (!item) return failure(res, 'Not found', 404, 'NOT_FOUND');
    return success(res, null, 'Deleted');
  });

  return { list, getOne, create, update, remove };
}

module.exports = crudHandlers;
