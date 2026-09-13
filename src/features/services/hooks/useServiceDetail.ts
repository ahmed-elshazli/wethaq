import { useQuery } from '@tanstack/react-query';
import { getServiceDetailApi, getAllServiceSlugsApi } from '../api/serviceDetailApi';

export const useServiceDetail = (slug: string) => {
  return useQuery({
    queryKey: ['serviceDetail', slug],
    queryFn: () => getServiceDetailApi(slug),
    enabled: !!slug,
  });
};

export const useServiceTabs = () => {
  return useQuery({
    queryKey: ['serviceTabs'],
    queryFn: getAllServiceSlugsApi,
  });
};