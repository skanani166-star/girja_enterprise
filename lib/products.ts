import { readFileSync, writeFileSync } from "fs";
import path from "path";
import crypto from "crypto";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  minQty: number;
  description: string;
  features: string[];
  colors: string[];
  badge?: string;
  material: string;
  weight: string;
  image?: string;
}

export interface ProductsData {
  categories: Category[];
  products: Product[];
}

const dataPath = path.join(process.cwd(), "data", "products.json");

export function getProductsData(): ProductsData {
  try {
    return JSON.parse(readFileSync(dataPath, "utf-8"));
  } catch {
    return { categories: [], products: [] };
  }
}

export function saveProductsData(data: ProductsData): void {
  writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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
