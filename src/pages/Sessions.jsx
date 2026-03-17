import { useEffect, useState, useContext } from "react";
import {
  createSessionApi,
  getActiveSessionsApi,
  closeSessionApi,
} from "../api/sessionApi";
import { getCoursesApi } from "../api/courseApi";
import { AuthContext } from "../context/AuthContext";
import DashboardLayout from "../components/DashboardLayout";
import jsPDF from "jspdf";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [duration, setDuration] = useState(60);
  const [form, setForm] = useState({ courseId: "" });
  const [qrModal, setQrModal] = useState({ open: false, qr: "", title: "" });

  const { user } = useContext(AuthContext);

  // Load sessions and courses
  const loadAll = async () => {
    try {
      const sRes = await getActiveSessionsApi();
      const cRes = await getCoursesApi();

      const sData = Array.isArray(sRes.data)
        ? sRes.data
        : sRes.data.sessions || [];
      const cData = Array.isArray(cRes.data)
        ? cRes.data
        : cRes.data.courses || [];

      setSessions(sData);
      setCourses(cData);
    } catch (error) {
      console.error("Failed to load sessions/courses:", error);
      setSessions([]);
      setCourses([]);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  // Create session
  const createSession = async (courseId) => {
    if (!courseId) return;
    try {
      const res = await createSessionApi({
        courseId,
        lecturerId: user._id,
        durationMinutes: duration,
      });
      loadAll();

      // Show QR code popup
      const newSession = res.data.session || res.data; // adapt depending on API
      setQrModal({
        open: true,
        qr: newSession.qrCode,
        title: newSession.courseId?.courseTitle || "Session QR",
      });

      // Reset form
      setForm({ courseId: "" });
    } catch (error) {
      console.error("Failed to create session:", error);
    }
  };

  // Close session
  const closeSession = async (id) => {
    try {
      await closeSessionApi(id);
      loadAll();
    } catch (error) {
      console.error("Failed to close session:", error);
    }
  };

  // Download QR as PDF
  const downloadQrPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(qrModal.title, 20, 20);
    const img = new Image();
    img.src = qrModal.qr;
    img.onload = () => {
      doc.addImage(img, "PNG", 30, 40, 150, 150);
      doc.save(`${qrModal.title}.pdf`);
    };
  };

  // ----- Inline Styles -----
  const containerStyle = {
    minHeight: "100vh",
    padding: "30px 20px",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: "#f5f6fa",
  };

  const headerStyle = {
    marginBottom: "20px",
    color: "#1a1f38",
    fontSize: "18px",
    fontWeight: "600",
  };

  const formStyle = {
    marginBottom: "25px",
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    flex: "1 1 200px",
    minWidth: "150px",
  };

  const numberStyle = { ...inputStyle, width: "100px" };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#1a1f38",
    color: "#fff",
    cursor: "pointer",
  };

  const qrModalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  const qrContentStyle = {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    textAlign: "center",
    maxWidth: "350px",
  };

  const closeBtnStyle = {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#1a1f38",
    color: "#fff",
    cursor: "pointer",
    marginTop: "15px",
    marginRight: "10px",
  };

  const downloadBtnStyle = { ...closeBtnStyle, backgroundColor: "#4b7bec" };

  return (
    <DashboardLayout>
      <div style={containerStyle}>
        <h2 style={headerStyle}>Lecture Sessions</h2>

        {/* Create Session */}
        {user.role === "lecturer" && (
          <div style={formStyle}>
            <h3 style={{ flexBasis: "100%", color: "#555", marginBottom: "10px" }}>
              Create Session
            </h3>
            <select
              style={inputStyle}
              value={form.courseId}
              onChange={(e) => setForm({ ...form, courseId: e.target.value })}
            >
              <option value="">Select Course</option>
              {courses
                .filter((c) => c.lecturerId?._id === user._id)
                .map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.courseTitle}
                  </option>
                ))}
            </select>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              style={numberStyle}
            />
            <button
              onClick={() => createSession(form.courseId)}
              style={buttonStyle}
              disabled={!form.courseId}
            >
              Start Session
            </button>
          </div>
        )}

        {/* Active Sessions */}
        <h3 style={{ color: "#555", marginBottom: "10px", fontSize: "18px" }}>Active Sessions</h3>
        {sessions.length === 0 ? (
          <p style={{ color: "#555", fontSize: "13px" }}>No active sessions.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {sessions
              .filter((s) => s.lecturerId?._id === user._id) // only show lecturer's own sessions
              .map((s) => (
                <li
                  key={s._id}
                  style={{
                    backgroundColor: "#fff",
                    marginBottom: "12px",
                    padding: "12px 15px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "1rem",
                  }}
                >
                  <span style={{ fontWeight: "bold", color: "#333" }}>
                    {s.courseId?.courseTitle || "N/A"}
                  </span>
                  {s.qrCode && (
                    <img
                      src={s.qrCode}
                      width="120"
                      alt="QR"
                      style={{ margin: "8px 0" }}
                    />
                  )}
                  {user.role === "lecturer" && (
                    <button
                      onClick={() => closeSession(s._id)}
                      style={{ ...closeBtnStyle, alignSelf: "flex-start", fontSize: "15px"}}
                    >
                      Close Session
                    </button>
                  )}
                </li>
              ))}
          </ul>
        )}

        {/* QR Modal */}
        {qrModal.open && (
          <div
            style={qrModalStyle}
            onClick={() => setQrModal({ open: false, qr: "", title: "" })}
          >
            <div style={qrContentStyle} onClick={(e) => e.stopPropagation()}>
              <h3 style={{ marginBottom: "15px" }}>{qrModal.title} QR Code</h3>
              <img
                src={qrModal.qr}
                width="200"
                alt="QR"
                style={{ marginBottom: "15px" }}
              />
              <div>
                <button style={downloadBtnStyle} onClick={downloadQrPDF}>
                  Download PDF
                </button>
                <button
                  style={closeBtnStyle}
                  onClick={() => setQrModal({ open: false, qr: "", title: "" })}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Sessions;
