import api from '@/utils/axios';

// دالة جلب تفاصيل خدمة رئيسية بالـ Slug
export const getServiceDetailApi = async (slug: string, lang: string) => {
  const res = await api.get(`/api/v1/services/${slug}`, {
    headers: { 'Accept-Language': lang },
  });
  return res.data?.data || res.data;
};

// دالة جلب كل الخدمات (عشان الـ Tabs)
export const getServiceTabsApi = async (lang: string) => {
  // بنجيب كل الخدمات بدون Pagination أو limit كبير عشان نعرضها في الـ Tabs
  const res = await api.get('/api/v1/services?limit=50', {
    headers: { 'Accept-Language': lang },
  });
  return res.data?.data || res.data;
};

// دالة جلب الخدمات الفرعية الخاصة بخدمة معينة
export const getSubServicesByServiceIdApi = async (serviceId: string, lang: string) => {
  const res = await api.get(`/api/v1/services/${serviceId}/sub-services`, {
    headers: { 'Accept-Language': lang },
  });
  return res.data?.data || res.data;
};