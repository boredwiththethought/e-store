import { Link } from "react-router-dom";
import { LikeIcon } from "@/components/icons";
import SecondaryButton from "@/components/ui/buttons/SecondaryButton";
import { type Product, getFirstImage } from "@/types";

interface ProductTabsCellProps {
  product: Product;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
}

function ProductTabsCell({ product, isFavorite = false, onToggleFavorite }: ProductTabsCellProps) {
  const productId = product._id || product.id;
  const productUrl = `/product/${productId}`;
  const imageUrl = getFirstImage(product.images);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(productId);
  };

  return (
    <div className="cell flex flex-col items-center gap-2 rounded-xl bg-[#F6F6F6] p-3 text-center sm:gap-3 sm:p-4 md:gap-4 md:p-6">
      {/* Wishlist / Favorites Button */}
      <div className="flex w-full justify-end">
        <button
          onClick={handleFavoriteClick}
          className="p-1 transition-colors"
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <LikeIcon
            className={`h-5 w-5 transition-colors sm:h-6 sm:w-6 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
          />
        </button>
      </div>

      {/* Product Image - clickable to product page */}
      <Link to={productUrl} className="block w-full">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-24 w-full object-contain transition-transform hover:scale-105 sm:h-32 md:h-40"
        />
      </Link>

      {/* Product Name - clickable to product page */}
      <Link to={productUrl} className="hover:underline">
        <p className="font-inter line-clamp-2 text-xs font-medium sm:text-sm md:text-base">{product.name}</p>
      </Link>

      {/* Product Price */}
      <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
        <p className="font-inter text-base font-semibold tracking-tight sm:text-lg md:text-xl lg:text-2xl">
          ${product.price}
        </p>
        {product.originalPrice && product.originalPrice > product.price && (
          <p className="font-inter text-xs text-gray-400 line-through sm:text-sm md:text-base">
            ${product.originalPrice}
          </p>
        )}
      </div>

      {/* Buy Now Button - goes to product page */}
      <div className="w-full">
        <Link to={productUrl} className="block">
          <SecondaryButton onClick={() => {}} className="w-full text-xs sm:text-sm">
            Buy Now
          </SecondaryButton>
        </Link>
      </div>
    </div>
  );
}

export default ProductTabsCell;
