import api from './api';

/**
 * Generic admin CRUD client mirroring the backend crudFactory routes.
 * All admin endpoints return { success, message, data }.
 */
function crudResource(path) {
  return {
    list: (params = {}) => api.get(path, { params }).then((r) => r.data.data),
    get: (id) => api.get(`${path}/${id}`).then((r) => r.data.data),
    create: (body) => api.post(path, body).then((r) => r.data.data),
    update: (id, body) => api.put(`${path}/${id}`, body).then((r) => r.data.data),
    remove: (id) => api.delete(`${path}/${id}`).then((r) => r.data),
  };
}

export const adminApi = {
  dashboard: () => api.get('/admin/dashboard').then((r) => r.data.data),

  // Singleton editors
  updateProfile: (body) => api.put('/admin/profile', body).then((r) => r.data.data),
  updateAbout: (body) => api.put('/admin/about', body).then((r) => r.data.data),
  getSettings: () => api.get('/admin/settings').then((r) => r.data.data),
  updateSettings: (body) => api.put('/admin/settings', body).then((r) => r.data.data),

  // Upload (multipart)
  upload: (file) => {
    const form = new FormData();
    form.append('file', file);
    return api
      .post('/admin/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((r) => r.data.data);
  },

  // Contact messages
  messages: {
    list: (params = {}) => api.get('/admin/messages', { params }).then((r) => r.data.data),
    get: (id) => api.get(`/admin/messages/${id}`).then((r) => r.data.data),
    markRead: (id, read) => api.put(`/admin/messages/${id}`, { read }).then((r) => r.data.data),
    reply: (id, body) => api.post(`/admin/messages/${id}/reply`, body).then((r) => r.data.data),
    remove: (id) => api.delete(`/admin/messages/${id}`).then((r) => r.data),
  },

  // Generic CRUD modules (paths match server adminRoutes)
  education: crudResource('/admin/education'),
  skills: crudResource('/admin/skills'),
  projects: crudResource('/admin/projects'),
  experience: crudResource('/admin/experience'),
  publications: crudResource('/admin/publications'),
  certifications: crudResource('/admin/certifications'),
  achievements: crudResource('/admin/achievements'),
  faqs: crudResource('/admin/faqs'),
  team: crudResource('/admin/team'),
  socialLinks: crudResource('/admin/social-links'),
  navigation: crudResource('/admin/navigation'),
};

export default adminApi;
