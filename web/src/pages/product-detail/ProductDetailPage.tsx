import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  HeartIcon,
  ShoppingCartIcon,
  TruckIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useCart } from "@/context";
import { type Product, getFirstImage, getLocalFavorites, saveLocalFavorites } from "@/types";
import { api } from "@/config";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  // Selected variants
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedStorage, setSelectedStorage] = useState<string | undefined>();

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(api.product(id));
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        const productData = data.data || data;
        setProduct(productData);

        // Set default color
        if (productData.colors?.length > 0) {
          setSelectedColor(productData.colors[0]);
        }

        // Check if favorite
        const favorites = getLocalFavorites();
        setIsFavorite(favorites.includes(productData._id || productData.id));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleToggleFavorite = () => {
    if (!product) return;
    const productId = product._id || product.id;
    const favorites = getLocalFavorites();

    if (isFavorite) {
      saveLocalFavorites(favorites.filter(id => id !== productId));
    } else {
      saveLocalFavorites([...favorites, productId]);
    }
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, {
      color: selectedColor,
      storage: selectedStorage
    });
    navigate("/cart");
  };

  // Get image based on selected color
  const getProductImage = () => {
    if (!product?.images) return "/products/placeholder.svg";

    if (typeof product.images === "object" && !Array.isArray(product.images) && selectedColor) {
      const colorImages = product.images[selectedColor];
      if (Array.isArray(colorImages) && colorImages[0]) {
        return colorImages[0];
      }
    }

    return getFirstImage(product.images);
  };

  // Extract storage options from specs
  const getStorageOptions = () => {
    if (!product?.specs?.storage) return [];
    // Check if it's a single value or list
    const storage = product.specs.storage;
    if (storage.includes("/")) {
      return storage.split("/").map(s => s.trim());
    }
    return [storage];
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-lg text-gray-600">{error || "Product not found"}</p>
        <button onClick={() => navigate(-1)} className="rounded-lg bg-gray-900 px-6 py-2 text-white hover:bg-gray-800">
          Go Back
        </button>
      </div>
    );
  }

  const storageOptions = getStorageOptions();
  const specs = product.specs || {};
  const specEntries = Object.entries(specs);
  const visibleSpecs = showAllSpecs ? specEntries : specEntries.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6 md:px-6 lg:px-8 lg:py-8">
        {/* Breadcrumbs */}
        <div className="mb-4 sm:mb-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              ...(product.category ? [{ label: product.category, href: `/category/${product.category}` }] : []),
              { label: product.name }
            ]}
          />
        </div>

        {/* Main Product Section */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white p-4 shadow-sm sm:max-w-md sm:p-6 md:max-w-lg md:rounded-3xl md:p-8">
              <img
                src={getProductImage()}
                alt={product.name}
                className="h-auto w-full object-contain"
                style={{ aspectRatio: "1/1" }}
              />
              {product.tags?.includes("new") && (
                <span className="absolute top-3 left-3 rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white sm:top-6 sm:left-6 sm:px-3 sm:py-1">
                  NEW
                </span>
              )}
              {product.tags?.includes("sale") && (
                <span className="absolute top-3 left-3 rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white sm:top-6 sm:left-6 sm:px-3 sm:py-1">
                  SALE
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Brand & Title */}
            <div className="mb-3 sm:mb-4">
              {product.brand && (
                <p className="mb-1 text-xs font-medium tracking-wider text-gray-500 uppercase sm:text-sm">
                  {product.brand}
                </p>
              )}
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">{product.name}</h1>
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="mb-4 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating!) ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewsCount} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-4 flex flex-wrap items-baseline gap-2 sm:mb-6 sm:gap-3">
              <span className="text-2xl font-bold text-gray-900 sm:text-3xl">${product.price.toFixed(2)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-base text-gray-400 line-through sm:text-lg">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 sm:text-sm">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="mb-4 text-sm text-gray-600 sm:mb-6 sm:text-base">{product.description}</p>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4 sm:mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Color: <span className="text-gray-500">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-lg border-2 px-3 py-1.5 text-xs font-medium transition-all sm:px-4 sm:py-2 sm:text-sm ${
                        selectedColor === color
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage Selector */}
            {storageOptions.length > 1 && (
              <div className="mb-4 sm:mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Storage: <span className="text-gray-500">{selectedStorage}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {storageOptions.map(storage => (
                    <button
                      key={storage}
                      onClick={() => setSelectedStorage(storage)}
                      className={`rounded-lg border-2 px-3 py-1.5 text-xs font-medium transition-all sm:px-4 sm:py-2 sm:text-sm ${
                        selectedStorage === storage
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:gap-3">
              <button
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 sm:px-6 sm:py-4 sm:text-base"
              >
                <ShoppingCartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                Add to Cart
              </button>
              <button
                onClick={handleToggleFavorite}
                className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-colors sm:px-6 sm:py-4 sm:text-base ${
                  isFavorite
                    ? "border-red-500 bg-red-50 text-red-500"
                    : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {isFavorite ? (
                  <HeartSolidIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
                <span className="hidden sm:inline">{isFavorite ? "Saved" : "Add to Wishlist"}</span>
                <span className="sm:hidden">{isFavorite ? "Saved" : "Wishlist"}</span>
              </button>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-white p-3 shadow-sm sm:gap-4 sm:rounded-2xl sm:p-4 md:grid-cols-4">
              <div className="flex flex-col items-center gap-1 text-center">
                <TruckIcon className="h-5 w-5 text-gray-600 sm:h-6 sm:w-6" />
                <span className="text-[10px] text-gray-600 sm:text-xs">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <ShieldCheckIcon className="h-5 w-5 text-gray-600 sm:h-6 sm:w-6" />
                <span className="text-[10px] text-gray-600 sm:text-xs">2 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <CheckBadgeIcon className="h-5 w-5 text-gray-600 sm:h-6 sm:w-6" />
                <span className="text-[10px] text-gray-600 sm:text-xs">Genuine Product</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <ArrowPathIcon className="h-5 w-5 text-gray-600 sm:h-6 sm:w-6" />
                <span className="text-[10px] text-gray-600 sm:text-xs">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        {specEntries.length > 0 && (
          <div className="mt-8 sm:mt-12">
            <h2 className="mb-4 text-lg font-bold text-gray-900 sm:mb-6 sm:text-xl">Specifications</h2>
            <div className="overflow-hidden rounded-xl bg-white shadow-sm sm:rounded-2xl">
              <div className="divide-y divide-gray-100">
                {visibleSpecs.map(([key, value]) => (
                  <div key={key} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-2 sm:px-6 sm:py-4">
                    <dt className="text-xs font-medium text-gray-500 capitalize sm:text-sm">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </dt>
                    <dd className="text-xs text-gray-900 sm:col-span-2 sm:text-sm">{value}</dd>
                  </div>
                ))}
              </div>
              {specEntries.length > 6 && (
                <div className="border-t border-gray-100 px-4 py-3 sm:px-6 sm:py-4">
                  <button
                    onClick={() => setShowAllSpecs(!showAllSpecs)}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 sm:text-sm"
                  >
                    {showAllSpecs ? "Show less" : `View all ${specEntries.length} specifications`}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
