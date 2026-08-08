import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import crypto from "crypto";
import { Product, ProductsData, formatImageUrl, slugify } from "./product-utils";

export * from "./product-utils";

const candidatePaths = [
  process.env.ADMIN_DATA_PATH,
  path.resolve(process.cwd(), "..", "girja_enterprise_admin", "data", "products.json"),
  path.resolve(process.cwd(), "data", "products.json"),
].filter(Boolean) as string[];

export function getDataPath(): string {
  for (const p of candidatePaths) {
    if (existsSync(p)) return p;
  }
  return path.join(process.cwd(), "data", "products.json");
}

export function getProductsData(): ProductsData {
  try {
    const targetPath = getDataPath();
    const data = JSON.parse(readFileSync(targetPath, "utf-8"));
    return {
      categories: Array.isArray(data.categories) ? data.categories : [],
      products: Array.isArray(data.products) ? data.products.map(normalizeProduct) : [],
    };
  } catch {
    return { categories: [], products: [] };
  }
}

export function normalizeProduct(p: any): Product {
  const rawImages: string[] = Array.isArray(p.images) && p.images.length
    ? p.images
    : p.image
      ? [p.image]
      : [];

  const images = rawImages.map(formatImageUrl).filter(Boolean);
  const mainImage = images[0] || (p.image ? formatImageUrl(p.image) : '');

  return {
    id: p.id || `prod_${Date.now()}`,
    name: p.name || 'Untitled Product',
    slug: p.slug || slugify(p.name || 'product'),
    category: p.category || 'general',
    minQty: Number(p.minQty || 0),
    description: p.description || '',
    image: mainImage,
    images: images.length > 0 ? images : (mainImage ? [mainImage] : []),
  };
}

export function saveProductsData(data: ProductsData): void {
  const targetPath = getDataPath();
  writeFileSync(targetPath, JSON.stringify(data, null, 2));
}

export function createSlug(text: string, existingSlugs: string[] = []): string {
  const base = slugify(text);
  let slug = base;
  let index = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${base}-${index}`;
    index += 1;
  }

  return slug;
}

export function createProductId(): string {
  return crypto.randomUUID();
}
