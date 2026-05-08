import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    label: "Total Revenue",
    value: "$48,250",
    change: "+12.5%",
    up: true,
    Icon: DollarSign,
    color: "from-emerald-500 to-teal-500",
  },
  {
    label: "New Customers",
    value: "1,234",
    change: "+8.2%",
    up: true,
    Icon: Users,
    color: "from-indigo-500 to-blue-500",
  },
  {
    label: "Total Orders",
    value: "856",
    change: "-3.1%",
    up: false,
    Icon: ShoppingCart,
    color: "from-amber-500 to-orange-500",
  },
  {
    label: "Growth Rate",
    value: "32.4%",
    change: "+4.3%",
    up: true,
    Icon: TrendingUp,
    color: "from-pink-500 to-rose-500",
  },
];

const sales = [
  {
    name: "Priya Sharma",
    email: "priya@example.com",
    amount: "$1,200",
    status: "Completed",
  },
  {
    name: "Rahul Verma",
    email: "rahul@example.com",
    amount: "$840",
    status: "Pending",
  },
  {
    name: "Anjali Singh",
    email: "anjali@example.com",
    amount: "$3,500",
    status: "Completed",
  },
  {
    name: "Mohit Gupta",
    email: "mohit@example.com",
    amount: "$560",
    status: "Failed",
  },
  {
    name: "Sneha Patel",
    email: "sneha@example.com",
    amount: "$2,100",
    status: "Completed",
  },
];

const badge = {
  Completed: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Failed: "bg-rose-50 text-rose-700",
};

export default function Dashboard() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map(({ label, value, change, up, Icon, color }) => (
            <div
              key={label}
              className="group bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <span
                  className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}
                >
                  {up ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {change}
                </span>
              </div>
              <p className="text-sm text-slate-500 font-medium">{label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Recent Sales
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Latest 5 transactions
              </p>
            </div>
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full cursor-pointer hover:bg-indigo-100 transition-colors">
              View all
            </span>
          </div>

          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  {["Customer", "Email", "Amount", "Status"].map((h) => (
                    <th
                      key={h}
                      className={`text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3 ${h === "Amount" ? "text-right" : h === "Status" ? "text-center" : "text-left"}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sales.map((s, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {s.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {s.email}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900 text-right">
                      {s.amount}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${badge[s.status]}`}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden divide-y divide-slate-100">
            {sales.map((s, i) => (
              <div
                key={i}
                className="px-5 py-4 flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {s.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{s.email}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-slate-900">{s.amount}</p>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${badge[s.status]}`}
                  >
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
