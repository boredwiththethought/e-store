# E-Store Server

Backend API server for the E-Store application built with Express and TypeScript.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` file with your configuration.

### Development

Run the development server with hot reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000` by default.

### Build

Compile TypeScript to JavaScript:

```bash
npm run build
```

### Production

Run the compiled server:

```bash
npm start
```

## API Endpoints

### Health Check

- `GET /api/health` - Check server health status

### Products

- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details

## Project Structure

```
server/
├── src/
│   └── index.ts       # Main application entry point
├── dist/              # Compiled JavaScript (generated)
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── .env               # Environment variables (not in git)
└── .env.example       # Example environment variables
```

## Technologies

- **Express** - Web framework
- **TypeScript** - Type-safe JavaScript
- **tsx** - TypeScript execution and watch mode
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Next Steps

- [ ] Add database integration (PostgreSQL, MongoDB, etc.)
- [ ] Implement authentication and authorization
- [ ] Add product CRUD operations
- [ ] Implement user management
- [ ] Add order processing
- [ ] Set up testing (Jest, Supertest)
- [ ] Add API documentation (Swagger/OpenAPI)
