# Dyad Web - AI App Builder

Une version web de Dyad, un constructeur d'applications IA open-source et gratuit, déployable sur Vercel.

> **Note** : Ce projet a été converti d'Electron vers Next.js pour le déploiement web.

## 🚀 Fonctionnalités

- **Construction d'applications avec IA** : Décrivez ce que vous voulez créer et Dyad le construira pour vous
- **Interface moderne** : Interface React moderne avec Tailwind CSS
- **Déploiement facile** : Prêt pour le déploiement sur Vercel
- **Base de données cloud** : Utilise PostgreSQL via Vercel Postgres
- **Intégrations** : GitHub, Vercel, Supabase, Neon, et plus

## 🛠️ Technologies

- **Frontend** : Next.js 14, React 18, TypeScript
- **Styling** : Tailwind CSS, Radix UI
- **Base de données** : PostgreSQL avec Drizzle ORM
- **État** : Jotai pour la gestion d'état
- **Requêtes** : TanStack Query
- **Déploiement** : Vercel

## 📦 Installation

1. **Cloner le projet**
   ```bash
   git clone <votre-repo>
   cd dyad-web
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   ```bash
   cp env.example .env.local
   ```
   
   Remplissez les variables dans `.env.local` :
   - `POSTGRES_URL` : URL de votre base de données PostgreSQL
   - `OPENAI_API_KEY` : Clé API OpenAI
   - `ANTHROPIC_API_KEY` : Clé API Anthropic
   - Autres clés API selon vos besoins

4. **Configurer la base de données**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Lancer en développement**
   ```bash
   npm run dev
   ```

## 🚀 Déploiement sur Vercel

1. **Connecter votre repo GitHub à Vercel**

2. **Configurer les variables d'environnement dans Vercel** :
   - Allez dans Settings > Environment Variables
   - Ajoutez toutes les variables de `env.example`

3. **Configurer Vercel Postgres** :
   - Allez dans Storage > Create Database > Postgres
   - Copiez l'URL de connexion dans `POSTGRES_URL`

4. **Déployer** :
   ```bash
   vercel --prod
   ```

## 🗂️ Structure du projet

```
├── app/                    # App Router Next.js
│   ├── api/               # API Routes
│   ├── (dashboard)/       # Pages de l'application
│   └── globals.css        # Styles globaux
├── components/            # Composants React
├── hooks/                 # Hooks personnalisés
├── lib/                   # Utilitaires et configuration
├── atoms/                 # État global avec Jotai
├── shared/                # Code partagé
└── drizzle/               # Migrations de base de données
```

## 🔧 Scripts disponibles

- `npm run dev` : Lancer en développement
- `npm run build` : Construire pour la production
- `npm run start` : Lancer en production
- `npm run lint` : Linter le code
- `npm run db:generate` : Générer les migrations
- `npm run db:push` : Appliquer les migrations
- `npm run db:studio` : Ouvrir Drizzle Studio

## 🌟 Fonctionnalités principales

### Construction d'applications
- Décrivez votre application en langage naturel
- L'IA génère le code automatiquement
- Preview en temps réel
- Gestion des versions avec Git

### Intégrations
- **GitHub** : Push automatique du code
- **Vercel** : Déploiement automatique
- **Supabase** : Base de données et authentification
- **Neon** : Base de données PostgreSQL

### Interface utilisateur
- Design moderne et responsive
- Mode sombre/clair
- Navigation intuitive
- Composants réutilisables

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) pour le framework React
- [Tailwind CSS](https://tailwindcss.com/) pour le styling
- [Radix UI](https://www.radix-ui.com/) pour les composants
- [Vercel](https://vercel.com/) pour l'hébergement
- [Drizzle](https://orm.drizzle.team/) pour l'ORM

---

**Note** : Cette version web de Dyad remplace complètement la version Electron originale, éliminant toutes les dépendances desktop et permettant un déploiement web simple et efficace.