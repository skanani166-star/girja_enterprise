import Link from "next/link";
import {
  Zap,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="">
              <img
                src="/images/logo/1.png"
                alt="Girja Enterprise Catalog"
                width={100}
                height={100}
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              India's trusted catalog for premium corporate apparel and
              accessories since 2012. Quality you can wear, brands people
              remember.
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 border border-white/10 rounded flex items-center justify-center text-gray-500 hover:text-orange-400 hover:border-orange-400/40 transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-widest text-xs mb-4">
              Products
            </h4>
            <ul className="space-y-2">
              {[
                "T-Shirts",
                "Caps & Hats",
                "Bags",
                "Combo Kits",
                "Accessories",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/products"
                    className="text-gray-500 text-sm hover:text-orange-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
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
                ["Clients", "/#clients"],
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
                  Ground Floor-38, polaris mall, Puna canal BRTS road, near
                  Param Hospital, Radhika Park Society, Punagam, Varachha,
                  Surat, Gujarat 395010
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
                  href="mailto:girjaenterprise@gmail.com"
                  className="hover:text-orange-400 transition-colors"
                >
                  girjaenterprise@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-600 text-xs">
            © 2024 Girja Enterprise Catalog. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">Made with ♥ in Surat, India</p>
        </div>
      </div>
    </footer>
  );
}
