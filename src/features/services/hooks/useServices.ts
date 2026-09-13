import { useQuery } from '@tanstack/react-query';
import { getServicesApi } from '../api/servicesApi';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: getServicesApi,
  });
};