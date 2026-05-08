import { Link } from "react-router-dom";
import {
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Send,
} from "lucide-react";
import { useState } from "react";

const footerLinks = {
  getToKnowUs: [
    { label: "About Us",   to: "/about"     },
    { label: "Dashboard",  to: "/dashboard" },
    { label: "Reports",    to: "/reports"   },
    { label: "Contact Us", to: "/contact"   },
  ],
  features: [
    { label: "Sales Analytics",      to: "/dashboard" },
    { label: "Performance Reports",  to: "/reports"   },
    { label: "Team Management",      to: "/dashboard" },
    { label: "Revenue Tracking",     to: "/dashboard" },
    { label: "Export & Insights",    to: "/reports"   },
  ],
  usefulLinks: [
    { label: "FAQs",            to: "/faqs"           },
    { label: "Privacy Policy",  to: "/privacy-policy" },
    { label: "Terms of Use",    to: "/terms"          },
    { label: "Career",          to: "/career"         },
    { label: "Blog",            to: "/blog"           },
  ],
};

const socials = [
  {
    label: "Facebook", href: "#",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  },
  {
    label: "Twitter / X", href: "#",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    label: "LinkedIn", href: "#",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    label: "Instagram", href: "#",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  },
];

const stats = [
  { value: "10,000+", label: "Active Users"       },
  { value: "5M+",     label: "Reports Generated"  },
  { value: "50+",     label: "Years Combined Experience" },
  { value: "100%",    label: "Data Security"      },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
    alert("Subscribed successfully!");
  };

  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">

      {/* Stats bar */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label} className="group">
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400
                               bg-clip-text text-transparent group-hover:from-indigo-300 group-hover:to-blue-300
                               transition-all duration-300">
                  {s.value}
                </p>
                <p className="text-xs text-slate-500 mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600
                              flex items-center justify-center shadow-md shadow-indigo-500/30">
                <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">SalesManager</span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
              SalesManager by <span className="text-slate-200 font-medium">Eminent Trade and Export Pvt. Ltd.</span> is
              a leading sales analytics platform helping wholesalers, distributors, and retailers
              across India track performance, generate reports, and grow their business with
              reliable, real-time data.
            </p>

            {/* Contact */}
            <div className="space-y-3 mb-6">
              <a href="tel:+919201958140"
                 className="flex items-start gap-3 text-sm text-slate-400 hover:text-indigo-400 transition-colors group">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-indigo-500 group-hover:scale-110 transition-transform" />
                +91 92019 58140
              </a>
              <a href="mailto:crm@alfafoil.in"
                 className="flex items-start gap-3 text-sm text-slate-400 hover:text-indigo-400 transition-colors group">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-indigo-500 group-hover:scale-110 transition-transform" />
                crm@alfafoil.in
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-indigo-500" />
                Ring Rd Number 2, Sarora, Gondwara Basti,<br />
                Raipur, Chhattisgarh – 492003
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(({ svg, label, href }) => (
                <a key={label} href={href} aria-label={label}
                   className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center
                              text-slate-400 hover:text-white hover:bg-gradient-to-br
                              hover:from-indigo-600 hover:to-blue-600 transition-all duration-300">
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Get To Know Us */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Get To Know Us
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.getToKnowUs.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}
                        className="group flex items-center gap-2 text-sm text-slate-400
                                   hover:text-indigo-400 transition-colors duration-200">
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100
                                           group-hover:translate-x-0 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Features
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.features.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}
                        className="group flex items-center gap-2 text-sm text-slate-400
                                   hover:text-indigo-400 transition-colors duration-200">
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100
                                           group-hover:translate-x-0 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links + Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Useful Links
            </h3>
            <ul className="space-y-2.5 mb-7">
              {footerLinks.usefulLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}
                        className="group flex items-center gap-2 text-sm text-slate-400
                                   hover:text-indigo-400 transition-colors duration-200">
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100
                                           group-hover:translate-x-0 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                Newsletter
              </h3>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Join our mailing list to receive the latest updates and promotions.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700
                             text-sm text-slate-200 placeholder:text-slate-600
                             focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                             focus:border-indigo-500 transition-all duration-200"
                />
                <button type="submit"
                        className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600
                                   text-white hover:shadow-lg hover:shadow-indigo-500/30
                                   hover:-translate-y-0.5 transition-all duration-300 shrink-0">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5
                        flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600 text-center sm:text-left">
            © {new Date().getFullYear()} SalesManager · Eminent Trade and Export Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((label) => (
              <Link key={label} to="#"
                    className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
