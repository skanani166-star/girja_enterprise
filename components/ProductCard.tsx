import Link from 'next/link';
import { ArrowRight, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  minQty: number;
  description: string;
  features: string[];
  colors: string[];
  badge?: string;
  material: string;
  image?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const categoryColors: Record<string, string> = {
    tshirts: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    caps: 'bg-green-500/10 text-green-400 border-green-500/20',
    bags: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };

  const categoryLabel: Record<string, string> = {
    tshirts: 'T-Shirts',
    caps: 'Caps',
    bags: 'Bags',
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden card-hover">
        {/* Image placeholder */}
        <div className="relative h-52 bg-gradient-to-br from-[#1a1a1a] to-[#222] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Package size={64} className="text-gray-700 group-hover:text-orange-500/40 transition-colors duration-300" />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
              {product.badge}
            </span>
          )}
          <span className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded border ${categoryColors[product.category] || 'bg-gray-800 text-gray-400 border-gray-700'}`}>
            {categoryLabel[product.category] || product.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-white font-semibold text-base mb-1 group-hover:text-orange-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description}</p>

          {/* Colors */}
          <div className="flex gap-1.5 mb-4 flex-wrap">
            {product.colors.slice(0, 5).map((color) => (
              <span key={color} className="text-xs text-gray-600 bg-white/5 px-2 py-0.5 rounded">{color}</span>
            ))}
            {product.colors.length > 5 && (
              <span className="text-xs text-gray-600">+{product.colors.length - 5}</span>
            )}
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-orange-400 font-bold text-xl">₹{product.price}<span className="text-gray-600 text-sm font-normal">/pc</span></p>
              <p className="text-gray-600 text-xs">Min. qty: {product.minQty} pcs</p>
            </div>
            <div className="flex items-center gap-1 text-orange-400 text-sm font-medium group-hover:gap-2 transition-all">
              View <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
