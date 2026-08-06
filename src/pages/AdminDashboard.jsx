// ============================================================
// AdminDashboard.jsx
// This is the dashboard shown to users with role = "admin".
// It displays company-wide analytics and management tools:
//   - Total sales, active customers, total orders, top salesmen stats
//   - Sales performance table across all salesmen
//   - Quick link to the Reports page
// This component is rendered INSIDE Dashboard.jsx when role === "admin"
// ============================================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart2, Users, ShoppingBag, IndianRupee, FileText, TrendingUp, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// ------------------------------------------------------------
// AdminDashboard Component
// Displays company-wide statistics and salesman performance table.
// No props needed — admin user data comes from AuthContext.
// ------------------------------------------------------------
export default function AdminDashboard() {
  // Get the logged-in admin user from global context
  const { user } = useAuth();

  // Navigate hook for redirecting to Reports page
  const navigate = useNavigate();

  // State to store salesman performance data
  const [salesData, setSalesData] = useState([]);

  // Company-wide summary stats for the top stat cards
  const stats = [
    {
      label: "Total Revenue",
      value: "₹48.2L",
      change: "+14%",
      positive: true,
      icon: IndianRupee,
      color: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Active Customers",
      value: "124",
      change: "+6",
      positive: true,
      icon: Users,
      color: "from-blue-500 to-indigo-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Total Orders",
      value: "892",
      change: "+23%",
      positive: true,
      icon: ShoppingBag,
      color: "from-purple-500 to-pink-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Pending Approvals",
      value: "7",
      change: "-2",
      positive: false,
      icon: AlertCircle,
      color: "from-amber-500 to-orange-500",
      bg: "bg-amber-500/10",
    },
  ];

  // Dummy salesman performance data for the table
  // In production, replace this with: const data = await getSalesmanStats();
  const dummySalesData = [
    { name: "Deepak Agarwal", id: "SM4350", orders: 48, revenue: "₹8.2L",  customers: 12, target: 85 },
    { name: "Ravi Malhotra",  id: "SM2100", orders: 36, revenue: "₹6.1L",  customers: 9,  target: 72 },
    { name: "Sneha Patil",    id: "SM7982", orders: 52, revenue: "₹9.8L",  customers: 14, target: 93 },
    { name: "Vikram Desai",   id: "SM4944", orders: 29, revenue: "₹4.4L",  customers: 8,  target: 61 },
    { name: "Rekha Pandey",   id: "SM7610", orders: 41, revenue: "₹7.3L",  customers: 11, target: 78 },
  ];

  // ------------------------------------------------------------
  // useEffect — Load salesman performance data on component mount
  // Populates the table with dummy data for now.
  // TODO: Replace dummy data with actual API call:
  //   const data = await getSalesmanPerformance();
  //   setSalesData(data);
  // ------------------------------------------------------------
  useEffect(() => {
    setSalesData(dummySalesData);
  }, []); // Runs once on mount

  // Returns a CSS color class for the progress bar based on target percentage
  const getTargetColor = (percent) => {
    if (percent >= 85) return "bg-emerald-500"; // High performer — green
    if (percent >= 65) return "bg-amber-500";   // Mid performer — yellow
    return "bg-red-500";                         // Low performer — red
  };

  // ============================================================
  // JSX — Rendered UI
  // ============================================================
  return (
    <div className="space-y-6">

      {/* ---- Admin Welcome Header ---- */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Admin Panel — {user?.name || "Administrator"} 🛡️
            </h2>
            <p className="text-slate-400 mt-1">Company-wide overview and management</p>
          </div>

          {/* Quick navigation button to Reports page */}
          <button
            onClick={() => navigate("/reports")}
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/20"
          >
            <FileText className="w-4 h-4" />
            View Reports
          </button>
        </div>
      </div>

      {/* ---- Company-Wide Stats Cards ---- */}
      {/* Grid of 4 summary cards for key business metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, change, positive, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-all"
          >
            {/* Icon */}
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className="w-5 h-5 text-white/70" />
            </div>
            {/* Value */}
            <p className="text-2xl font-bold text-white">{value}</p>
            {/* Label + change indicator */}
            <div className="flex items-center justify-between mt-1">
              <p className="text-slate-400 text-sm">{label}</p>
              {/* Change badge — green for positive, red for negative */}
              <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                positive ? "text-emerald-300 bg-emerald-500/10" : "text-red-300 bg-red-500/10"
              }`}>
                {change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ---- Salesman Performance Table ---- */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {/* Table section header */}
        <div className="flex items-center gap-3 p-5 border-b border-white/10">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <h3 className="text-white font-semibold text-lg">Salesman Performance</h3>
          <span className="ml-auto text-slate-400 text-sm">May 2026</span>
        </div>

        {/* Scrollable table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Column headers */}
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-slate-400 text-xs font-medium uppercase px-5 py-3">Salesman</th>
                <th className="text-left text-slate-400 text-xs font-medium uppercase px-5 py-3">SM ID</th>
                <th className="text-left text-slate-400 text-xs font-medium uppercase px-5 py-3">Orders</th>
                <th className="text-left text-slate-400 text-xs font-medium uppercase px-5 py-3">Revenue</th>
                <th className="text-left text-slate-400 text-xs font-medium uppercase px-5 py-3">Customers</th>
                <th className="text-left text-slate-400 text-xs font-medium uppercase px-5 py-3">Target %</th>
              </tr>
            </thead>

            {/* Table rows — one row per salesman */}
            <tbody>
              {salesData.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-5 py-4 text-white font-medium text-sm">{row.name}</td>
                  <td className="px-5 py-4 text-purple-300 text-sm">{row.id}</td>
                  <td className="px-5 py-4 text-white text-sm">{row.orders}</td>
                  <td className="px-5 py-4 text-emerald-300 font-medium text-sm">{row.revenue}</td>
                  <td className="px-5 py-4 text-white text-sm">{row.customers}</td>
                  <td className="px-5 py-4 w-40">
                    {/* Progress bar showing target achievement percentage */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden">
                        {/* Bar width is set dynamically from the target value */}
                        <div
                          className={`h-full rounded-full transition-all ${getTargetColor(row.target)}`}
                          style={{ width: `${row.target}%` }}
                        />
                      </div>
                      <span className="text-slate-400 text-xs w-8">{row.target}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
