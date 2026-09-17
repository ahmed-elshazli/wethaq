import api from '@/utils/axios';

// هنا هنستخدم headers زي ما اتفقنا عشان الباك إند يقبلها بدون مشاكل
export const getServicesApi = async (lang: string) => {
  // بنجيب الخدمات كلها (الباندم إند عندنا حالياً مش بيقبل limit كـ Query فمش هنبعته)
  const res = await api.get('/api/v1/services', {
    headers: { 'Accept-Language': lang }
  });
  // الـ API بيرجع { pagination, data }، إحنا محتاجين الـ data بس
  return res.data.data || res.data;
};