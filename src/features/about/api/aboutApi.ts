import api from '@/utils/axios';

export const getAboutApi = async (lang: string) => {
  // بنبعت اللغة في الهيدر زي ما اكتشفنا
  const res = await api.get('/api/v1/about-us', { 
    headers: { 'Accept-Language': lang } 
  });
  return res.data;
};