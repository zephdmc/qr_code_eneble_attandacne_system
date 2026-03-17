
// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { FaQrcode } from "react-icons/fa";

// const Login = () => {
//   const { loginUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await loginUser(form.email, form.password);

//     if (res?.token) navigate("/Dashboard");
//     else alert("Invalid login credentials");
//   };

//   return (
//     <>
//       <style>{`

//       *{
//         box-sizing:border-box;
//         margin:0;
//         padding:0;
//         font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
//       }

//       body{
//         margin:0;
//       }

//       .login-page{
//         display:flex;
//         min-height:100vh;
//         background:linear-gradient(120deg,#2c2f5a,#1a1f38);
//       }

//       .login-intro{
//         flex:1;
//         color:white;
//         padding:60px;
//         display:flex;
//         flex-direction:column;
//         justify-content:center;
//       }

//       .intro-icon{
//         font-size:70px;
//         margin-bottom:20px;
//         color:#7aa6ff;
//       }

//       .login-intro h1{
//         font-size:42px;
//         margin-bottom:15px;
//       }

//       .login-intro p{
//         font-size:18px;
//         color:#d0d0d0;
//         margin-bottom:30px;
//         max-width:500px;
//       }

//       .features{
//         list-style:none;
//         padding:0;
//       }

//       .features li{
//         margin-bottom:12px;
//         font-size:16px;
//         color:#e0e0e0;
//       }

//       .login-container{
//         flex:1;
//         display:flex;
//         justify-content:center;
//         align-items:center;
//         padding:40px;
//       }

//       .login-card{
//         background:white;
//         padding:40px;
//         width:100%;
//         max-width:420px;
//         border-radius:10px;
//         box-shadow:0 10px 30px rgba(0,0,0,0.2);
//         text-align:center;
//       }

//       .login-logo{
//         font-size:50px;
//         color:#5a67ff;
//         margin-bottom:10px;
//       }

//       .login-card h2{
//         margin-bottom:5px;
//       }

//       .subtitle{
//         color:#777;
//         margin-bottom:30px;
//       }

//       form{
//         display:flex;
//         flex-direction:column;
//       }

//       label{
//         text-align:left;
//         font-size:14px;
//         margin-bottom:5px;
//         margin-top:15px;
//       }

//       input{
//         padding:12px;
//         border-radius:6px;
//         border:1px solid #ccc;
//         font-size:15px;
//       }

//       input:focus{
//         outline:none;
//         border-color:#5a67ff;
//       }

//       button{
//         margin-top:25px;
//         padding:14px;
//         border:none;
//         border-radius:6px;
//         background:#5a67ff;
//         color:white;
//         font-size:16px;
//         cursor:pointer;
//         transition:0.3s;
//       }

//       button:hover{
//         background:#434fd9;
//       }

//       .login-footer{
//         margin-top:25px;
//         font-size:13px;
//         color:#888;
//       }

//       @media (max-width:900px){

//         .login-page{
//           flex-direction:column;
//         }

//         .login-intro{
//           text-align:center;
//           padding:40px 20px;
//         }

//         .login-container{
//           padding:20px;
//         }

//       }

//       `}</style>

//       <div className="login-page">

//         {/* Intro Section */}
//         <div className="login-intro">

//           <FaQrcode className="intro-icon" />

//           <h1>QR Attendance System</h1>

//           <p>
//             A smart and secure platform that allows lecturers to generate
//             QR codes for sessions while students scan to record attendance
//             instantly. Fast, reliable and easy to manage.
//           </p>

//           <ul className="features">
//             <li>✔ QR Code Attendance</li>
//             <li>✔ Real-time Lecturer Dashboard</li>
//             <li>✔ Secure Session Verification</li>
//             <li>✔ Automatic Attendance Reports</li>
//           </ul>

//         </div>

//         {/* Login Section */}
//         <div className="login-container">

//           <div className="login-card">

//             <FaQrcode className="login-logo" />

//             <h2  style={{ fontWeight: "bold", color: "#333" }}>Welcome Back</h2>

//             <p className="subtitle">Login to access your dashboard</p>

//             <form onSubmit={handleSubmit}>

//               <label>Email Address</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//               />

//               <label>Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter your password"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//               />

//               <button type="submit">Login</button>

//             </form>

//             <div className="login-footer">
//               QR Attendance System © 2026
//             </div>

//           </div>

//         </div>

//       </div>
//     </>
//   );
// };

// export default Login;
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaQrcode } from "react-icons/fa";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form.email, form.password);
    if (res?.token) navigate("/Dashboard");
    else alert("Invalid login credentials");
  };

  return (
    <>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; width:"100vw", font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; }
        body { margin:0; }

        .login-page { display:flex;   width:"100vw", min-height:100vh; background: linear-gradient(135deg,#2c2f5a,#1a1f38); }
        .login-intro, .login-container { flex:1; display:flex; flex-direction:column; justify-content:center; padding:40px; }

        .login-intro { color:white; gap:20px; }
        .intro-icon { font-size:80px; color:#7aa6ff; margin-bottom:20px; }
        .login-intro h1 { font-size:36px; font-weight:700; margin-bottom:15px; }
        .login-intro p { font-size:18px; color:#d0d0d0; margin-bottom:25px; max-width:500px; }
        .project-info { background: rgba(255,255,255,0.1); border-radius:12px; padding:20px; }
        .project-info h3 { color:#fff; margin-bottom:8px; }
        .project-info p { color:#e0e0e0; margin-bottom:6px; font-size:15px; }

        .login-container { justify-content:center; align-items:center; }
        .login-card { background:white; padding:40px; width:100%; max-width:420px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.25); text-align:center; }
        .login-logo { font-size:50px; color:#5a67ff; margin-bottom:10px; }
        .login-card h2 { margin-bottom:5px; font-weight:bold; color:#333; }
        .subtitle { color:#777; margin-bottom:25px; }
        form { display:flex; flex-direction:column; gap:15px; }
        input { padding:12px; border-radius:6px; border:1px solid #ccc; font-size:15px; }
        input:focus { outline:none; border-color:#5a67ff; }
        button { margin-top:15px; padding:14px; border:none; border-radius:6px; background:#5a67ff; color:white; font-size:16px; cursor:pointer; transition:0.3s; }
        button:hover { background:#434fd9; }

        .login-footer { margin-top:20px; font-size:13px; color:#888; }

        @media (max-width:900px){
          .login-page { flex-direction:column; }
          .login-intro, .login-container { padding:20px; text-align:center; }
        }
      `}</style>

      <div className="login-page">
        {/* Intro / Project Info Section */}
        <div className="login-intro">
          <FaQrcode className="intro-icon" />
          <h1>QR-Code Enabled Attendance System</h1>
          <p>
            Smart and secure platform for tracking academic attendance via QR codes. Lecturers generate sessions; students scan and record attendance instantly.
          </p>

          <div className="project-info">
            <h3>Project Title:</h3>
            <p>Development of a QR-Code Enabled Attendance and Information Management System for Academic Institutions</p>

            <h3>Author:</h3>
            <p>Ezeji Zephrinus</p>

            <h3>Institution:</h3>
            <p>National Open University of Nigeria</p>

            <h3>Program:</h3>
            <p>PGD in Computing</p>

            <h3>Department:</h3>
            <p>Information Management Technology</p>

            <h3>Supervisor:</h3>
            <p>Dr. Akindele</p>
          </div>
        </div>

        {/* Login Section */}
        <div className="login-container">
          <div className="login-card">
            <FaQrcode className="login-logo" />
            <h2>Welcome Back</h2>
            <p className="subtitle">Login to access your dashboard</p>

            <form onSubmit={handleSubmit}>
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
              <button type="submit">Login</button>
            </form>

            <div className="login-footer">QR Attendance System © 2026</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
