import axios from "axios";

const BASE_URL = "https://manim-api-ffh6c8ewbehjc0hn.southeastasia-01.azurewebsites.net/api";

export const API = axios.create({
  baseURL: BASE_URL,
});

// Thêm interceptor cho requests
API.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('accessToken');
    
    // Nếu có token, thêm vào headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Thêm interceptor để handle refresh token
// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Nếu token hết hạn (status 401) và chưa thử refresh
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       try {
//         // Lấy refresh token
//         const refreshToken = localStorage.getItem('refreshToken');
        
//         // Gọi API refresh token
//         const response = await axios.post(`${BASE_URL}/auth/refresh`, {
//           refreshToken: refreshToken
//         });
        
//         // Lưu token mới
//         const { accessToken } = response.data;
//         localStorage.setItem('accessToken', accessToken);
        
//         // Cập nhật token trong header của request gốc
//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
//         // Thử lại request gốc
//         return API(originalRequest);
//       } catch (refreshError) {
//         // Nếu refresh token cũng hết hạn, logout user
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         // Có thể redirect về trang login ở đây
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

// Nếu bạn muốn tạo các hàm helper
export const apiHelper = {
  get: async (url: string) => {
    try {
      const response = await API.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  post: async (url: string, data: any) => {
    try {
      const response = await API.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  put: async (url: string, data: any) => {
    try {
      const response = await API.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (url: string) => {
    try {
      const response = await API.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Usage example:
// import { API, apiHelper } from './api';
// 
// // Using API directly
// const data = await API.get('/endpoint');
//
// // Using helper functions
// const data = await apiHelper.get('/endpoint');