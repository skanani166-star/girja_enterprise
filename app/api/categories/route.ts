import { NextResponse } from "next/server";
import { getProductsData } from "@/lib/products";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const data = await getProductsData();
  return NextResponse.json(
    { categories: data.categories || [] },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
}
