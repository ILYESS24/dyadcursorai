# Bolt AI Builder - Constructeur d'Applications IA

Une plateforme moderne de développement d'applications web alimentée par l'intelligence artificielle, avec une interface glassmorphique élégante et un environnement de développement intégré.

## ✨ Fonctionnalités

- 🤖 **Génération d'applications par IA** : Créez des applications complètes à partir de descriptions en langage naturel
- 🎨 **Interface glassmorphique moderne** : Design élégant avec effets de verre et animations fluides
- ⚡ **Environnement de développement intégré** : Éditeur de code, terminal et prévisualisation en temps réel
- 🚀 **Déploiement instantané** : Déployez vos applications directement depuis l'interface
- 🌐 **Support multi-langues** : Interface en français avec support pour différents frameworks
- 📱 **Responsive design** : Optimisé pour tous les appareils

## 🛠️ Technologies utilisées

- **Frontend** : React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend** : Remix, Node.js
- **IA** : Anthropic Claude, SDK AI
- **Environnement de développement** : WebContainer API
- **Éditeur** : CodeMirror 6
- **Terminal** : XTerm.js
- **Déploiement** : Vercel

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18.18.0 ou supérieur
- pnpm (recommandé) ou npm

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/bolt-ai-builder.git
cd bolt-ai-builder
```

2. **Installer les dépendances**
```bash
pnpm install
```

3. **Configurer les variables d'environnement**
```bash
cp env.example .env
```

Éditez le fichier `.env` et ajoutez vos clés API :
```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

4. **Lancer l'application en mode développement**
```bash
pnpm dev
```

L'application sera accessible sur `http://localhost:5173`

## 🎯 Utilisation

### Créer une nouvelle application

1. **Décrivez votre idée** : Utilisez le champ de saisie pour décrire l'application que vous souhaitez créer
   - Exemple : "Créer une application de gestion de tâches moderne avec React et Tailwind CSS"

2. **Génération automatique** : L'IA analyse votre demande et génère automatiquement :
   - Structure de fichiers complète
   - Code source optimisé
   - Configuration du projet
   - Dépendances nécessaires

3. **Développement en temps réel** : Utilisez l'environnement intégré pour :
   - Modifier le code dans l'éditeur
   - Prévisualiser les changements
   - Tester dans le terminal
   - Déboguer votre application

### Types d'applications supportées

- **Applications React** : Composants modernes avec hooks et contextes
- **Sites Next.js** : Applications full-stack avec SSR/SSG
- **Sites Astro** : Sites statiques ultra-rapides
- **APIs Node.js** : Serveurs backend avec Express
- **Applications Vanilla JS** : JavaScript pur avec HTML/CSS

### Fonctionnalités avancées

- **Authentification** : Systèmes de connexion/inscription
- **Base de données** : Intégration avec différentes bases de données
- **Animations** : Effets visuels avec Framer Motion
- **Mode sombre** : Support du thème sombre/clair
- **PWA** : Applications web progressives
- **Tests** : Configuration de tests automatisés

## 🎨 Personnalisation

### Thèmes et styles

L'application supporte plusieurs styles prédéfinis :
- **Moderne** : Design épuré et minimaliste
- **Glassmorphique** : Effets de verre et transparence
- **Material Design** : Composants Material UI
- **Tailwind** : Utilitaire-first CSS

### Extensions et plugins

Vous pouvez étendre les fonctionnalités en ajoutant :
- Nouveaux générateurs de code
- Templates personnalisés
- Intégrations avec des services externes
- Composants UI personnalisés

## 🚀 Déploiement

### Déploiement sur Vercel (recommandé)

1. **Connecter votre repository GitHub**
2. **Configurer les variables d'environnement** dans Vercel
3. **Déployer automatiquement** à chaque push

```bash
# Installation de Vercel CLI
npm i -g vercel

# Déploiement
vercel --prod
```

### Déploiement sur d'autres plateformes

L'application est compatible avec :
- **Netlify** : Déploiement automatique depuis Git
- **Railway** : Déploiement avec base de données intégrée
- **Docker** : Conteneurisation pour tout environnement

## 🤝 Contribution

Nous accueillons les contributions ! Voici comment contribuer :

1. **Fork le projet**
2. **Créez une branche** pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. **Commitez vos changements** (`git commit -m 'Add some AmazingFeature'`)
4. **Poussez vers la branche** (`git push origin feature/AmazingFeature`)
5. **Ouvrez une Pull Request**

### Guide de contribution

- Suivez les conventions de code existantes
- Ajoutez des tests pour les nouvelles fonctionnalités
- Documentez les nouvelles APIs
- Respectez les principes de design glassmorphique

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [WebContainer](https://webcontainer.dev/) pour l'environnement de développement
- [Anthropic](https://anthropic.com/) pour l'API Claude
- [Tailwind CSS](https://tailwindcss.com/) pour le framework CSS
- [Framer Motion](https://framer.com/motion/) pour les animations
- [Remix](https://remix.run/) pour le framework web

## 📞 Support

- **Documentation** : [docs.bolt-ai-builder.com](https://docs.bolt-ai-builder.com)
- **Discord** : [Rejoindre la communauté](https://discord.gg/bolt-ai-builder)
- **Email** : support@bolt-ai-builder.com
- **GitHub Issues** : [Signaler un bug](https://github.com/votre-username/bolt-ai-builder/issues)

---

**Bolt AI Builder** - Transformez vos idées en applications web modernes en quelques secondes ! 🚀