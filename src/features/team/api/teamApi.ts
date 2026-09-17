import api from '@/utils/axios';

export const getTeamApi = async (lang: string) => {
  // بنطلب كل الفريق (50 كحد أقصى مثلاً) وبنبعت اللغة في الهيدر
  const res = await api.get('/api/v1/team', {
    headers: { 'Accept-Language': lang },
    params: { limit: 50 } // ممكن نمسح الـ limit لو الباك إند رفضها زي ما حصل قبل كده
  });
  return res.data.data || res.data;
};