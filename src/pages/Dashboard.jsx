// ============================================================
// Dashboard.jsx
// This is the main Dashboard page route (/dashboard).
// It does NOT render its own content — instead it acts as a
// ROUTER that checks the user's role and renders the correct
// sub-dashboard component:
//   - role === "user"  → renders <UserDashboard />
//   - role === "admin" → renders <AdminDashboard />
//   - Not logged in    → redirects to /login
// ============================================================

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

// ------------------------------------------------------------
// Dashboard Component
// Acts as the smart container / router for role-based dashboards.
// No props needed — reads user role from AuthContext.
// ------------------------------------------------------------
export default function Dashboard() {
  // Get the currently logged-in user from global context
  const { user } = useAuth();

  // If no user is logged in, redirect immediately to the login page
  // This prevents unauthorized access to the dashboard
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ---- Role-based Rendering ----
  // Check the user's role and render the matching dashboard component.
  // Both dashboards are displayed within the same page layout (Navbar, etc.)
  if (user.role === "admin") {
    // Admin users see company-wide stats and management tools
    return <AdminDashboard />;
  }

  // Default: "user" role (salesman) sees their personal orders and stats
  return <UserDashboard />;
}
