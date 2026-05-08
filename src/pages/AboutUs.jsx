import { Link } from "react-router-dom";
import {
  TrendingUp,
  Shield,
  Truck,
  HeadphonesIcon,
  RefreshCw,
  Award,
  BarChart3,
  Users,
  Target,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Zap,
} from "lucide-react";

const stats = [
  { value: "50+",    label: "Years Combined Expertise" },
  { value: "5M+",    label: "Reports Generated Monthly" },
  { value: "10,000+", label: "Happy Business Partners"  },
  { value: "100%",   label: "Data Security & Compliance" },
];

const productLines = [
  {
    name: "ANALYTICS PRO",
    tagline: "Advanced Sales Intelligence",
    desc: "A comprehensive analytics suite by SalesManager offering deep-dive reporting, trend forecasting, and revenue intelligence for mid-to-large scale businesses.",
    color: "from-indigo-500 to-blue-600",
    icon: BarChart3,
  },
  {
    name: "TRACK360",
    tagline: "Real-Time Order Tracking",
    desc: "A live tracking module by SalesManager designed to monitor every order lifecycle from placement to delivery, helping fulfilment teams stay on top of every shipment.",
    color: "from-emerald-500 to-teal-600",
    icon: Truck,
  },
  {
    name: "TEAMHUB",
    tagline: "Sales Team Management",
    desc: "A team performance module by SalesManager built for sales managers to assign targets, track rep performance, and evaluate KPIs in a unified workspace.",
    color: "from-violet-500 to-purple-600",
    icon: Users,
  },
  {
    name: "REVENIQ",
    tagline: "Revenue & Pricing Insights",
    desc: "A revenue optimisation module by SalesManager that analyses pricing patterns, margin trends, and customer buying behaviour to support smarter business decisions.",
    color: "from-amber-500 to-orange-600",
    icon: TrendingUp,
  },
  {
    name: "COMPLIANCE SHIELD",
    tagline: "Data Security & Audit Trail",
    desc: "A compliance and security module by SalesManager ensuring all business data is protected with role-based access, audit logs, and industry-grade encryption.",
    color: "from-rose-500 to-pink-600",
    icon: Shield,
  },
  {
    name: "REPORTX",
    tagline: "One-Click Report Generation",
    desc: "SalesManager's core reporting engine — the foundation of the platform — that powers instant PDF and Excel exports of any dataset, across all modules.",
    color: "from-cyan-500 to-sky-600",
    icon: Zap,
  },
];

const whyChooseUs = [
  "Unified product lines under SalesManager for end-to-end sales intelligence",
  "ISO-grade data security with strict compliance and audit readiness",
  "Competitive pricing supported by large-scale infrastructure",
  "Consistent platform performance with reliable 99.9% uptime",
  "Customer-focused service with priority support for business accounts",
  "Pan-India deployment with multi-branch and multi-region capability",
];

const commitments = [
  { icon: Truck,           title: "Fast & Reliable Delivery",   desc: "Instant data sync across India, secure cloud infrastructure." },
  { icon: Award,           title: "Direct from Source",         desc: "100% authentic SalesManager platform — no third-party resellers." },
  { icon: RefreshCw,       title: "Hassle-Free Support",        desc: "Easy account resolution within 24 hours, no questions asked." },
  { icon: HeadphonesIcon,  title: "Expert Support Team",        desc: "Call or WhatsApp us for quick help at any time." },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900
                           overflow-hidden py-20 sm:py-28">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                         from-indigo-900/20 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                          bg-indigo-500/10 border border-indigo-500/20 text-indigo-400
                          text-xs font-semibold mb-6">
            <TrendingUp className="w-3.5 h-3.5" />
            About SalesManager
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
            Empowering India's{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
              Sales-Driven
            </span>{" "}
            Businesses
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            SalesManager by <span className="text-slate-200 font-medium">Eminent Trade and Export Pvt. Ltd.</span> is
            a B2B sales analytics platform built for wholesalers, distributors, retailers, and bulk
            buyers across India — delivering consistent performance, transparent reporting, and
            long-term business value.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                             bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold
                             shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/35
                             hover:-translate-y-0.5 transition-all duration-300">
              <BarChart3 className="w-4 h-4" />
              Go to Dashboard
            </Link>
            <Link to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                             bg-white/10 text-white text-sm font-semibold border border-white/10
                             hover:bg-white/15 hover:-translate-y-0.5 transition-all duration-300">
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}
                   className="group p-4 rounded-2xl hover:bg-indigo-50/60 transition-colors duration-200">
                <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600
                               bg-clip-text text-transparent mb-1">
                  {s.value}
                </p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About text */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                            bg-indigo-50 border border-indigo-100 text-indigo-700
                            text-xs font-semibold mb-5">
              Who We Are
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-5">
              About{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                SalesManager
              </span>
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              We are a technology company specialising in high-performance sales management tools
              designed for consistent performance and reliable supply of insights. Our business
              operates purely on a B2B model, working closely with wholesalers, distributors,
              retailers, and bulk buyers across India.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              By focusing on large-scale data infrastructure, strict security controls, and timely
              reporting, we ensure our partners receive dependable analytics at competitive pricing.
              Our goal is to build long-term business relationships by offering customized solutions,
              a steady data supply, and professional support tailored to business needs.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm">
                <MapPin className="w-4 h-4 text-indigo-600" />
                <span className="text-slate-700 font-medium">Raipur, Chhattisgarh</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-medium">ISO Certified</span>
              </div>
            </div>
          </div>

          {/* Commitment cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {commitments.map(({ icon: Icon, title, desc }) => (
              <div key={title}
                   className="group p-5 bg-white rounded-2xl border border-slate-200/60 shadow-sm
                              hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600
                                 flex items-center justify-center shadow-md mb-3
                                 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Lines */}
      <section className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                            bg-indigo-50 border border-indigo-100 text-indigo-700
                            text-xs font-semibold mb-4">
              Our Platform Modules
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Product Lines Under SalesManager
            </h2>
            <p className="text-slate-500 mt-3 text-sm max-w-xl mx-auto">
              We operate multiple specialised modules to serve different business intelligence
              needs across India. Each module is developed under the SalesManager platform to
              ensure consistent quality and category-specific expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {productLines.map(({ name, tagline, desc, color, icon: Icon }) => (
              <div key={name}
                   className="group bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6
                              hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                {/* Top gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${color}`} />

                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color}
                                  flex items-center justify-center shadow-md mb-4
                                  group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 text-white" strokeWidth={2.2} />
                </div>

                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  {name}
                </p>
                <h3 className="text-base font-bold text-slate-900 mb-2">{tagline}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Excellence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                            bg-indigo-50 border border-indigo-100 text-indigo-700
                            text-xs font-semibold mb-5">
              Platform Excellence
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-5">
              Built for Scale,{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Designed for India
              </span>
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Our infrastructure is based in <strong>Raipur, Chhattisgarh</strong> and is equipped
              with the latest cloud technology for both data processing and real-time analytics.
              We maintain strict security and compliance processes to meet industry standards
              required in the sales and distribution sector.
            </p>

            <ul className="space-y-3">
              {[
                "Modern, high-capacity cloud infrastructure",
                "Food-grade certified data handling processes",
                "In-house development and tooling for custom dashboards",
                "Scalable platform for domestic and export markets",
                "Strict security and compliance control systems",
                "Large-scale data processing capacity",
                "Pan-India deployment and distribution support",
                "Expert team specializing in sales intelligence",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Vision + Why Choose */}
          <div className="space-y-5">
            {/* Vision Card */}
            <div className="p-6 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl
                             text-white shadow-xl shadow-indigo-500/25 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full
                               -translate-y-1/2 translate-x-1/2" />
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                <Target className="w-5 h-5 text-white" strokeWidth={2.2} />
              </div>
              <h3 className="text-lg font-bold mb-3">Our Vision</h3>
              <p className="text-indigo-100 text-sm leading-relaxed">
                To become the most trusted sales analytics partner for India's growing business
                community, delivering superior data quality, innovative reporting design, and
                responsive service at every stage of our customer's growth journey.
              </p>
            </div>

            {/* Why Choose Alfa */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200/60 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                Why Choose SalesManager
              </h3>
              <ul className="space-y-3">
                {whyChooseUs.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pan-India */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60">
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-600" />
                Pan-India Reach
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We deploy across India with a strong nationwide network. With the capacity to
                onboard over 100 new business accounts every month, we ensure fast, safe, and
                dependable onboarding — whether it's a single location or multi-branch enterprise.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
                         from-indigo-900/30 via-transparent to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Do You Want to Partner With Us?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mb-8 leading-relaxed">
            Apply and tell us about your business. We will contact you to discuss our
            cooperation in more detail and find the best plan for your team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                             bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold text-sm
                             shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40
                             hover:-translate-y-0.5 transition-all duration-300">
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/dashboard"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                             bg-white/10 text-white font-semibold text-sm border border-white/10
                             hover:bg-white/15 hover:-translate-y-0.5 transition-all duration-300">
              Explore Dashboard
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
