import CrudManager from '../../components/admin/CrudManager';
import adminApi from '../../services/adminApi';

const fields = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'designation', label: 'Designation', type: 'text' },
  { name: 'image', label: 'Profile image', type: 'image', colSpan: 'full' },
  { name: 'biography', label: 'Biography (Markdown supported)', type: 'textarea', colSpan: 'full', hint: 'Use - for bullets, **bold**, and *italic* text.' },
  { name: 'social', label: 'Social links', type: 'pairs', colSpan: 'full', keyLabel: 'Platform', valLabel: 'URL' },
  { name: 'order', label: 'Display order', type: 'number' },
  { name: 'visible', label: 'Visible on site', type: 'boolean' },
];

export default function TeamManager() {
  return (
    <CrudManager
      title="Team"
      subtitle="Collaborators and team members shown on the portfolio."
      entityLabel="member"
      resource={adminApi.team}
      fields={fields}
      defaults={{ visible: true, order: 0, social: [] }}
      searchPlaceholder="Search team…"
      columns={[
        {
          key: 'image',
          label: '',
          render: (r) => (r.image ? <img src={r.image} alt="" className="h-10 w-10 rounded-full object-cover" /> : <div className="h-10 w-10 rounded-full bg-bg-2" />),
        },
        { key: 'name', label: 'Name', render: (r) => <span className="font-medium">{r.name}</span> },
        { key: 'designation', label: 'Designation', render: (r) => <span className="text-muted">{r.designation}</span> },
        { key: 'order', label: 'Order', render: (r) => <span className="text-muted">{r.order}</span> },
      ]}
    />
  );
}
