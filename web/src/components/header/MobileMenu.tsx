import { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { BurgerIcon, CloseIcon, FavoritesIcon, CartIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { useAuth } from "@/hooks";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact Us" },
  { to: "/blog", label: "Blog" }
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, isAuthenticated, signOut } = useAuth();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <Logo className="h-8 w-auto" />
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-black"
              aria-label="Close menu"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="space-y-1">
              {navItems.map(item => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-3 text-lg font-medium transition-colors ${
                        isActive ? "bg-gray-100 text-black" : "text-gray-600 hover:bg-gray-50 hover:text-black"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="my-6 border-t border-gray-100" />

            {/* Quick Links */}
            <ul className="space-y-1">
              <li>
                <Link
                  to="/favorites"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-lg font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-black"
                >
                  <FavoritesIcon className="h-6 w-6" />
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-lg font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-black"
                >
                  <CartIcon className="h-6 w-6" />
                  Cart
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer - Auth */}
          <div className="border-t border-gray-100 px-6 py-6">
            {isAuthenticated && user ? (
              <div>
                <p className="mb-1 font-medium text-black">
                  {user.firstName} {user.lastName}
                </p>
                <p className="mb-4 text-sm text-gray-500">{user.email}</p>
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    onClick={onClose}
                    className="block w-full rounded-lg border border-gray-200 py-3 text-center text-sm font-medium text-black transition-colors hover:bg-gray-50"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      onClose();
                    }}
                    className="block w-full rounded-lg bg-red-50 py-3 text-center text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/auth/signin"
                  onClick={onClose}
                  className="block w-full rounded-lg bg-black py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/signup"
                  onClick={onClose}
                  className="block w-full rounded-lg border border-gray-300 py-3 text-center text-sm font-semibold text-black transition-colors hover:bg-gray-50"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-black lg:hidden"
      aria-label="Open menu"
    >
      <BurgerIcon className="h-8 w-8" />
    </button>
  );
}

export default MobileMenu;
