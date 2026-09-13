import { useQuery } from '@tanstack/react-query';
import { getAboutDataApi } from '../api/aboutApi';

export const useAbout = () => {
  return useQuery({
    queryKey: ['about'],
    queryFn: getAboutDataApi,
  });
};