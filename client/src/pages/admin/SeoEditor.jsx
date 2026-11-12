import useFetch from '../../hooks/useFetch';
import adminApi from '../../services/adminApi';
import { useSettings } from '../../context/SettingsContext';
import SettingsForm from '../../components/admin/SettingsForm';

const fields = [
  { name: 'seo.pageTitle', label: 'Page title', type: 'text', colSpan: 'full' },
  { name: 'seo.metaDescription', label: 'Meta description', type: 'textarea', colSpan: 'full' },
  { name: 'seo.keywords', label: 'Keywords', type: 'text', colSpan: 'full', hint: 'Comma-separated.' },
  { name: 'seo.author', label: 'Author', type: 'text' },
  { name: 'seo.ogImage', label: 'OG image URL', type: 'text' },
  { name: 'seo.ogTitle', label: 'Social sharing title', type: 'text', colSpan: 'full' },
  { name: 'seo.ogDescription', label: 'Social sharing description', type: 'textarea', colSpan: 'full' },
  { name: 'seo.twitterCard', label: 'Twitter card', type: 'select', options: ['summary', 'summary_large_image'] },
  { name: 'seo.canonicalUrl', label: 'Canonical URL', type: 'text' },
  { name: 'seo.robots', label: 'Robots directive', type: 'text', hint: 'Example: index, follow' },
];

export default function SeoEditor() {
  const { data, loading } = useFetch(adminApi.getSettings, []);
  const { refresh } = useSettings();

  return (
    <SettingsForm
      title="SEO"
      subtitle="Search-engine and social-sharing metadata for the public site."
      fields={fields}
      value={data}
      loading={loading}
      onSave={(payload) => adminApi.updateSettings(payload)}
      onSaved={refresh}
      columns={1}
    />
  );
}
