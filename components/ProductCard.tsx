import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Package } from "lucide-react";
import { formatImageUrl } from "@/lib/product-utils";

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

const categoryFallbacks: Record<string, string> = {
  tshirts: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
  caps: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80",
  bags: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
};

const getFallbackImage = (cat?: string) => {
  if (cat && categoryFallbacks[cat.toLowerCase()]) {
    return categoryFallbacks[cat.toLowerCase()];
  }
  return "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=80";
};

export default function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);

  const mainImage = Array.isArray(product.images) && product.images.length > 0
    ? formatImageUrl(product.images[0])
    : product.image
      ? formatImageUrl(product.image)
      : "";

  const displayImage = (!mainImage || imgError) ? getFallbackImage(product.category) : mainImage;

  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden card-hover h-full flex flex-col shadow-sm hover:shadow-xl hover:border-orange-500/40 transition-all duration-300">
        {/* Image container */}
        <div className="relative h-56 bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

          <Image
            src={displayImage}
            alt={product.name}
            fill
            unoptimized
            onError={() => setImgError(true)}
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
          />

          <span className="absolute top-3 right-3 z-20 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 text-slate-700 border border-slate-200/80 shadow-sm backdrop-blur-md capitalize">
            {product.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-slate-900 font-bold text-base mb-1.5 group-hover:text-orange-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">
                Min Order
              </p>
              <p className="text-slate-900 font-semibold text-sm">
                {product.minQty ? `${product.minQty} pcs` : 'Bulk Quantity'}
              </p>
            </div>
            <div className="flex items-center gap-1 text-orange-600 text-sm font-semibold group-hover:gap-2 transition-all">
              View Catalog <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
