import { useQuery } from '@tanstack/react-query';
import { getTeamDataApi } from '../api/teamApi';

export const useTeam = () => {
  return useQuery({
    queryKey: ['team'],
    queryFn: getTeamDataApi,
  });
};