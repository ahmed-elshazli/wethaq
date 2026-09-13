import { useQuery } from '@tanstack/react-query';
import { getSiteSettingsApi } from '../api/settingsApi';

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSiteSettingsApi,
    staleTime: 1000 * 60 * 60, // كاش لمدة ساعة لأن الإعدادات لا تتغير كثيراً
  });
};