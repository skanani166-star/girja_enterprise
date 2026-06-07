'use client';
import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';
import { ArrowLeft, Package, CheckCircle2, ChevronRight, Phone, Mail, Star, Tag, Layers, Ruler } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = productsData.products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const related = productsData.products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const category = productsData.categories.find((c) => c.id === product.category);

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(product.minQty);
  const [enquirySent, setEnquirySent] = useState(false);

  const handleEnquiry = async () => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Product Enquiry',
        email: 'enquiry@website.com',
        phone: '',
        company: '',
        message: `Product Enquiry: ${product.name} | Color: ${selectedColor} | Qty: ${quantity}`,
      }),
    });
    if (res.ok) setEnquirySent(true);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-orange-400 transition-colors">Products</Link>
          <ChevronRight size={12} />
          <Link href={`/products?category=${product.category}`} className="hover:text-orange-400 transition-colors capitalize">
            {category?.name}
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-400">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#222] rounded-2xl aspect-square flex items-center justify-center border border-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-purple-500/5" />
            <Package size={140} className="text-gray-700" />
            {product.badge && (
              <span className="absolute top-5 left-5 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wide">
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-orange-400 text-xs uppercase tracking-widest font-semibold">{category?.name}</span>
              <span className="text-gray-700">•</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((i) => <Star key={i} size={12} fill="#f97316" className="text-orange-400" />)}
              </div>
              <span className="text-gray-600 text-xs">(4.9)</span>
            </div>

            <h1 className="font-display text-5xl text-white leading-none mb-4">{product.name.toUpperCase()}</h1>
            <p className="text-gray-400 text-base leading-relaxed mb-6">{product.description}</p>

            {/* Price */}
            <div className="flex items-end gap-3 mb-8">
              <span className="font-display text-6xl text-gradient">₹{product.price}</span>
              <div className="pb-2">
                <p className="text-gray-500 text-sm">per piece</p>
                <p className="text-gray-600 text-xs">Min. {product.minQty} pcs order</p>
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: Layers, label: 'Material', value: product.material },
                { icon: Tag, label: 'GSM/Weight', value: product.weight },
                { icon: Ruler, label: 'Min. Qty', value: `${product.minQty} pcs` },
                { icon: Package, label: 'Category', value: category?.name || '' },
              ].map((spec, i) => (
                <div key={i} className="bg-[#111] border border-white/5 rounded-xl p-3 flex items-center gap-3">
                  <spec.icon size={15} className="text-orange-400 shrink-0" />
                  <div>
                    <p className="text-gray-600 text-xs">{spec.label}</p>
                    <p className="text-white text-sm font-medium">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Colors */}
            <div className="mb-6">
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-2">
                Color: <span className="text-white font-medium">{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                      selectedColor === color
                        ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                        : 'border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(product.minQty, quantity - 10))}
                  className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors text-lg">−</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(product.minQty, parseInt(e.target.value) || product.minQty))}
                  className="w-20 text-center bg-white/5 border border-white/10 rounded-lg py-2 text-white text-sm focus:outline-none focus:border-orange-500/50"
                />
                <button onClick={() => setQuantity(quantity + 10)}
                  className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors text-lg">+</button>
                <span className="text-gray-500 text-sm">= ₹{(product.price * quantity).toLocaleString()}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              {enquirySent ? (
                <div className="flex items-center gap-2 text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-5 py-3">
                  <CheckCircle2 size={16} />
                  <span className="text-sm font-medium">Enquiry sent! We'll call you soon.</span>
                </div>
              ) : (
                <button onClick={handleEnquiry}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg uppercase tracking-wide text-sm transition-all">
                  Send Enquiry
                </button>
              )}
              <a href="tel:+919876543210"
                className="flex items-center gap-2 border border-white/10 hover:border-orange-500/30 text-gray-300 hover:text-orange-400 px-5 py-3 rounded-lg transition-all text-sm font-medium">
                <Phone size={15} /> Call Us
              </a>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-[#111] border border-white/5 rounded-2xl p-8 mb-12">
          <h3 className="text-white font-bold text-lg mb-5">Product Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.features.map((feat) => (
              <div key={feat} className="flex items-center gap-3 text-gray-400 text-sm">
                <CheckCircle2 size={15} className="text-orange-400 shrink-0" />
                {feat}
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-4xl text-white mb-8">RELATED PRODUCTS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
