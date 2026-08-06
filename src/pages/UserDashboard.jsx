// ============================================================
// UserDashboard.jsx
// Dashboard for role="user" (salesman).
// Fetches real orders via GET ?action=getAll&salesman_id=xxx
// Matches App.js fetchOrders() logic exactly.
// Shows orders table with Edit / Delete / View PDF actions.
// ============================================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, Search, Eye, Pencil, Trash2, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
//import { getOrders } from "../api/api";

export default function UserDashboard() {
  const { user }   = useAuth();
  const navigate   = useNavigate();

  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");

  // ------------------------------------------------------------
  // fetchOrders — mirrors App.js fetchOrders() exactly
  // GET ?action=getAll&salesman_id=xxx
  // ------------------------------------------------------------
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders(user.salesman_id);
      setOrders(data || []);
    } catch (err) {
      console.error("fetchOrders error:", err);
      toast.error("Failed to load orders: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, [user?.salesman_id]);

  // ------------------------------------------------------------
  // handleDelete — mirrors App.js handleDelete()
  // POST ?action=delete  body: { _rowIndex }
  // ------------------------------------------------------------
  const handleDelete = async (order) => {
    if (!window.confirm(`Delete order "${order["Order ID"]}" for "${order["Customer Name"]}"?`)) return;
    try {
      await deleteOrder(order._rowIndex);
      toast.success("✅ Deleted successfully!");
      setTimeout(() => fetchOrders(), 800);
    } catch (err) {
      toast.error("❌ Delete failed: " + err.message);
    }
  };

  // Filter orders by search text (same as App.js filtered logic)
  const filtered = orders.filter((o) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return Object.values(o).some(
      (v) => v !== null && v !== undefined && String(v).toLowerCase().includes(q)
    );
  });

  // Summary stats
  const stats = [
    { label: "Total Orders",   value: orders.length },
    { label: "This Month",     value: orders.filter((o) => o["Date"]?.startsWith(new Date().toISOString().slice(0, 7))).length },
    { label: "With PDF",       value: orders.filter((o) => o["PDF Link"] || o["pdfLink"]).length },
  ];

  return (
    <div className="space-y-6">

      {/* Welcome header */}
      <div className="bg-gradient-to-r from-indigo-600/20 to-blue-600/20 border border-indigo-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Welcome, {user?.name} 👋</h2>
            <p className="text-slate-400 mt-1">
              Salesman ID: <span className="text-indigo-300 font-medium">{user?.salesman_id}</span>
            </p>
          </div>
          <button onClick={() => navigate("/make-order")}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/20">
            <Plus className="w-4 h-4" /> New Order
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ label, value }) => (
          <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-slate-400 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-white/10 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-indigo-400" />
            <h3 className="text-white font-semibold text-lg">My Orders</h3>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 bg-white/5 border border-slate-600 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all" />
            </div>
            {/* Refresh */}
            <button onClick={fetchOrders}
              className="p-2 text-slate-400 hover:text-white border border-slate-600 hover:border-slate-400 rounded-xl transition-all">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            {search ? "No orders match your search." : "No orders yet. Create your first order!"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-slate-400 text-xs uppercase">
                  <th className="text-left px-5 py-3">Order ID</th>
                  <th className="text-left px-5 py-3">Date</th>
                  <th className="text-left px-5 py-3">Customer</th>
                  <th className="text-left px-5 py-3">Phone</th>
                  <th className="text-left px-5 py-3">CN</th>
                  <th className="text-left px-5 py-3">PDF</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3 text-indigo-300 font-medium">{order["Order ID"]}</td>
                    <td className="px-5 py-3 text-slate-300">{order["Date"]}</td>
                    <td className="px-5 py-3 text-white">{order["Customer Name"]}</td>
                    <td className="px-5 py-3 text-slate-300">{order["Customer Phone"] || "—"}</td>
                    <td className="px-5 py-3">
                      {order["CN Applicable"] ? (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {order["CN Applicable"]}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-5 py-3">
                      {(order["PDF Link"] || order["pdfLink"]) ? (
                        <a href={order["PDF Link"] || order["pdfLink"]} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors text-xs">
                          <Eye className="w-3.5 h-3.5" /> View
                        </a>
                      ) : <span className="text-slate-600 text-xs">—</span>}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => navigate("/make-order", { state: { editOrder: order } })}
                          className="text-slate-400 hover:text-indigo-400 transition-colors" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(order)}
                          className="text-slate-400 hover:text-red-400 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
