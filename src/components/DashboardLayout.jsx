// // src/components/DashboardLayout.jsx
// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// const DashboardLayout = ({ children }) => {
//   const { user, logoutUser } = useContext(AuthContext);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   const transition = "all 0.3s ease";

//   const links = [
//     { title: "Dashboard", path: "/dashboard", roles: ["admin", "lecturer", "student"] },
//     { title: "Manage Users", path: "/users", roles: ["admin"] },
//     { title: "Manage Courses", path: "/courses", roles: ["admin"] },
//     { title: "Lecture Sessions", path: "/sessions", roles: ["admin", "lecturer"] },
//       { title: "Scan Attendance", path: "/AttendanceScan", roles: ["student", "admin"] },
//       { title: "View Attendance", path: "/AttendancePage", roles: ["student"] },
//       { title: "View Attendance", path: "/LecturerAttendancePage", roles: ["lecturer"] },

//   ];

//   useEffect(() => {
//     const checkScreen = () => {
//       if (window.innerWidth < 700) {
//         setIsMobile(true);
//         setSidebarOpen(false);
//       } else {
//         setIsMobile(false);
//         setSidebarOpen(false);
//       }
//     };

//     checkScreen();
//     window.addEventListener("resize", checkScreen);

//     return () => window.removeEventListener("resize", checkScreen);
//   }, []);

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//       }}
//     >
//       {/* Overlay */}
//       {sidebarOpen && (
//         <div
//           onClick={() => setSidebarOpen(false)}
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//               height: "100%",
//             background: "rgba(0,0,0,0.4)",
//             zIndex: 900,
//           }}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         style={{
//           width: "220px",
//           background:"linear-gradient(120deg,#2c2f5a,#1a1f38)",
//           color: "#fff",
//           display: "flex",
//           flexDirection: "column",
//           padding: "20px",
//           position: "fixed",
//           top: 0,
//           left: 0,
//           height: "100vh",
//           zIndex: 1000,
//           transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
//           transition,
//         }}
//       >
//         {/* Sidebar Header */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "24px",
//           }}
//         >
//           <h2 style={{ fontSize: "1.4rem", margin: 0 }}>Menu</h2>

//           {/* Close button (mobile) */}
//           {isMobile && (
//             <button
//               onClick={() => setSidebarOpen(false)}
//               style={{
//                 background: "none",
//                 border: "none",
//                 color: "#fff",
//                 fontSize: "22px",
//                 cursor: "pointer",
//               }}
//             >
//               ✕
//             </button>
//           )}
//         </div>

//         {/* Links */}
//         <nav
//           style={{
//             display: "flex",
            
//             flexDirection: "column",
//             gap: "12px",
//           }}
//         >
//           {links
//             .filter((l) => l.roles.includes(user?.role))
//             .map((l) => (
//               <Link
//                 key={l.title}
//                 to={l.path}
//                 onClick={() => setSidebarOpen(false)}
//                 style={{
//                   padding: "12px 16px",
//                   borderRadius: "8px",
//                   textDecoration: "none",
//                   color: "#fff",
//                   fontWeight: 500,
//                   transition,
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.background =
//                     "rgba(255,255,255,0.1)")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.background = "transparent")
//                 }
//               >
//                 {l.title}
//               </Link>
//             ))}
//         </nav>
//       </aside>

//       {/* Navbar */}
//       <header
//         style={{
//           width: "100%",
//           background:"linear-gradient(120deg,#2c2f5a,#1a1f38)",
//           color: "#fff",
//           padding: "16px 24px",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//           position: "sticky",
//           top: 0,
//           zIndex: 800,
//         }}
//       >
//         {/* Left */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "16px",
//           }}
//         >
//           {/* Hamburger */}
//           <button
//             onClick={() => setSidebarOpen(true)}
//             style={{
//               fontSize: "22px",
//               background: "none",
//               border: "none",
//               color: "#fff",
//               cursor: "pointer",
//             }}
//           >
//             ☰
//           </button>

//           <h1 style={{ fontSize: "0.9rem", margin: 0 }}>
//             QR Attendance System
//           </h1>
//         </div>

//         {/* Right */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "12px",
//           }}
//         >
//           <p style={{ margin: 0, fontWeight: 600, fontSize: 8 }}>
//             {user?.fullname}
//             <span style={{ opacity: 0.8 }}> ({user?.role})</span>
//           </p>

//           <button
//             onClick={logoutUser}
//             style={{
//               background: "#5a67ff",
//               padding: "8px 16px",
//               borderRadius: "8px",
//               border: "none",
//               color: "#fff",
//               cursor: "pointer",
//                 fontWeight: 600,
//               fontSize: "8px"
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main
//         style={{
//           padding: "25px",
//           minHeight: "100vh",
//           background: "#f5f6fa",
//           width: "100%",
//         }}
//       >
//         {children}
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const { user, logoutUser } = useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const transition = "all 0.3s ease";

  const links = [
    { title: "Dashboard", path: "/dashboard", roles: ["admin", "lecturer", "student"] },
    { title: "Manage Users", path: "/users", roles: ["admin"] },
    { title: "Manage Courses", path: "/courses", roles: ["admin"] },
    { title: "Lecture Sessions", path: "/sessions", roles: ["admin", "lecturer"] },
    { title: "Scan Attendance", path: "/AttendanceScan", roles: ["student", "admin"] },
    { title: "View Attendance", path: "/AttendancePage", roles: ["student"] },
    { title: "View Attendance", path: "/LecturerAttendancePage", roles: ["lecturer"] },
  ];

  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setSidebarOpen(false);
      } else {
        setIsMobile(false);
        setSidebarOpen(true); // always open on desktop/tablet
      }
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: "linear-gradient(120deg,#2c2f5a,#1a1f38)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          position: isMobile ? "fixed" : "relative",
          top: 0,
          left: sidebarOpen ? 0 : isMobile ? "-100%" : 0,
          height: "100vh",
          zIndex: 1000,
                  transition,
          fontSize: '14px'
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1.4rem", margin: 0 }}>Menu</h2>
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", color: "#fff", fontSize: "22px", cursor: "pointer" }}>
              ✕
            </button>
          )}
        </div>

        <nav style={{ display: "flex",width: "full", flexDirection: "column", gap: "12px" }}>
          {links.filter(l => l.roles.includes(user?.role)).map(l => (
            <Link
              key={l.title}
              to={l.path}
              onClick={() => isMobile && setSidebarOpen(false)}
              style={{ padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#fff", fontWeight: 500, transition }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              {l.title}
            </Link>
          ))}
              </nav>
              <div style={{  alignItems: "center", gap: "12px", background: "gray", padding: 4, borderRadius: "8px" }}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 12,  marginLeft: "8px" }}>
              {user?.fullname} 
                  </p>
                  <p style={{ opacity: 0.8, margin: 0, fontSize: 10, marginLeft: "8px" }}>({user?.role})</p>
                  <div>
            <button onClick={logoutUser} style={{ background: "#5a67ff", padding: "8px 16px", marginTop: "6px", borderRadius: "8px", border: "none", color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: "12px" }}>
              Logout
                      </button>
                      </div>
          </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", zIndex: 900 }} />
      )}

      {/* Main Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Navbar */}
        <header
                  style={{
                    left: 0,  
                    //   width: "70vw",
                      width: isMobile ? "90vw" : "70vw",

                      background: "linear-gradient(120deg,#2c2f5a,#1a1f38)",
            color: "#fff",
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            position: "sticky",
            top: 0,
            zIndex: 800,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {isMobile && (
              <button onClick={() => setSidebarOpen(true)} style={{ fontSize: "22px", background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
                ☰
              </button>
            )}
            <h1 style={{ fontSize: "1rem", margin: 0 }}>QR-Code Enabled Attendance System</h1>
          </div>

         
        </header>

        {/* Main Content */}
        <main style={{ padding: "25px", minHeight: "100vh", background: "#f5f6fa", transition,  marginLeft: !isMobile ? "8px" : "0", }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
