import api from '@/utils/axios';

// تمرير اللغة في الـ Header (Accept-Language) لتجنب رفض الباك إند للـ Query Params
export const getHomeHeroApi = async (lang: string) => {
  const res = await api.get('/api/v1/main-section', { headers: { 'Accept-Language': lang } });
  return res.data;
};

export const getHomeAboutApi = async (lang: string) => {
  const res = await api.get('/api/v1/about-us', { headers: { 'Accept-Language': lang } });
  return res.data;
};

export const getHomeStatsApi = async (lang: string) => {
  const res = await api.get('/api/v1/statistics', { headers: { 'Accept-Language': lang } });
  return res.data.data || res.data;
};

export const getHomeServicesApi = async (lang: string) => {
  const res = await api.get('/api/v1/services', { headers: { 'Accept-Language': lang } });
  return res.data.data || res.data;
};

export const getHomeWhyUsApi = async (lang: string) => {
  const res = await api.get('/api/v1/why-us', { headers: { 'Accept-Language': lang } });
  return res.data.data || res.data;
};

export const getHomeTeamApi = async (lang: string) => {
  const res = await api.get('/api/v1/team', { headers: { 'Accept-Language': lang } });
  return res.data.data || res.data;
};

export const getHomeBlogApi = async (lang: string) => {
  const res = await api.get('/api/v1/blog', { headers: { 'Accept-Language': lang } });
  return res.data.data || res.data;
};

export const getHomeContactCtaApi = async (lang: string) => {
  const res = await api.get('/api/v1/contact', { headers: { 'Accept-Language': lang } });
  return res.data; 
};