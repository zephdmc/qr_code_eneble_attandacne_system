// src/utils/auth.js

// export const isLoggedIn = () => {
//     return localStorage.getItem("token") !== null;
//   };
  
//   export const getToken = () => localStorage.getItem("token");
  
//   export const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/login";
// };
  


// src/utils/auth.js

export const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };
  
  export const getToken = () => {
    return localStorage.getItem("token");
  };
  
  export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };
  
  export const logout = () => {
    localStorage.clear();
    window.location.replace("/login");
  };
  