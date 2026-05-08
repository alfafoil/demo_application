import { useState } from "react";
import { LayoutDashboard, FileBarChart, LogIn, Menu, X, TrendingUp } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Reports", icon: FileBarChart },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* LEFT — Login */}
            <div className="flex items-center">
              <button className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/40 hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="sm:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* CENTER — Menu */}
            <div className="hidden md:flex items-center gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveMenu(item.name)}
                    className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                      isActive
                        ? "text-indigo-700 bg-indigo-50"
                        : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* RIGHT — Logo */}
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 group-hover:scale-105 transition-all duration-300">
                  <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10" />
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-base font-bold text-slate-900 tracking-tight">SalesPro</span>
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Manager</span>
              </div>
            </div>
          </div>

          {/* Mobile Dropdown */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 pb-4" : "max-h-0"}`}>
            <div className="flex flex-col gap-1 pt-2 border-t border-slate-200/60">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveMenu(item.name);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
              <button className="sm:hidden mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold shadow-md shadow-indigo-500/20">
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Demo content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Welcome to <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">SalesPro</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Currently viewing: <span className="font-semibold text-indigo-600">{activeMenu}</span>
          </p>
          <p className="mt-2 text-sm text-slate-500">Resize the window to see the responsive mobile menu.</p>
        </div>
      </div>
    </div>
  );
}