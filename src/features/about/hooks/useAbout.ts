import { useQuery } from '@tanstack/react-query';
import { useLangStore } from '@/store/useLangStore';
import { getAboutApi } from '../api/aboutApi';

export const useAbout = () => {
  const lang = useLangStore((state) => state.lang);

  return useQuery({
    queryKey: ['about-us', lang],
    queryFn: async () => {
      const res = await getAboutApi(lang);
      
      // الداتا بترجع String، هنغلفها عشان دالة l() في الـ UI بتاعك
      const wrap = (val: string | undefined) => (val ? { ar: val, en: val } : undefined);
      
      return {
        tag: wrap(res?.tag),
        heading: wrap(res?.heading),
        p1: wrap(res?.paragraph1),
        p2: wrap(res?.paragraph2),
        vision: wrap(res?.vision),
        mission: wrap(res?.mission),
        values: wrap(res?.values),
        image: res?.image // صورة الخلفية من الـ API
      };
    },
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 2;
    }
  });
};