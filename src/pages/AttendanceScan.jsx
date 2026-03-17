// import { useState } from "react";
// import { markAttendanceApi } from "../api/attendanceApi";

// const AttendanceScan = () => {
//   const [sessionId, setSessionId] = useState("");
//   const [studentId, setStudentId] = useState("");

//   const submit = async () => {
//     const res = await markAttendanceApi({
//       studentId,
//       sessionId,
//     });

//     alert(res.message);
//   };

//   return (
//     <div className="page">
//       <h2>Scan Attendance</h2>

//       <input
//         placeholder="Student ID"
//         value={studentId}
//         onChange={(e) => setStudentId(e.target.value)}
//       />

//       <input
//         placeholder="Session ID"
//         value={sessionId}
//         onChange={(e) => setSessionId(e.target.value)}
//       />

//       <button onClick={submit}>Mark Attendance</button>
//     </div>
//   );
// };

// export default AttendanceScan;

// src/pages/AttendanceScan.jsx
import QRScanner from "../components/QRScanner";
import DashboardLayout from "../components/DashboardLayout";

const AttendanceScan = () => {
  return (
    <DashboardLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f5f6fa",
          minHeight: "100vh",
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          padding: "16px",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#1a1f38",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          Attendance Scanner Now
        </h1>

        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#fff",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <QRScanner />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AttendanceScan;

