import api from '@/utils/axios';

// دالة جلب الإعدادات بتقبل اللغة
export const getSiteSettingsApi = async (lang: string = 'ar'): Promise<any> => {
  try {
    const response = await api.get('/api/v1/settings', {
      headers: {
        'Accept-Language': lang // 👈 بنبعت اللغة المطلوبة للباك إند
      }
    });
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    // بيانات افتراضية للطوارئ
    return {
      officeName: lang === 'ar' ? "وثاق الحق" : "Wethaq Al-Haq",
      tagline: lang === 'ar' ? "للمحاماة والاستشارات القانونية" : "Law Firm & Legal Consultations",
      mainPhone: "+966110000000",
      email: "info@wethaqalhaq.com",
    };
  }
};