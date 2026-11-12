import CrudManager from '../../components/admin/CrudManager';
import Badge from '../../components/common/Badge';
import adminApi from '../../services/adminApi';

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'category', label: 'Category', type: 'text', placeholder: 'e.g. Web Development' },
  { name: 'slug', label: 'Slug', type: 'text', hint: 'Auto-generated from title if left blank' },
  { name: 'image', label: 'Cover image', type: 'image', colSpan: 'full' },
  { name: 'technologies', label: 'Technologies', type: 'tags', colSpan: 'full', placeholder: 'HTML, CSS, JS…' },
  { name: 'description', label: 'Description (Markdown supported)', type: 'textarea', colSpan: 'full', hint: 'Use - for bullets, **bold**, *italic*, and [links](https://example.com).' },
  { name: 'problem', label: 'The problem (Markdown supported)', type: 'textarea', colSpan: 'full', hint: 'Describe the user, business, or technical problem.' },
  { name: 'solution', label: 'The solution (Markdown supported)', type: 'textarea', colSpan: 'full', hint: 'Explain how the project solves the problem.' },
  { name: 'keyChallenges', label: 'Key challenges (Markdown supported)', type: 'textarea', colSpan: 'full', hint: 'Use - for each challenge.' },
  { name: 'caseStudy', label: 'Case study (Markdown supported)', type: 'textarea', colSpan: 'full', hint: 'Add the detailed project story, decisions, results, and learnings.' },
  { name: 'systemDesign.architectureImage', label: 'Architecture diagram URL', type: 'text' },
  { name: 'systemDesign.workflowImage', label: 'Workflow diagram URL', type: 'text' },
  { name: 'systemDesign.deploymentImage', label: 'Deployment diagram URL', type: 'text' },
  { name: 'systemDesign.dbSchemaImage', label: 'Database schema image URL', type: 'text' },
  { name: 'githubUrl', label: 'GitHub URL', type: 'text' },
  { name: 'liveUrl', label: 'Live URL', type: 'text' },
  { name: 'featured', label: 'Featured', type: 'boolean' },
  { name: 'order', label: 'Display order', type: 'number' },
  { name: 'visible', label: 'Visible on site', type: 'boolean' },
];

export default function ProjectsManager() {
  return (
    <CrudManager
      title="Projects"
      subtitle="Showcase your builds — cards, tech stack and links."
      entityLabel="project"
      resource={adminApi.projects}
      fields={fields}
      defaults={{ visible: true, featured: false, order: 0, technologies: [] }}
      searchPlaceholder="Search projects…"
      columns={[
        {
          key: 'image',
          label: '',
          render: (r) =>
            r.image ? (
              <img src={r.image} alt="" className="h-10 w-14 rounded-md object-cover" />
            ) : (
              <div className="h-10 w-14 rounded-md bg-bg-2" />
            ),
        },
        { key: 'title', label: 'Title', render: (r) => <span className="font-medium">{r.title}</span> },
        { key: 'category', label: 'Category', render: (r) => <Badge color="muted">{r.category}</Badge> },
        { key: 'featured', label: 'Featured', render: (r) => (r.featured ? <Badge color="warn">★ Featured</Badge> : <span className="text-muted">—</span>) },
        { key: 'order', label: 'Order', render: (r) => <span className="text-muted">{r.order}</span> },
      ]}
    />
  );
}
