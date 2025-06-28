import axios from "axios";

// Create a base instance
const axiosBase = axios.create({
  // baseURL: "http://localhost:5000/api", // for local testing
  baseURL: "https://evangadi-forum-last.onrender.com/api", // for production
});

// 🔐 Automatically attach token to every request
axiosBase.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosBase;
