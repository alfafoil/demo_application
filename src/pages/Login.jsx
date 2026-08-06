// ============================================================
// Login.jsx
// NO server verification — login works instantly based on the
// role card the user selects.
//
// HOW IT WORKS:
//   1. User selects "Salesman" or "Admin" role card
//   2. User enters any email + password (not verified)
//   3. On click LOGIN:
//        - role = "user"  → saved to context → redirect to /dashboard
//                           → Dashboard renders UserDashboard
//        - role = "admin" → saved to context → redirect to /dashboard
//                           → Dashboard renders AdminDashboard
//   4. No API call is made at all during login
//   5. salesman_id is left null (fetched later from sheet if needed)
// ============================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserCircle2, ShieldCheck, Eye, EyeOff, LogIn, Package } from "lucide-react";
import { toast } from "react-toastify";

export default function Login() {
  const [email,        setEmail]        = useState("");
  const [password,     setPassword]     = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("user"); // "user" or "admin"

  const { login }  = useAuth();
  const navigate   = useNavigate();

  // Role card options shown on the form
  const roleOptions = [
    {
      value: "user",
      label: "Salesman",
      sub:   "Place & manage orders",
      Icon:  UserCircle2,
      color: "from-indigo-600 to-blue-600",
      activeBorder: "border-indigo-500 bg-indigo-500/15",
      dot: "bg-indigo-500",
    },
    {
      value: "admin",
      label: "Admin",
      sub:   "Full access & reports",
      Icon:  ShieldCheck,
      color: "from-purple-600 to-pink-600",
      activeBorder: "border-purple-500 bg-purple-500/15",
      dot: "bg-purple-500",
    },
  ];

  // ------------------------------------------------------------
  // handleLogin
  // No server call — directly builds a user object from the
  // entered name/email and selected role, saves to context,
  // then redirects. Dashboard.jsx routes to the correct page.
  // ------------------------------------------------------------
  const handleLogin = () => {
    // Basic field validation
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    if (!password.trim()) {
      toast.error("Please enter your password.");
      return;
    }

    // Build user object — role drives everything downstream
    // name is derived from the email (before the @ symbol) for display
    const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    const userData = {
      email:       email.trim(),
      name,
      role:        selectedRole,          // "user" or "admin" — set by card selection
      salesman_id: selectedRole === "user" ? "SM0000" : null, // placeholder, can be updated
    };

    // Save to AuthContext + localStorage (key: "salesman_user")
    login(userData);

    // Show welcome toast
    toast.success(
      selectedRole === "admin"
        ? `Welcome Admin, ${name}! 🛡️`
        : `Welcome, ${name}! 👋`
    );

    // Redirect to /dashboard — Dashboard.jsx will render
    // UserDashboard  if role === "user"
    // AdminDashboard if role === "admin"
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Card */}
        <div className="bg-slate-800/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/40 p-8">

          {/* Logo + Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/30">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Sales Portal</h1>
            <p className="text-slate-400 text-sm mt-1">Select your role and sign in</p>
          </div>

          <div className="space-y-6">

            {/* ---- Role Selection ---- */}
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
                I am logging in as
              </p>
              <div className="grid grid-cols-2 gap-3">
                {roleOptions.map(({ value, label, sub, Icon, color, activeBorder, dot }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSelectedRole(value)}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 text-center
                      ${selectedRole === value
                        ? activeBorder
                        : "border-slate-700 bg-white/3 hover:border-slate-500 hover:bg-white/5"
                      }`}
                  >
                    {/* Icon circle */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all
                      ${selectedRole === value
                        ? `bg-gradient-to-br ${color} shadow-lg`
                        : "bg-slate-700"
                      }`}>
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>

                    {/* Label */}
                    <div>
                      <p className={`text-sm font-bold ${selectedRole === value ? "text-white" : "text-slate-400"}`}>
                        {label}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>
                    </div>

                    {/* Selected indicator dot */}
                    {selectedRole === value && (
                      <span className={`absolute top-2.5 right-2.5 w-2 h-2 rounded-full ${dot}`} />
                    )}
                  </button>
                ))}
              </div>

              {/* Role badge shown below cards */}
              <div className={`mt-3 text-center py-2 rounded-xl text-xs font-semibold transition-all
                ${selectedRole === "admin"
                  ? "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                  : "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                }`}>
                {selectedRole === "admin"
                  ? "🛡️  Admin — Full access to reports and all data"
                  : "👤  Salesman — Create orders and view your customers"}
              </div>
            </div>

            {/* ---- Email ---- */}
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="your@email.com"
                autoComplete="email"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
              />
            </div>

            {/* ---- Password ---- */}
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-12 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* ---- Login Button ---- */}
            <button
              onClick={handleLogin}
              className={`w-full py-3.5 font-bold text-white rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2
                ${selectedRole === "admin"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-purple-500/20"
                  : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-indigo-500/20"
                }`}
            >
              <LogIn className="w-4 h-4" />
              {selectedRole === "admin" ? "Login as Admin" : "Login as Salesman"}
            </button>

          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-slate-600 text-xs mt-4">
          Role determines what you can access after login
        </p>
      </div>
    </div>
  );
}
