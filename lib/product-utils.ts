export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  minQty: number;
  description: string;
  price?: number;
  features?: string[];
  colors?: string[];
  badge?: string;
  material?: string;
  weight?: string;
  image?: string;
  images?: string[];
}

export interface ProductsData {
  categories: Category[];
  products: Product[];
}

export function formatImageUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:image/')) return url;
  if (url.startsWith('/uploads/')) return `/api/uploads/${url.replace('/uploads/', '')}`;
  if (url.startsWith('uploads/')) return `/api/uploads/${url.replace('uploads/', '')}`;
  return url;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
