import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon } from "@/components/icons";
import { useAuth } from "@/hooks";

export function UserDropdown() {
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center text-[#2E2E2E] transition-colors hover:text-black"
      >
        <UserIcon className="h-8 w-8" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
          {isAuthenticated && user ? (
            <>
              {/* User Info */}
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="font-medium text-black">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              {/* Menu Items */}
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                My Profile
              </Link>
              <Link
                to="/orders"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                My Orders
              </Link>
              <Link
                to="/favorites"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                Favorites
              </Link>

              {/* Sign Out */}
              <div className="mt-2 border-t border-gray-100 pt-2">
                <button
                  onClick={handleSignOut}
                  className="block w-full px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Guest Menu */}
              <div className="px-4 py-3">
                <p className="text-sm text-gray-600">Sign in to access your account</p>
              </div>

              <div className="space-y-2 border-t border-gray-100 px-4 py-3">
                <Link
                  to="/auth/signin"
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-lg bg-black py-2 text-center text-sm font-medium text-white transition-colors hover:bg-gray-800"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/signup"
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-lg border border-gray-300 py-2 text-center text-sm font-medium text-black transition-colors hover:bg-gray-50"
                >
                  Create Account
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
