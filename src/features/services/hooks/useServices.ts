import { useQuery } from '@tanstack/react-query';
import { useLangStore } from '@/store/useLangStore';
import { getServicesApi } from '../api/servicesApi';

export const useServices = () => {
  const lang = useLangStore((state) => state.lang);

  return useQuery({
    queryKey: ['services-page', lang],
    queryFn: async () => {
      const servicesRes = await getServicesApi(lang);
      
      const wrap = (val: string | undefined) => (val ? { ar: val, en: val } : undefined);

      // بنحول البيانات الـ String اللي جاية من الـ API لشكل الـ UI بيحبه (ar/en)
      return servicesRes.map((s: any) => ({
        id: s._id,
        title: wrap(s.name), // الباك إند بيسميها name، والـ UI بيسميها title
        desc: wrap(s.description),
        slug: s.slug,
        img: s.image,
        // הـ UI محتاج label صغير، لو مش موجود في الباك إند هنحط اسم الخدمة تاني أو قيمة ثابتة
        label: wrap(s.name) 
      }));
    },
    retry: 1
  });
};