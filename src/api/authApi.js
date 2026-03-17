// src/api/authApi.js
import api from "./axiosConfig";

export const loginApi = (data) => 
  api.post("/auth/login", data, { headers: { "Content-Type": "application/json" } });

export const registerApi = (data) => 
  api.post("/auth/register", data, { headers: { "Content-Type": "application/json" } });