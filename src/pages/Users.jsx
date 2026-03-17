// import { useEffect, useState } from "react";
// import { getUsersApi } from "../api/userApi";
// import DashboardLayout from "../components/DashboardLayout";

// const Users = () => {
//   const [users, setUsers] = useState([]);

//   const loadUsers = async () => {
//     try {
//       const res = await getUsersApi();

//       // Axios returns { data: [...] } — extract the array
//       const userData = Array.isArray(res) ? res : res?.data;

//       if (Array.isArray(userData)) {
//         setUsers(userData);
//       } else {
//         console.warn("Unexpected response format:", res);
//         setUsers([]);
//       }
//     } catch (error) {
//       console.error("Error loading users:", error);
//       setUsers([]);
//     }
//   };

//   useEffect(() => {
//     loadUsers();
//   }, []);

//     return (
//         <DashboardLayout>
//     <div
//       style={{
//         minHeight: "100vh",
//         padding: "30px 20px",
//         fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//         backgroundColor: "#f5f6fa",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <h2
//         style={{
//           fontSize: "2rem",
//           fontWeight: "700",
//           marginBottom: "20px",
//           color: "#222",
//           textAlign: "center",
//         }}
//       >
//         All Users
//       </h2>

//       {users.length === 0 ? (
//         <p style={{ color: "#555" }}>No users found.</p>
//       ) : (
//         <ul
//           style={{
//             listStyle: "none",
//             padding: 0,
//             width: "100%",
//             maxWidth: "600px",
//           }}
//         >
//           {users.map((u) => (
//             <li
//               key={u._id}
//               style={{
//                 backgroundColor: "#fff",
//                 marginBottom: "12px",
//                 padding: "15px 20px",
//                 borderRadius: "10px",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//                 fontSize: "1rem",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 flexWrap: "wrap",
//               }}
//             >
//               <span style={{ color: "#555" }}>{u.fullname}</span>
//               <span style={{ color: "#555" }}>{u.email}</span>
//               <span
//                 style={{
//                   fontWeight: "600",
//                   color:
//                     u.role === "admin"
//                       ? "#e74c3c"
//                       : u.role === "lecturer"
//                       ? "#2980b9"
//                       : "#2ecc71",
//                 }}
//               >
//                 {u.role}
//               </span>
//             </li>
//           ))}
//         </ul>
//       )}
//             </div>
//             </DashboardLayout>

//   );
// };

// export default Users;
import { useEffect, useState } from "react";
import { getUsersApi, deleteUserApi } from "../api/userApi";
import DashboardLayout from "../components/DashboardLayout";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsersApi();
      const userData = Array.isArray(res?.data) ? res.data : [];
      setUsers(userData);
    } catch (err) {
      console.error("Error loading users:", err);
      setUsers([]);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUserApi(id);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete user");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <DashboardLayout>
      <div
        style={{
          minHeight: "100vh",
          padding: "30px",
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          backgroundColor: "#f5f6fa",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#222",
            textAlign: "center",
          }}
        >
          Users Management
        </h2>

        {loading ? (
          <p style={{ textAlign: "center", color: "#555" }}>Loading users...</p>
        ) : users.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555" }}>No users found.</p>
        ) : (
          <div
            style={{
              overflowX: "auto",
              width: "100%",
              maxWidth: "900px",
              margin: "0 auto",
              borderRadius: "12px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
              backgroundColor: "#fff",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#5a67ff", color: "#fff" }}>
                <tr>
                  <th style={thStyle}>Full Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Role</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={tdStyle}>{u.fullname}</td>
                    <td style={tdStyle}>{u.email}</td>
                    <td style={tdStyle}>
                      <span style={{ ...roleBadgeStyle, ...getRoleStyle(u.role) }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => handleDelete(u._id)}
                        style={deleteBtnStyle}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

// Styles
const thStyle = {
  padding: "12px 16px",
  textAlign: "left",
  fontSize: "0.9rem",
};

const tdStyle = {
  padding: "12px 16px",
  fontSize: "0.85rem",
  color: "#333",
};

const roleBadgeStyle = {
  padding: "4px 10px",
  borderRadius: "12px",
  color: "#fff",
  fontWeight: 600,
  fontSize: "0.75rem",
  display: "inline-block",
};

const getRoleStyle = (role) => {
  switch (role) {
    case "admin":
      return { backgroundColor: "#e74c3c" };
    case "lecturer":
      return { backgroundColor: "#2980b9" };
    case "student":
      return { backgroundColor: "#2ecc71" };
    default:
      return { backgroundColor: "#7f8c8d" };
  }
};

const deleteBtnStyle = {
  padding: "6px 12px",
  backgroundColor: "#ff4d4f",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

export default Users;
