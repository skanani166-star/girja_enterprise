"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { handleHashLinkClick } from "@/lib/scroll-utils";

interface Category {
  id: string;
  name: string;
  slug?: string;
}

export default function Footer() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.categories)) {
            setCategories(json.categories);
          }
        }
      } catch (err) {
        // Fallback gracefully
      }
    }
    loadCategories();
  }, []);

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="">
              <img
                src="/logo.png"
                alt="Girja Enterprise Catalog"
                width={100}
                height={100}
              />
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed mt-2">
              India's trusted catalog for premium corporate apparel and
              accessories since 2022. Quality you can wear, brands people
              remember.
            </p>
            <div className="flex items-center gap-3 mt-5 flex-wrap">
              {/* Instagram Image Logo */}
              <a
                href="https://www.instagram.com/girjaenterprise?igsh=MWtqNXZheDRoaDA5OQ=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-12 w-36 sm:w-40 px-3 border border-slate-200/90 rounded-2xl flex items-center justify-center bg-white hover:bg-slate-50 hover:border-slate-300 shadow-xs hover:shadow-md transition-all shrink-0"
              >
                <img
                  src="/instagram.png"
                  alt="Instagram"
                  className="h-7 w-auto object-contain max-w-[85%]"
                />
              </a>

              {/* IndiaMART Image Logo */}
              <a
                href="https://www.indiamart.com/girja-enterprise/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IndiaMART"
                className="h-12 w-36 sm:w-40 px-3 border border-slate-200/90 rounded-2xl flex items-center justify-center bg-white hover:bg-slate-50 hover:border-slate-300 shadow-xs hover:shadow-md transition-all shrink-0"
              >
                <img
                  src="/indiamart.png"
                  alt="IndiaMART"
                  className="h-7 w-auto object-contain max-w-[85%]"
                />
              </a>
            </div>
          </div>

          {/* Dynamic Categories */}
          <div>
            <h4 className="text-slate-900 font-bold uppercase tracking-widest text-xs mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/products?category=${cat.id}`}
                      className="text-slate-600 text-sm hover:text-orange-600 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link href="/products?category=tshirts" className="text-slate-600 text-sm hover:text-orange-600">
                      T-Shirts
                    </Link>
                  </li>
                  <li>
                    <Link href="/products?category=caps" className="text-slate-600 text-sm hover:text-orange-600">
                      Caps & Hats
                    </Link>
                  </li>
                  <li>
                    <Link href="/products?category=bags" className="text-slate-600 text-sm hover:text-orange-600">
                      Bags
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-slate-900 font-bold uppercase tracking-widest text-xs mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {[
                ["About Us", "/#about"],
                ["Our Process", "/#process"],
                ["Clients", "/#corporate-partners"],
                ["Reviews", "/#testimonials"],
                ["Contact", "/#contact"],
              ].map(([item, href]) => (
                <li key={item}>
                  <Link
                    href={href}
                    onClick={(e) => handleHashLinkClick(e, href)}
                    className="text-slate-600 text-sm hover:text-orange-600 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-slate-900 font-bold uppercase tracking-widest text-xs mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex gap-3 text-slate-600 text-sm">
                <MapPin size={15} className="text-orange-600 shrink-0 mt-0.5" />
                <span>
                  Ground Floor-27, Silver business hub, BRTS Rd, near bapa
                  sitaram chowk, Sarshvati Park, Simada Gam, Yoginagar Society,
                  Surat, Gujarat 395011
                </span>
              </li>
              <li className="flex gap-3 text-slate-600 text-sm">
                <Phone size={15} className="text-orange-600 shrink-0 mt-0.5" />
                <a
                  href="tel:+918200848182"
                  className="hover:text-orange-600 transition-colors"
                >
                  +91 82008 48182
                </a>
              </li>
              <li className="flex gap-3 text-slate-600 text-sm">
                <Mail size={15} className="text-orange-600 shrink-0 mt-0.5" />
                <a
                  href="mailto:sales.girjaenterprise@gmail.com"
                  className="hover:text-orange-600 transition-colors"
                >
                  sales.girjaenterprise@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-slate-500 text-xs font-medium">
            © 2022 Girja Enterprise Catalog. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs font-medium">Made with ♥ in Surat, India</p>
        </div>
      </div>
    </footer>
  );
}
