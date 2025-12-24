import { useState, useEffect } from "react";
import ProductTabsCell from "./ProductTabsCell";
import { type Product, getLocalFavorites, saveLocalFavorites } from "@/types";
import { api } from "@/config";

const tabs = [
  { id: "new-arrival", label: "New Arrival" },
  { id: "bestseller", label: "Bestseller" },
  { id: "featured", label: "Featured Products" }
];

function ProductTabs() {
  const [activeTab, setActiveTab] = useState("new-arrival");
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Fetch products by tag
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = `${api.products}?tag=${activeTab}&limit=8`;
        console.log("[ProductTabs] Fetching from:", url);
        const response = await fetch(url);
        const data = await response.json();
        console.log("[ProductTabs] Received products:", data.data?.length, data.data?.[0]);
        setProducts(data.data || []);
      } catch (error) {
        console.error("[ProductTabs] Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeTab]);

  // Load user favorites from server or localStorage
  useEffect(() => {
    const loadFavorites = async () => {
      const token = localStorage.getItem("token");

      // Always load from localStorage first
      const localFavs = getLocalFavorites();
      setFavorites(new Set(localFavs));

      // If authenticated, also sync with server
      if (token) {
        try {
          const response = await fetch(api.favorites, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          const serverFavIds = data.favorites?.map((f: { productId: string }) => f.productId) || [];

          // Merge server and local favorites
          const merged = new Set([...localFavs, ...serverFavIds]);
          setFavorites(merged);
          saveLocalFavorites(Array.from(merged));
        } catch (error) {
          console.error("Error loading favorites:", error);
        }
      }
    };

    loadFavorites();
  }, []);

  const handleToggleFavorite = async (productId: string) => {
    console.log("[ProductTabs] handleToggleFavorite called with:", productId);
    const token = localStorage.getItem("token");
    const isFav = favorites.has(productId);

    // Optimistic update
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      // Save to localStorage
      console.log("[ProductTabs] Saving to localStorage:", Array.from(newFavorites));
      saveLocalFavorites(Array.from(newFavorites));
      return newFavorites;
    });

    // Sync with server if authenticated
    if (token) {
      try {
        if (isFav) {
          await fetch(api.favorite(productId), {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          });
        } else {
          await fetch(api.favorites, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ productId })
          });
        }
      } catch (error) {
        console.error("Error updating favorites:", error);
      }
    }
  };

  return (
    <section className="container mx-auto px-4 py-10 sm:py-12 md:py-16">
      {/* Tabs */}
      <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-gray-200 sm:mb-8 sm:gap-6 md:gap-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`font-inter relative pb-3 text-sm font-medium transition-colors sm:pb-4 sm:text-base md:text-lg ${
              activeTab === tab.id ? "text-black" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && <span className="absolute right-0 bottom-0 left-0 h-0.5 bg-black" />}
          </button>
        ))}
      </div>

      {/* Products Grid - 2 rows x 4 columns = 8 products */}
      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-60 animate-pulse rounded-xl bg-gray-100 sm:h-72 md:h-80" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {products.slice(0, 8).map(product => (
            <ProductTabsCell
              key={product._id || product.id}
              product={product}
              isFavorite={favorites.has(product._id || product.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-gray-500">No products found</div>
      )}
    </section>
  );
}

export default ProductTabs;
