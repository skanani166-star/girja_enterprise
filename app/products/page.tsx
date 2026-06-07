import { Suspense } from "react";
import ProductsContent from "./ProductsContent";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <p className="text-gray-500 text-sm">Loading products...</p>
        </main>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
