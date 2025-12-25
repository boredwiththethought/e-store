import { useState } from "react";
import { MagnifyingGlassIcon, ChevronDownIcon, ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/outline";

export interface FilterState {
  search: string;
  category: string;
  brands: string[];
  priceRange: [number, number];
  batteryCapacity: string[];
  screenSize: string[];
  protectionClass: string[];
  storage: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableBrands: string[];
  currentCategory?: string;
}

const CATEGORIES = [
  { id: "phones", label: "📱 Phones" },
  { id: "smartwatches", label: "⌚ Smart Watches" },
  { id: "cameras", label: "📷 Cameras" },
  { id: "headphones", label: "🎧 Headphones" },
  { id: "computers", label: "💻 Computers" },
  { id: "gaming", label: "🎮 Gaming" }
];

const BATTERY_OPTIONS = ["3000-4000mAh", "4000-5000mAh", "5000-6000mAh", "6000mAh+"];

const SCREEN_SIZE_OPTIONS = ["5.0-5.5 inch", "5.5-6.0 inch", "6.0-6.5 inch", "6.5-7.0 inch", "7.0 inch+"];

const PROTECTION_OPTIONS = ["IP67", "IP68", "IP69", "MIL-STD-810"];

const STORAGE_OPTIONS = ["64GB", "128GB", "256GB", "512GB", "1TB"];

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 py-4">
      <button onClick={() => setIsOpen(!isOpen)} className="flex w-full items-center justify-between text-left">
        <span className="font-medium text-gray-900">{title}</span>
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

function FilterSidebar({ filters, onFiltersChange, availableBrands, currentCategory }: FilterSidebarProps) {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray as FilterState[typeof key]);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: "",
      category: currentCategory || "",
      brands: [],
      priceRange: [0, 10000],
      batteryCapacity: [],
      screenSize: [],
      protectionClass: [],
      storage: []
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.brands.length > 0 ||
    filters.batteryCapacity.length > 0 ||
    filters.screenSize.length > 0 ||
    filters.protectionClass.length > 0 ||
    filters.storage.length > 0;

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4 lg:sticky lg:top-4">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <XMarkIcon className="h-4 w-4" />
              Clear all
            </button>
          )}
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={e => updateFilter("search", e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Category */}
        {!currentCategory && (
          <FilterSection title="Category">
            <div className="space-y-2">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === ""}
                  onChange={() => updateFilter("category", "")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-900">All Categories</span>
              </label>
              {CATEGORIES.map(cat => (
                <label key={cat.id} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === cat.id}
                    onChange={() => updateFilter("category", cat.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{cat.label}</span>
                </label>
              ))}
            </div>
          </FilterSection>
        )}

        {/* Brands */}
        <FilterSection title="Brand">
          <div className="max-h-48 space-y-2 overflow-y-auto">
            {availableBrands.length > 0 ? (
              availableBrands.map(brand => (
                <label key={brand} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => toggleArrayFilter("brands", brand)}
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{brand}</span>
                </label>
              ))
            ) : (
              <p className="text-sm text-gray-500">Loading brands...</p>
            )}
          </div>
        </FilterSection>

        {/* Battery Capacity */}
        <FilterSection title="Battery Capacity" defaultOpen={false}>
          <div className="space-y-2">
            {BATTERY_OPTIONS.map(option => (
              <label key={option} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.batteryCapacity.includes(option)}
                  onChange={() => toggleArrayFilter("batteryCapacity", option)}
                  className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Screen Size */}
        <FilterSection title="Screen Size" defaultOpen={false}>
          <div className="space-y-2">
            {SCREEN_SIZE_OPTIONS.map(option => (
              <label key={option} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.screenSize.includes(option)}
                  onChange={() => toggleArrayFilter("screenSize", option)}
                  className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Protection Class */}
        <FilterSection title="Protection Class" defaultOpen={false}>
          <div className="space-y-2">
            {PROTECTION_OPTIONS.map(option => (
              <label key={option} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.protectionClass.includes(option)}
                  onChange={() => toggleArrayFilter("protectionClass", option)}
                  className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Storage */}
        <FilterSection title="Built-in Memory" defaultOpen={false}>
          <div className="space-y-2">
            {STORAGE_OPTIONS.map(option => (
              <label key={option} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.storage.includes(option)}
                  onChange={() => toggleArrayFilter("storage", option)}
                  className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </aside>
  );
}

export default FilterSidebar;
