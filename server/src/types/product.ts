import { ObjectId } from "mongodb";

// Base product interface
export interface Product {
  _id?: ObjectId;
  id: string;
  slug?: string;
  name: string;
  model?: string;
  brand: string;
  category: ProductCategory;
  subcategory?: string;
  price: number;
  oldPrice?: number | null;
  originalPrice?: number | null;
  inStock?: boolean;
  stockQuantity?: number;
  releaseYear?: number;
  colors?: string[];
  images: string[] | Record<string, ProductImage | string>;
  thumbnail?: string;
  specs?: Record<string, unknown>;
  filterSpecs?: FilterSpecs;
  tags?: string[];
  rating?: number;
  reviewsCount?: number;
  description?: string;
  imageSource?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductCategory =
  | "phones"
  | "smartwatches"
  | "cameras"
  | "headphones"
  | "computers"
  | "gaming";

export interface ProductImage {
  static?: string;
  front?: string;
  camera?: string;
  profile?: string;
  back?: string;
  [key: string]: string | undefined;
}

// Filter specs for different categories
export interface FilterSpecs {
  // Phones
  batteryCapacity?: number;
  screenType?: string;
  screenDiagonal?: number;
  protectionClass?: string;
  builtInMemory?: number[];

  // Smartwatches
  batteryLife?: number;
  storage?: number;

  // Cameras
  sensorType?: string;
  megapixels?: number;
  videoResolution?: string;
  stabilization?: boolean;
  weatherSealed?: boolean;

  // Headphones
  type?: string;
  anc?: boolean;
  totalBatteryLife?: number;
  wireless?: boolean;
  hiRes?: boolean;

  // Computers
  screenSize?: number;
  processor?: string;
  ram?: number[];

  // Gaming
  discDrive?: boolean;
  resolution?: string;
  portable?: boolean;
  vr?: boolean;
  gamePass?: boolean;
  displayType?: string;
  displaySize?: number;
}

// Product query filters
export interface ProductFilters {
  category?: ProductCategory;
  subcategory?: string;
  brand?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  colors?: string[];
  search?: string;
  // Dynamic filter specs
  [key: string]: unknown;
}

// Pagination
export interface PaginationOptions {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Cart item
export interface CartItem {
  productId: string;
  quantity: number;
  color?: string;
  storage?: string;
  addedAt: Date;
}

// User cart
export interface Cart {
  _id?: ObjectId;
  userId: string;
  items: CartItem[];
  updatedAt: Date;
}

// Favorite item
export interface Favorite {
  _id?: ObjectId;
  userId: string;
  productIds: string[];
  updatedAt: Date;
}
