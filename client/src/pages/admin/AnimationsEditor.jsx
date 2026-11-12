import useFetch from '../../hooks/useFetch';
import adminApi from '../../services/adminApi';
import { useSettings } from '../../context/SettingsContext';
import SettingsForm from '../../components/admin/SettingsForm';

const fields = [
  { name: 'animation.multiCursorEnabled', label: 'Enable multi-cursor system', type: 'boolean' },
  { name: 'animation.cursorActors', label: 'Cursor actors (1–8)', type: 'number', min: 1, max: 8 },
  { name: 'animation.intensity', label: 'Intensity', type: 'select', options: ['low', 'medium', 'high'] },
  { name: 'animation.typingSpeed', label: 'Typing speed (ms)', type: 'number', min: 20, max: 150 },
  { name: 'animation.revealSpeed', label: 'Reveal speed (ms)', type: 'number', min: 200, max: 1500 },
  { name: 'animation.sectionAnimations', label: 'Section scroll animations', type: 'boolean' },
  { name: 'animation.reducedMotion', label: 'Force reduced motion', type: 'boolean', hint: 'Disables cursor + reveals for accessibility.', colSpan: 'full' },
];

export default function AnimationsEditor() {
  const { data, loading } = useFetch(adminApi.getSettings, []);
  const { refresh } = useSettings();

  return (
    <SettingsForm
      title="Animations"
      subtitle="Tune the signature multi-cursor orchestration and scroll reveals."
      fields={fields}
      value={data}
      loading={loading}
      onSave={(payload) => adminApi.updateSettings(payload)}
      onSaved={refresh}
    />
  );
}
