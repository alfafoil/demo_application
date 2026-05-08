import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  User,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  UserCircle2,
  ArrowRight,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate auth — replace with real API call
    setTimeout(() => {
      setSubmitting(false);
      navigate("/");
    }, 900);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40
                    flex items-center justify-center px-4 py-10 relative overflow-hidden">

      <div className="absolute top-0 -left-20 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl pointer-events-none animate-pulse"
           style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]
                      bg-gradient-to-r from-indigo-200/20 to-blue-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600
                          flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <TrendingUp className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-none">SalesManager</h2>
            <p className="text-xs text-slate-500 mt-1">Sales analytics platform</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/60
                        shadow-xl shadow-indigo-500/5 p-7 sm:p-9">

          <div className="mb-7">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
            <p className="text-slate-500 mt-1.5 text-sm">Sign in to continue to your dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label htmlFor="userId"
                     className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                User ID
              </label>
              <div className="relative group">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400
                                  group-focus-within:text-indigo-600 transition-colors" />
                <input
                  id="userId" type="text" required
                  value={userId} onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter your user ID"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200
                             text-sm text-slate-900 placeholder:text-slate-400
                             focus:outline-none focus:ring-2 focus:ring-indigo-500/30
                             focus:border-indigo-500 focus:bg-white transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password"
                       className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <button type="button"
                        className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400
                                  group-focus-within:text-indigo-600 transition-colors" />
                <input
                  id="password" type={showPassword ? "text" : "password"} required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-50 border border-slate-200
                             text-sm text-slate-900 placeholder:text-slate-400
                             focus:outline-none focus:ring-2 focus:ring-indigo-500/30
                             focus:border-indigo-500 focus:bg-white transition-all duration-200"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md
                                   text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
                Login as
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "user",  label: "User",  sub: "Standard access", Icon: UserCircle2 },
                  { value: "admin", label: "Admin", sub: "Full control",     Icon: ShieldCheck },
                ].map(({ value, label, sub, Icon }) => (
                  <label key={value}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border-2
                                cursor-pointer transition-all duration-200
                                ${userType === value
                                  ? "border-indigo-500 bg-indigo-50/60 shadow-sm shadow-indigo-500/10"
                                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"}`}>
                    <input type="radio" name="userType" value={value}
                           checked={userType === value} onChange={(e) => setUserType(e.target.value)}
                           className="sr-only" />
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors
                                     ${userType === value
                                       ? "bg-gradient-to-br from-indigo-600 to-blue-600 text-white"
                                       : "bg-slate-100 text-slate-500"}`}>
                      <Icon className="w-5 h-5" strokeWidth={2.2} />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold leading-tight
                                     ${userType === value ? "text-indigo-900" : "text-slate-700"}`}>
                        {label}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>
                    </div>
                    {userType === value && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-600" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" disabled={submitting}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3
                         rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white
                         text-sm font-semibold shadow-md shadow-indigo-500/25
                         hover:shadow-lg hover:shadow-indigo-500/40 hover:-translate-y-0.5
                         active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed
                         disabled:hover:translate-y-0 transition-all duration-300">
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>Sign in <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

          </form>

          <p className="text-center text-xs text-slate-500 mt-6">
            Don't have an account?{" "}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              Contact your admin
            </a>
          </p>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-6">
          © {new Date().getFullYear()} SalesManager. All rights reserved.
        </p>

      </div>
    </div>
  );
}
