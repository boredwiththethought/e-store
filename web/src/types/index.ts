// Product types
export interface Product {
  _id?: string;
  id: string;
  slug: string;
  name: string;
  brand?: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string[] | Record<string, string[]>;
  rating?: number;
  reviewsCount?: number;
  tags?: string[];
  description?: string;
  specs?: Record<string, string>;
  stock?: number;
  colors?: string[];
  currency?: string;
  inStock?: boolean;
  filterSpecs?: Record<string, string>;
}

// Get first image from various formats
export function getFirstImage(images: Product["images"] | undefined): string {
  if (!images) return "/products/placeholder.svg";

  // If array of strings
  if (Array.isArray(images)) {
    return images[0] || "/products/placeholder.svg";
  }

  // If object with color variants
  if (typeof images === "object") {
    const firstKey = Object.keys(images)[0];
    if (firstKey) {
      const value = images[firstKey];
      if (Array.isArray(value)) {
        return value[0] || "/products/placeholder.svg";
      }
      if (typeof value === "string") {
        return value;
      }
    }
  }

  return "/products/placeholder.svg";
}

// Favorites types
export interface FavoritesItem {
  _id?: string;
  productId: string;
  product?: Product;
  createdAt?: string;
}

// Constants
export const FAVORITES_STORAGE_KEY = "e-store-favorites";

// Get favorites from localStorage
export function getLocalFavorites(): string[] {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Save favorites to localStorage
export function saveLocalFavorites(productIds: string[]) {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(productIds));
}
