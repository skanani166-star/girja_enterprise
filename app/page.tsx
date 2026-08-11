"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { scrollToSectionCenter, handleHashLinkClick } from "@/lib/scroll-utils";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  Package,
  Truck,
  Shield,
  Paintbrush,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Shirt,
  ShoppingBag,
  FolderOpen,
  HardHat,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  minQty: number;
  description: string;
  features: string[];
  colors: string[];
  badge?: string;
  material: string;
  image?: string;
  images?: string[];
}

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
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/products?t=${Date.now()}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Unable to load data");
        const json = await res.json();
        setCategories(json.categories || []);
        setAllProducts(json.products || []);
        setFeaturedProducts((json.products || []).slice(0, 3));
      } catch (err) {
        setFeaturedProducts([]);
        setCategories([]);
      } finally {
        setProductsLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        setTimeout(() => {
          scrollToSectionCenter(id);
        }, 150);
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, []);

  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
      } else {
        setFormError(json.error || "Failed to submit quote request.");
      }
    } catch (err) {
      setFormError("Failed to submit quote request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case "shirt":
        return Shirt;
      case "hardhat":
        return HardHat;
      case "shoppingbag":
      case "bag":
        return ShoppingBag;
      case "package":
      default:
        return FolderOpen;
    }
  };

  const getCategoryCount = (catId: string) => {
    return allProducts.filter((p) => p.category === catId).length;
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center hero-glow overflow-hidden pt-20">
        {/* BG Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 rounded-full px-4 py-1.5 text-orange-600 font-semibold text-sm mb-8 shadow-sm">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Your Trusted Corporate Gifting Partner
            </div>

            <h1 className="font-display text-7xl sm:text-8xl lg:text-9xl text-slate-900 leading-none tracking-tight mb-6">
              WEAR YOUR
              <span className="text-gradient block">BRAND</span>
              WITH PRIDE
            </h1>

            <p className="text-slate-600 text-xl max-w-2xl mb-10 leading-relaxed font-normal">
              Your trusted partner for custom corporate branding, enterprise apparel, and promotional merchandise. Premium quality manufacturing tailored for teams, corporate events, and client giveaways with pan-India delivery.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-base uppercase tracking-wide group"
              >
                Explore Products
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/#contact"
                onClick={(e) => handleHashLinkClick(e, "/#contact")}
                className="flex items-center gap-2 border border-slate-300 hover:border-orange-500 bg-white hover:bg-orange-50/50 text-slate-800 font-semibold px-8 py-4 rounded-lg shadow-sm transition-all duration-200 text-base uppercase tracking-wide"
              >
                Get Free Quote
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-16">
              {[
                { num: "500+", label: "Corporate Clients" },
                { num: "2L+", label: "Units Delivered" },
                { num: "4+", label: "Years Experience" },
                { num: "48hr", label: "Sample Delivery" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-4xl text-slate-900">
                    {stat.num}
                  </div>
                  <div className="text-slate-500 text-sm uppercase tracking-widest font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== DYNAMIC CATEGORIES ===== */}
      <section className="py-20 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-orange-600 text-sm uppercase tracking-widest font-semibold mb-2">
                What We Make
              </p>
              <h2 className="font-display text-5xl text-slate-900">
                PRODUCT CATEGORIES
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-semibold"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.slice(0, 3).map((cat) => {
              const IconComp = getCategoryIcon(cat.icon);
              const count = getCategoryCount(cat.id);

              return (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.id}`}
                  className="group relative bg-white border border-slate-200/90 hover:border-orange-500/50 rounded-2xl p-8 transition-all duration-300 overflow-hidden card-hover shadow-sm hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center mb-5 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-xs">
                      <IconComp size={26} />
                    </div>
                    <h3 className="text-slate-900 font-bold text-xl mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-2">
                      {cat.description || "Browse custom products in this category."}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-slate-400 text-xs font-medium">
                        {count} product{count !== 1 ? "s" : ""}
                      </span>
                      <span className="text-orange-600 flex items-center gap-1 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                        Explore <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-orange-600 text-sm uppercase tracking-widest font-semibold mb-2">
                Handpicked
              </p>
              <h2 className="font-display text-5xl text-slate-900">
                FEATURED PRODUCTS
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-semibold"
            >
              All Products <ArrowRight size={14} />
            </Link>
          </div>
          {productsLoading ? (
            <div className="text-slate-400 text-center py-16">Loading featured products...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="py-20 bg-slate-50/60 border-t border-slate-100 scroll-mt-28" id="process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-orange-600 text-sm uppercase tracking-widest font-semibold mb-2">
              Why Girja Enterprise Catalog
            </p>
            <h2 className="font-display text-5xl text-slate-900">
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
                className="bg-white border border-slate-200/90 rounded-2xl p-6 group hover:border-orange-500/40 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
                  <feat.icon size={22} className="text-orange-600" />
                </div>
                <h3 className="text-slate-900 font-bold text-base mb-2">
                  {feat.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OUR VALUED CLIENTS / CORPORATE PARTNERS ===== */}
      <section className="py-16 border-t border-slate-100 bg-white overflow-hidden scroll-mt-28" id="corporate-partners">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 text-center">
          <p className="text-orange-600 text-sm uppercase tracking-widest font-semibold mb-2">
            Corporate Partners
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-slate-900">
            OUR VALUED CLIENTS
          </h2>
        </div>

        {/* Continuous Horizontal Marquee Container */}
        <div className="w-full relative overflow-hidden py-4 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-12 sm:before:w-28 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-12 sm:after:w-28 after:bg-gradient-to-l after:from-white after:to-transparent">
          <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
            {[
              { name: "KRIBHCO", src: "/kribhco.png" },
              { name: "AM/NS India", src: "/amns_india.png" },
              { name: "Hetero", src: "/hetero.png" },
              { name: "SBI Bank", src: "/sbi.png" },
              { name: "Syncom Formulations", src: "/syncom.png" },
              { name: "BJP", src: "/bjp.png" },
              { name: "Cellforce Power", src: "/cellforce.png" },
              { name: "Greenedge Energy", src: "/greenedge.png" },
              // Duplicate loop for seamless infinite animation
              { name: "KRIBHCO", src: "/kribhco.png" },
              { name: "AM/NS India", src: "/amns_india.png" },
              { name: "Hetero", src: "/hetero.png" },
              { name: "SBI Bank", src: "/sbi.png" },
              { name: "Syncom Formulations", src: "/syncom.png" },
              { name: "BJP", src: "/bjp.png" },
              { name: "Cellforce Power", src: "/cellforce.png" },
              { name: "Greenedge Energy", src: "/greenedge.png" },
            ].map((client, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 flex items-center justify-center text-center group transition-all duration-300 card-hover h-28 sm:h-32 w-56 sm:w-72 shrink-0 shadow-sm overflow-hidden"
              >
                <img
                  src={client.src}
                  alt={client.name}
                  className="w-full h-full object-contain my-auto group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLIENT LOGOS / TESTIMONIAL ===== */}
      <section className="py-20 bg-slate-50/60 border-t border-slate-100 scroll-mt-28" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-orange-600 text-sm uppercase tracking-widest font-semibold mb-2">
              Testimonials
            </p>
            <h2 className="font-display text-5xl text-slate-900">
              TRUSTED BY 500+ BRANDS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Ghanshyam Patel",
                location: "Surat, Gujarat",
                dateProduct: "01-August-25 | Product Name : Cotton Caps",
                text: "Excellent polo T-shirt with premium fabric and perfect fit. Very comfortable for daily wear and looks smart. I customized it with my logo and the print quality is superb, durable, and long-lasting. Great choice for corporate and casual use!",
                rating: 5,
                badges: ["Response 👍", "Quality 👍", "Delivery 👍"],
              },
              {
                name: "Hardik",
                location: "Surat, Gujarat",
                dateProduct: "23-February-26 | Product Name : Men Custom T-Shirt",
                text: "We got customized cotton printed T-shirts made from Girja Enterprise. The fabric quality is excellent, and the printing is durable and long-lasting. Highly recommended for anyone looking for high-quality customized T-shirt printing.",
                rating: 5,
                badges: ["Response 👍", "Quality 👍", "Delivery 👍"],
              },
              {
                name: "Rajesh Sharma",
                location: "Surat, Gujarat",
                dateProduct: "15-January-26 | Product Name : Corporate Polos & Bags",
                text: "Ordered bulk corporate polo T-shirts and promotional bags for our office team in Surat. Fantastic fabric quality, quick delivery, and professional logo printing. Highly recommended manufacturer!",
                rating: 5,
                badges: ["Response 👍", "Quality 👍", "Delivery 👍"],
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-orange-500/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-700 font-bold text-sm shrink-0">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="text-slate-900 text-sm font-semibold flex items-center gap-1.5">
                          {t.name}
                          <span className="text-slate-400 font-normal text-xs">| {t.location}</span>
                        </p>
                        <div className="flex gap-0.5 mt-0.5">
                          {Array.from({ length: t.rating }).map((_, j) => (
                            <Star
                              key={j}
                              size={12}
                              className="text-amber-400"
                              fill="#f59e0b"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-3">{t.dateProduct}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {t.badges.map((badge, bIdx) => (
                      <span key={bIdx} className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed mb-4">
                    "{t.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT US ===== */}
      <section className="py-20 bg-white border-t border-slate-100 scroll-mt-28" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-orange-600 text-sm uppercase tracking-widest font-semibold mb-3">
                About Us
              </p>
              <h2 className="font-display text-6xl text-slate-900 leading-none mb-6">
                BUILDING BRANDS
                <br />
                <span className="text-gradient">SINCE 2022</span>
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-5">
                Girja Enterprise Catalog is a Surat-based manufacturer
                specialising in custom branded apparel and accessories. From a
                small workshop in 2022, we've
                grown into one of Gujarat's leading bulk apparel and accessories
                manufacturers.
              </p>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Our state-of-the-art facility houses digital printing, screen
                printing, embroidery, and stitching units under one roof —
                ensuring quality control at every stage. We work directly with
                Fortune 500 companies, startups, NGOs, and event agencies across
                India.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  num: "500+",
                  label: "Corporate Clients",
                  sub: "Across India",
                },
                { num: "2L+", label: "Units Produced", sub: "Annually" },
                { num: "4+", label: "Years in Business", sub: "Est. 2022" },
                { num: "99%", label: "On-time Delivery", sub: "Guaranteed" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 text-center hover:border-orange-500/30 transition-all shadow-sm"
                >
                  <div className="font-display text-5xl text-gradient mb-1">
                    {stat.num}
                  </div>
                  <div className="text-slate-900 text-sm font-bold">
                    {stat.label}
                  </div>
                  <div className="text-slate-500 text-xs mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section
        className="py-10 sm:py-14 bg-slate-50/60 border-t border-slate-100 scroll-mt-28"
        id="contact"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-orange-600 text-sm uppercase tracking-widest font-semibold mb-1.5">
              Get In Touch
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-slate-900">
              REQUEST A QUOTE
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Fill the form below and our team will get back to you within 2
              hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-5">
              {[
                {
                  icon: MapPin,
                  title: "Visit Us",
                  lines: [
                    "Ground Floor-27, Silver business hub, BRTS Rd, near bapa sitaram chowk, Sarshvati Park, Simada Gam, Yoginagar Society, Surat, Gujarat 395011",
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
                  lines: ["sales.girjaenterprise@gmail.com"],
                },
                {
                  icon: Clock,
                  title: "Working Hours",
                  lines: ["Mon–Sat: 10:00 AM – 7:00 PM", "Sunday: Closed"],
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0 shadow-xs">
                    <item.icon size={18} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-slate-900 text-sm font-bold mb-0.5">
                      {item.title}
                    </p>
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-slate-600 text-xs sm:text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-3 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-md">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-slate-900 font-bold text-xl mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Our team will contact you within 2 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-orange-600 font-semibold text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {formError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-semibold">
                      {formError}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                        <label className="block text-slate-700 text-[11px] font-semibold uppercase tracking-wide mb-1">
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
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 transition-colors shadow-xs"
                          placeholder={field.label}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-slate-700 text-[11px] font-semibold uppercase tracking-wide mb-1">
                      Message / Requirements
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 transition-colors resize-none shadow-xs"
                      placeholder="Tell us about your requirements — product type, quantity, customization needed..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 uppercase tracking-wide text-sm"
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
