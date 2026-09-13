import { useQuery } from '@tanstack/react-query';
import { getLocationsApi } from '../api/locationsApi';

export const useLocations = () => {
  return useQuery({
    queryKey: ['locations'],
    queryFn: getLocationsApi,
  });
};