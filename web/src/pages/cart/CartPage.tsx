import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TrashIcon, MinusIcon, PlusIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context";
import { getFirstImage } from "@/types";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, subtotal, tax, shipping, total, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true);
    }
  };

  const discount = promoApplied ? subtotal * 0.1 : 0;
  const finalTotal = total - discount;

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-sm">
            <ShoppingBagIcon className="mb-4 h-16 w-16 text-gray-300" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="mb-6 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
            <Link
              to="/products"
              className="rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6 md:px-6 lg:px-8 lg:py-8">
        {/* Breadcrumbs */}
        <div className="mb-4">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shopping Cart" }]} />
        </div>

        {/* Header */}
        <div className="mb-4 flex items-center justify-between sm:mb-8">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">Shopping Cart</h1>
          <button onClick={clearCart} className="text-xs text-gray-500 transition-colors hover:text-red-500 sm:text-sm">
            Clear all
          </button>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-3 sm:space-y-4">
              {items.map(item => (
                <div
                  key={`${item.productId}-${item.selectedColor}-${item.selectedStorage}`}
                  className="flex gap-3 rounded-xl bg-white p-3 shadow-sm sm:gap-4 sm:rounded-2xl sm:p-4 md:p-6"
                >
                  {/* Product Image */}
                  <Link
                    to={`/product/${item.productId}`}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-24 sm:w-24 md:h-32 md:w-32 md:rounded-xl"
                  >
                    <img
                      src={getFirstImage(item.product.images)}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div className="min-w-0 flex-1 pr-2">
                        <Link
                          to={`/product/${item.productId}`}
                          className="line-clamp-2 text-sm font-semibold text-gray-900 hover:underline sm:text-base"
                        >
                          {item.product.name}
                        </Link>
                        {item.product.brand && <p className="text-xs text-gray-500 sm:text-sm">{item.product.brand}</p>}
                        <div className="mt-1 flex flex-wrap gap-2 text-[10px] text-gray-500 sm:text-xs">
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          {item.selectedStorage && <span>Storage: {item.selectedStorage}</span>}
                        </div>
                        <p className="mt-1 hidden text-xs text-gray-400 sm:block">
                          SKU: {item.productId.slice(0, 8).toUpperCase()}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="h-7 w-7 shrink-0 rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 sm:h-8 sm:w-8"
                        aria-label="Remove item"
                      >
                        <TrashIcon className="mx-auto h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-2 pt-2 sm:pt-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center rounded-lg border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-gray-500 transition-colors hover:bg-gray-100 sm:h-10 sm:w-10"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium sm:w-12">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-gray-500 transition-colors hover:bg-gray-100 sm:h-10 sm:w-10"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-base font-bold text-gray-900 sm:text-lg">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-4 sm:mt-6">
              <Link to="/products" className="text-xs font-medium text-gray-600 hover:text-gray-900 sm:text-sm">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6">
              <h2 className="mb-4 text-base font-bold text-gray-900 sm:mb-6 sm:text-lg">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-4 sm:mb-6">
                <label className="mb-2 block text-xs font-medium text-gray-700 sm:text-sm">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    disabled={promoApplied}
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-gray-900 focus:outline-none disabled:bg-gray-50 sm:px-4 sm:text-sm"
                  />
                  <button
                    onClick={handleApplyPromo}
                    disabled={promoApplied || !promoCode}
                    className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:text-sm"
                  >
                    {promoApplied ? "Applied" : "Apply"}
                  </button>
                </div>
                {promoApplied && <p className="mt-2 text-xs text-green-600 sm:text-sm">Code "SAVE10" applied!</p>}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 border-t border-gray-100 pt-3 sm:space-y-3 sm:pt-4">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-green-600">Discount (10%)</span>
                    <span className="text-green-600">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-gray-900">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500">Tax (10%)</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="mt-3 flex justify-between border-t border-gray-100 pt-3 sm:mt-4 sm:pt-4">
                <span className="text-base font-bold text-gray-900 sm:text-lg">Total</span>
                <span className="text-base font-bold text-gray-900 sm:text-lg">${finalTotal.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate("/checkout")}
                className="mt-4 w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 sm:mt-6 sm:py-4 sm:text-base"
              >
                Proceed to Checkout
              </button>

              {/* Trust Badges */}
              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-400">
                <span>🔒 Secure checkout</span>
                <span>•</span>
                <span>Free returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
