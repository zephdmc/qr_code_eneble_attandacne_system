// import { useState, useEffect, useRef, useContext } from "react";
// import { BrowserQRCodeReader } from "@zxing/browser";
// import { markAttendanceApi } from "../api/attendanceApi";
// import { AuthContext } from "../context/AuthContext";

// const QRScanner = () => {
//   const { user } = useContext(AuthContext);
//   const [result, setResult] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const videoRef = useRef(null);
//   const codeReaderRef = useRef(null);

//   useEffect(() => {
//     const codeReader = new BrowserQRCodeReader();
//     codeReaderRef.current = codeReader;

//     const startScanner = async () => {
//       try {
//         if (!videoRef.current) return;

//         await codeReader.decodeFromConstraints(
//           { video: { facingMode: "environment" } },
//           videoRef.current,
//           (result, error) => {
//             if (result) handleScan(result.getText());
//             if (error && error.name !== "NotFoundException") console.error(error);
//           }
//         );
//       } catch (err) {
//         console.error("Scanner initialization error:", err);
//       }
//     };

//     startScanner();

//     return () => {
//       // Stop scanning safely
//       if (codeReaderRef.current && typeof codeReaderRef.current.reset === "function") {
//         codeReaderRef.current.reset();
//       }
//     };
//   }, []);

//   const handleScan = async (data) => {
//     if (!data) return;

//     setResult(data);
//     setLoading(true);
//     setMessage("");

//     try {
//       const parts = data.trim().split("|").map((p) => p.trim());
//       if (parts.length !== 3) throw new Error("Invalid QR format");

//       const [courseId, sessionId] = parts;

//       const response = await markAttendanceApi({
//         studentId: user?._id,
//         sessionId,
//         courseId,
//       });

//       setMessage(response.data?.message || "✅ Attendance marked successfully!");
//     } catch (err) {
//       console.error("Attendance error:", err);
//       setMessage(
//         err.response?.data?.message || "❌ Invalid QR code or session closed."
//       );
//     }

//     setLoading(false);
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         width: "100%",
//       }}
//     >
//       <video
//         ref={videoRef}
//         style={{
//           width: "100%",
//           height: "250px",
//           borderRadius: "12px",
//           objectFit: "cover",
//           backgroundColor: "#000",
//         }}
//       />

//       {loading && (
//         <p style={{ marginTop: "16px", color: "#2d98da", fontWeight: "500" }}>
//           Processing attendance...
//         </p>
//       )}

//       {result && !loading && (
//         <p
//           style={{
//             marginTop: "16px",
//             color: "#555",
//             fontWeight: "500",
//             textAlign: "center",
//             wordBreak: "break-all",
//           }}
//         >
//           Scanned QR: {result}
//         </p>
//       )}

//       {message && !loading && (
//         <p
//           style={{
//             marginTop: "16px",
//             padding: "10px 16px",
//             borderRadius: "12px",
//             textAlign: "center",
//             backgroundColor: message.includes("✅") ? "#d4edda" : "#f8d7da",
//             color: message.includes("✅") ? "#155724" : "#721c24",
//             fontWeight: "500",
//             maxWidth: "400px",
//             width: "100%",
//           }}
//         >
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default QRScanner;

import { useState, useEffect, useRef, useContext } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import { markAttendanceApi } from "../api/attendanceApi";
import { AuthContext } from "../context/AuthContext";

const QRScanner = () => {
  const { user } = useContext(AuthContext);
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const [ip, setIp] = useState("");

  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);

  // Generate / retrieve a persistent device ID
  useEffect(() => {
    let storedDeviceId = localStorage.getItem("deviceId");
    if (!storedDeviceId) {
      storedDeviceId = "device-" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("deviceId", storedDeviceId);
    }
    setDeviceId(storedDeviceId);
  }, []);

  // Fetch public IP
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        setIp(data.ip);
      } catch (err) {
        console.error("IP fetch failed:", err);
        setIp("unknown");
      }
    };
    fetchIp();
  }, []);

  // QR Scanner initialization
  useEffect(() => {
    if (!deviceId || !ip) return; // 🚨 WAIT
  
    const codeReader = new BrowserQRCodeReader();
    codeReaderRef.current = codeReader;
  
    const startScanner = async () => {
      try {
        if (!videoRef.current) return;
  
        await codeReader.decodeFromConstraints(
          { video: { facingMode: "environment" } },
          videoRef.current,
          (result, error) => {
            if (result) handleScan(result.getText());
            if (error && error.name !== "NotFoundException") console.error(error);
          }
        );
      } catch (err) {
        console.error("Scanner error:", err);
      }
    };
  
    startScanner();
  
    return () => {
      codeReader.reset();
    };
  }, [deviceId, ip]); // 👈 IMPORTANT
  

  const handleScan = async (data) => {
    if (!data) return;
  
    // 🚨 STOP if deviceId or ip not ready
    if (!deviceId || !ip) {
      console.warn("Device or IP not ready yet");
      setMessage("⏳ Preparing scanner... please wait");
      return;
    }
  
    setResult(data);
    setLoading(true);
    setMessage("");
  
    try {
      const parts = data.trim().split("|").map((p) => p.trim());
  
      if (parts.length !== 3) throw new Error("Invalid QR format");
  
      const [courseId, sessionId] = parts;
  
      console.log("Sending:", {
        studentId: user?._id,
        sessionId,
        courseId,
        deviceId,
        ip,
      });
  
      const response = await markAttendanceApi({
        studentId: user?._id,
        sessionId,
        courseId,
        deviceId,
        ip,
      });
  
      setMessage(response.data?.message || "✅ Attendance marked!");
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message ||
        "❌ Error marking attendance"
      );
    }
  
    setLoading(false);
  };
  

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <video
        ref={videoRef}
        style={{
          width: "100%",
          height: "250px",
          borderRadius: "12px",
          objectFit: "cover",
          backgroundColor: "#000",
        }}
      />

      {loading && (
        <p style={{ marginTop: "16px", color: "#2d98da", fontWeight: "500" }}>
          Processing attendance...
        </p>
      )}

      {result && !loading && (
        <p
          style={{
            marginTop: "16px",
            color: "#555",
            fontWeight: "500",
            textAlign: "center",
            wordBreak: "break-all",
          }}
        >
          Scanned QR: {result}
        </p>
      )}

      {message && !loading && (
        <p
          style={{
            marginTop: "16px",
            padding: "10px 16px",
            borderRadius: "12px",
            textAlign: "center",
            backgroundColor: message.includes("✅") ? "#d4edda" : "#f8d7da",
            color: message.includes("✅") ? "#155724" : "#721c24",
            fontWeight: "500",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default QRScanner;

