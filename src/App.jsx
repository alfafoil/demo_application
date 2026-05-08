import { useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Reports from "./pages/Reports"

export default function App() {
  const [page, setPage] = useState("home")

  return (
    <div className="min-h-screen">
      <Navbar page={page} setPage={setPage} />
      {page === "home"      && <Home setPage={setPage} />}
      {page === "dashboard" && <Dashboard />}
      {page === "reports"   && <Reports />}
    </div>
  )
}