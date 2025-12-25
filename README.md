# E-Store 🛒

Modern e-commerce platform for electronics built with **Bun + React 19 + Express + MongoDB + TypeScript**.

![React](https://img.shields.io/badge/React-19.2-blue)
![Vite](https://img.shields.io/badge/Vite-7.3-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-cyan)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Bun](https://img.shields.io/badge/Bun-Runtime-orange)

## 🚀 Quick Start

```bash
# Install dependencies (workspaces)
bun install

# Run development (server + web)
bun run dev
```

- **Web**: http://localhost:5173
- **API**: http://localhost:3000

## 📁 Project Structure

```
e-store/
├── server/              # Backend API (Express + TypeScript)
│   └── src/
│       ├── index.ts     # Entry point
│       ├── db/          # MongoDB connection
│       ├── routes/      # API routes
│       ├── middleware/  # JWT auth
│       └── data/        # JSON product files
│
├── web/                 # Frontend (React 19 + Vite + Tailwind v4)
│   └── src/
│       ├── App.tsx      # Main app with routes
│       ├── pages/       # Page components
│       ├── components/  # UI components
│       └── context/     # Auth & Cart context
│
├── package.json         # Root with workspaces
└── README.md
```

## 🛠 Tech Stack

### Frontend
- **React 19.2** with React Router v7
- **Vite 7.3** for fast builds
- **Tailwind CSS v4** with @theme syntax
- **TypeScript 5.9**

### Backend
- **Express 4** REST API
- **MongoDB Atlas** with native driver
- **JWT Authentication**
- **Mock data fallback** (JSON files when DB unavailable)

## 📦 Categories

- 📱 Phones (25 products)
- ⌚ Smart Watches (20 products)
- 📷 Cameras (20 products)
- 🎧 Headphones (25 products)
- 💻 Computers (25 products)
- 🎮 Gaming (20 products)

**Total: 135 products**

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products (with filters) |
| GET | /api/products/:id | Get product by ID |
| GET | /api/products/category/:category | Get by category |
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/cart | Get cart (auth) |
| POST | /api/cart | Add to cart (auth) |
| GET | /api/favorites | Get favorites (auth) |

## 🚀 Deployment (Vercel)

### Frontend (web/)
1. Import boredwiththethought/e-store on Vercel
2. Root Directory: web
3. Framework: Vite
4. Build: bun run build
5. Output: dist

### Backend (server/)
1. Create new Vercel project
2. Root Directory: server
3. Build: bun run build
4. Add environment variables:
   - MONGODB_URI
   - JWT_SECRET

## 📝 Environment Variables

### server/.env
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
PORT=3000
```

### web/.env
```env
VITE_API_URL=http://localhost:3000
```

## 🔧 Scripts

```bash
# Root
bun install          # Install all workspace deps
bun run dev          # Run both server & web

# Server
cd server
bun run dev          # Development with watch
bun run build        # TypeScript compile

# Web
cd web
bun run dev          # Vite dev server
bun run build        # Production build
bun run preview      # Preview production
```

## ✨ Features

- ✅ Responsive design (mobile-first)
- ✅ Product filtering & search
- ✅ Category navigation with emoji icons
- ✅ Shopping cart with persistence
- ✅ User authentication (JWT)
- ✅ Favorites system
- ✅ Breadcrumbs navigation
- ✅ Price range slider
- ✅ Pagination
- ✅ Mock data fallback

## 📄 License

MIT © 2025
