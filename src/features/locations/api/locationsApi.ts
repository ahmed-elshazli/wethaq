import api from '@/utils/axios';

export const getSettingsForLocationsApi = async (lang: string) => {
  // بنطلب הـ settings العامة لأنها المصدر الوحيد لبيانات الاتصال والعناوين
  const res = await api.get('/api/v1/settings', {
    headers: { 'Accept-Language': lang }
  });
  return res.data;
};