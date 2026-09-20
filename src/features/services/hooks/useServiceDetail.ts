import { useQuery } from '@tanstack/react-query';
import { useLangStore } from '@/store/useLangStore';
import { getServicesApi } from '../api/servicesApi';
import api from '@/utils/axios';

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

// 2. Hook لجلب تفاصيل الخدمة الحالية (الرئيسية فقط)
export const useServiceDetail = (slug: string) => {
  const lang = useLangStore((state) => state.lang);

  return useQuery({
    queryKey: ['service-detail', slug, lang],
    queryFn: async () => {
      // بنجيب كل الخدمات ونفلتر بالـ slug (ممكن يتغير لو الباك إند عمل Endpoint يجيب بالـ slug مباشرة)
      const servicesRes = await getServicesApi(lang);
      const activeService = servicesRes.find((s: any) => s.slug === slug);
      
      if (!activeService) throw new Error("Service not found");

      // بنرجع بيانات الخدمة الرئيسية بس (بدون اختراع subs وهمية)
      return activeService; 
    },
    retry: false 
  });
};

// 3. 👈 Hook الجديد لجلب الخدمات الفرعية الخاصة بخدمة معينة بالـ ID
export const useSubServices = (serviceId: string | undefined) => {
  const lang = useLangStore((state) => state.lang);

  return useQuery({
    queryKey: ['sub-services-client', serviceId, lang],
    queryFn: async () => {
      // بننادي على أول Endpoint في الصورة اللي بيبدأ بـ /services/{serviceId}
      const res = await api.get(`/api/v1/services/${serviceId}/sub-services`, {
        headers: { 'Accept-Language': lang },
      });
      return res.data?.data || res.data;
    },
    enabled: !!serviceId, // مش هيشتغل إلا لما الـ useServiceDetail يخلص ويجيب الـ ID
  });
};