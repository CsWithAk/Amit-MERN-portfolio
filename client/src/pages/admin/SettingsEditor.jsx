import useFetch from '../../hooks/useFetch';
import adminApi from '../../services/adminApi';
import { useSettings } from '../../context/SettingsContext';
import SettingsForm from '../../components/admin/SettingsForm';

const fields = [
  { name: 'portfolioName', label: 'Portfolio name', type: 'text', colSpan: 'full' },
  { name: 'logo', label: 'Logo', type: 'image', colSpan: 'full' },
  { name: 'favicon', label: 'Favicon URL', type: 'text' },
  { name: 'contactEmail', label: 'Contact email', type: 'text' },
  { name: 'sendVisitorAutoReply', label: 'Auto-reply to visitors', type: 'boolean', colSpan: 'full', hint: 'Send a SendGrid confirmation email to visitors after they submit the contact form.' },
  { name: 'footerContent', label: 'Footer text', type: 'textarea', colSpan: 'full' },
  { name: 'copyrightText', label: 'Copyright text', type: 'text', colSpan: 'full' },
];

export default function SettingsEditor() {
  const { data, loading } = useFetch(adminApi.getSettings, []);
  const { refresh } = useSettings();

  return (
    <SettingsForm
      title="General Settings"
      subtitle="Site identity, branding assets and footer copy."
      fields={fields}
      value={data}
      loading={loading}
      onSave={(payload) => adminApi.updateSettings(payload)}
      onSaved={refresh}
    />
  );
}
