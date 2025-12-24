import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Product } from "@/types";

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
  selectedSize?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, options?: { color?: string; storage?: string; size?: string }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

const CART_STORAGE_KEY = "e-store-cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, options?: { color?: string; storage?: string; size?: string }) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item =>
          item.productId === (product._id || product.id) &&
          item.selectedColor === options?.color &&
          item.selectedStorage === options?.storage &&
          item.selectedSize === options?.size
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
          productId: product._id || product.id,
          product,
          quantity: 1,
          selectedColor: options?.color,
          selectedStorage: options?.storage,
          selectedSize: options?.size
        }
      ];
    });
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }
    setItems(prev => prev.map(item => (item.productId === productId ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping over $100
  const total = subtotal + tax + shipping;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        tax,
        shipping,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
