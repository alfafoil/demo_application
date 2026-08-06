// ============================================================
// App.jsx
// The root component of the React application.
// Responsibilities:
//   1. Wraps the entire app in AuthProvider (global auth state)
//   2. Defines all Routes for the app (NO <Router> here)
//   3. Implements ProtectedRoute to block unauthorized access
//   4. Shows toast notifications via ToastContainer
//
// IMPORTANT: <BrowserRouter> lives in main.jsx — NOT here.
// Having two <Router> components causes the error:
//   "You cannot render a <Router> inside another <Router>"
// ============================================================

// Router is already provided in main.jsx — only import routing hooks here
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Page imports
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MakeOrder from "./pages/MakeOrder";
import Reports from "./pages/Reports";
import AboutUs from "./pages/AboutUs";

// ------------------------------------------------------------
// ProtectedRoute Component
// A wrapper that checks if the user is logged in before
// rendering a page. If not logged in, it redirects to /login.
// Optionally, it also checks if the user has the required role.
//
// Props:
//   children   — the page/component to protect
//   roles      — (optional) array of allowed roles, e.g. ["admin"]
//                If provided, users with other roles are redirected.
// ------------------------------------------------------------
function ProtectedRoute({ children, roles }) {
  const { user } = useAuth(); // Get current user from context

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If specific roles are required, check if user's role is in the allowed list
  // e.g., roles=["admin"] blocks regular users from accessing admin-only pages
  if (roles && !roles.includes(user.role)) {
    // User is logged in but doesn't have the required role
    // Redirect back to dashboard instead of login
    return <Navigate to="/dashboard" replace />;
  }

  // User is authenticated and has the correct role — render the page
  return children;
}

// ------------------------------------------------------------
// AppLayout Component
// Wraps every page with the Navbar at the top and Footer at the bottom.
// The main content area has padding and a dark background.
// ------------------------------------------------------------
function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Navigation bar — always visible at the top */}
      <Navbar />

      {/* Main content area — grows to fill available space */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>

      {/* Footer — always at the bottom */}
      <Footer />
    </div>
  );
}

// ------------------------------------------------------------
// App Component
// The top-level component that sets up the AuthProvider and Router.
// All routes are defined here with their access rules.
// ------------------------------------------------------------
export default function App() {
  return (
    // AuthProvider wraps everything so all components can access auth state.
    // <BrowserRouter> is in main.jsx — we only need <Routes> here.
    <AuthProvider>
        <Routes>

          {/* ---- Public Routes ---- */}
          {/* Login page — no auth required, redirects to dashboard if already logged in */}
          <Route
            path="/login"
            element={
              <RedirectIfLoggedIn>
                <Login />
              </RedirectIfLoggedIn>
            }
          />

          {/* ---- Protected Routes (requires login) ---- */}

          {/* Home page — any logged-in user can access */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout><Home /></AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Dashboard — any logged-in user; internally shows User or Admin dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout><Dashboard /></AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Make Order — ONLY accessible to role="user" (salesmen) */}
          <Route
            path="/make-order"
            element={
              <ProtectedRoute roles={["user"]}>
                <AppLayout><MakeOrder /></AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Reports — ONLY accessible to role="admin" */}
          <Route
            path="/reports"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AppLayout><Reports /></AppLayout>
              </ProtectedRoute>
            }
          />

          {/* About Us — any logged-in user can access */}
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <AppLayout><AboutUs /></AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Catch-all: redirect any unknown URL to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      {/* ToastContainer — renders toast notifications (success/error messages) */}
      {/* Positioned at top-right, auto-dismisses after 3 seconds */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        theme="dark"
      />
    </AuthProvider>
  );
}

// ------------------------------------------------------------
// RedirectIfLoggedIn Component
// Wraps the Login page — if user is already logged in and tries
// to visit /login, redirect them to dashboard instead.
// Props:
//   children — the Login page component
// ------------------------------------------------------------
function RedirectIfLoggedIn({ children }) {
  const { user } = useAuth();

  // If already logged in, no need to show login page — go to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
