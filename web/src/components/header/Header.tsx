import { useState } from "react";
import { SearchInput } from "@/components/ui";
import { Logo } from "@/components/logo";
import Navigation from "./Navigation";
import HeaderActions from "./HeaderActions";
import { MobileMenu, MobileMenuButton } from "./MobileMenu";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white">
        {/* Desktop Header */}
        <div className="container mx-auto hidden items-center gap-8 px-4 py-4 lg:grid lg:grid-cols-[auto_1fr_auto_auto]">
          {/* Logo */}
          <Logo className="h-8 w-auto" />

          {/* Search Input - Takes available space */}
          <div className="flex justify-center">
            <SearchInput placeholder="Search" onSearch={value => console.log("Search:", value)} />
          </div>

          {/* Navigation */}
          <div className="mr-8">
            <Navigation />
          </div>

          {/* Actions: Favorites, Cart, User */}
          <HeaderActions />
        </div>

        {/* Tablet/Mobile Header */}
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 lg:hidden">
          {/* Logo */}
          <Logo className="h-6 w-auto sm:h-7" />

          {/* Search Input - Tablet only */}
          <div className="hidden flex-1 px-4 md:block">
            <SearchInput placeholder="Search" onSearch={value => console.log("Search:", value)} className="w-full" />
          </div>

          {/* Actions - Tablet only */}
          <div className="hidden sm:block">
            <HeaderActions />
          </div>

          {/* Mobile Menu Button */}
          <MobileMenuButton onClick={() => setMobileMenuOpen(true)} />
        </div>

        {/* Mobile Search - Only on mobile */}
        <div className="border-t border-gray-100 px-4 py-3 md:hidden">
          <SearchInput
            placeholder="Search products..."
            onSearch={value => console.log("Search:", value)}
            className="w-full"
          />
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}

export default Header;
