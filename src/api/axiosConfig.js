// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// export default api;

// src/api/axiosConfig.js

import axios from "axios";

const api = axios.create({
  baseURL: "https://qr-attendance-backend-h0tq.onrender.com/api",
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;