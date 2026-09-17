import { useQuery } from '@tanstack/react-query';
import { useLangStore } from '@/store/useLangStore';
import { getSettingsForLocationsApi } from '../api/locationsApi';

export const useLocations = () => {
  const lang = useLangStore((state) => state.lang);

  return useQuery({
    queryKey: ['locations-page', lang],
    queryFn: async () => {
      const settings = await getSettingsForLocationsApi(lang);
      
      if (!settings) return [];

      // Helper لضمان توحيد شكل البيانات (سواء رجعت Object أو String)
      const wrap = (val: any) => {
        if (!val) return { ar: '', en: '' };
        if (typeof val === 'string') return { ar: val, en: val };
        return val;
      };

      const branches = [];
      const email = settings.email || 'info@wethaqalhaq.com';
      const mainPhone = settings.mainPhone || '';
      const extraPhone = settings.extraPhone || mainPhone; // لو مفيش رقم إضافي، نستخدم الرئيسي

      // 1. فرع الرياض
      if (settings.riyadhAddress) {
        const address = wrap(settings.riyadhAddress);
        branches.push({
          city: { ar: 'الرياض', en: 'Riyadh' },
          label: { ar: 'الفرع الرئيسي', en: 'Main Branch' },
          address: address,
          email: email,
          phone: mainPhone,
          hours: { ar: 'الأحد - الخميس: 9:00 ص - 5:00 م', en: 'Sun - Thu: 9:00 AM - 5:00 PM' },
          // بنولد رابط بحث في خرائط جوجل بناءً على العنوان المكتوب
          mapLink: `https://maps.google.com/?q=${encodeURIComponent(address.ar || address.en)}`
        });
      }

      // 2. فرع جدة
      if (settings.jeddahAddress) {
        const address = wrap(settings.jeddahAddress);
        branches.push({
          city: { ar: 'جدة', en: 'Jeddah' },
          label: { ar: 'فرع المنطقة الغربية', en: 'Western Region Branch' },
          address: address,
          email: email,
          phone: extraPhone,
          hours: { ar: 'الأحد - الخميس: 9:00 ص - 5:00 م', en: 'Sun - Thu: 9:00 AM - 5:00 PM' },
          mapLink: `https://maps.google.com/?q=${encodeURIComponent(address.ar || address.en)}`
        });
      }

      // 3. فرع الدمام
      if (settings.dammamAddress) {
        const address = wrap(settings.dammamAddress);
        branches.push({
          city: { ar: 'الدمام', en: 'Dammam' },
          label: { ar: 'فرع المنطقة الشرقية', en: 'Eastern Region Branch' },
          address: address,
          email: email,
          phone: extraPhone,
          hours: { ar: 'الأحد - الخميس: 9:00 ص - 5:00 م', en: 'Sun - Thu: 9:00 AM - 5:00 PM' },
          mapLink: `https://maps.google.com/?q=${encodeURIComponent(address.ar || address.en)}`
        });
      }

      return branches;
    },
    retry: 1
  });
};