import { Link } from "react-router-dom";
import { FavoritesIcon, CartIcon } from "@/components/icons";
import UserDropdown from "./UserDropdown";

export function HeaderActions() {
  return (
    <div className="flex items-center gap-6">
      {/* Favorites */}
      <Link
        to="/favorites"
        className="flex items-center justify-center text-[#2E2E2E] transition-colors hover:text-black"
      >
        <FavoritesIcon className="h-8 w-8" />
      </Link>

      {/* Cart */}
      <Link to="/cart" className="flex items-center justify-center text-[#2E2E2E] transition-colors hover:text-black">
        <CartIcon className="h-8 w-8" />
      </Link>

      {/* User Dropdown */}
      <UserDropdown />
    </div>
  );
}

export default HeaderActions;
