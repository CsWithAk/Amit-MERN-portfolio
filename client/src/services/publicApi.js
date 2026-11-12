import api from './api';

// Public read endpoints. Each returns { success, message, data }; we unwrap `data`.
const unwrap = (p) => p.then((r) => r.data.data);

export const publicApi = {
  profile: () => unwrap(api.get('/public/profile')),
  about: () => unwrap(api.get('/public/about')),
  education: () => unwrap(api.get('/public/education')),
  journey: () => unwrap(api.get('/public/journey')),
  skills: () => unwrap(api.get('/public/skills')),
  projects: () => unwrap(api.get('/public/projects')),
  projectBySlug: (slug) => unwrap(api.get(`/public/projects/${slug}`)),
  experience: () => unwrap(api.get('/public/experience')),
  publications: () => unwrap(api.get('/public/publications')),
  certifications: () => unwrap(api.get('/public/certifications')),
  achievements: () => unwrap(api.get('/public/achievements')),
  faqs: () => unwrap(api.get('/public/faqs')),
  team: () => unwrap(api.get('/public/team')),
  socialLinks: () => unwrap(api.get('/public/social-links')),
  navigation: () => unwrap(api.get('/public/navigation')),
  settings: () => unwrap(api.get('/public/settings')),
  submitContact: (payload) => api.post('/public/contact', payload).then((r) => r.data),
};

export default publicApi;
