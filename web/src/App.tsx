import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { SignIn, SignUp, ForgotPassword } from "./pages/auth";
import { Terms, Privacy } from "./pages/legal";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header — показывается на всех страницах */}
      <Header />

      {/* Основной контент */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />

          {/* Auth Routes */}
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />

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

// Временные страницы для теста
function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Home</h1>
      <p className="mt-4 text-gray-600">Добро пожаловать в E-Store!</p>
    </div>
  );
}

function About() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="mt-4 text-gray-600">О нашем магазине</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="mt-4 text-gray-600">Свяжитесь с нами</p>
    </div>
  );
}

function Blog() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="mt-4 text-gray-600">Наш блог</p>
    </div>
  );
}

export default App;
