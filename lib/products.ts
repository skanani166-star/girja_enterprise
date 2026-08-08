import crypto from "crypto";
import { Product, ProductsData, formatImageUrl, slugify } from "./product-utils";
import { fetchProductsData, saveProductsData as saveToStore, getProductDataPath } from "./data-store";

export * from "./product-utils";
export { getProductDataPath as getDataPath };

export async function getProductsData(): Promise<ProductsData> {
  const data = await fetchProductsData();
  return {
    categories: Array.isArray(data.categories) ? data.categories : [],
    products: Array.isArray(data.products) ? data.products.map(normalizeProduct) : [],
  };
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

export async function saveProductsData(data: ProductsData): Promise<void> {
  await saveToStore(data);
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
