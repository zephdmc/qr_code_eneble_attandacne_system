// src/api/sessionApi.js

import api from "./axiosConfig";

export const createSession = (data) => api.post("/sessions", data);

export const getActiveSessions = () => api.get("/sessions/active");

export const closeSession = (id) => api.put(`/sessions/close/${id}`);

export const getSession = (id) => api.get(`/sessions/${id}`);

export const getCourseSessionsApi = (courseId) =>
  api.get(`/sessions/course/${courseId}`);


export const createSessionApi = (data) => api.post("/sessions", data);
export const getActiveSessionsApi = () => api.get("/sessions/active");
export const closeSessionApi = (id) => api.put(`/sessions/close/${id}`);
export const getSessionApi = (id) => api.get(`/sessions/${id}`);