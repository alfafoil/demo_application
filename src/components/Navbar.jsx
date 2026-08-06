// ============================================================
// Navbar.jsx
// The top navigation bar for the Sales Application.
// Shows different navigation links based on the user's role:
//   - "user" (salesman): sees Home, Dashboard, Make Order
//   - "admin": sees Home, Dashboard, Reports
//   - Not logged in: only sees Login
// Also shows the logged-in user's name and a Logout button.
// ============================================================

import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, ShoppingCart, FileText, Home, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

// ------------------------------------------------------------
// Navbar Component
// Renders the top navigation bar with role-filtered links.
// No props needed — uses AuthContext for user data.
// ------------------------------------------------------------
export default function Navbar() {
  const { user, logout } = useAuth();  // Get current user and logout function
  const navigate = useNavigate();

  // State to control mobile menu open/close
  const [mobileOpen, setMobileOpen] = useState(false);

  // ------------------------------------------------------------
  // handleLogout()
  // Clears the user session from context and localStorage,
  // then redirects to the login page.
  // ------------------------------------------------------------
  const handleLogout = () => {
    logout();           // Clear user from AuthContext + localStorage
    navigate("/login"); // Redirect to login page
  };

  // ---- Role-based Navigation Links ----
  // Define which nav links are shown based on user role.
  // Each link has: to (route), label (display text), icon (lucide icon)
  const getNavLinks = () => {
    // Base links visible to ALL logged-in users
    const base = [
      { to: "/",          label: "Home",      icon: Home },
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ];

    // "Make Order" is ONLY visible for regular users (salesmen)
    if (user?.role === "user") {
      base.push({ to: "/make-order", label: "Make Order", icon: ShoppingCart });
    }

    // "Reports" is ONLY visible for admin users
    if (user?.role === "admin") {
      base.push({ to: "/reports", label: "Reports", icon: FileText });
    }

    return base;
  };

  // Get the appropriate nav links for the current user
  const navLinks = user ? getNavLinks() : [];

  // CSS class generator for NavLink — applies active style when on that route
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
    ${isActive
      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
      : "text-slate-400 hover:text-white hover:bg-white/5"
    }`;

  // ============================================================
  // JSX — Rendered UI
  // ============================================================
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* ---- Brand / Logo ---- */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">SalesApp</span>
          </div>

          {/* ---- Desktop Navigation Links ---- */}
          {/* Hidden on mobile, shown on medium screens and above */}
          {user && (
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to} className={linkClass} end={to === "/"}>
                  <Icon className="w-4 h-4" />
                  {label}
                </NavLink>
              ))}
            </div>
          )}

          {/* ---- Right Side: User Info + Logout ---- */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* User info pill — shows name and role badge */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white text-sm font-medium">{user.name}</span>
                  {/* Role badge — different color for admin vs user */}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold
                    ${user.role === "admin"
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    }`}>
                    {user.role}
                  </span>
                </div>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 border border-transparent rounded-lg text-sm transition-all duration-200"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block">Logout</span>
                </button>

                {/* Mobile hamburger menu toggle button */}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="md:hidden text-slate-400 hover:text-white transition-colors"
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </>
            ) : (
              /* Show Sign In link when no user is logged in */
              <NavLink
                to="/login"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-all"
              >
                Sign In
              </NavLink>
            )}
          </div>
        </div>

        {/* ---- Mobile Menu (Dropdown) ---- */}
        {/* Only shown on small screens when hamburger is clicked */}
        {mobileOpen && user && (
          <div className="md:hidden pb-4 space-y-1 border-t border-white/10 pt-3">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={linkClass}
                end={to === "/"}
                onClick={() => setMobileOpen(false)} // Close menu when a link is clicked
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
