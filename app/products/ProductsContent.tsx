"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";

interface ProductCategory {
  id: string;
  name: string;
  slug?: string;
}

interface ProductsData {
  categories: ProductCategory[];
  products: any[];
}

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<ProductsData>({ categories: [], products: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to load products");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError("Unable to load products. Refresh the page.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories: { id: string; label: string; slug?: string }[] = [
    { id: "all", label: "All Products" },
    ...data.categories.map((c) => ({ id: c.id, label: c.name, slug: c.slug })),
  ];

  const filtered = data.products.filter((p) => {
    const matchCat =
      selectedCategory === "all" ||
      p.category === selectedCategory ||
      categories.find((c) => c.id === selectedCategory)?.slug === p.category;

    const matchSearch =
      (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.description || "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-14 border-b border-slate-100 bg-slate-50/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-orange-600 text-sm uppercase tracking-widest font-semibold mb-2">
            Our Catalog
          </p>
          <h1 className="font-display text-7xl text-slate-900 leading-none mb-4">
            ALL PRODUCTS
          </h1>
          <p className="text-slate-600 text-base max-w-xl">
            Browse our full range of corporate products. Click any product to
            view detailed specifications and send a bulk order enquiry.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[60px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? "bg-orange-500 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-100 border border-slate-200 rounded-lg pl-8 pr-4 py-1.5 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 w-52 shadow-xs"
            />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="text-center py-20 text-slate-400">Loading products...</div>
          ) : error ? (
            <div className="text-center py-20 text-red-500 font-medium">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <SlidersHorizontal
                size={40}
                className="text-slate-300 mx-auto mb-4"
              />
              <p className="text-slate-600 text-lg">No products found</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearch("");
                }}
                className="mt-4 text-orange-600 font-semibold text-sm hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <p className="text-slate-500 text-sm font-medium mb-8">
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
