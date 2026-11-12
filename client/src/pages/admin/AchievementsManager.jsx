import CrudManager from '../../components/admin/CrudManager';
import adminApi from '../../services/adminApi';

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'issuer', label: 'Issuer / Awarding body', type: 'text' },
  { name: 'yearDisplay', label: 'Year (display)', type: 'text' },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'icon', label: 'Icon (optional)', type: 'text' },
  { name: 'description', label: 'Description (Markdown supported)', type: 'textarea', colSpan: 'full', hint: 'Use - for bullets or 1. for numbered lists.' },
  { name: 'order', label: 'Display order', type: 'number' },
  { name: 'visible', label: 'Visible on site', type: 'boolean' },
];

export default function AchievementsManager() {
  return (
    <CrudManager
      title="Achievements & Awards"
      subtitle="Recognitions, hackathon results and awards."
      entityLabel="achievement"
      resource={adminApi.achievements}
      fields={fields}
      defaults={{ visible: true, order: 0 }}
      searchPlaceholder="Search achievements…"
      columns={[
        { key: 'title', label: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
        { key: 'issuer', label: 'Issuer', render: (r) => <span className="text-muted">{r.issuer || '—'}</span> },
        { key: 'yearDisplay', label: 'Year', render: (r) => <span className="text-muted">{r.yearDisplay || '—'}</span> },
      ]}
    />
  );
}
