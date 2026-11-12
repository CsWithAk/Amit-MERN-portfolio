import {
  Github,
  Linkedin,
  Youtube,
  Twitter,
  Instagram,
  Facebook,
  Globe,
  Mail,
  Send,
  Link as LinkIcon,
  GraduationCap,
  Fingerprint,
  BookOpen,
  Library,
  MessageCircle,
} from 'lucide-react';

// Maps a platform string (from the DB) to a Lucide icon component.
const MAP = {
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  twitter: Twitter,
  x: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  globe: Globe,
  website: Globe,
  mail: Mail,
  email: Mail,
  telegram: Send,
  whatsapp: MessageCircle,
  link: LinkIcon,
  'google-scholar': GraduationCap,
  scholar: GraduationCap,
  orcid: Fingerprint,
  researchgate: BookOpen,
  ssrn: Library,
};

export function socialIconFor(platform = '') {
  const key = String(platform).toLowerCase().trim();
  return MAP[key] || Globe;
}

export default function SocialIcon({ platform, size = 18, className = '' }) {
  const Icon = socialIconFor(platform);
  return <Icon size={size} className={className} strokeWidth={1.8} />;
}
