import { useQuery } from '@tanstack/react-query';
import { getCasesApi } from '../api/casesApi';

export const useCases = () => {
  return useQuery({
    queryKey: ['cases'],
    queryFn: getCasesApi,
  });
};