import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// إضافة الـ Token لكل الطلبات إن وجد
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// التعامل مع انتهاء الجلسة (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isLoginRequest = error.config.url?.includes('login');
      // تسجيل الخروج والتوجيه للأدمن إلا لو كان الخطأ من طلب تسجيل الدخول نفسه
      if (!isLoginRequest) {
        useAuthStore.getState().logout();
        window.location.href = '/admin';
      }
    }
    return Promise.reject(error);
  }
);

export default api;