#!/bin/bash

# Script de configuration pour Bolt AI Builder
echo "🚀 Configuration de Bolt AI Builder..."

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js 18.18.0 ou supérieur."
    exit 1
fi

# Vérifier la version de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="18.18.0"

if ! node -e "process.exit(require('semver').gte('$NODE_VERSION', '$REQUIRED_VERSION') ? 0 : 1)" 2>/dev/null; then
    echo "❌ Node.js version $REQUIRED_VERSION ou supérieure requise. Version actuelle: $NODE_VERSION"
    exit 1
fi

echo "✅ Node.js version $NODE_VERSION détectée"

# Vérifier si pnpm est installé
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installation de pnpm..."
    npm install -g pnpm
fi

echo "✅ pnpm installé"

# Installer les dépendances
echo "📦 Installation des dépendances..."
pnpm install

# Copier le fichier d'environnement
if [ ! -f .env ]; then
    echo "📝 Création du fichier .env..."
    cp env.example .env
    echo "⚠️  Veuillez configurer votre clé API Anthropic dans le fichier .env"
fi

# Vérifier TypeScript
echo "🔍 Vérification TypeScript..."
pnpm typecheck

echo ""
echo "🎉 Configuration terminée !"
echo ""
echo "Prochaines étapes :"
echo "1. Configurez votre clé API Anthropic dans .env"
echo "2. Lancez l'application avec : pnpm dev"
echo "3. Ouvrez http://localhost:5173 dans votre navigateur"
echo ""
echo "Pour déployer sur Vercel :"
echo "1. Installez Vercel CLI : npm i -g vercel"
echo "2. Connectez votre repository GitHub à Vercel"
echo "3. Configurez les variables d'environnement dans Vercel"
echo ""
