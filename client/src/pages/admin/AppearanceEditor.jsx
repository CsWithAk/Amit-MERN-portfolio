import useFetch from '../../hooks/useFetch';
import adminApi from '../../services/adminApi';
import { useSettings } from '../../context/SettingsContext';
import SettingsForm from '../../components/admin/SettingsForm';

const fields = [
  { name: 'appearance.theme', label: 'Theme', type: 'select', options: ['dark', 'light'] },
  { name: 'appearance.fontFamily', label: 'Font family', type: 'text', placeholder: 'Poppins' },
  { name: 'appearance.primaryColor', label: 'Primary color', type: 'text', placeholder: '#8B5CF6' },
  { name: 'appearance.secondaryColor', label: 'Secondary color', type: 'text', placeholder: '#38BDF8' },
  { name: 'appearance.accentColor', label: 'Accent / highlight', type: 'text', placeholder: '#A78BFA' },
  { name: 'appearance.background', label: 'Background', type: 'text', placeholder: '#080B14' },
  { name: 'appearance.secondaryBackground', label: 'Secondary background', type: 'text', placeholder: '#101626' },
  { name: 'appearance.cardBackground', label: 'Card background', type: 'text', placeholder: '#141D30' },
  { name: 'appearance.primaryText', label: 'Primary text', type: 'text', placeholder: '#F8FAFC' },
  { name: 'appearance.secondaryText', label: 'Secondary text', type: 'text', placeholder: '#94A3B8' },
  { name: 'appearance.borderColor', label: 'Border color', type: 'text' },
  { name: 'appearance.borderRadius', label: 'Corner radius (px)', type: 'number', min: 0, max: 40 },
  { name: 'appearance.cardStyle', label: 'Card style', type: 'select', options: ['glass', 'solid', 'outline'] },
];

export default function AppearanceEditor() {
  const { data, loading } = useFetch(adminApi.getSettings, []);
  const { refresh } = useSettings();

  return (
    <SettingsForm
      title="Appearance"
      subtitle="Theme colors, typography and card styling. Changes apply live across the site."
      fields={fields}
      value={data}
      loading={loading}
      onSave={(payload) => adminApi.updateSettings(payload)}
      onSaved={refresh}
    />
  );
}
