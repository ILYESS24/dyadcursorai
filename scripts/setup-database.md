# Configuration de la base de données PostgreSQL

## Option 1 : Vercel Postgres (Recommandé)

1. **Dans Vercel Dashboard :**
   - Allez dans votre projet `dyadcursorai`
   - Onglet **"Storage"** → **"Create Database"**
   - Sélectionnez **"Postgres"**
   - Nom : `dyad-db`
   - Région : `Frankfurt` (ou plus proche de vous)

2. **Variables automatiquement créées :**
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL` 
   - `POSTGRES_URL_NON_POOLING`

## Option 2 : Supabase (Gratuit)

1. **Créer un projet Supabase :**
   - Allez sur [supabase.com](https://supabase.com)
   - Créez un nouveau projet
   - Notez l'URL et les clés

2. **Variables à ajouter dans Vercel :**
   ```
   POSTGRES_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
   POSTGRES_PRISMA_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres?pgbouncer=true
   POSTGRES_URL_NON_POOLING=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
   ```

## Option 3 : Neon (Gratuit)

1. **Créer un projet Neon :**
   - Allez sur [neon.tech](https://neon.tech)
   - Créez un nouveau projet
   - Copiez la connection string

2. **Variables à ajouter dans Vercel :**
   ```
   POSTGRES_URL=[connection-string-from-neon]
   POSTGRES_PRISMA_URL=[connection-string-from-neon]?pgbouncer=true
   POSTGRES_URL_NON_POOLING=[connection-string-from-neon]
   ```

## Migration de la base de données

Une fois la base configurée, exécutez :

```bash
npm run db:migrate
```

## Test de la connexion

```bash
npm run db:test
```
