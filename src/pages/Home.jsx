import { Link } from "react-router-dom";
import {
  TrendingUp,
  LayoutDashboard,
  FileBarChart,
  ArrowRight,
  Users,
  DollarSign,
  ShoppingCart,
  Award,
} from "lucide-react";

const stats = [
  { label: "Total Revenue",  value: "$91,400", change: "+12.5%", up: true,  icon: DollarSign,   color: "from-indigo-500 to-blue-500"   },
  { label: "Active Users",   value: "3,284",   change: "+8.2%",  up: true,  icon: Users,        color: "from-emerald-500 to-teal-500"  },
  { label: "Total Orders",   value: "1,184",   change: "+3.1%",  up: true,  icon: ShoppingCart, color: "from-amber-500 to-orange-500"  },
  { label: "Top Product",    value: "Pro Plan", change: "38% share", up: true, icon: Award,     color: "from-violet-500 to-purple-500" },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                        bg-indigo-50 border border-indigo-100 text-indigo-700
                        text-xs font-semibold mb-5">
          <TrendingUp className="w-3.5 h-3.5" />
          Sales Overview · Q2 2024
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            SalesManager
          </span>
        </h1>
        <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Track performance, generate reports, and grow your business faster with
          real-time analytics.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-7">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                       bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold
                       shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/35
                       hover:-translate-y-0.5 transition-all duration-300"
          >
            <LayoutDashboard className="w-4 h-4" />
            Go to Dashboard
          </Link>
          <Link
            to="/reports"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                       bg-white text-slate-700 text-sm font-semibold border border-slate-200
                       shadow-sm hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5
                       transition-all duration-300"
          >
            <FileBarChart className="w-4 h-4" />
            View Reports
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="group bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm
                         hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color}
                               flex items-center justify-center shadow-md mb-4
                               group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-5 h-5 text-white" strokeWidth={2.2} />
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{s.value}</p>
              <p className={`text-xs font-medium mt-1 ${s.up ? "text-emerald-600" : "text-rose-500"}`}>
                {s.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <Link
          to="/dashboard"
          className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200/60
                     shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600
                          flex items-center justify-center shadow-md
                          group-hover:scale-110 transition-transform duration-300 shrink-0">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-slate-900 text-sm">Dashboard</p>
            <p className="text-xs text-slate-500 mt-0.5">View all key metrics</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600
                                  group-hover:translate-x-1 transition-all duration-300" />
        </Link>

        <Link
          to="/reports"
          className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200/60
                     shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500
                          flex items-center justify-center shadow-md
                          group-hover:scale-110 transition-transform duration-300 shrink-0">
            <FileBarChart className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-slate-900 text-sm">Reports</p>
            <p className="text-xs text-slate-500 mt-0.5">Sales analytics &amp; trends</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600
                                  group-hover:translate-x-1 transition-all duration-300" />
        </Link>
      </div>
    </div>
  );
}
