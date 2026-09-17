import { useQuery } from '@tanstack/react-query';
import { useLangStore } from '@/store/useLangStore';
import { getServicesApi } from '../api/servicesApi';

// 1. Hook لجلب قائمة الـ Tabs (عشان شريط التنقل)
export const useServiceTabs = () => {
  const lang = useLangStore((state) => state.lang);

  return useQuery({
    queryKey: ['service-tabs', lang],
    queryFn: async () => {
      const servicesRes = await getServicesApi(lang);
      const wrap = (val: string | undefined) => (val ? { ar: val, en: val } : undefined);
      
      return servicesRes.map((s: any) => ({
        slug: s.slug,
        tab: wrap(s.name)
      }));
    },
    retry: 1
  });
};

// 2. Hook لجلب تفاصيل الخدمة الحالية (بالاعتماد على الـ slug)
export const useServiceDetail = (slug: string) => {
  const lang = useLangStore((state) => state.lang);

  return useQuery({
    queryKey: ['service-detail', slug, lang],
    queryFn: async () => {
      const servicesRes = await getServicesApi(lang);
      
      // بنفلتر المصفوفة عشان نلاقي الخدمة اللي الـ slug بتاعها مطابق
      const activeService = servicesRes.find((s: any) => s.slug === slug);
      
      if (!activeService) throw new Error("Service not found");

      const wrap = (val: string | undefined) => (val ? { ar: val, en: val } : undefined);

      // بنبني شكل (Shape) وهمي يحاكي הـ UI بتاعك عشان الصفحة متضربش
      // הـ subs هنا هتحتوي على وصف الخدمة فقط كعنصر واحد
      return {
        slug: activeService.slug,
        tab: wrap(activeService.name),
        subs: [
          {
            iconName: "IconDocument", // أيقونة افتراضية
            title: wrap(activeService.name),
            items: {
              ar: [activeService.description], // الوصف هيتعرض كعنصر في القائمة
              en: [activeService.description]
            }
          }
        ]
      };
    },
    retry: false // مش عايزين retry لو الـ slug غلط
  });
};