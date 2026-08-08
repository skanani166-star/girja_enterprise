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

export default function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);

  const mainImage = Array.isArray(product.images) && product.images.length > 0
    ? formatImageUrl(product.images[0])
    : product.image
      ? formatImageUrl(product.image)
      : "";

  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden card-hover h-full flex flex-col">
        {/* Image container */}
        <div className="relative h-56 bg-gradient-to-br from-[#1a1a1a] to-[#222] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

          {mainImage && !imgError ? (
            <Image
              src={mainImage}
              alt={product.name}
              fill
              unoptimized
              onError={() => setImgError(true)}
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <Package
              size={64}
              className="text-gray-700 group-hover:text-orange-500/40 transition-colors duration-300"
            />
          )}

          <span className="absolute top-3 right-3 z-20 text-xs font-medium px-2.5 py-1 rounded border bg-white/10 text-gray-300 border-white/10 backdrop-blur-md capitalize">
            {product.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-semibold text-base mb-1.5 group-hover:text-orange-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Min Order
              </p>
              <p className="text-white font-medium text-sm">
                {product.minQty ? `${product.minQty} pcs` : 'Bulk Quantity'}
              </p>
            </div>
            <div className="flex items-center gap-1 text-orange-400 text-sm font-medium group-hover:gap-2 transition-all">
              View Catalog <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
