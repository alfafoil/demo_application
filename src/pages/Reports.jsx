import {
  FileBarChart,
  TrendingUp,
  TrendingDown,
  Download,
  CalendarDays,
} from "lucide-react";

const monthlySummary = [
  { month: "January",  sales: "$12,400", orders: 142, growth: "+5.2%",  trend: "up"   },
  { month: "February", sales: "$9,800",  orders: 118, growth: "-3.8%",  trend: "down" },
  { month: "March",    sales: "$15,600", orders: 189, growth: "+22.4%", trend: "up"   },
  { month: "April",    sales: "$18,200", orders: 215, growth: "+16.7%", trend: "up"   },
  { month: "May",      sales: "$14,100", orders: 171, growth: "-11.3%", trend: "down" },
  { month: "June",     sales: "$21,300", orders: 253, growth: "+33.9%", trend: "up"   },
];

const topProducts = [
  { rank: 1, product: "Premium Plan",      revenue: "$18,500", units: 74,  share: "38%" },
  { rank: 2, product: "Starter Pack",      revenue: "$11,200", units: 156, share: "23%" },
  { rank: 3, product: "Enterprise Suite",  revenue: "$9,800",  units: 22,  share: "20%" },
  { rank: 4, product: "Add-on Bundle",     revenue: "$5,400",  units: 98,  share: "11%" },
  { rank: 5, product: "Consulting",        revenue: "$3,700",  units: 14,  share: "8%"  },
];

export default function Reports() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Reports</h1>
          <p className="text-slate-500 mt-1 text-sm">Sales analytics and performance breakdown.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                           bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold
                           shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30
                           hover:-translate-y-0.5 transition-all duration-300 w-fit">
          <Download className="w-4 h-4" />
          Export PDF
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {[
          { label: "Total Revenue (H1)",   value: "$91,400", sub: "Jan – Jun 2024",   icon: FileBarChart, color: "from-indigo-500 to-blue-500"  },
          { label: "Best Month",           value: "June",    sub: "$21,300 in sales", icon: CalendarDays, color: "from-emerald-500 to-teal-500" },
          { label: "Avg. Monthly Growth",  value: "+10.5%",  sub: "Over 6 months",   icon: TrendingUp,   color: "from-amber-500 to-orange-500" },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="group bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm
                         hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.color}
                               flex items-center justify-center shadow-md mb-4
                               group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <p className="text-sm text-slate-500 font-medium">{card.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{card.value}</p>
              <p className="text-xs text-slate-400 mt-1">{card.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Monthly Summary Table */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">Monthly Summary</h2>
            <p className="text-xs text-slate-500 mt-0.5">H1 2024 performance</p>
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
                {monthlySummary.map((row) => (
                  <tr key={row.month} className="hover:bg-slate-50/60 transition-colors duration-150">
                    <td className="px-6 py-3.5 text-sm font-medium text-slate-900">{row.month}</td>
                    <td className="px-4 py-3.5 text-sm text-slate-700 text-right">{row.sales}</td>
                    <td className="px-4 py-3.5 text-sm text-slate-700 text-right">{row.orders}</td>
                    <td className="px-6 py-3.5 text-right">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full
                                        ${row.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                        {row.trend === "up"
                          ? <TrendingUp  className="w-3 h-3" />
                          : <TrendingDown className="w-3 h-3" />}
                        {row.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products Table */}
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
                {topProducts.map((row) => (
                  <tr key={row.rank} className="hover:bg-slate-50/60 transition-colors duration-150">
                    <td className="px-6 py-3.5">
                      <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold
                                       flex items-center justify-center">
                        {row.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-sm font-medium text-slate-900">{row.product}</td>
                    <td className="px-4 py-3.5 text-sm text-slate-700 text-right">{row.revenue}</td>
                    <td className="px-6 py-3.5 text-right">
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                        {row.share}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
