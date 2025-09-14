#!/bin/bash

echo "🚀 Setting up Dyad Web..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp env.example .env.local
    echo "⚠️  Please update .env.local with your configuration"
fi

# Check if PostgreSQL URL is set
if ! grep -q "POSTGRES_URL=" .env.local || grep -q "POSTGRES_URL=\"\"" .env.local; then
    echo "⚠️  Please set POSTGRES_URL in .env.local"
    echo "   You can use Vercel Postgres or any PostgreSQL database"
fi

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your configuration"
echo "2. Run 'npm run db:push' to setup the database"
echo "3. Run 'npm run dev' to start the development server"
echo ""
echo "For deployment:"
echo "1. Push to GitHub"
echo "2. Connect to Vercel"
echo "3. Set environment variables in Vercel dashboard"
echo "4. Deploy!"
