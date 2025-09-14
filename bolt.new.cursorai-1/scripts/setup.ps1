# Script de configuration pour Bolt AI Builder (PowerShell)
Write-Host "🚀 Configuration de Bolt AI Builder..." -ForegroundColor Green

# Vérifier si Node.js est installé
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js version $nodeVersion détectée" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js n'est pas installé. Veuillez installer Node.js 18.18.0 ou supérieur." -ForegroundColor Red
    exit 1
}

# Vérifier si pnpm est installé
try {
    pnpm -v | Out-Null
    Write-Host "✅ pnpm installé" -ForegroundColor Green
} catch {
    Write-Host "📦 Installation de pnpm..." -ForegroundColor Yellow
    npm install -g pnpm
}

# Installer les dépendances
Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
pnpm install

# Copier le fichier d'environnement
if (-not (Test-Path ".env")) {
    Write-Host "📝 Création du fichier .env..." -ForegroundColor Yellow
    Copy-Item "env.example" ".env"
    Write-Host "⚠️  Veuillez configurer votre clé API Anthropic dans le fichier .env" -ForegroundColor Yellow
}

# Vérifier TypeScript
Write-Host "🔍 Vérification TypeScript..." -ForegroundColor Yellow
pnpm typecheck

Write-Host ""
Write-Host "🎉 Configuration terminée !" -ForegroundColor Green
Write-Host ""
Write-Host "Prochaines étapes :" -ForegroundColor Cyan
Write-Host "1. Configurez votre clé API Anthropic dans .env"
Write-Host "2. Lancez l'application avec : pnpm dev"
Write-Host "3. Ouvrez http://localhost:5173 dans votre navigateur"
Write-Host ""
Write-Host "Pour déployer sur Vercel :" -ForegroundColor Cyan
Write-Host "1. Installez Vercel CLI : npm i -g vercel"
Write-Host "2. Connectez votre repository GitHub à Vercel"
Write-Host "3. Configurez les variables d'environnement dans Vercel"
Write-Host ""
