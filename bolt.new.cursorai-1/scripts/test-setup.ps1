# Script de test pour vérifier l'installation de Bolt AI Builder
Write-Host "🧪 Test de l'installation Bolt AI Builder..." -ForegroundColor Cyan

# Vérifier Node.js
Write-Host "`n📦 Vérification de Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js non trouvé. Veuillez installer Node.js 18.18.0 ou supérieur." -ForegroundColor Red
    exit 1
}

# Vérifier pnpm
Write-Host "`n📦 Vérification de pnpm..." -ForegroundColor Yellow
try {
    $pnpmVersion = pnpm --version
    Write-Host "✅ pnpm: $pnpmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ pnpm non trouvé. Installation..." -ForegroundColor Yellow
    npm install -g pnpm
}

# Vérifier les dépendances
Write-Host "`n📦 Installation des dépendances..." -ForegroundColor Yellow
pnpm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dépendances installées" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur lors de l'installation des dépendances" -ForegroundColor Red
    exit 1
}

# Vérifier le fichier .env
Write-Host "`n🔧 Vérification de la configuration..." -ForegroundColor Yellow
if (Test-Path .env) {
    Write-Host "✅ Fichier .env trouvé" -ForegroundColor Green
    
    # Vérifier les variables importantes
    $envContent = Get-Content .env
    $hasAnthropic = $envContent | Where-Object { $_ -match "ANTHROPIC_API_KEY" -and $_ -notmatch "^#" }
    $hasGitHub = $envContent | Where-Object { $_ -match "GITHUB_TOKEN" -and $_ -notmatch "^#" }
    $hasVercel = $envContent | Where-Object { $_ -match "VERCEL_TOKEN" -and $_ -notmatch "^#" }
    
    if ($hasAnthropic) {
        Write-Host "✅ ANTHROPIC_API_KEY configuré" -ForegroundColor Green
    } else {
        Write-Host "⚠️  ANTHROPIC_API_KEY non configuré" -ForegroundColor Yellow
    }
    
    if ($hasGitHub) {
        Write-Host "✅ GITHUB_TOKEN configuré" -ForegroundColor Green
    } else {
        Write-Host "⚠️  GITHUB_TOKEN non configuré (optionnel)" -ForegroundColor Yellow
    }
    
    if ($hasVercel) {
        Write-Host "✅ VERCEL_TOKEN configuré" -ForegroundColor Green
    } else {
        Write-Host "⚠️  VERCEL_TOKEN non configuré (optionnel)" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Fichier .env non trouvé. Exécutez d'abord ./scripts/setup.ps1" -ForegroundColor Red
    exit 1
}

# Test de compilation
Write-Host "`n🔨 Test de compilation..." -ForegroundColor Yellow
pnpm build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Compilation réussie" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur de compilation" -ForegroundColor Red
    exit 1
}

# Test de linting
Write-Host "`n🔍 Test de linting..." -ForegroundColor Yellow
pnpm lint
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Linting réussi" -ForegroundColor Green
} else {
    Write-Host "⚠️  Avertissements de linting détectés" -ForegroundColor Yellow
}

Write-Host "`n🎉 Tests terminés avec succès !" -ForegroundColor Green
Write-Host "`n📋 Prochaines étapes :" -ForegroundColor Cyan
Write-Host "1. Configurez vos clés API dans le fichier .env" -ForegroundColor White
Write-Host "2. Lancez le serveur de développement : pnpm dev" -ForegroundColor White
Write-Host "3. Ouvrez http://localhost:5173 dans votre navigateur" -ForegroundColor White
Write-Host "4. Commencez à créer des projets avec l'IA !" -ForegroundColor White

Write-Host "`n🚀 Bolt AI Builder est prêt !" -ForegroundColor Magenta
