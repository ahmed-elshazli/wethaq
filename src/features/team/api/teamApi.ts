import api from '@/utils/axios';

export const getTeamApi = async (lang: string, page: number = 1, limit: number = 6) => {
  const res = await api.get('/api/v1/team', {
    headers: { 'Accept-Language': lang },
    params: { 
      page: page,
      limit: limit 
    } 
  });
  
  // بنرجع الـ Response كامل عشان الـ Hook محتاج الـ data ومحتاج الـ pagination
  // لو الباك إند بيرجع البيانات مباشرة كـ Array هنعتبرها هي الداتا،
  // ولو بيرجع { data: [...], pagination: {...} } يبقى هنرجع الـ Object كله.
  return res.data;
};