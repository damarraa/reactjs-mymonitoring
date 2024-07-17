import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  //set default endpoint API
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
  headers: {
    'Content-Type': "application/json",
    'Accept': "application/json",
    'Authorization': `Bearer ${token}`,
  },
});

// Tambahkan interceptor untuk menambahkan token ke header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getUserProfile = () => {
  return api.get("/api/manajemen-user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const updateUserProfile = (data) => {
  return api.put('/api/manajemen-user', data, {
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
  });
};

// Dapatkan CSRF token dari backend
// api.get('/sanctum/csrf-cookie').then(response => {
// CSRF token sekarang sudah diatur dalam cookie
// });

export default api;
