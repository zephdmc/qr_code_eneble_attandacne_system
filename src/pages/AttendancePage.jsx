// // src/pages/AttendancePage.jsx
// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import DashboardLayout from "../components/DashboardLayout";
// import QRScanner from "../components/QRScanner";
// import { getStudentAttendance, getCourseAttendance } from "../api/attendanceApi";
// import { getCoursesApi } from "../api/courseApi";
// import { getActiveSessionsApi } from "../api/sessionApi";

// const AttendancePage = () => {
//   const { user } = useContext(AuthContext);

//   const [courses, setCourses] = useState([]);
//   const [sessions, setSessions] = useState([]);
//   const [attendance, setAttendance] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [selectedSession, setSelectedSession] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ----- Load Courses -----
//   const loadCourses = async () => {
//     try {
//       const res = await getCoursesApi();
//       const data = Array.isArray(res.data) ? res.data : res.data.courses || [];
//       if (user.role === "lecturer") {
//         const lecturerCourses = data.filter((c) => c.lecturerId?._id === user._id);
//         setCourses(lecturerCourses);
//       } else {
//         setCourses(data);
//       }
//     } catch (err) {
//       console.error("Failed to load courses:", err);
//     }
//   };

//   // ----- Load Sessions -----
//   const loadSessions = async (courseId) => {
//     try {
//       const res = await getActiveSessionsApi();
//       const data = Array.isArray(res.data) ? res.data : res.data.sessions || [];
//       if (user.role === "lecturer") {
//         const mySessions = data.filter((s) => s.lecturerId?._id === user._id);
//         setSessions(mySessions);
//       } else if (courseId) {
//         setSessions(data.filter((s) => s.courseId?._id === courseId));
//       } else {
//         setSessions(data);
//       }
//     } catch (err) {
//       console.error("Failed to load sessions:", err);
//     }
//   };

//   // ----- Load Attendance -----
//   const loadAttendance = async () => {
//     setLoading(true);
//     try {
//       if (user.role === "student") {
//         const res = await getStudentAttendance(user._id);
//         setAttendance(res.data);
//       } else if (user.role === "lecturer") {
//         if (!selectedSession) {
//           setAttendance([]);
//           setLoading(false);
//           return;
//         }
//         const res = await getCourseAttendance(selectedSession);
//         setAttendance(res.data);
//       } else if (user.role === "admin") {
//         if (!selectedCourse || !selectedSession) {
//           setAttendance([]);
//           setLoading(false);
//           return;
//         }
//         const res = await getCourseAttendance(selectedSession);
//         setAttendance(res.data);
//       }
//     } catch (err) {
//       console.error("Failed to load attendance:", err);
//     }
//     setLoading(false);
//   };

//   // ----- useEffects -----
//   useEffect(() => {
//     loadCourses();
//     loadSessions();
//     if (user.role === "student") loadAttendance(); // Student attendance on mount
//   }, []);

//   useEffect(() => {
//     if (selectedCourse) loadSessions(selectedCourse);
//   }, [selectedCourse]);

//   useEffect(() => {
//     if (user.role !== "student") loadAttendance();
//   }, [selectedCourse, selectedSession]);

//   // ----- Inline Styles -----
//   const containerStyle = {
//     minHeight: "100vh",
//     padding: "30px 20px",
//     fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//     backgroundColor: "#f5f6fa",
//   };
//   const headerStyle = { marginBottom: "25px", color: "#333", fontSize: "28px", fontWeight: "600" };
//   const filterStyle = {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "12px",
//     marginBottom: "20px",
//     alignItems: "center",
//   };
//   const selectStyle = { padding: "10px", borderRadius: "6px", border: "1px solid #ccc", minWidth: "180px" };
//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     backgroundColor: "#fff",
//     borderRadius: "8px",
//     overflow: "hidden",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//   };
//   const thStyle = { padding: "12px", textAlign: "left", borderBottom: "1px solid #eee", backgroundColor: "#f0f2f5", color: "#333" };
//   const tdStyle = { padding: "12px", borderBottom: "1px solid #eee", color: "#555" };

//   return (
//     <DashboardLayout>
//       <div style={containerStyle}>
//         <h2 style={headerStyle}>Attendance Records</h2>

//         {/* QR Scanner for students */}
//         {user.role === "student" && (
//           <div style={{ marginBottom: "30px", maxWidth: "400px" }}>
//             <QRScanner onAttendanceMarked={loadAttendance} />
//           </div>
//         )}

//         {/* Filters for admin/lecturer */}
//         {user.role !== "student" && (
//           <div style={filterStyle}>
//             <select
//               style={selectStyle}
//               value={selectedCourse}
//               onChange={(e) => setSelectedCourse(e.target.value)}
//             >
//               <option value="">Select Course</option>
//               {courses.map((c) => (
//                 <option key={c._id} value={c._id}>{c.courseTitle}</option>
//               ))}
//             </select>

//             {selectedCourse && (
//               <select
//                 style={selectStyle}
//                 value={selectedSession}
//                 onChange={(e) => setSelectedSession(e.target.value)}
//               >
//                 <option value="">Select Session</option>
//                 {sessions
//                   .filter((s) => s.courseId?._id === selectedCourse)
//                   .map((s) => (
//                     <option key={s._id} value={s._id}>
//                       {new Date(s.startTime).toLocaleString()}
//                     </option>
//                   ))}
//               </select>
//             )}
//           </div>
//         )}

//         {/* Attendance Table */}
//         {loading ? (
//           <p style={{ color: "#555" }}>Loading attendance...</p>
//         ) : attendance.length === 0 ? (
//           <p style={{ color: "#555" }}>No attendance records found.</p>
//         ) : (
//           <table style={tableStyle}>
//             <thead>
//               <tr>
//                 {user.role !== "student" && <th style={thStyle}>Student</th>}
//                 <th style={thStyle}>Course</th>
//                 {user.role !== "student" && <th style={thStyle}>Session Time</th>}
//                 <th style={thStyle}>Status</th>
//                 <th style={thStyle}>Timestamp</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attendance.map((a) => (
//                 <tr key={a._id}>
//                   {user.role !== "student" && <td style={tdStyle}>{a.studentId?.fullname || "N/A"}</td>}
//                   <td style={tdStyle}>{a.courseId?.courseTitle || "N/A"}</td>
//                   {user.role !== "student" && <td style={tdStyle}>{a.sessionId ? new Date(a.sessionId.startTime).toLocaleString() : "N/A"}</td>}
//                   <td style={tdStyle}>{a.status}</td>
//                   <td style={tdStyle}>{new Date(a.timestamp).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default AttendancePage;
// src/pages/AttendancePage.jsx
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DashboardLayout from "../components/DashboardLayout";
import QRScanner from "../components/QRScanner";
import { getStudentAttendance, getCourseAttendance } from "../api/attendanceApi";
import { getCoursesApi } from "../api/courseApi";
import { getActiveSessionsApi } from "../api/sessionApi";

const AttendancePage = () => {
  const { user } = useContext(AuthContext);

  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [loading, setLoading] = useState(false);

  // ----- Load Courses -----
  const loadCourses = async () => {
    try {
      const res = await getCoursesApi();
      const data = Array.isArray(res.data) ? res.data : res.data.courses || [];
      if (user.role === "lecturer") {
        setCourses(data.filter(c => c.lecturerId?._id === user._id));
      } else {
        setCourses(data);
      }
    } catch (err) {
      console.error("Failed to load courses:", err);
    }
  };

  // ----- Load Sessions -----
  const loadSessions = async (courseId) => {
    try {
      const res = await getActiveSessionsApi();
      const data = Array.isArray(res.data) ? res.data : res.data.sessions || [];
      if (user.role === "lecturer") {
        setSessions(data.filter(s => s.lecturerId?._id === user._id));
      } else if (courseId) {
        setSessions(data.filter(s => s.courseId?._id === courseId));
      } else {
        setSessions(data);
      }
    } catch (err) {
      console.error("Failed to load sessions:", err);
    }
  };

  // ----- Load Attendance -----
  const loadAttendance = async () => {
    if (user.role === "student") {
      setLoading(true);
      try {
        const res = await getStudentAttendance(user._id);
        setAttendance(res.data);
      } catch (err) {
        console.error("Failed to load student attendance:", err);
      }
      setLoading(false);
      return;
    }

    // Lecturer/Admin
    if (!selectedSession) {
      alert("Please select a session to load attendance.");
      return;
    }

    setLoading(true);
    try {
      const res = await getCourseAttendance(selectedSession);
      setAttendance(res.data);
    } catch (err) {
      console.error("Failed to load attendance:", err);
      setAttendance([]);
    }
    setLoading(false);
  };

  // ----- useEffects -----
  useEffect(() => {
    loadCourses();
    loadSessions();
    if (user.role === "student") loadAttendance(); // Student auto-fetch
  }, []);

  useEffect(() => {
    if (selectedCourse) loadSessions(selectedCourse);
  }, [selectedCourse]);

  // ----- Inline Styles -----
  const containerStyle = {
    minHeight: "100vh",
    padding: "30px 20px",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: "#f5f6fa",
  };
  const headerStyle = { marginBottom: "25px", color: "#333", fontSize: "28px", fontWeight: "600" };
  const filterStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "20px",
    alignItems: "center",
  };
  const selectStyle = { padding: "10px", borderRadius: "6px", border: "1px solid #ccc", minWidth: "180px" };
  const buttonStyle = { padding: "10px 18px", borderRadius: "6px", border: "none", backgroundColor: "#2d98da", color: "#fff", cursor: "pointer" };
  const tableStyle = { width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" };
  const thStyle = { padding: "12px", textAlign: "left", borderBottom: "1px solid #eee", backgroundColor: "#f0f2f5", color: "#333" };
  const tdStyle = { padding: "12px", borderBottom: "1px solid #eee", color: "#555", fontSize: "14px" };

  // ----- Helper to map IDs to names/titles -----
  const getStudentName = (studentId) => {
    if (!studentId) return "N/A";
    return typeof studentId === "object" ? studentId.fullname : studentId;
  };
  const getCourseTitle = (courseId) => {
    if (!courseId) return "N/A";
    if (typeof courseId === "object") return courseId.courseTitle;
    const course = courses.find(c => c._id === courseId);
    return course?.courseTitle || courseId;
  };
  const getSessionTime = (sessionId) => {
    if (!sessionId) return "N/A";
    if (typeof sessionId === "object") return new Date(sessionId.startTime).toLocaleString();
    const session = sessions.find(s => s._id === sessionId);
    return session?.startTime ? new Date(session.startTime).toLocaleString() : sessionId;
  };

  return (
    <DashboardLayout>
      <div style={containerStyle}>
        <h2 style={headerStyle}>Attendance Records Now</h2>

        {/* QR Scanner for students */}
        {user.role === "student" && (
          <div style={{ marginBottom: "30px", maxWidth: "400px" }}>
            <QRScanner onAttendanceMarked={loadAttendance} />
          </div>
        )}

        {/* Filters for admin/lecturer */}
        {user.role !== "student" && (
          <div style={filterStyle}>
            <select
              style={selectStyle}
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>{c.courseTitle}</option>
              ))}
            </select>

            {selectedCourse && (
              <select
                style={selectStyle}
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
              >
                <option value="">Select Session</option>
                {sessions
                  .filter((s) => s.courseId?._id === selectedCourse)
                  .map((s) => (
                    <option key={s._id} value={s._id}>
                      {new Date(s.startTime).toLocaleString()}
                    </option>
                  ))}
              </select>
            )}

            <button style={buttonStyle} onClick={loadAttendance}>Load Attendance</button>
          </div>
        )}

        {/* Attendance Table */}
        {loading ? (
          <p style={{ color: "#555" }}>Loading attendance...</p>
        ) : attendance.length === 0 ? (
          <p style={{ color: "#555" }}>No attendance records found.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                {user.role !== "student" && <th style={thStyle}>Student</th>}
                <th style={thStyle}>Course</th>
                {user.role !== "student" && <th style={thStyle}>Session Time</th>}
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a) => (
                <tr key={a._id}>
                  {user.role !== "student" && <td style={tdStyle}>{getStudentName(a.studentId)}</td>}
                  <td style={tdStyle}>{getCourseTitle(a.courseId)}</td>
                  {user.role !== "student" && <td style={tdStyle}>{getSessionTime(a.sessionId)}</td>}
                  <td style={tdStyle}>{a.status}</td>
                  <td style={tdStyle}>{new Date(a.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AttendancePage;
