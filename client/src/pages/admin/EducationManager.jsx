import CrudManager from '../../components/admin/CrudManager';
import Badge from '../../components/common/Badge';
import adminApi from '../../services/adminApi';

const CATEGORIES = ['education'];

const fields = [
  { name: 'title', label: 'Title / Degree', type: 'text', required: true },
  { name: 'institution', label: 'Institution', type: 'text', required: true },
  { name: 'category', label: 'Category', type: 'select', options: CATEGORIES, required: true },
  { name: 'dateDisplay', label: 'Date (display)', type: 'text', placeholder: 'e.g. 2023 - 2027' },
  { name: 'startDate', label: 'Start date', type: 'date' },
  { name: 'endDate', label: 'End date', type: 'date' },
  { name: 'grade', label: 'Grade / Result', type: 'text' },
  { name: 'location', label: 'Location', type: 'text' },
  { name: 'certificateUrl', label: 'Certificate URL', type: 'text', colSpan: 'full' },
  { name: 'description', label: 'Description (Markdown supported)', type: 'textarea', colSpan: 'full', hint: 'Use - for bullets or 1. for numbered lists.' },
  { name: 'order', label: 'Display order', type: 'number', min: 0 },
  { name: 'visible', label: 'Visible on site', type: 'boolean' },
];

export default function EducationManager() {
  return (
    <CrudManager
      title="Education & Courses"
      subtitle="Manage formal education records shown in the Journey section. Courses and internships belong in Certifications."
      entityLabel="record"
      resource={adminApi.education}
      fields={fields}
      defaults={{ category: 'education', visible: true, order: 0 }}
      filter={{ key: 'category', label: 'categories', options: CATEGORIES }}
      searchPlaceholder="Search title, institution…"
      columns={[
        { key: 'title', label: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
        { key: 'institution', label: 'Institution', render: (r) => <span className="text-muted">{r.institution}</span> },
        { key: 'category', label: 'Category', render: (r) => <Badge color="info">{r.category}</Badge> },
        { key: 'dateDisplay', label: 'Dates', render: (r) => <span className="text-muted">{r.dateDisplay || '—'}</span> },
        { key: 'order', label: 'Order', render: (r) => <span className="text-muted">{r.order}</span> },
      ]}
    />
  );
}
