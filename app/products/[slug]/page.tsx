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
        const res = await fetch('/api/products');
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
      <main className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-10 text-gray-400 text-center py-24">
          Loading catalog details...
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-10 text-gray-400 text-center py-24">
          <p className="text-xl text-red-400 mb-4">{error || 'Product not found.'}</p>
          <Link href="/products" className="text-orange-400 hover:underline">
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
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8 flex-wrap">
          <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-orange-400 transition-colors">Products</Link>
          <ChevronRight size={12} />
          <Link href={`/products?category=${product.category}`} className="hover:text-orange-400 transition-colors capitalize">
            {category?.name || product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-400 font-medium">{product.name}</span>
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
              <span className="text-orange-400 text-xs uppercase tracking-widest font-semibold">{category?.name || product.category}</span>
            </div>

            <h1 className="font-display text-5xl text-white leading-none mb-4">{product.name.toUpperCase()}</h1>
            <p className="text-gray-400 text-base leading-relaxed mb-6">{product.description}</p>

            {/* Minimum Quantity & Bulk Notice */}
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-400 font-semibold text-sm uppercase tracking-wide">Bulk Manufacturing</p>
                  <p className="text-gray-300 text-xs mt-0.5">Minimum Order Quantity: <strong className="text-white">{product.minQty || 10} pcs</strong></p>
                </div>
                <span className="text-xs bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full font-medium">
                  Custom Logo Ready
                </span>
              </div>
            </div>

            {/* Product Specs */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Ruler, label: 'Min. Quantity', value: `${product.minQty || 10} pcs` },
                { icon: Package, label: 'Category', value: category?.name || product.category },
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
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-4xl text-white mb-8">RELATED PRODUCTS</h2>
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
