import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
} from "lucide-react";

const kpis = [
  { label: "Total Revenue",  value: "$48,295", change: "+12.5%", up: true,  icon: DollarSign,   color: "from-indigo-500 to-blue-500"   },
  { label: "Total Orders",   value: "1,184",   change: "+8.2%",  up: true,  icon: ShoppingCart, color: "from-emerald-500 to-teal-500"  },
  { label: "Active Customers", value: "3,284", change: "-2.4%",  up: false, icon: Users,        color: "from-amber-500 to-orange-500"  },
  { label: "Growth Rate",    value: "23.6%",   change: "+4.1%",  up: true,  icon: TrendingUp,   color: "from-violet-500 to-purple-500" },
];

const recentSales = [
  { id: "#4521", customer: "Riya Sharma",   product: "Pro Plan",     amount: "$240",  status: "Completed" },
  { id: "#4520", customer: "Arjun Patel",   product: "Starter Pack", amount: "$79",   status: "Pending"   },
  { id: "#4519", customer: "Sneha Mehta",   product: "Enterprise",   amount: "$990",  status: "Completed" },
  { id: "#4518", customer: "Vikram Singh",  product: "Pro Plan",     amount: "$240",  status: "Failed"    },
  { id: "#4517", customer: "Priya Nair",    product: "Add-on Bundle",amount: "$49",   status: "Completed" },
  { id: "#4516", customer: "Rohit Gupta",   product: "Starter Pack", amount: "$79",   status: "Pending"   },
];

const statusStyles = {
  Completed: "bg-emerald-50 text-emerald-700",
  Pending:   "bg-amber-50  text-amber-700",
  Failed:    "bg-rose-50   text-rose-600",
};

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 mt-1 text-sm">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                           bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold
                           shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30
                           hover:-translate-y-0.5 transition-all duration-300 w-fit">
          <TrendingUp className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="group bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm
                         hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${k.color}
                                  flex items-center justify-center shadow-md
                                  group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 text-white" strokeWidth={2.2} />
                </div>
                <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{k.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{k.value}</p>
              <div className={`inline-flex items-center gap-1 text-xs font-semibold mt-2 px-2 py-0.5 rounded-full
                               ${k.up ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600"}`}>
                {k.up
                  ? <TrendingUp  className="w-3 h-3" />
                  : <TrendingDown className="w-3 h-3" />}
                {k.change} vs last month
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Sales Table */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Recent Sales</h2>
            <p className="text-xs text-slate-500 mt-0.5">Latest transactions across all products</p>
          </div>
          <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
            View all
          </button>
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Order</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Customer</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Product</th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Amount</th>
                <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-slate-50/60 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm font-mono font-semibold text-indigo-600">{sale.id}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500
                                      flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {sale.customer.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-slate-900">{sale.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">{sale.product}</td>
                  <td className="px-4 py-4 text-sm font-bold text-slate-900 text-right">{sale.amount}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[sale.status]}`}>
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden divide-y divide-slate-100">
          {recentSales.map((sale) => (
            <div key={sale.id} className="px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500
                              flex items-center justify-center text-white text-xs font-bold shrink-0">
                {sale.customer.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{sale.customer}</p>
                <p className="text-xs text-slate-500 mt-0.5">{sale.product} · {sale.id}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-slate-900">{sale.amount}</p>
                <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${statusStyles[sale.status]}`}>
                  {sale.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
