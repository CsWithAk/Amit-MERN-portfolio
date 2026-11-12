import CrudManager from '../../components/admin/CrudManager';
import Badge from '../../components/common/Badge';
import adminApi from '../../services/adminApi';

const TYPES = ['internship', 'full-time', 'part-time', 'freelance', 'work', 'other'];

const fields = [
  { name: 'position', label: 'Position', type: 'text', required: true },
  { name: 'organization', label: 'Organization', type: 'text', required: true },
  { name: 'employmentType', label: 'Employment type', type: 'select', options: TYPES },
  { name: 'dateDisplay', label: 'Date (display)', type: 'text', placeholder: 'e.g. June 2026' },
  { name: 'startDate', label: 'Start date', type: 'date' },
  { name: 'endDate', label: 'End date', type: 'date' },
  { name: 'location', label: 'Location', type: 'text' },
  { name: 'certificateUrl', label: 'Certificate URL', type: 'text' },
  { name: 'skills', label: 'Skills used', type: 'tags', colSpan: 'full' },
  { name: 'description', label: 'Description (Markdown supported)', type: 'textarea', colSpan: 'full', hint: 'Use - for bullets, **bold**, and [links](https://example.com).' },
  { name: 'order', label: 'Display order', type: 'number' },
  { name: 'visible', label: 'Visible on site', type: 'boolean' },
];

export default function ExperienceManager() {
  return (
    <CrudManager
      title="Experience"
      subtitle="Internships and work roles shown in the Experience section."
      entityLabel="role"
      resource={adminApi.experience}
      fields={fields}
      defaults={{ employmentType: 'internship', visible: true, order: 0, skills: [] }}
      filter={{ key: 'employmentType', label: 'types', options: TYPES }}
      searchPlaceholder="Search position, organization…"
      columns={[
        { key: 'position', label: 'Position', render: (r) => <span className="font-medium">{r.position}</span> },
        { key: 'organization', label: 'Organization', render: (r) => <span className="text-muted">{r.organization}</span> },
        { key: 'employmentType', label: 'Type', render: (r) => <Badge color="info">{r.employmentType}</Badge> },
        { key: 'dateDisplay', label: 'Dates', render: (r) => <span className="text-muted">{r.dateDisplay || '—'}</span> },
      ]}
    />
  );
}
