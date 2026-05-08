import { FileBarChart, TrendingUp, TrendingDown, Download, CalendarDays } from "lucide-react"

const monthly = [
  { month: "January",  sales: "$12,400", orders: 142, growth: "+5.2%",  up: true  },
  { month: "February", sales: "$9,800",  orders: 118, growth: "-3.8%",  up: false },
  { month: "March",    sales: "$15,600", orders: 189, growth: "+22.4%", up: true  },
  { month: "April",    sales: "$18,200", orders: 215, growth: "+16.7%", up: true  },
  { month: "May",      sales: "$14,100", orders: 171, growth: "-11.3%", up: false },
  { month: "June",     sales: "$21,300", orders: 253, growth: "+33.9%", up: true  },
]

const products = [
  { rank: 1, name: "Premium Plan",      revenue: "$18,500", share: "38%" },
  { rank: 2, name: "Starter Pack",      revenue: "$11,200", share: "23%" },
  { rank: 3, name: "Enterprise Suite",  revenue: "$9,800",  share: "20%" },
  { rank: 4, name: "Add-on Bundle",     revenue: "$5,400",  share: "11%" },
  { rank: 5, name: "Consulting",        revenue: "$3,700",  share: "8%"  },
]

const cards = [
  { label: "Total Revenue (H1)",  value: "$91,400", sub: "Jan – Jun 2024",   Icon: FileBarChart, color: "from-indigo-500 to-blue-500"  },
  { label: "Best Month",          value: "June",    sub: "$21,300 in sales", Icon: CalendarDays, color: "from-emerald-500 to-teal-500" },
  { label: "Avg. Monthly Growth", value: "+10.5%",  sub: "Over 6 months",   Icon: TrendingUp,   color: "from-amber-500 to-orange-500" },
]

export default function Reports() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Reports</h1>
            <p className="text-slate-500 mt-1 text-sm">Sales analytics and performance breakdown.</p>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold shadow-md hover:-translate-y-0.5 transition-all duration-300 w-fit">
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {cards.map(({ label, value, sub, Icon, color }) => (
            <div key={label} className="group bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <p className="text-sm text-slate-500 font-medium">{label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
              <p className="text-xs text-slate-400 mt-1">{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-900">Monthly Sales</h2>
              <p className="text-xs text-slate-500 mt-0.5">First half of 2024</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Month</th>
                    <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Sales</th>
                    <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Orders</th>
                    <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {monthly.map((r) => (
                    <tr key={r.month} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-3.5 text-sm font-medium text-slate-900">{r.month}</td>
                      <td className="px-4 py-3.5 text-sm text-slate-700 text-right">{r.sales}</td>
                      <td className="px-4 py-3.5 text-sm text-slate-500 text-right">{r.orders}</td>
                      <td className="px-6 py-3.5 text-right">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${r.up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                          {r.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {r.growth}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-900">Top Products</h2>
              <p className="text-xs text-slate-500 mt-0.5">By revenue contribution</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">#</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Product</th>
                    <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Revenue</th>
                    <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((r) => (
                    <tr key={r.rank} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-3.5">
                        <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center justify-center">{r.rank}</span>
                      </td>
                      <td className="px-4 py-3.5 text-sm font-medium text-slate-900">{r.name}</td>
                      <td className="px-4 py-3.5 text-sm text-slate-700 text-right">{r.revenue}</td>
                      <td className="px-6 py-3.5 text-right">
                        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">{r.share}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}