// API Configuration
// On Vercel, set VITE_API_URL to your server URL (e.g., https://e-store-server.vercel.app/api)

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Helper to build API endpoints
export const api = {
  products: `${API_URL}/products`,
  product: (id: string) => `${API_URL}/products/${id}`,
  favorites: `${API_URL}/favorites`,
  favorite: (id: string) => `${API_URL}/favorites/${id}`,
  auth: {
    login: `${API_URL}/auth/signin`,
    register: `${API_URL}/auth/signup`,
    me: `${API_URL}/auth/me`,
    forgotPassword: `${API_URL}/auth/forgot-password`,
    resetPassword: `${API_URL}/auth/reset-password`
  },
  health: `${API_URL}/health`
};

export default API_URL;
