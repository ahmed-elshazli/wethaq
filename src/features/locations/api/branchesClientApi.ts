import api from '@/utils/axios';

// جلب كل الفروع للموقع العام (Public)
export const getBranchesApi = async (lang: string) => {
  // بنجيب الفروع بدون Pagination أو بـ limit كبير عشان نعرضها كلها
  const res = await api.get('/api/v1/branches?limit=50', {
    headers: { 'Accept-Language': lang },
  });
  return res.data?.data || res.data;
};