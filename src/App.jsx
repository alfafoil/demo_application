import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Login from "./pages/Login";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <Routes>
        {/* Login page — no Navbar */}
        <Route path="/login" element={<Login />} />

        {/* All other pages — with Navbar */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/"          element={<Home />}      />
                <Route path="/home"      element={<Home />}      />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/reports"   element={<Reports />}   />
                <Route path="*"          element={<Navigate to="/" replace />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </div>
  );
}
