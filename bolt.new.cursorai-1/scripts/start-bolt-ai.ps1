# Script de lancement Bolt AI Builder
Write-Host "🚀 Lancement Bolt AI Builder - Identique à bolt.new" -ForegroundColor Cyan

Write-Host "`n📋 Vérification des prérequis..." -ForegroundColor Yellow

# Vérifier Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js non installé" -ForegroundColor Red
    exit 1
}

# Vérifier pnpm
try {
    $pnpmVersion = pnpm --version
    Write-Host "✅ pnpm: $pnpmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ pnpm non installé. Installation..." -ForegroundColor Yellow
    npm install -g pnpm
}

# Vérifier les fichiers clés
$keyFiles = @(
    "app/lib/core/leap-compatible-engine.ts",
    "app/lib/terminal/command-executor.ts",
    "app/components/ai-builder/LeapCompatibleBuilder.tsx",
    "app/lib/deployment/github-integration.ts",
    "app/lib/deployment/vercel-integration.ts"
)

Write-Host "`n📁 Vérification des fichiers clés..." -ForegroundColor Yellow
foreach ($file in $keyFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file manquant" -ForegroundColor Red
    }
}

# Installer les dépendances
Write-Host "`n📦 Installation des dépendances..." -ForegroundColor Yellow
pnpm install

# Vérifier le fichier .env
Write-Host "`n🔑 Vérification de la configuration..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✅ Fichier .env trouvé" -ForegroundColor Green
} else {
    Write-Host "⚠️  Fichier .env manquant. Création..." -ForegroundColor Yellow
    @"
# Configuration Bolt AI Builder
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GITHUB_TOKEN=your_github_token_here
VERCEL_TOKEN=your_vercel_token_here
"@ | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "📝 Fichier .env créé. Veuillez configurer vos clés API." -ForegroundColor Yellow
}

# Lancer l'application
Write-Host "`n🚀 Lancement de l'application..." -ForegroundColor Yellow
Write-Host "L'application sera accessible sur: http://localhost:5173" -ForegroundColor Cyan

Write-Host "`n🎯 Test recommandé:" -ForegroundColor Cyan
Write-Host "1. Ouvrez http://localhost:5173" -ForegroundColor White
Write-Host "2. Tapez: 'Créer une app de gestion de tâches avec auth et DB'" -ForegroundColor White
Write-Host "3. Observez l'exécution automatique de TOUTES les commandes !" -ForegroundColor White

Write-Host "`n🎉 Bolt AI Builder = bolt.new !" -ForegroundColor Magenta

# Lancer en mode développement
pnpm dev
