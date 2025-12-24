import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { SignIn, SignUp, ForgotPassword } from "./pages/auth";
import { Terms, Privacy } from "./pages/legal";
import { Favorites } from "./pages/favorites";
import ProductsPage from "./pages/products-page/ProductsPage";
import { ProductDetailPage } from "./pages/product-detail";
import { CartPage } from "./pages/cart";
import { CheckoutPage } from "./pages/checkout";

import Home from "./pages/home/Home";

function App() {
  return (
    <div className="mx-auto flex min-h-screen max-w-360 flex-col bg-white">
      {/* Header — показывается на всех страницах */}
      <Header />

      {/* Основной контент */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} /> */}

          {/* Auth Routes */}
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />

          {/* Favorites */}
          <Route path="/favorites" element={<Favorites />} />

          {/* Products */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/category/:category" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />

          {/* Cart & Checkout */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Legal Pages */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>

      {/* Footer — показывается на всех страницах */}
      <Footer />
    </div>
  );
}

export default App;
