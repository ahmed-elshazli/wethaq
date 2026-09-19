import { useQuery } from '@tanstack/react-query';
import { useLangStore } from '@/store/useLangStore';
import { getTeamApi } from '../api/teamApi';
import api from '@/utils/axios';

const getSettingsApi = async (lang: string) => {
  try {
    const res = await api.get('/api/v1/settings', { headers: { 'Accept-Language': lang } });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const useTeam = (page: number = 1) => {
  const lang = useLangStore((state) => state.lang);
  const limit = 6; // 👈 تحديد الـ Limit الثابت بـ 6

  return useQuery({
    queryKey: ['team-page', lang, page],
    queryFn: async () => {
      const [teamRes, settingsRes] = await Promise.all([
        // تمرير رقم الصفحة والـ Limit
        getTeamApi(lang, page, limit), 
        getSettingsApi(lang)
      ]);
      
      const wrap = (val: string | undefined) => (val ? { ar: val, en: val } : undefined);

      // التأكد من استخراج الداتا والـ pagination من الاستجابة بشكل صحيح
      const teamData = teamRes?.data || (Array.isArray(teamRes) ? teamRes : []); 
      const pagination = teamRes?.pagination || { numberOfPages: 1, currentPage: page };

      if (!teamData || teamData.length === 0) return null;

      const officeEmail = settingsRes?.email || "info@wethaq.com";
      const officePhone = settingsRes?.mainPhone || "+966 11 456 7890";
      const officeWhatsapp = settingsRes?.whatsapp || officePhone; 

      const formattedTeam = teamData.map((m: any) => ({
        id: m._id,
        name: wrap(m.name),
        role: wrap(m.role),
        bio: wrap(m.speciality || m.experience), 
        label: wrap(m.experience),
        img: m.image,
        phone: officePhone, 
        email: officeEmail,
        whatsapp: officeWhatsapp
      }));

      // في الصفحة الأولى بنعرض العضو الأول كـ Featured
      const isFirstPage = page === 1;
      const featured = isFirstPage ? formattedTeam[0] : null;
      const members = isFirstPage ? formattedTeam.slice(1) : formattedTeam;

      return { 
        featured, 
        members, 
        settings: { 
          email: officeEmail, 
          phone: officePhone, 
          whatsapp: officeWhatsapp 
        },
        // تمرير تفاصيل الترقيم للواجهة
        pagination: {
          currentPage: pagination.currentPage || page,
          totalPages: pagination.numberOfPages || 1,
        }
      };
    },
    retry: 1
  });
};