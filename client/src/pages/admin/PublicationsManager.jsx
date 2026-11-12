import CrudManager from '../../components/admin/CrudManager';
import Badge from '../../components/common/Badge';
import adminApi from '../../services/adminApi';

const TYPES = ['Research Paper', 'Review Paper', 'Conference', 'Journal', 'Book Chapter', 'Other'];

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true, colSpan: 'full' },
  { name: 'authors', label: 'Authors', type: 'text', colSpan: 'full' },
  { name: 'publication', label: 'Venue / Journal', type: 'text' },
  { name: 'type', label: 'Type', type: 'select', options: TYPES },
  { name: 'yearDisplay', label: 'Year (display)', type: 'text', placeholder: 'e.g. Jun-2026' },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'abstract', label: 'Abstract (Markdown supported)', type: 'textarea', colSpan: 'full', hint: 'Use - for bullets, **bold**, *italic*, and headings with #.' },
  { name: 'doi', label: 'DOI link', type: 'text' },
  { name: 'pdfUrl', label: 'PDF URL', type: 'text' },
  { name: 'researchGateUrl', label: 'ResearchGate URL', type: 'text' },
  { name: 'scholarUrl', label: 'Google Scholar URL', type: 'text' },
  { name: 'order', label: 'Display order', type: 'number' },
  { name: 'visible', label: 'Visible on site', type: 'boolean' },
];

export default function PublicationsManager() {
  return (
    <CrudManager
      title="Publications"
      subtitle="Research and review papers with links and abstracts."
      entityLabel="publication"
      resource={adminApi.publications}
      fields={fields}
      defaults={{ type: 'Research Paper', visible: true, order: 0 }}
      filter={{ key: 'type', label: 'types', options: TYPES }}
      searchPlaceholder="Search title, authors…"
      columns={[
        { key: 'title', label: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
        { key: 'type', label: 'Type', render: (r) => <Badge color="primary">{r.type}</Badge> },
        { key: 'yearDisplay', label: 'When', render: (r) => <span className="text-muted">{r.yearDisplay || '—'}</span> },
        { key: 'authors', label: 'Authors', render: (r) => <span className="text-muted">{r.authors || '—'}</span> },
      ]}
    />
  );
}
