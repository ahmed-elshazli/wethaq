
import type { SiteSettings } from '@/types/common';

const MOCK_SETTINGS: SiteSettings = {
  officeName: { ar: "وثاق الحق", en: "Wethaq Al-Haq" },
  tagline: { ar: "للمحاماة والاستشارات القانونية", en: "Law Firm & Legal Consultations" },
  phone: "+966 11 XXX XXXX",
  phone2: "+966 50 000 0000",
  email: "info@wethaqalhaq.com",
  whatsapp: "966500000000",
  address: { ar: "الرياض، المملكة العربية السعودية", en: "Riyadh, Saudi Arabia" },
  riyadhAddress: { ar: "الرياض، طريق الملك فهد، برج الفيصلية، المملكة العربية السعودية", en: "Riyadh, King Fahd Road, Al Faisaliyah Tower, KSA" },
  jeddahAddress: { ar: "شارع التحلية، برج جدة، الدور 15، جدة", en: "Tahlia Street, Jeddah Tower, Floor 15, Jeddah" },
  dammamAddress: { ar: "شارع الملك فيصل، برج الدمام، الدور 8، الدمام", en: "King Faisal Street, Dammam Tower, Floor 8, Dammam" }
};

export const getSiteSettingsApi = async (): Promise<SiteSettings> => {
  // محاكاة لطلب شبكة يأخذ نصف ثانية
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_SETTINGS);
      
      // عند جاهزية الباك إند، احذف الـ Promise بالكامل واستخدم:
      // const response = await api.get('/api/v1/settings');
      // return response.data;
    }, 500);
  });
};