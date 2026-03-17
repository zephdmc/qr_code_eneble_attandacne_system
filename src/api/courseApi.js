// src/api/courseApi.js

import api from "./axiosConfig";

export const createCourse = (data) => api.post("/courses", data);

export const getCourses = () => api.get("/courses");

export const getCourse = (id) => api.get(`/courses/${id}`);

export const deleteCourse = (id) => api.delete(`/courses/${id}`);


export const createCourseApi = (data) => api.post("/courses", data);
export const getCoursesApi = () => api.get("/courses");
export const getCourseApi = (id) => api.get(`/courses/${id}`);
export const deleteCourseApi = (id) => api.delete(`/courses/${id}`);