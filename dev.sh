#!/bin/bash

echo "🚀 Starting E-Store Development Environment..."
echo ""
echo "📦 Installing dependencies if needed..."

# Check if bun is installed
if ! command -v bun &> /dev/null
then
    echo "❌ Bun is not installed. Please install it first:"
    echo "curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

# Install dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing root dependencies..."
    bun install
fi

if [ ! -d "server/node_modules" ]; then
    echo "Installing server dependencies..."
    cd server && bun install && cd ..
fi

if [ ! -d "web/node_modules" ]; then
    echo "Installing web dependencies..."
    cd web && bun install && cd ..
fi

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "🔧 Starting development servers..."
echo "   Server: http://localhost:3000"
echo "   Web:    http://localhost:5173"
echo ""

# Start development
bun run dev
