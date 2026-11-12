import CrudManager from '../../components/admin/CrudManager';
import adminApi from '../../services/adminApi';

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'issuer', label: 'Issuer', type: 'text', required: true },
  { name: 'dateDisplay', label: 'Date (display)', type: 'text' },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'imageUrl', label: 'Certificate image', type: 'image', colSpan: 'full' },
  { name: 'certificateUrl', label: 'Certificate URL', type: 'text' },
  { name: 'verificationUrl', label: 'Verification URL', type: 'text' },
  { name: 'description', label: 'Description (Markdown supported)', type: 'textarea', colSpan: 'full', hint: 'Use - for bullets, **bold**, and *italic* text.' },
  { name: 'order', label: 'Display order', type: 'number' },
  { name: 'visible', label: 'Visible on site', type: 'boolean' },
];

export default function CertificationsManager() {
  return (
    <CrudManager
      title="Certifications"
      subtitle="Certificates and credential records."
      entityLabel="certification"
      resource={adminApi.certifications}
      fields={fields}
      defaults={{ visible: true, order: 0 }}
      searchPlaceholder="Search title, issuer…"
      columns={[
        { key: 'title', label: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
        { key: 'issuer', label: 'Issuer', render: (r) => <span className="text-muted">{r.issuer}</span> },
        { key: 'dateDisplay', label: 'Date', render: (r) => <span className="text-muted">{r.dateDisplay || '—'}</span> },
      ]}
    />
  );
}
