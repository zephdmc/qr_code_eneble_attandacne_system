// src/components/Sidebar.jsx

import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  const linkStyle = {
    padding: "10px 14px",
    borderRadius: "6px",
    backgroundColor: "rgba(255,255,255,0.08)",
    color: "#fff",
    textDecoration: "none",
    transition: "all 0.2s ease-in-out",
    fontWeight: 500,
    display: "block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const linkHover = (e) => {
    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.18)";
  };

  const linkLeave = (e) => {
    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
  };

  const sidebarStyle = {
    width: collapsed ? "60px" : "220px",
    backgroundColor: "#2c3e50",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
    minHeight: "100vh",
    flexShrink: 0,
  };

  const toggleButtonStyle = {
    marginBottom: "20px",
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.3s ease",
  };

  return (
    <aside style={sidebarStyle}>
      {/* Toggle Collapse */}
      <button
        style={toggleButtonStyle}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "»" : "«"}
      </button>

      {/* Sidebar Title */}
      {!collapsed && (
        <h2
          style={{
            fontSize: "1.4rem",
            fontWeight: "700",
            marginBottom: "24px",
          }}
        >
          Menu
        </h2>
      )}

      {/* Navigation Links */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Link
          to="/dashboard"
          style={linkStyle}
          onMouseEnter={linkHover}
          onMouseLeave={linkLeave}
        >
          Dashboard
        </Link>

        {user?.role === "admin" && (
          <>
            <Link
              to="/users"
              style={linkStyle}
              onMouseEnter={linkHover}
              onMouseLeave={linkLeave}
            >
              Manage Users
            </Link>
            <Link
              to="/courses"
              style={linkStyle}
              onMouseEnter={linkHover}
              onMouseLeave={linkLeave}
            >
              Manage Courses
            </Link>
          </>
        )}

        {user?.role === "lecturer" && (
          <>
            <Link
              to="/courses"
              style={linkStyle}
              onMouseEnter={linkHover}
              onMouseLeave={linkLeave}
            >
              Courses
            </Link>
            <Link
              to="/sessions"
              style={linkStyle}
              onMouseEnter={linkHover}
              onMouseLeave={linkLeave}
            >
              Sessions
            </Link>
          </>
        )}

        {user?.role === "student" && (
          <Link
            to="/attendance-scan"
            style={linkStyle}
            onMouseEnter={linkHover}
            onMouseLeave={linkLeave}
          >
            Scan Attendance
          </Link>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
