import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // get user info

  const cardStyle = {
    backgroundColor: "#fff",
    padding: "25px 20px",
    textAlign: "center",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "600",
    fontSize: "0.9rem",
    minHeight: "120px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  // Cards configuration
  const cards = [
    {
      title: "Attendance Scan",
      description: "Scan QR to mark attendance",
      route: "/AttendanceScan",
      roles: ["student"],
    },
    {
      title: "View Attendance",
      description: "View your attendance records",
      route: "/AttendancePage",
      roles: ["student"],
      },
      {
        title: "View Attendance",
        description: "View your attendance records",
        route: "/LecturerAttendancePage",
        roles: ["lecturer"],
      },
    {
      title: "Register User",
      description: "Add new students or lecturers",
      route: "/Register",
      roles: ["admin"],
    },
    {
      title: "Lecture Sessions",
      description: "Manage lecture attendance sessions",
      route: "/sessions",
      roles: ["lecturer", "admin"],
    },
    {
      title: "Users",
      description: "View and manage system users",
      route: "/Users",
      roles: ["admin"],
    },
    {
      title: "Courses",
      description: "Create and manage courses",
      route: "/courses",
      roles: ["admin"],
    },
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "0.8rem", marginBottom: "10px", color: "#333" }}>
          Welcome, {user.fullname}!
        </h1>
        <p style={{ fontSize: "0.7rem", color: "#555" }}>
          QR Attendance Management Dashboard
        </p>
      </div>

      {/* Dashboard Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {cards
          .filter((c) => c.roles.includes(user.role)) // filter cards based on role
          .map((c, index) => (
            <div
              key={index}
              style={cardStyle}
              onClick={() => navigate(c.route)}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-4px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <h3 style={{ color:"#1a1f38", marginBottom: "8px" }}>
                {c.title}
              </h3>
              <p style={{ fontSize: "0.6rem", color: "#555" }}>{c.description}</p>
            </div>
          ))}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
