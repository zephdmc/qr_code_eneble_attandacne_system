// src/api/attendanceApi.js
import api from "./axiosConfig";

export const markAttendanceApi = (data) => api.post("/attendance", data);

export const getCourseAttendance = (courseId) =>
  api.get(`/attendance/course/${courseId}`);

export const getStudentAttendance = (studentId) =>
    api.get(`/attendance/student/${studentId}`);
  
export const loadAttendanceForLecturer = async () => {
        if (!selectedSession) return;
      
        setLoading(true);
        try {
          const res = await axios.get(`/api/attendance/session/${selectedSession}`);
          console.log("Raw attendance data from API:", res.data);
          setAttendance(res.data);
        } catch (err) {
          console.error("Failed to load attendance:", err);
          setAttendance([]);
        }
        setLoading(false);
      };
      

      export const getSessionAttendance = (sessionId) =>
  api.get(`/attendance/session/${sessionId}`);
