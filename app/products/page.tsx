import { Suspense } from "react";
import ProductsContent from "./ProductsContent";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white flex items-center justify-center">
          <p className="text-slate-500 text-sm">Loading products...</p>
        </main>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
