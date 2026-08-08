import { NextResponse } from "next/server";
import { getProductsData } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = getProductsData();
  return NextResponse.json({ categories: data.categories || [] });
}
