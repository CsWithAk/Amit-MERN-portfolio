import useFetch from '../../hooks/useFetch';
import publicApi from '../../services/publicApi';
import adminApi from '../../services/adminApi';
import SettingsForm from '../../components/admin/SettingsForm';

const fields = [
  { name: 'name', label: 'Full name', type: 'text', required: true },
  { name: 'logoText', label: 'Logo text', type: 'text', placeholder: 'e.g. CsWithAk' },
  { name: 'designation', label: 'Designation', type: 'text' },
  { name: 'roles', label: 'Animated roles', type: 'tags', colSpan: 'full', hint: 'Typed one after another in the hero.' },
  { name: 'tagline', label: 'Tagline', type: 'text', colSpan: 'full' },
  { name: 'heroIntro', label: 'Hero intro', type: 'textarea', colSpan: 'full' },
  { name: 'image', label: 'Profile image', type: 'image', colSpan: 'full' },
  { name: 'resumeUrl', label: 'Resume URL', type: 'text' },
  { name: 'companyUrl', label: 'Company URL', type: 'text' },
  { name: 'companyLabel', label: 'Company label', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'phone', label: 'Phone', type: 'text' },
  { name: 'location', label: 'Location', type: 'text' },
  { name: 'availability', label: 'Availability', type: 'text', hint: 'e.g. Open to opportunities' },
];

export default function ProfileEditor() {
  const { data, loading } = useFetch(publicApi.profile, []);

  return (
    <SettingsForm
      title="Profile"
      subtitle="Identity and hero content shown at the top of the public site."
      fields={fields}
      value={data}
      loading={loading}
      onSave={(payload) => adminApi.updateProfile(payload)}
    />
  );
}
