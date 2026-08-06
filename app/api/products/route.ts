import { NextRequest, NextResponse } from "next/server";
import {
  createProductId,
  createSlug,
  getProductsData,
  saveProductsData,
} from "@/lib/products";

export async function GET() {
  const data = getProductsData();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = getProductsData();

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
      price: Number(body.price) || 0,
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
    };

    data.products.unshift(product);
    saveProductsData(data);

    return NextResponse.json({ success: true, product });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to save product." },
      { status: 500 }
    );
  }
}
