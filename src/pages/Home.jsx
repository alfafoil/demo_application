import { Link } from "react-router-dom";
import {
  TrendingUp,
  LayoutDashboard,
  FileBarChart,
  ArrowUpRight,
  Users,
  DollarSign,
  ShoppingCart,
  Award,
  Sparkles,
  Activity,
  ChevronRight,
  Calendar,
} from "lucide-react";

const stats = [
  {
    label: "Total Revenue",
    value: "$91,400",
    change: "+12.5%",
    period: "vs last quarter",
    up: true,
    icon: DollarSign,
    gradient: "from-indigo-500 to-blue-600",
    glow: "group-hover:shadow-indigo-500/20",
    bgAccent: "bg-indigo-500/10 text-indigo-600",
  },
  {
    label: "Active Users",
    value: "3,284",
    change: "+8.2%",
    period: "vs last quarter",
    up: true,
    icon: Users,
    gradient: "from-emerald-500 to-teal-500",
    glow: "group-hover:shadow-emerald-500/20",
    bgAccent: "bg-emerald-500/10 text-emerald-600",
  },
  {
    label: "Total Orders",
    value: "1,184",
    change: "+3.1%",
    period: "vs last quarter",
    up: true,
    icon: ShoppingCart,
    gradient: "from-amber-500 to-orange-500",
    glow: "group-hover:shadow-amber-500/20",
    bgAccent: "bg-amber-500/10 text-amber-600",
  },
  {
    label: "Top Product",
    value: "Pro Plan",
    change: "38% share",
    period: "of total volume",
    up: true,
    icon: Award,
    gradient: "from-violet-500 to-purple-600",
    glow: "group-hover:shadow-violet-500/20",
    bgAccent: "bg-violet-500/10 text-violet-600",
  },
];

const recentActivity = [
  { id: 1, title: "Enterprise Plan upgraded", time: "2m ago", amount: "+$2,400", status: "Completed" },
  { id: 2, title: "New Pro Plan subscription", time: "18m ago", amount: "+$199", status: "Completed" },
  { id: 3, title: "Q2 Revenue milestone reached", time: "1h ago", amount: "$90k+", status: "Milestone" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-50/50 overflow-hidden">
      {/* Subtle Ambient Background Mesh */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-400/15 blur-3xl" />
        <div className="absolute top-20 right-0 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-violet-400/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm text-slate-700 text-xs font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Live Workspace</span>
            <span className="text-slate-300">|</span>
            <span className="inline-flex items-center gap-1 text-indigo-600">
              <Calendar className="w-3 h-3" /> Q2 2024 Overview
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Scale your revenue with{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              SalesManager
            </span>
          </h1>

          <p className="mt-5 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Monitor real-time pipeline velocity, uncover conversion bottlenecks, and generate executive-ready reports in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
            <Link
              to="/dashboard"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl
                         bg-slate-900 text-white text-sm font-semibold
                         shadow-lg shadow-slate-900/20 hover:bg-indigo-600 hover:shadow-indigo-600/30
                         hover:-translate-y-0.5 transition-all duration-300"
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-300 group-hover:text-white transition-colors" />
              Open Dashboard
              <ChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              to="/reports"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl
                         bg-white/90 backdrop-blur-sm text-slate-700 text-sm font-semibold border border-slate-200/80
                         shadow-sm hover:bg-white hover:border-slate-300 hover:shadow-md
                         hover:-translate-y-0.5 transition-all duration-300"
            >
              <FileBarChart className="w-4 h-4 text-slate-500" />
              Explore Reports
            </Link>
          </div>
        </div>

        {/* Bento KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`group relative bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/70
                            shadow-sm hover:shadow-2xl ${s.glow} hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
              >
                {/* Decorative corner gradient */}
                <div
                  className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${s.gradient} opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-300`}
                />

                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${s.gradient}
                                flex items-center justify-center shadow-md
                                group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                  >
                    <Icon className="w-5 h-5 text-white" strokeWidth={2.2} />
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bgAccent}`}
                  >
                    <TrendingUp className="w-3 h-3" />
                    {s.change}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {s.label}
                </p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
                  {s.value}
                </p>
                <p className="text-xs text-slate-400 mt-2 font-medium">{s.period}</p>
              </div>
            );
          })}
        </div>

        {/* Lower Bento Section: Navigation Cards + Live Pulse */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Quick Navigation Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Link
              to="/dashboard"
              className="group relative flex flex-col justify-between p-6 bg-gradient-to-br from-indigo-600 to-blue-700
                         rounded-3xl text-white shadow-lg shadow-indigo-600/20
                         hover:shadow-2xl hover:shadow-indigo-600/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4 group-hover:scale-110 transition-transform duration-500">
                <LayoutDashboard className="w-36 h-36" />
              </div>

              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <LayoutDashboard className="w-6 h-6 text-white" />
                </div>
                <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-indigo-600 transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold tracking-tight">Executive Dashboard</h3>
                <p className="text-sm text-indigo-100 mt-1 leading-relaxed">
                  Real-time KPIs, revenue breakdowns, and active user cohorts.
                </p>
              </div>
            </Link>

            <Link
              to="/reports"
              className="group relative flex flex-col justify-between p-6 bg-white/90 backdrop-blur-md
                         rounded-3xl border border-slate-200/80 shadow-sm
                         hover:shadow-xl hover:border-cyan-200 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute right-0 bottom-0 text-cyan-500 opacity-[0.05] transform translate-x-4 translate-y-4 group-hover:scale-110 transition-transform duration-500">
                <FileBarChart className="w-36 h-36" />
              </div>

              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-md shadow-cyan-500/20">
                  <FileBarChart className="w-6 h-6 text-white" />
                </div>
                <span className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Analytics & Reports</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  Exportable CSV summaries, forecasting, and conversion funnels.
                </p>
              </div>
            </Link>
          </div>

          {/* Live Activity Feed Card (5 cols) */}
          <div className="lg:col-span-5 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                  <Activity className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Recent Highlights</h3>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600">
                <Sparkles className="w-3.5 h-3.5" /> Live feed
              </span>
            </div>

            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 hover:bg-slate-100/80 transition-colors"
                >
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{item.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.time}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}