// src/components/Navbar.jsx

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ sidebarWidth = 220 }) => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: sidebarWidth, // Shift right to make space for sidebar
        right: 0,
        height: "60px",
        backgroundColor: "#4b7bec",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        zIndex: 900,
        transition: "left 0.3s ease-in-out",
        boxSizing: "border-box",
      }}
    >
      {/* Title / Logo */}
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
        QR Attendance System3
      </h1>

      {/* User info and logout */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {user && (
          <p style={{ margin: 0, fontWeight: 600, opacity: 0.9 }}>
            {user.fullname}{" "}
            <span style={{ fontWeight: 400, fontSize: "0.9rem", opacity: 0.7 }}>
              ({user.role})
            </span>
          </p>
        )}
        <button
          onClick={logoutUser}
          style={{
            backgroundColor: "#e74c3c",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.95rem",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c0392b")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e74c3c")}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
