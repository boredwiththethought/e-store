import { Link } from "react-router-dom";
import { Logo } from "@/components/logo";
import { FacebookIcon, InstagramIcon, TwitterIcon, TikTokIcon } from "@/components/icons";

function Footer() {
  return (
    <footer className="mt-24 bg-black text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-[1440px] px-4 py-24 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Logo theme="light" className="h-16 w-auto" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-gray-400">
              Your one-stop shop for the latest electronics and gadgets. Quality products, competitive prices, and
              excellent customer service.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Shop</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/products" className="text-sm text-gray-400 transition-colors hover:text-white">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/category/phones" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Phones
                </Link>
              </li>
              <li>
                <Link to="/category/computers" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Computers
                </Link>
              </li>
              <li>
                <Link to="/category/smart-watches" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Smart Watches
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/about" className="text-sm text-gray-400 transition-colors hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/help" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-8 lg:px-16">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} E-Store. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-gray-400 transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-400 transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
