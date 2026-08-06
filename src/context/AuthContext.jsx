// ============================================================
// AuthContext.jsx
// Global auth state — stores logged-in user across all pages.
// Mirrors localStorage logic from working App.js:
//   localStorage.setItem("salesman_user", JSON.stringify(data.user))
//   localStorage.removeItem("salesman_user")
// Key name kept identical: "salesman_user"
// ============================================================

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// ------------------------------------------------------------
// AuthProvider
// Wrap the entire app with this so every component can call useAuth().
// On first load, restores user from localStorage (same as App.js useEffect).
// ------------------------------------------------------------
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Restore session from localStorage on page refresh
    // Key "salesman_user" matches the working App.js exactly
    const saved = localStorage.getItem("salesman_user");
    return saved ? JSON.parse(saved) : null;
  });

  // ------------------------------------------------------------
  // login(userData)
  // Save user to state + localStorage after successful login.
  // ------------------------------------------------------------
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("salesman_user", JSON.stringify(userData));
  };

  // ------------------------------------------------------------
  // logout()
  // Clear user from state + localStorage (matches App.js handleLogout).
  // ------------------------------------------------------------
  const logout = () => {
    setUser(null);
    localStorage.removeItem("salesman_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// useAuth — shortcut hook, use in any component
export function useAuth() {
  return useContext(AuthContext);
}
