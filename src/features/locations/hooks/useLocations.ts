import { useQuery } from '@tanstack/react-query';
import { useLangStore } from '@/store/useLangStore';
import { getBranchesApi } from '../api/branchesClientApi';

export const useLocations = () => {
  const lang = useLangStore((state) => state.lang);

  return useQuery({
    queryKey: ['locations-client', lang],
    queryFn: async () => {
      // 1. جلب الفروع الحقيقية من الداتابيز
      const branchesResponse = await getBranchesApi(lang);
      
      // 2. التحقق من شكل الاستجابة (API يرجع { data: [...] })
      const branchesArray = branchesResponse?.data || branchesResponse || [];

      if (!Array.isArray(branchesArray)) {
        return [];
      }

      // 3. ترتيب الفروع بناءً على حقل الـ order (تصاعدياً)
      const sortedBranches = [...branchesArray].sort((a, b) => (a.order || 0) - (b.order || 0));

      // 4. إعادة صياغة البيانات لتطابق ما ينتظره مكون Locations.tsx
      return sortedBranches.map((branch: any) => ({
        _id: branch._id,
        city: branch.name,                  // اسم الفرع جاي في حقل name
        label: branch.branchType,           // نوع الفرع (مثلاً "الرئيسي") جاي في branchType
        address: branch.address,            // العنوان
        email: branch.email,                // البريد الإلكتروني
        phone: branch.phone,                // رقم الهاتف
        hours: branch.workingHours,         // ساعات العمل جاية في workingHours
        mapLink: branch.mapUrl,             // رابط خرائط جوجل جاي في mapUrl
        
        // لاحظ: הـ API اللي بعته مفيش فيه حقل mapIframe. 
        // فلو إنت عايز خريطة مضمنة (Iframe) لأول فرع زي ما موجود في Locations.tsx، 
        // ممكن نعتمد على الـ mapUrl، بس Iframe جوجل مابس بيحتاج رابط مخصص (Embed URL).
        // مؤقتاً هنسيبه فارغ لحد ما نشوف هتعمل إيه فيه.
        mapIframe: '' 
      }));
    },
    retry: 1
  });
};