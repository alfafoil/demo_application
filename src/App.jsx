import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <Routes>
        {/* Login — no Navbar/Footer */}
        <Route path="/login" element={<Login />} />

        {/* All other pages — with Navbar + Footer */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/"          element={<Home />}      />
                  <Route path="/home"      element={<Home />}      />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/reports"   element={<Reports />}   />
                  <Route path="/about"     element={<AboutUs />}   />
                  <Route path="*"          element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}
