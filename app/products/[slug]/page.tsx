'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductImageGallery from '@/components/ProductImageGallery';
import { ChevronRight, Ruler, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  minQty: number;
  description: string;
  image?: string;
  images?: string[];
}

interface Category {
  id: string;
  name: string;
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products?t=${Date.now()}`, { cache: "no-store" });
        if (!res.ok) throw new Error('Failed to load product');
        const json = await res.json();
        setCategories(json.categories || []);
        setProducts(json.products || []);
        const found = json.products.find((item: Product) => item.slug === params.slug || item.id === params.slug);
        if (!found) {
          setError('Product not found');
          return;
        }
        setProduct(found);
      } catch (err) {
        setError('Unable to load product.');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [params.slug]);

  const related = product
    ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)
    : [];

  const category = product ? categories.find((c) => c.id === product.category) : null;

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-slate-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-10 text-slate-500 text-center py-24">
          Loading catalog details...
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-white text-slate-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-10 text-slate-600 text-center py-24">
          <p className="text-xl text-red-500 font-semibold mb-4">{error || 'Product not found.'}</p>
          <Link href="/products" className="text-orange-600 font-semibold hover:underline">
            Return to products catalog
          </Link>
        </div>
      </main>
    );
  }

  const allImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : product.image
      ? [product.image]
      : [];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8 flex-wrap">
          <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-orange-600 transition-colors">Products</Link>
          <ChevronRight size={12} />
          <Link href={`/products?category=${product.category}`} className="hover:text-orange-600 transition-colors capitalize">
            {category?.name || product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-slate-900 font-semibold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Dynamic Image Gallery Slider */}
          <div>
            <ProductImageGallery
              images={allImages}
              productName={product.name}
            />
          </div>

          {/* Catalog Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-orange-600 text-xs uppercase tracking-widest font-semibold">{category?.name || product.category}</span>
            </div>

            <h1 className="font-display text-5xl text-slate-900 leading-none mb-4">{product.name.toUpperCase()}</h1>
            <p className="text-slate-600 text-base leading-relaxed mb-6 whitespace-pre-line">{product.description}</p>

            {/* Product Specs */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Ruler, label: 'Min. Quantity', value: `${product.minQty || 10} pcs` },
                { icon: Package, label: 'Category', value: category?.name || product.category },
              ].map((spec, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center gap-3 shadow-xs">
                  <spec.icon size={15} className="text-orange-600 shrink-0" />
                  <div>
                    <p className="text-slate-500 text-xs font-medium">{spec.label}</p>
                    <p className="text-slate-900 text-sm font-bold">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-4xl text-slate-900 mb-8">RELATED PRODUCTS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
