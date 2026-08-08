import { NextRequest, NextResponse } from "next/server";
import {
  createProductId,
  createSlug,
  getProductsData,
  saveProductsData,
} from "@/lib/products";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const data = await getProductsData();

  let products = data.products || [];
  if (category && category !== "all") {
    products = products.filter((p) => p.category === category);
  }

  return NextResponse.json(
    { ...data, products },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await getProductsData();

    if (!body.name || !body.category || !body.description) {
      return NextResponse.json(
        { error: "name, category, and description are required" },
        { status: 400 }
      );
    }

    const product = {
      id: createProductId(),
      name: body.name,
      slug: createSlug(body.slug || body.name, data.products.map((p) => p.slug)),
      category: body.category,
      minQty: Number(body.minQty) || 0,
      description: body.description,
      features: Array.isArray(body.features)
        ? body.features
        : String(body.features || "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
      colors: Array.isArray(body.colors)
        ? body.colors
        : String(body.colors || "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
      badge: body.badge || "",
      material: body.material || "",
      weight: body.weight || "",
      image: body.image || "",
      images: Array.isArray(body.images) ? body.images : body.image ? [body.image] : [],
    };

    data.products.unshift(product);
    await saveProductsData(data);

    return NextResponse.json({ success: true, product });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to save product." },
      { status: 500 }
    );
  }
}
