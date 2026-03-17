// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // load user on app start
//   useEffect(() => {
//     const u = localStorage.getItem("user");
//     if (u) setUser(JSON.parse(u));
//   }, []);

//   const loginUser = (data) => {
//     setUser(data);
//     localStorage.setItem("user", JSON.stringify(data));
//   };

//   const logoutUser = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// src/context/AuthContext.jsx

import { createContext, useEffect, useState } from "react";
import { loginApi, registerApi } from "../api/authApi";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  // Login function
//   const loginUser = async (email, password) => {
//     const response = await loginApi(email, password);

//     if (response?.token) {
//       setToken(response.token);
//       setUser(response.user);

//       localStorage.setItem("token", response.token);
//       localStorage.setItem("user", JSON.stringify(response.user));
//     }

//     return response;
//   };
const loginUser = async (email, password) => {
    try {
      const response = await loginApi({ email, password });
  
      const data = response.data;
  
      if (data?.token) {
        setToken(data.token);
        setUser(data.user);
  
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
  
      return data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return null;
    }
  };
  
  // Register function
  const registerUser = async (formData) => {
    const response = await registerApi(formData);
    return response;
  };

  // Logout
  const logoutUser = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Auto-load user on refresh
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(savedUser);
      setToken(savedToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;