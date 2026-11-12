import CrudManager from '../../components/admin/CrudManager';
import SocialIcon from '../../components/common/SocialIcon';
import adminApi from '../../services/adminApi';

const fields = [
  { name: 'platform', label: 'Platform', type: 'text', required: true, placeholder: 'e.g. GitHub' },
  { name: 'icon', label: 'Icon key', type: 'text', hint: 'github, linkedin, youtube, twitter, instagram, facebook…' },
  { name: 'url', label: 'URL', type: 'text', required: true, colSpan: 'full' },
  { name: 'order', label: 'Display order', type: 'number' },
  { name: 'visible', label: 'Visible on site', type: 'boolean' },
];

export default function SocialLinksManager() {
  return (
    <CrudManager
      title="Social Links"
      subtitle="Social and academic profile links shown in the header, hero and footer."
      entityLabel="link"
      resource={adminApi.socialLinks}
      fields={fields}
      defaults={{ visible: true, order: 0 }}
      addLabel="Add link"
      searchPlaceholder="Search platforms…"
      columns={[
        {
          key: 'platform',
          label: 'Platform',
          render: (r) => (
            <span className="flex items-center gap-2 font-medium">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-bg-2/60 text-primary">
                <SocialIcon platform={r.icon || r.platform} size={15} />
              </span>
              {r.platform}
            </span>
          ),
        },
        { key: 'url', label: 'URL', render: (r) => <span className="text-muted">{r.url}</span> },
        { key: 'order', label: 'Order', render: (r) => <span className="text-muted">{r.order}</span> },
      ]}
    />
  );
}
