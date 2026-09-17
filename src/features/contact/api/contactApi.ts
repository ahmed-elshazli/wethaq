import api from '@/utils/axios';

// إرسال بيانات نموذج الاتصال للباك إند
export const sendContactMessageApi = async (formData: { name: string, email: string, phone: string, subject: string, message: string }) => {
  const res = await api.post('/api/v1/contact', formData);
  return res.data;
};

// جلب الإعدادات (لتغذية بيانات تواصل المكتب والعنوان)
export const getContactSettingsApi = async (lang: string) => {
  const res = await api.get('/api/v1/settings', {
    headers: { 'Accept-Language': lang }
  });
  return res.data;
};