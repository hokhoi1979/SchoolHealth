import axios from "axios";

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

// Thêm interceptor để kiểm tra token trước khi gửi request
axiosConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.warn("No token found. Please log in.");
    return Promise.reject(new Error("No authentication token"));
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Thêm interceptor để xử lý lỗi phản hồi
axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout, please try again.");
      return Promise.reject(new Error("Request timeout, please try again."));
    }
    if (error.response && error.response.status === 401) {
      console.warn("Invalid or expired token, logging out user...");
      localStorage.removeItem("accessToken"); // Xóa token
      window.location.href = "/"; // Chuyển hướng đến trang đăng nhập
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
