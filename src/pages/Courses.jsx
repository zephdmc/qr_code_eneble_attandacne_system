import { useEffect, useState, useContext } from "react";
import { getCoursesApi, createCourseApi } from "../api/courseApi";
import { getAllUsers } from "../api/userApi"; 
import { AuthContext } from "../context/AuthContext";
import DashboardLayout from "../components/DashboardLayout";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [form, setForm] = useState({
    courseCode: "",
    courseTitle: "",
    lecturerId: "",
  });

  const { user } = useContext(AuthContext);

  const loadCourses = async () => {
    try {
      const res = await getCoursesApi();
      const data = Array.isArray(res.data) ? res.data : res.data.courses || [];
      setCourses(data);
    } catch (error) {
      console.error("Failed to load courses:", error);
      setCourses([]);
    }
  };

  const loadLecturers = async () => {
    try {
      const res = await getAllUsers();
      const data = Array.isArray(res.data) ? res.data : res.data.users || [];
      const lecturersOnly = data.filter((u) => u.role === "lecturer");
      setLecturers(lecturersOnly);
    } catch (error) {
      console.error("Failed to load lecturers:", error);
      setLecturers([]);
    }
  };

  useEffect(() => {
    loadCourses();
    loadLecturers();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCourseApi({
        ...form,
        lecturerId: form.lecturerId || user._id,
      });
      setForm({ courseCode: "", courseTitle: "", lecturerId: "" });
      loadCourses();
    } catch (error) {
      console.error("Failed to create course:", error);
    }
  };

  // ----- Inline CSS styles -----
  const containerStyle = {
    minHeight: "100vh",
    padding: "40px 20px",
    backgroundColor: "#f4f6f9",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  };

  const headerStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "25px",
  };

  const formContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "30px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  };

  const inputStyle = {
    flex: "1 1 150px",
    minWidth: "150px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "14px",
    transition: "all 0.2s ease",
  };

  const selectStyle = {
    ...inputStyle,
    flex: "1 1 180px",
  };

  const buttonStyle = {
    padding: "12px 25px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#5a67ff",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    flex: "1 1 120px",
    minWidth: "120px",
      transition: "all 0.3s ease",
      fontSize: "15px"
  };

  const buttonHoverStyle = {
    backgroundColor: "#3a62d7",
  };

  const courseCardStyle = {
    backgroundColor: "#fff",
    padding: "18px 20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    fontSize: "15px",
    marginBottom: "12px",
  };

  const courseTextStyle = {
    color: "#1f2937",
    fontWeight: "500",
  };

  const lecturerTextStyle = {
    color: "#6b7280",
  };

  return (
    <DashboardLayout>
      <div style={containerStyle}>
        <h2 style={headerStyle}>Courses</h2>

        {/* Form for creating courses */}
        {user.role !== "student" && (
          <form onSubmit={handleSubmit} style={formContainerStyle}>
            <input
              name="courseCode"
              placeholder="Course Code"
              value={form.courseCode}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <input
              name="courseTitle"
              placeholder="Course Title"
              value={form.courseTitle}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <select
              name="lecturerId"
              value={form.lecturerId}
              onChange={handleChange}
              style={selectStyle}
            >
              <option value="">Select Lecturer</option>
              {lecturers.map((l) => (
                <option key={l._id} value={l._id}>
                  {l.fullname}
                </option>
              ))}
            </select>
            <button
              type="submit"
              style={buttonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#3a62d7")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#4b7bec")}
            >
              Create
            </button>
          </form>
        )}

        {/* Courses list */}
        {courses.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No courses available.</p>
        ) : (
          <ul style={{ padding: 0, margin: 0 }}>
            {courses.map((c) => (
              <li key={c._id} style={courseCardStyle}>
                <span style={courseTextStyle}>
                  {c.courseCode} - {c.courseTitle}
                </span>
                <span style={lecturerTextStyle}>
                  {c.lecturerId?.fullname || "N/A"} ({c.lecturerId?.role || "N/A"})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Courses;
