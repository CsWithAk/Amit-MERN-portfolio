import CrudManager from '../../components/admin/CrudManager';
import Badge from '../../components/common/Badge';
import adminApi from '../../services/adminApi';

const fields = [
  { name: 'name', label: 'Skill name', type: 'text', required: true },
  { name: 'category', label: 'Category', type: 'text', required: true, placeholder: 'e.g. Frontend Development' },
  { name: 'icon', label: 'Icon (optional)', type: 'text' },
  { name: 'order', label: 'Display order', type: 'number', min: 0 },
  { name: 'visible', label: 'Visible on site', type: 'boolean' },
];

const CATEGORY_FILTER = [
  'Programming',
  'Frontend Development',
  'Backend Development',
  'Databases',
  'AI & Data Analytics',
  'Tools & Platforms',
];

export default function SkillsManager() {
  return (
    <CrudManager
      title="Skills"
      subtitle="Technical skills grouped by category across the site."
      entityLabel="skill"
      resource={adminApi.skills}
      fields={fields}
      defaults={{ visible: true, order: 0 }}
      filter={{ key: 'category', label: 'categories', options: CATEGORY_FILTER }}
      searchPlaceholder="Search skills…"
      columns={[
        { key: 'name', label: 'Skill', render: (r) => <span className="font-medium">{r.name}</span> },
        { key: 'category', label: 'Category', render: (r) => <Badge color="muted">{r.category}</Badge> },
        { key: 'order', label: 'Order', render: (r) => <span className="text-muted">{r.order}</span> },
      ]}
    />
  );
}
