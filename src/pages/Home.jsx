import { TrendingUp, LayoutDashboard, FileBarChart, ArrowRight } from "lucide-react"

export default function Home({ setPage }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 flex flex-col items-center justify-center px-4 py-16">

      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-indigo-500/30 mb-8">
        <TrendingUp className="w-10 h-10 text-white" strokeWidth={2.5} />
      </div>

      <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight text-center">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">SalesPro</span>
      </h1>

      <p className="mt-5 text-lg text-slate-500 max-w-xl text-center">
        Your all-in-one sales management platform. Track performance, generate reports, and grow faster.
      </p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">

        <button
          onClick={() => setPage("dashboard")}
          className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-900 text-sm">Dashboard</p>
            <p className="text-xs text-slate-500 mt-0.5">View all key metrics</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-300" />
        </button>

        <button
          onClick={() => setPage("reports")}
          className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
            <FileBarChart className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-900 text-sm">Reports</p>
            <p className="text-xs text-slate-500 mt-0.5">Sales analytics & trends</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all duration-300" />
        </button>

      </div>
    </div>
  )
}