import CrudManager from '../../components/admin/CrudManager';
import Badge from '../../components/common/Badge';
import adminApi from '../../services/adminApi';

const fields = [
  { name: 'label', label: 'Label', type: 'text', required: true },
  { name: 'target', label: 'Target', type: 'text', placeholder: '#about or https://…' },
  { name: 'sectionKey', label: 'Section key', type: 'text', placeholder: 'about' },
  { name: 'order', label: 'Display order', type: 'number' },
  { name: 'external', label: 'External link', type: 'boolean' },
  { name: 'enabled', label: 'Show in navigation', type: 'boolean' },
];

export default function NavigationManager() {
  return (
    <CrudManager
      title="Navigation & Sections"
      subtitle="Control the header / footer menu items, order and visibility."
      entityLabel="menu item"
      resource={adminApi.navigation}
      fields={fields}
      defaults={{ enabled: true, external: false, order: 0 }}
      filter={{
        key: 'enabled',
        label: 'states',
        options: [
          { value: 'true', label: 'Enabled' },
          { value: 'false', label: 'Disabled' },
        ],
      }}
      searchPlaceholder="Search labels…"
      columns={[
        { key: 'label', label: 'Label', render: (r) => <span className="font-medium">{r.label}</span> },
        { key: 'target', label: 'Target', render: (r) => <span className="text-muted">{r.target}</span> },
        { key: 'sectionKey', label: 'Section', render: (r) => <Badge color="muted">{r.sectionKey || '—'}</Badge> },
        { key: 'enabled', label: 'Enabled', render: (r) => (r.enabled ? <Badge color="success">On</Badge> : <Badge color="muted">Off</Badge>) },
        { key: 'order', label: 'Order', render: (r) => <span className="text-muted">{r.order}</span> },
      ]}
    />
  );
}
