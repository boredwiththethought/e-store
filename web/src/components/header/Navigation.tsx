import { NavLink } from "react-router-dom";
import { useState, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact Us" },
  { to: "/blog", label: "Blog" }
];

const categories = [
  { to: "/category/phones", label: "📱 Phones" },
  { to: "/category/smartwatches", label: "⌚ Smart Watches" },
  { to: "/category/cameras", label: "📷 Cameras" },
  { to: "/category/headphones", label: "🎧 Headphones" },
  { to: "/category/computers", label: "💻 Computers" },
  { to: "/category/gaming", label: "🎮 Gaming" }
];

function Navigation() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setIsCategoriesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsCategoriesOpen(false);
    }, 150);
  };

  return (
    <nav className="flex items-center gap-8">
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `text-[16px] font-medium transition-colors ${isActive ? "text-black" : "text-[#656565] hover:text-black"}`
          }
        >
          {item.label}
        </NavLink>
      ))}

      {/* Categories Dropdown */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="flex items-center gap-1 text-[16px] font-medium text-[#656565] transition-colors hover:text-black">
          Categories
          <ChevronDownIcon className={`h-4 w-4 transition-transform ${isCategoriesOpen ? "rotate-180" : ""}`} />
        </button>

        {isCategoriesOpen && (
          <div className="absolute top-full left-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
            {categories.map(cat => (
              <NavLink
                key={cat.to}
                to={cat.to}
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm transition-colors ${
                    isActive ? "bg-gray-100 text-black" : "text-gray-700 hover:bg-gray-50 hover:text-black"
                  }`
                }
              >
                {cat.label}
              </NavLink>
            ))}
            <div className="my-2 border-t border-gray-100" />
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `block px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? "bg-gray-100 text-black" : "text-gray-700 hover:bg-gray-50 hover:text-black"
                }`
              }
            >
              All Products
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
