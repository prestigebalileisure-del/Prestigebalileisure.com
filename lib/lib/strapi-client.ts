import axios from 'axios';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export const strapiClient = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// VILLAS API
export const villasAPI = {
  getAll: (params = {}) =>
    strapiClient.get('/luxury-villas', {
      params: { populate: '*', ...params },
    }),
  getById: (id) =>
    strapiClient.get(`/luxury-villas/${id}`, { params: { populate: '*' } }),
  create: (data) => strapiClient.post('/luxury-villas', { data }),
  update: (id, data) => strapiClient.put(`/luxury-villas/${id}`, { data }),
  delete: (id) => strapiClient.delete(`/luxury-villas/${id}`),
};

// TOURS API
export const toursAPI = {
  getAll: (params = {}) =>
    strapiClient.get('/tours', { params: { populate: '*', ...params } }),
  getById: (id) =>
    strapiClient.get(`/tours/${id}`, { params: { populate: '*' } }),
  create: (data) => strapiClient.post('/tours', { data }),
  update: (id, data) => strapiClient.put(`/tours/${id}`, { data }),
  delete: (id) => strapiClient.delete(`/tours/${id}`),
};

// PACKAGES API
export const packagesAPI = {
  getAll: (params = {}) =>
    strapiClient.get('/packages', { params: { populate: '*', ...params } }),
  getById: (id) =>
    strapiClient.get(`/packages/${id}`, { params: { populate: '*' } }),
  create: (data) => strapiClient.post('/packages', { data }),
  update: (id, data) => strapiClient.put(`/packages/${id}`, { data }),
  delete: (id) => strapiClient.delete(`/packages/${id}`),
};

// TESTIMONIALS API
export const testimonialsAPI = {
  getAll: (params = {}) =>
    strapiClient.get('/testimonials', {
      params: { populate: '*', ...params },
    }),
  create: (data) => strapiClient.post('/testimonials', { data }),
  update: (id, data) => strapiClient.put(`/testimonials/${id}`, { data }),
};

// BLOG API
export const blogAPI = {
  getAll: (params = {}) =>
    strapiClient.get('/blog-posts', {
      params: { populate: '*', sort: 'publishDate:desc', ...params },
    }),
  getBySlug: (slug) =>
    strapiClient.get('/blog-posts', {
      params: { filters: { slug: { $eq: slug } }, populate: '*' },
    }),
};

// PROMOTIONS API
export const promotionsAPI = {
  getActive: () =>
    strapiClient.get('/promotions', {
      params: {
        filters: {
          active: { $eq: true },
          endDate: { $gte: new Date().toISOString() },
        },
      },
    }),
};

// SETTINGS API
export const settingsAPI = {
  get: () => strapiClient.get('/settings?populate=*'),
};
