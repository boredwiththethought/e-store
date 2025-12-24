import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks";
import { LikeIcon } from "@/components/icons";
import SecondaryButton from "@/components/ui/buttons/SecondaryButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { type Product, type FavoritesItem, getFirstImage, getLocalFavorites, saveLocalFavorites } from "@/types";
import { api } from "@/config";

function Favorites() {
  const { isAuthenticated, token } = useAuth();
  const [items, setItems] = useState<FavoritesItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProductsFromIds = async (productIds: string[]) => {
    if (productIds.length === 0) {
      setItems([]);
      return;
    }

    // Fetch product details for each ID
    const products: FavoritesItem[] = [];
    for (const productId of productIds) {
      try {
        const response = await fetch(api.product(productId));
        if (response.ok) {
          const product = await response.json();
          products.push({
            productId,
            product
          });
        }
      } catch (error) {
        console.error(`Error loading product ${productId}:`, error);
      }
    }
    setItems(products);
  };

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);

      if (isAuthenticated && token) {
        // Load from server for authenticated users
        try {
          const response = await fetch(api.favorites, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          setItems(data.favorites || []);
        } catch (error) {
          console.error("Error loading favorites:", error);
          // Fall back to localStorage
          const localIds = getLocalFavorites();
          await loadProductsFromIds(localIds);
        }
      } else {
        // Load from localStorage for guests
        const localIds = getLocalFavorites();
        await loadProductsFromIds(localIds);
      }

      setLoading(false);
    };

    loadFavorites();
  }, [isAuthenticated, token]);

  const handleRemove = async (productId: string) => {
    // Optimistic update
    setItems(prev =>
      prev.filter(item => {
        const id = item.product?._id || item.product?.id || item.productId;
        return id !== productId;
      })
    );

    if (isAuthenticated && token) {
      // Remove from server
      try {
        await fetch(api.favorite(productId), {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        console.error("Error removing from favorites:", error);
      }
    }

    // Always update localStorage
    const localIds = getLocalFavorites().filter(id => id !== productId);
    saveLocalFavorites(localIds);
  };

  const handleAddToCart = (product: Product) => {
    // TODO: Implement cart functionality
    console.log("Add to cart:", product);
    alert(`Added "${product.name}" to cart!`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-8 text-3xl font-bold">My Favorites</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-80 animate-pulse rounded-[9px] bg-gray-100" />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-8 text-3xl font-bold">My Favorites</h1>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 rounded-full bg-gray-100 p-6">
            <LikeIcon className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Your favorites is empty</h2>
          <p className="mb-6 text-gray-500">Start adding products you love!</p>
          <Link
            to="/"
            className="rounded-lg bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-16">
      {/* Breadcrumbs */}
      <div className="mb-4">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "My Favorites" }]} />
      </div>

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold sm:text-3xl">My Favorites</h1>
        <span className="text-gray-500">
          {items.length} item{items.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map(item => {
          const product = item.product;
          if (!product) return null;

          const productId = product._id || product.id;
          const productUrl = `/category/${product.category}/${product.slug || product.id}`;

          return (
            <div
              key={productId}
              className="group flex flex-col items-center gap-4 rounded-[9px] bg-[#F6F6F6] px-4 py-6 text-center"
            >
              {/* Remove Button */}
              <div className="flex w-full justify-end">
                <button
                  onClick={() => handleRemove(productId)}
                  className="p-1 transition-colors"
                  aria-label="Remove from favorites"
                >
                  <LikeIcon className="h-6 w-6 text-red-500 [&_path]:fill-red-500" />
                </button>
              </div>

              {/* Product Image */}
              <Link to={productUrl} className="block w-full">
                <img
                  src={getFirstImage(product.images)}
                  alt={product.name}
                  className="h-40 w-full object-contain transition-transform group-hover:scale-105"
                />
              </Link>

              {/* Product Name */}
              <Link to={productUrl} className="hover:underline">
                <p className="font-inter text-[16px] leading-6 font-medium">{product.name}</p>
              </Link>

              {/* Product Price */}
              <div className="flex items-center gap-2">
                <p className="font-inter text-[24px] leading-6 font-semibold tracking-[3%]">${product.price}</p>
                {product.originalPrice && product.originalPrice > product.price && (
                  <p className="font-inter text-[16px] text-gray-400 line-through">${product.originalPrice}</p>
                )}
              </div>

              {/* Add to Cart Button */}
              <div>
                <SecondaryButton onClick={() => handleAddToCart(product)}>Add to Cart</SecondaryButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Favorites;
