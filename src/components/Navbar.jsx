import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  TrendingUp,
  LayoutDashboard,
  FileBarChart,
  Home as HomeIcon,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
} from "lucide-react";

const navLinks = [
  { to: "/",          label: "Home",      icon: HomeIcon        },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/reports",   label: "Reports",   icon: FileBarChart    },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/25"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/20"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm shadow-slate-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600
                            flex items-center justify-center shadow-md shadow-indigo-500/30">
              <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-base font-bold text-slate-900 tracking-tight hidden sm:block">
              SalesManager
            </span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={linkClass}
              >
                <Icon className="w-4 h-4" strokeWidth={2} />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-2">
            <button className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button className="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-600 rounded-full" />
            </button>
            <div className="w-px h-5 bg-slate-200 mx-1" />
            <NavLink
              to="/login"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium
                         text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={mobileLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                <Icon className="w-4 h-4" strokeWidth={2} />
                {label}
              </NavLink>
            ))}
            <div className="h-px bg-slate-100 my-1" />
            <NavLink
              to="/login"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                         text-rose-600 hover:bg-rose-50 transition-all duration-200"
              onClick={() => setMobileOpen(false)}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
