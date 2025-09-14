# Script de lancement de la belle interface
Write-Host "🎨 Lancement de la Belle Interface Bolt AI Builder" -ForegroundColor Cyan

Write-Host "`n✨ Fonctionnalités de la belle interface:" -ForegroundColor Yellow

$features = @(
    "Design glassmorphique moderne avec effets de transparence",
    "Gradients animés en arrière-plan",
    "Arc lumineux avec effets de lueur",
    "Interface inspirée de bolt.new, rocket et fusion",
    "Animations fluides avec Framer Motion",
    "Responsive design pour tous les appareils",
    "Effets de hover et transitions élégantes",
    "Sélecteur d'interface pour basculer entre les modes"
)

foreach ($feature in $features) {
    Write-Host "✅ $feature" -ForegroundColor Green
}

Write-Host "`n🎯 Interfaces disponibles:" -ForegroundColor Yellow
Write-Host "1. Interface d'accueil moderne (/) - Design glassmorphique inspiré des meilleurs" -ForegroundColor White
Write-Host "2. Interface complète (/builder) - Éditeur, terminal, déploiement automatique" -ForegroundColor White

Write-Host "`n🚀 Lancement de l'application..." -ForegroundColor Yellow
Write-Host "L'application sera accessible sur:" -ForegroundColor Cyan
Write-Host "  • Interface d'accueil: http://localhost:5173" -ForegroundColor White
Write-Host "  • Interface complète: http://localhost:5173/builder" -ForegroundColor White

Write-Host "`n🎨 Caractéristiques du design:" -ForegroundColor Yellow
Write-Host "  • Arrière-plan: Gradients animés avec effets de profondeur" -ForegroundColor Gray
Write-Host "  • Glassmorphisme: Transparence et flou d'arrière-plan" -ForegroundColor Gray
Write-Host "  • Effets lumineux: Arcs et lueurs avec animations" -ForegroundColor Gray
Write-Host "  • Typographie: Hiérarchie claire avec contrastes" -ForegroundColor Gray
Write-Host "  • Interactions: Hover effects et transitions fluides" -ForegroundColor Gray
Write-Host "  • Responsive: Adaptation parfaite mobile/desktop" -ForegroundColor Gray

Write-Host "`n🎉 Votre interface est la plus belle !" -ForegroundColor Magenta

# Lancer l'application
pnpm dev
