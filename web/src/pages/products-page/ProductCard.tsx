import { Link } from "react-router-dom";
import { HeartIcon, StarIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { type Product, getFirstImage } from "@/types";

interface ProductCardProps {
  product: Product;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
}

function ProductCard({ product, isFavorite = false, onToggleFavorite }: ProductCardProps) {
  const productId = product._id || product.id;
  const productUrl = `/product/${productId}`;
  const imageUrl = getFirstImage(product.images);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(productId);
  };

  return (
    <Link
      to={productUrl}
      className="group relative flex flex-col rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-all hover:border-gray-200 hover:shadow-lg sm:p-4"
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
          -{discount}%
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 z-10 rounded-full bg-white p-2 shadow-md transition-all hover:scale-110"
        aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isFavorite ? (
          <HeartSolidIcon className="h-5 w-5 text-red-500" />
        ) : (
          <HeartIcon className="h-5 w-5 text-gray-400 hover:text-red-500" />
        )}
      </button>

      {/* Product Image */}
      <div className="mb-4 flex h-36 items-center justify-center overflow-hidden sm:h-40 md:h-48">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col">
        {/* Brand */}
        {product.brand && (
          <span className="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase">{product.brand}</span>
        )}

        {/* Name */}
        <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-blue-600">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="mb-3 flex items-center gap-1">
            <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            {product.reviewsCount && <span className="text-xs text-gray-500">({product.reviewsCount})</span>}
          </div>
        )}

        {/* Price */}
        <div className="mt-auto">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <span className="text-lg font-bold text-gray-900 sm:text-xl">${product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through sm:text-sm">${product.originalPrice}</span>
            )}
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 py-2 text-xs font-medium text-white transition-colors group-hover:bg-gray-800 sm:mt-4 sm:py-2.5 sm:text-sm">
          View Details
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
