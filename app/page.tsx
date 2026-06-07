"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  Package,
  Award,
  Truck,
  Shield,
  Paintbrush,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  Shirt,
  ShoppingBag,
} from "lucide-react";

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const featuredProducts = productsData.products.slice(0, 3);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
      }
    } catch {}
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center hero-glow overflow-hidden pt-20">
        {/* BG Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/5 rounded-full px-4 py-1.5 text-orange-400 text-sm mb-8">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              India's Premier Corporate Product Catalog
            </div>

            <h1 className="font-display text-7xl sm:text-8xl lg:text-9xl text-white leading-none tracking-tight mb-6">
              WEAR YOUR
              <span className="text-gradient block">BRAND</span>
              WITH PRIDE
            </h1>

            <p className="text-gray-400 text-xl max-w-2xl mb-10 leading-relaxed">
              Premium corporate t-shirts, caps, and bags — custom branded for
              your team, events, and giveaways. Bulk manufacturing from 10
              pieces with pan-India delivery.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 text-base uppercase tracking-wide group"
              >
                Explore Products
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/#contact"
                className="flex items-center gap-2 border border-white/10 hover:border-orange-500/40 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 text-base uppercase tracking-wide"
              >
                Get Free Quote
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-16">
              {[
                { num: "500+", label: "Corporate Clients" },
                { num: "50L+", label: "Units Delivered" },
                { num: "12+", label: "Years Experience" },
                { num: "48hr", label: "Sample Delivery" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-4xl text-white">
                    {stat.num}
                  </div>
                  <div className="text-gray-500 text-sm uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-orange-400 text-sm uppercase tracking-widest font-semibold mb-2">
                What We Make
              </p>
              <h2 className="font-display text-5xl text-white">
                PRODUCT CATEGORIES
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm font-medium"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: "tshirts",
                icon: Shirt,
                title: "T-Shirts",
                desc: "Polo, round neck, dry-fit & more. 180–220 GSM options. Custom print & embroidery.",
                count: 3,
                color: "from-blue-500/10 to-transparent",
                border: "border-blue-500/20 hover:border-blue-500/50",
                iconColor: "text-blue-400",
              },
              {
                id: "caps",
                icon: Package,
                title: "Caps & Hats",
                desc: "Baseball caps, trucker caps, bucket hats. 3D embroidery & screen print.",
                count: 3,
                color: "from-green-500/10 to-transparent",
                border: "border-green-500/20 hover:border-green-500/50",
                iconColor: "text-green-400",
              },
              {
                id: "bags",
                icon: ShoppingBag,
                title: "Bags",
                desc: "Laptop bags, tote bags, duffel bags. Perfect for corporate gifting.",
                count: 3,
                color: "from-purple-500/10 to-transparent",
                border: "border-purple-500/20 hover:border-purple-500/50",
                iconColor: "text-purple-400",
              },
            ].map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className={`group relative bg-[#111] border ${cat.border} rounded-2xl p-8 transition-all duration-300 overflow-hidden card-hover`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div className="relative">
                  <div
                    className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-5 ${cat.iconColor}`}
                  >
                    <cat.icon size={26} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    {cat.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-xs">
                      {cat.count} products
                    </span>
                    <span
                      className={`${cat.iconColor} flex items-center gap-1 text-sm font-medium`}
                    >
                      Explore <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-orange-400 text-sm uppercase tracking-widest font-semibold mb-2">
                Handpicked
              </p>
              <h2 className="font-display text-5xl text-white">
                FEATURED PRODUCTS
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm font-medium"
            >
              All Products <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="py-20 border-t border-white/5" id="process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-orange-400 text-sm uppercase tracking-widest font-semibold mb-2">
              Why Girja Enterprise Catalog
            </p>
            <h2 className="font-display text-5xl text-white">
              QUALITY YOU CAN COUNT ON
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Premium Quality",
                desc: "Every item passes strict QC before dispatch. We use certified fabrics and inks.",
              },
              {
                icon: Paintbrush,
                title: "Custom Branding",
                desc: "Screen print, embroidery, DTF, sublimation — we handle all print methods.",
              },
              {
                icon: Truck,
                title: "Pan-India Delivery",
                desc: "Delivered to your doorstep anywhere in India within 10–14 business days.",
              },
              {
                icon: Users,
                title: "Bulk Discounts",
                desc: "Attractive pricing on bulk orders. The more you order, the more you save.",
              },
            ].map((feat, i) => (
              <div
                key={i}
                className="bg-[#111] border border-white/5 rounded-2xl p-6 group hover:border-orange-500/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                  <feat.icon size={22} className="text-orange-400" />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">
                  {feat.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLIENT LOGOS / TESTIMONIAL ===== */}
      <section className="py-20 bg-[#080808]" id="clients">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-orange-400 text-sm uppercase tracking-widest font-semibold mb-2">
              Testimonials
            </p>
            <h2 className="font-display text-5xl text-white">
              TRUSTED BY 500+ BRANDS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Rahul Mehta",
                role: "HR Manager, TechCorp India",
                text: "Girja Enterprise delivered 2000 polo t-shirts for our annual meet. Quality was top-notch and delivery was on time. Will order again!",
                rating: 5,
              },
              {
                name: "Priya Shah",
                role: "Marketing Head, RetailCo",
                text: "We ordered custom caps for our 500-member sales team. The embroidery quality exceeded our expectations. Great value for money.",
                rating: 5,
              },
              {
                name: "Amit Desai",
                role: "Founder, StartupHub",
                text: "Ordered branded tote bags and t-shirts for our event. The turnaround time was amazing and the print quality was excellent.",
                rating: 5,
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-[#111] border border-white/5 rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className="text-orange-400"
                      fill="#f97316"
                    />
                  ))}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-gray-600 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT US ===== */}
      <section className="py-20 border-t border-white/5" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-orange-400 text-sm uppercase tracking-widest font-semibold mb-3">
                About Us
              </p>
              <h2 className="font-display text-6xl text-white leading-none mb-6">
                BUILDING BRANDS
                <br />
                <span className="text-gradient">SINCE 2012</span>
              </h2>
              <p className="text-gray-400 text-base leading-relaxed mb-5">
                Girja Enterprise Catalog is a Surat-based manufacturer
                specialising in custom branded apparel and accessories. From a
                small workshop in 2012, we've
                grown into one of Gujarat's leading bulk apparel and accessories
                manufacturers.
              </p>
              <p className="text-gray-400 text-base leading-relaxed mb-8">
                Our state-of-the-art facility houses digital printing, screen
                printing, embroidery, and stitching units under one roof —
                ensuring quality control at every stage. We work directly with
                Fortune 500 companies, startups, NGOs, and event agencies across
                India.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Building2, label: "50,000 sq ft factory" },
                  { icon: Users, label: "200+ skilled workers" },
                  { icon: Award, label: "ISO 9001:2015 certified" },
                  { icon: CheckCircle2, label: "Eco-friendly processes" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon size={16} className="text-orange-400 shrink-0" />
                    <span className="text-gray-400 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  num: "500+",
                  label: "Corporate Clients",
                  sub: "Across India",
                },
                { num: "50L+", label: "Units Produced", sub: "Annually" },
                { num: "12+", label: "Years in Business", sub: "Est. 2012" },
                { num: "99%", label: "On-time Delivery", sub: "Guaranteed" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-[#111] border border-white/5 rounded-2xl p-6 text-center hover:border-orange-500/20 transition-all"
                >
                  <div className="font-display text-5xl text-gradient mb-1">
                    {stat.num}
                  </div>
                  <div className="text-white text-sm font-semibold">
                    {stat.label}
                  </div>
                  <div className="text-gray-600 text-xs">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section
        className="py-20 bg-[#080808] border-t border-white/5"
        id="contact"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-orange-400 text-sm uppercase tracking-widest font-semibold mb-2">
              Get In Touch
            </p>
            <h2 className="font-display text-5xl text-white">
              REQUEST A QUOTE
            </h2>
            <p className="text-gray-500 mt-3 text-base">
              Fill the form below and our team will get back to you within 2
              hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {[
                {
                  icon: MapPin,
                  title: "Visit Us",
                  lines: [
                    "Ground Floor-38, polaris mall, Puna canal BRTS road, near Param Hospital, Radhika Park Society, Punagam, Varachha, Surat, Gujarat 395010",
                  ],
                },
                {
                  icon: Phone,
                  title: "Call Us",
                  lines: ["+91 82008 48182"],
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  lines: ["girjaenterprise@gmail.com"],
                },
                {
                  icon: Clock,
                  title: "Working Hours",
                  lines: ["Mon–Sat: 9:00 AM – 6:00 PM", "Sunday: Closed"],
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-11 h-11 bg-orange-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold mb-0.5">
                      {item.title}
                    </p>
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-gray-500 text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-3 bg-[#111] border border-white/5 rounded-2xl p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Our team will contact you within 2 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-orange-400 text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        id: "name",
                        label: "Full Name",
                        type: "text",
                        required: true,
                      },
                      {
                        id: "email",
                        label: "Email Address",
                        type: "email",
                        required: true,
                      },
                      {
                        id: "phone",
                        label: "Phone Number",
                        type: "tel",
                        required: true,
                      },
                      {
                        id: "company",
                        label: "Company Name",
                        type: "text",
                        required: false,
                      },
                    ].map((field) => (
                      <div key={field.id}>
                        <label className="block text-gray-400 text-xs uppercase tracking-wide mb-1.5">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          required={field.required}
                          value={(formData as any)[field.id]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [field.id]: e.target.value,
                            })
                          }
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                          placeholder={field.label}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs uppercase tracking-wide mb-1.5">
                      Message / Requirements
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
                      placeholder="Tell us about your requirements — product type, quantity, customization needed..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-all duration-200 uppercase tracking-wide text-sm"
                  >
                    {loading ? "Sending..." : "Send Message & Get Quote"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
