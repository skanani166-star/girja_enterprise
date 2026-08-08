import { NextRequest, NextResponse } from "next/server";
import {
  createSlug,
  getProductsData,
  saveProductsData,
} from "@/lib/products";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = getProductsData();
  const product = data.products.find((item) => item.id === params.id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const data = getProductsData();
    const index = data.products.findIndex((item) => item.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const existing = data.products[index];
    const updated = {
      ...existing,
      name: body.name || existing.name,
      slug: createSlug(
        body.slug || body.name || existing.name,
        data.products
          .filter((item) => item.id !== params.id)
          .map((item) => item.slug)
      ),
      category: body.category || existing.category,
      price: Number(body.price) || existing.price,
      minQty: Number(body.minQty) || existing.minQty,
      description: body.description || existing.description,
      features: Array.isArray(body.features)
        ? body.features
        : String(body.features || (existing.features || []).join(","))
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
      colors: Array.isArray(body.colors)
        ? body.colors
        : String(body.colors || (existing.colors || []).join(","))
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
      badge: body.badge || existing.badge || "",
      material: body.material || existing.material,
      weight: body.weight || existing.weight,
      image: body.image || existing.image || "",
    };

    data.products[index] = updated;
    saveProductsData(data);

    return NextResponse.json({ success: true, product: updated });
  } catch {
    return NextResponse.json(
      { error: "Failed to update product." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = getProductsData();
  const index = data.products.findIndex((item) => item.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  data.products.splice(index, 1);
  saveProductsData(data);

  return NextResponse.json({ success: true });
}
