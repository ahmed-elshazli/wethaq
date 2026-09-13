import { useQuery } from '@tanstack/react-query';
import { getHomeDataApi } from '../api/homeApi';

export const useHomeData = () => {
  return useQuery({
    queryKey: ['homeData'],
    queryFn: getHomeDataApi,
  });
};