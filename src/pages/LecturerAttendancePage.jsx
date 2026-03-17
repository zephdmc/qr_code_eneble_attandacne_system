// // src/pages/LecturerAttendancePage.jsx
// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import DashboardLayout from "../components/DashboardLayout";
// import axios from "axios";
// import { getCoursesApi } from "../api/courseApi";

// import { getCourseSessionsApi } from "../api/sessionApi";
// import { getSessionAttendance } from "../api/attendanceApi";

// const LecturerAttendancePage = () => {
//   const { user } = useContext(AuthContext);

//   const [courses, setCourses] = useState([]);
//   const [sessions, setSessions] = useState([]);
//   const [attendance, setAttendance] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [selectedSession, setSelectedSession] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Load courses for lecturer
//   const loadCourses = async () => {
//     try {
//       const res = await getCoursesApi();
//       const data = Array.isArray(res.data) ? res.data : res.data.courses || [];
//       const lecturerCourses = data.filter((c) => c.lecturerId?._id === user._id);
//       console.log("Courses loaded for lecturer:", lecturerCourses);
//       setCourses(lecturerCourses);
//     } catch (err) {
//       console.error("Failed to load courses:", err);
//     }
//   };

//   // Load sessions for selected course
//   const loadSessions = async (courseId) => {
//       try {
//         const res = await getCourseSessionsApi(courseId);
//         // const res = await getSessionApi();
//         console.log("lagos", res)
//       const data = Array.isArray(res.data) ? res.data : res.data.sessions || [];
//       const filteredSessions = data.filter(
//         (s) => s.courseId?._id === courseId && s.lecturerId?._id === user._id
//       );
//       console.log("Sessions loaded for lecturer/course:", filteredSessions);
//       setSessions(filteredSessions);
//     } catch (err) {
//       console.error("Failed to load sessions:", err);
//     }
//   };

//   // Load attendance for selected session

//   const loadAttendance = async () => {
//     if (!selectedSession) return;
  
//     setLoading(true);
//     try {
//       const res = await getSessionAttendance(selectedSession);
//       console.log("Raw attendance data from API:", res.data);
//       setAttendance(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error("Failed to load attendance:", err);
//       setAttendance([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     loadCourses();
//   }, []);

//   useEffect(() => {
//     if (selectedCourse) {
//       loadSessions(selectedCourse);
//       setSelectedSession(""); // reset session when course changes
//       setAttendance([]);
//     }
//   }, [selectedCourse]);

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
//   const buttonStyle = {
//     padding: "10px 20px",
//     borderRadius: "6px",
//     backgroundColor: "#2d98da",
//     color: "#fff",
//     border: "none",
//     cursor: "pointer",
//   };
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

//         {/* Filters */}
//         <div style={filterStyle}>
//           <select
//             style={selectStyle}
//             value={selectedCourse}
//             onChange={(e) => setSelectedCourse(e.target.value)}
//           >
//             <option value="">Select Course</option>
//             {courses.map((c) => (
//               <option key={c._id} value={c._id}>{c.courseTitle}</option>
//             ))}
//           </select>

//           {selectedCourse && (
//             <select
//               style={selectStyle}
//               value={selectedSession}
//               onChange={(e) => setSelectedSession(e.target.value)}
//             >
//               <option value="">Select Session</option>
//               {sessions.map((s) => (
//                 <option key={s._id} value={s._id}>
//                   {new Date(s.startTime).toLocaleString()} - {new Date(s.endTime).toLocaleTimeString()}
//                 </option>
//               ))}
//             </select>
//           )}

//           {selectedSession && (
//             <button style={buttonStyle} onClick={loadAttendance}>Load Attendance</button>
//           )}
//         </div>

//         {/* Attendance Table */}
//         {loading ? (
//           <p style={{ color: "#555" }}>Loading attendance...</p>
//         ) : attendance.length === 0 ? (
//           <p style={{ color: "#555" }}>No attendance records found.</p>
//         ) : (
//           <table style={tableStyle}>
//             <thead>
//               <tr>
//                 <th style={thStyle}>Student</th>
//                 <th style={thStyle}>Course</th>
//                 {/* <th style={thStyle}>Session Time</th> */}
//                 <th style={thStyle}>Status</th>
//                 <th style={thStyle}>Timestamp</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attendance.map((a) => (
//                 <tr key={a._id}>
//                   <td style={tdStyle}>{a.studentId?.fullname || "N/A"}</td>
//                   <td style={tdStyle}>{a.courseId?.courseTitle || "N/A"}</td>
//                   {/* <td style={tdStyle}>
//   {a.sessionId && typeof a.sessionId === "object"
//     ? `${new Date(a.sessionId.startTime).toLocaleString()} - ${new Date(a.sessionId.endTime).toLocaleTimeString()}`
//     : "Session Time Unavailable"}
// </td> */}

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

// export default LecturerAttendancePage;

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DashboardLayout from "../components/DashboardLayout";
import { getCoursesApi } from "../api/courseApi";
import { getCourseSessionsApi } from "../api/sessionApi";
import { getSessionAttendance } from "../api/attendanceApi";

const LecturerAttendancePage = () => {
  const { user } = useContext(AuthContext);

  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------------------------
  // Attendance Summary Metrics
  // ---------------------------
  const totalStudents = attendance.length;

  const presentStudents = attendance.filter(
    (a) => a.status?.toLowerCase() === "present"
  ).length;

  const absentStudents = totalStudents - presentStudents;

  const attendanceRate =
    totalStudents > 0
      ? ((presentStudents / totalStudents) * 100).toFixed(1)
      : 0;

  // ---------------------------
  // Load Lecturer Courses
  // ---------------------------
  const loadCourses = async () => {
    try {
      const res = await getCoursesApi();
      const data = Array.isArray(res.data) ? res.data : res.data.courses || [];

      const lecturerCourses = data.filter(
        (c) => c.lecturerId?._id === user._id
      );

      setCourses(lecturerCourses);
    } catch (err) {
      console.error("Failed to load courses:", err);
    }
  };

  // ---------------------------
  // Load Sessions by Course
  // ---------------------------
  const loadSessions = async (courseId) => {
    try {
      const res = await getCourseSessionsApi(courseId);
      const sessionsData = res.data.sessions || [];

      setSessions(sessionsData);
    } catch (err) {
      console.error("Failed to load sessions:", err);
      setSessions([]);
    }
  };

  // ---------------------------
  // Load Attendance
  // ---------------------------
  const loadAttendance = async () => {
    if (!selectedSession) return;

    setLoading(true);

    try {
      const res = await getSessionAttendance(selectedSession);
      setAttendance(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load attendance:", err);
      setAttendance([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      loadSessions(selectedCourse);
      setSelectedSession("");
      setAttendance([]);
    }
  }, [selectedCourse]);

  // ---------------------------
  // Styles
  // ---------------------------
  const containerStyle = {
    minHeight: "100vh",
    padding: "30px 20px",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: "#f5f6fa",
  };

  const headerStyle = {
    marginBottom: "25px",
    color: "#333",
    fontSize: "18px",
    fontWeight: "600",
  };

  const filterStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "25px",
    alignItems: "center",
  };

  const selectStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minWidth: "200px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "6px",
    backgroundColor: "#2d98da",
    color: "#fff",
    border: "none",
      cursor: "pointer",
      fontSize: "15px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  };

  const thStyle = {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #eee",
      backgroundColor: "#f0f2f5",
    color:"black"
  };

  const tdStyle = {
    padding: "12px",
      borderBottom: "1px solid #eee",
    color: "gray"
  };

  // Dashboard Summary Styles
  const summaryContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "25px",
  };

  const summaryCard = {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
  };

  const summaryTitle = {
    fontSize: "14px",
    color: "#888",
    marginBottom: "8px",
  };

  const summaryValue = {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#333",
  };

  return (
    <DashboardLayout>
      <div style={containerStyle}>
        <h2 style={headerStyle}>Attendance Records</h2>

        {/* Filters */}
        <div style={filterStyle}>
          {/* Course Select */}
          <select
            style={selectStyle}
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Course</option>

            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseTitle}
              </option>
            ))}
          </select>

          {/* Session Select */}
          {selectedCourse && (
            <select
              style={selectStyle}
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
            >
              <option value="">Select Session</option>

              {sessions.map((s) => (
                <option key={s._id} value={s._id}>
                  {new Date(s.startTime).toLocaleDateString()} |{" "}
                  {new Date(s.startTime).toLocaleTimeString()} -{" "}
                  {new Date(s.endTime).toLocaleTimeString()}
                </option>
              ))}
            </select>
          )}

          {selectedSession && (
            <button style={buttonStyle} onClick={loadAttendance}>
              Load Attendance
            </button>
          )}
        </div>

        {/* Session Summary Dashboard */}
        {attendance.length > 0 && (
          <div style={summaryContainer}>
            <div style={summaryCard}>
              <div style={summaryTitle}>Total Students</div>
              <div style={summaryValue}>{totalStudents}</div>
            </div>

            <div style={summaryCard}>
              <div style={summaryTitle}>Present</div>
              <div style={{ ...summaryValue, color: "#27ae60" }}>
                {presentStudents}
              </div>
            </div>

            {/* <div style={summaryCard}>
              <div style={summaryTitle}>Absent</div>
              <div style={{ ...summaryValue, color: "#e74c3c" }}>
                {absentStudents}
              </div>
            </div> */}

            <div style={summaryCard}>
              <div style={summaryTitle}>Attendance Rate</div>
              <div style={{ ...summaryValue, color: "#2d98da" }}>
                {attendanceRate}%
              </div>
            </div>
          </div>
        )}

        {/* Attendance Table */}
        {loading ? (
          <p>Loading attendance...</p>
        ) : attendance.length === 0 ? (
          <p>No attendance records found.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Student</th>
                <th style={thStyle}>Course</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Timestamp</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((a) => (
                <tr key={a._id}>
                  <td style={tdStyle}>
                    {a.studentId?.fullname || "Unknown Student"}
                  </td>

                  <td style={tdStyle}>
                    {a.courseId?.courseTitle || "Unknown Course"}
                  </td>

                  <td style={tdStyle}>{a.status}</td>

                  <td style={tdStyle}>
                    {new Date(a.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LecturerAttendancePage;
