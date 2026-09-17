import { useQuery } from '@tanstack/react-query';
import { useLangStore } from '@/store/useLangStore';
import { getBlogListApi } from '../api/blogApi';
import type { BlogPost } from '../api/blogApi';

export const useBlog = () => {
  const lang = useLangStore((state) => state.lang);

  return useQuery({
    queryKey: ['blog-page', lang],
    queryFn: async (): Promise<BlogPost[]> => {
      const res = await getBlogListApi(lang);
      if (!res || !Array.isArray(res)) return [];

      const wrap = (val: string | undefined) => (val ? { ar: val, en: val } : { ar: '', en: '' });

      return res.map((post: any) => {
        // لو مفيش excerpt، بنقص أول 100 حرف من الـ articleBody
        const rawBody = post.articleBody || '';
        const excerptText = rawBody.length > 100 ? `${rawBody.substring(0, 100)}...` : rawBody;
        
        // جلب اسم الكاتب (أو اسم افتراضي لو مش موجود)
        const authorName = post.createdBy?.fullName || 'فريق وثاق';

        return {
          id: post._id,
          title: wrap(post.title),
          cat: wrap(post.category),
          date: wrap(post.date || new Date().toISOString().split('T')[0]),
          readTime: wrap(post.readTime || '5 دقائق'),
          excerpt: wrap(excerptText),
          body: wrap(rawBody), // المحتوى الكامل للمقال
          author: wrap(authorName),
          img: post.image || '',
          slug: post.slug || ''
        };
      });
    },
    retry: 1
  });
};