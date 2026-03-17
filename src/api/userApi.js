// src/api/userApi.js

import api from "./axiosConfig";

export const getAllUsers = () => api.get("/users");

export const getUser = (id) => api.get(`/users/${id}`);

export const updateUser = (id, data) => api.put(`/users/${id}`, data);

export const deleteUser = (id) => api.delete(`/users/${id}`);

// src/api/userApi.js

export const getUsersApi = () => api.get("/users");
export const getUserApi = (id) => api.get(`/users/${id}`);
export const updateUserApi = (id, data) => api.put(`/users/${id}`, data);
export const deleteUserApi = (id) => api.delete(`/users/${id}`);