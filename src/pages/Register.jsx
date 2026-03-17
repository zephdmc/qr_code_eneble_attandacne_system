import { useState } from "react";
import { registerApi } from "../api/authApi";
import DashboardLayout from "../components/DashboardLayout";

const Register = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    matricNumber: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await registerApi(form);

    if (res?.user) {
      alert("Registration successful!");
      setForm({
        fullname: "",
        email: "",
        matricNumber: "",
        password: "",
        role: "student",
      });
    } else {
      alert("Registration failed");
    }
  };

  const containerStyle = {
    maxWidth: "500px",
    margin: "40px auto",
    background: "#fff",
    padding: "35px",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "5px",
    display: "block",
    color: "#444",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#5a67ff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
  };

  const headerStyle = {
    textAlign: "center",
      marginBottom: "25px",
      fontSize: "18px",
  };

  return (
    <DashboardLayout>
      <div style={containerStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h2 style={{ marginBottom: "5px",  color: "#1a1f38", fontSize: "18px"}}>Register New User</h2>
          <p style={{ color: "#777", fontSize: "14px" }}>
            Add students, lecturers, or administrators
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <label style={labelStyle}>Full Name</label>
          <input
            style={inputStyle}
            type="text"
            name="fullname"
            placeholder="Enter full name"
            value={form.fullname}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <label style={labelStyle}>Email Address</label>
          <input
            style={inputStyle}
            type="email"
            name="email"
            placeholder="Enter email address"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* Role */}
          <label style={labelStyle}>User Role</label>
          <select
            style={inputStyle}
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="lecturer">Lecturer</option>
            <option value="admin">Admin</option>
          </select>

          {/* Matric Number (Students only) */}
          {form.role === "student" && (
            <>
              <label style={labelStyle}>Matric Number</label>
              <input
                style={inputStyle}
                type="text"
                name="matricNumber"
                placeholder="Enter matric number"
                value={form.matricNumber}
                onChange={handleChange}
                required
              />
            </>
          )}

          {/* Password */}
          <label style={labelStyle}>Password</label>
          <input
            style={inputStyle}
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* Submit Button */}
          <button style={buttonStyle} type="submit">
            Register User
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Register;
