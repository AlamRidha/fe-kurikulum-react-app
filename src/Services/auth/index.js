import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Make instace for axios
const axiosInstace = axios.create({
  baseURL: API_URL,
});

// Interceptor for request and response need authorization header
axiosInstace.interceptors.request.use(
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

export default axiosInstace;
