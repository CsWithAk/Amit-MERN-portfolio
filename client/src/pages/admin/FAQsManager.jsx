import CrudManager from '../../components/admin/CrudManager';
import adminApi from '../../services/adminApi';

const fields = [
  { name: 'question', label: 'Question', type: 'text', required: true },
  { name: 'answer', label: 'Answer (Markdown supported)', type: 'textarea', required: true, colSpan: 'full', hint: 'Use - for bullets, **bold**, *italic*, and links.' },
  { name: 'order', label: 'Display order', type: 'number' },
  { name: 'visible', label: 'Visible on site', type: 'boolean' },
];

export default function FAQsManager() {
  return (
    <CrudManager
      title="Frequently Asked Questions"
      subtitle="Add, edit or hide the questions shown before the contact section."
      entityLabel="FAQ"
      resource={adminApi.faqs}
      fields={fields}
      defaults={{ visible: true, order: 0 }}
      searchPlaceholder="Search questions…"
      columns={[
        { key: 'question', label: 'Question', render: (r) => <span className="font-medium">{r.question}</span> },
        { key: 'order', label: 'Order', render: (r) => <span className="text-muted">{r.order}</span> },
        { key: 'visible', label: 'Status', render: (r) => <span className="text-muted">{r.visible ? 'Visible' : 'Hidden'}</span> },
      ]}
    />
  );
}
