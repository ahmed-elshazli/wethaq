import { useQuery } from '@tanstack/react-query';
import { getBlogPostsApi } from '../api/blogApi';

export const useBlog = () => {
  return useQuery({
    queryKey: ['blogPosts'],
    queryFn: getBlogPostsApi,
  });
};