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
    <footer className="bg-[#080808] border-t border-white/5 pt-16 pb-8">
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
            <p className="text-gray-500 text-sm leading-relaxed mt-2">
              India's trusted catalog for premium corporate apparel and
              accessories since 2022. Quality you can wear, brands people
              remember.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/girjaenterprise?igsh=MWtqNXZheDRoaDA5OQ=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-pink-500 hover:border-pink-500/40 bg-white/5 hover:bg-pink-500/10 transition-all"
              >
                <Instagram size={18} />
              </a>

              {/* IndiaMART */}
              <a
                href="https://www.indiamart.com/girja-enterprise/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IndiaMART"
                className="h-9 px-3 border border-white/10 rounded-lg flex items-center gap-1.5 text-xs font-bold text-gray-300 hover:text-teal-400 hover:border-teal-400/40 bg-white/5 hover:bg-teal-500/10 transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                IndiaMART
              </a>
            </div>
          </div>

          {/* Dynamic Categories */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-widest text-xs mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/products?category=${cat.id}`}
                      className="text-gray-500 text-sm hover:text-orange-400 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link href="/products?category=tshirts" className="text-gray-500 text-sm hover:text-orange-400">
                      T-Shirts
                    </Link>
                  </li>
                  <li>
                    <Link href="/products?category=caps" className="text-gray-500 text-sm hover:text-orange-400">
                      Caps & Hats
                    </Link>
                  </li>
                  <li>
                    <Link href="/products?category=bags" className="text-gray-500 text-sm hover:text-orange-400">
                      Bags
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-widest text-xs mb-4">
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
                    className="text-gray-500 text-sm hover:text-orange-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-widest text-xs mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex gap-3 text-gray-500 text-sm">
                <MapPin size={15} className="text-orange-500 shrink-0 mt-0.5" />
                <span>
                  Ground Floor-27, Silver business hub, BRTS Rd, near bapa
                  sitaram chowk, Sarshvati Park, Simada Gam, Yoginagar Society,
                  Surat, Gujarat 395011
                </span>
              </li>
              <li className="flex gap-3 text-gray-500 text-sm">
                <Phone size={15} className="text-orange-500 shrink-0 mt-0.5" />
                <a
                  href="tel:+918200848182"
                  className="hover:text-orange-400 transition-colors"
                >
                  +91 82008 48182
                </a>
              </li>
              <li className="flex gap-3 text-gray-500 text-sm">
                <Mail size={15} className="text-orange-500 shrink-0 mt-0.5" />
                <a
                  href="mailto:sales.girjaenterprise@gmail.com"
                  className="hover:text-orange-400 transition-colors"
                >
                  sales.girjaenterprise@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-600 text-xs">
            © 2022 Girja Enterprise Catalog. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">Made with ♥ in Surat, India</p>
        </div>
      </div>
    </footer>
  );
}
