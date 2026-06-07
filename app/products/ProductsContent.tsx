"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";
import { Search, SlidersHorizontal } from "lucide-react";

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const categories = [
    { id: "all", label: "All Products" },
    ...productsData.categories.map((c) => ({ id: c.id, label: c.name })),
  ];

  const filtered = productsData.products.filter((p) => {
    const matchCat =
      selectedCategory === "all" || p.category === selectedCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-14 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-orange-400 text-sm uppercase tracking-widest font-semibold mb-2">
            Our Catalog
          </p>
          <h1 className="font-display text-7xl text-white leading-none mb-4">
            ALL PRODUCTS
          </h1>
          <p className="text-gray-500 text-base max-w-xl">
            Browse our full range of corporate products. Click any product to
            see details, pricing, and customization options.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[60px] z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wide transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? "bg-orange-500 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg pl-8 pr-4 py-1.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500/50 w-52"
            />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <SlidersHorizontal
                size={40}
                className="text-gray-700 mx-auto mb-4"
              />
              <p className="text-gray-500 text-lg">No products found</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearch("");
                }}
                className="mt-4 text-orange-400 text-sm hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 text-sm mb-8">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}{" "}
                found
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
