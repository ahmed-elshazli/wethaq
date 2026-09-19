import { useQuery } from '@tanstack/react-query';
import { getSiteSettingsApi } from '../api/settingsApi'; // عدل المسار لو مختلف
import { useLangStore } from '@/store/useLangStore'; // 👈 نجيب اللغة من הـ Store

export const useSiteSettings = () => {
  const { lang } = useLangStore(); // 'ar' أو 'en'

  return useQuery({
    // 👈 ضفنا lang للـ queryKey عشان لما تتغير يعمل Refetch
    queryKey: ['site-settings', lang], 
    queryFn: () => getSiteSettingsApi(lang),
    staleTime: 1000 * 60 * 5, // البيانات بتفضل 5 دقايق قبل ما يطلبها تاني في نفس اللغة
  });
};