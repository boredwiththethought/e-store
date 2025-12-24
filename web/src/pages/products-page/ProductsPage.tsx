import { useState, useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Squares2X2Icon, Bars3Icon, FunnelIcon } from "@heroicons/react/24/outline";
import FilterSidebar, { type FilterState } from "./FilterSidebar";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { type Product, getLocalFavorites, saveLocalFavorites } from "@/types";
import { api } from "@/config";

const CATEGORY_LABELS: Record<string, string> = {
  phones: "Phones",
  smartwatches: "Smart Watches",
  cameras: "Cameras",
  headphones: "Headphones",
  computers: "Computers",
  gaming: "Gaming"
};

const ITEMS_PER_PAGE = 12;

type SortOption = "relevance" | "price-asc" | "price-desc" | "rating" | "newest";

function ProductsPage() {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get("search") || "",
    category: category || "",
    brands: [],
    priceRange: [0, 10000],
    batteryCapacity: [],
    screenSize: [],
    protectionClass: [],
    storage: []
  });

  // Load favorites from localStorage
  useEffect(() => {
    const localFavorites = getLocalFavorites();
    setFavorites(new Set(localFavorites));
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = category ? `${api.products}?category=${category}` : api.products;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data.data || data.products || data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  // Update category filter when URL changes
  useEffect(() => {
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
  }, [category]);

  // Get unique brands from products
  const availableBrands = useMemo(() => {
    const brands = new Set(products.map(p => p.brand).filter(Boolean));
    return Array.from(brands).sort() as string[];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.brand?.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower)
      );
    }

    // Brand filter
    if (filters.brands.length > 0) {
      result = result.filter(p => p.brand && filters.brands.includes(p.brand));
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        result.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
        break;
    }

    return result;
  }, [products, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  // Toggle favorite
  const handleToggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
    saveLocalFavorites(Array.from(newFavorites));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-4">
          <Breadcrumbs
            items={
              category
                ? [
                    { label: "Home", href: "/" },
                    { label: "Products", href: "/products" },
                    { label: CATEGORY_LABELS[category] || category }
                  ]
                : [{ label: "Home", href: "/" }, { label: "All Products" }]
            }
          />
        </div>

        {/* Page Header */}
        <div className="mb-4 sm:mb-8">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
            {category ? CATEGORY_LABELS[category] || category : "All Products"}
          </h1>
          <p className="mt-1 text-sm text-gray-600 sm:mt-2">{filteredProducts.length} products found</p>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              availableBrands={availableBrands}
              currentCategory={category}
            />
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-gray-900 px-4 py-3 text-white shadow-lg lg:hidden"
          >
            <FunnelIcon className="h-5 w-5" />
            Filters
          </button>

          {/* Mobile Filter Sidebar */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
              <div className="absolute top-0 right-0 h-full w-80 max-w-full overflow-y-auto bg-white p-4">
                <button onClick={() => setShowMobileFilters(false)} className="mb-4 text-sm text-gray-600">
                  ← Close
                </button>
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={setFilters}
                  availableBrands={availableBrands}
                  currentCategory={category}
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white p-3 shadow-sm sm:mb-6 sm:gap-4 sm:p-4">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-gray-600">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as SortOption)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-1 rounded-lg border border-gray-300 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded p-2 ${
                    viewMode === "grid" ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  aria-label="Grid view"
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded p-2 ${
                    viewMode === "list" ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  aria-label="List view"
                >
                  <Bars3Icon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
              </div>
            )}

            {/* Error State */}
            {error && <div className="rounded-lg bg-red-50 p-6 text-center text-red-600">{error}</div>}

            {/* Empty State */}
            {!loading && !error && filteredProducts.length === 0 && (
              <div className="rounded-lg bg-white p-12 text-center">
                <p className="text-lg text-gray-600">No products found</p>
                <p className="mt-2 text-sm text-gray-400">Try adjusting your filters or search terms</p>
              </div>
            )}

            {/* Product Grid */}
            {!loading && !error && paginatedProducts.length > 0 && (
              <>
                <div
                  className={`grid gap-3 sm:gap-4 md:gap-6 ${
                    viewMode === "grid" ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                  }`}
                >
                  {paginatedProducts.map(product => (
                    <ProductCard
                      key={product._id || product.id}
                      product={product}
                      isFavorite={favorites.has(product._id || product.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalItems={filteredProducts.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
