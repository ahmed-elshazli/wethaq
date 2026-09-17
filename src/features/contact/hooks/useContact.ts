import { useQuery, useMutation } from '@tanstack/react-query';
import { useLangStore } from '@/store/useLangStore';
import { getContactSettingsApi, sendContactMessageApi } from '../api/contactApi';

export const useContactSettings = () => {
  const lang = useLangStore((state) => state.lang);

  return useQuery({
    queryKey: ['contact-settings', lang],
    queryFn: async () => {
      const settings = await getContactSettingsApi(lang);
      if (!settings) return null;

      const wrap = (val: any) => {
        if (!val) return '';
        if (typeof val === 'string') return val;
        return lang === 'ar' ? val.ar : val.en;
      };

      return {
        address: wrap(settings.riyadhAddress || 'الرياض، المملكة العربية السعودية'),
        phone: settings.mainPhone || '+966 11 456 7890',
        phone2: settings.extraPhone || '',
        email: settings.email || 'info@wethaqalhaq.com',
        whatsapp: settings.whatsapp || ''
      };
    },
    retry: 1
  });
};

export const useSendContactMessage = () => {
  return useMutation({
    mutationFn: sendContactMessageApi,
  });
};