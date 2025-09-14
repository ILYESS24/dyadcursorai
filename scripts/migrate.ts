import { db } from '../lib/db/connection';
import { apps, chats, messages } from '../lib/db/schema';

async function migrate() {
  try {
    console.log('Starting database migration...');
    
    // Create tables
    await db.execute(`
      CREATE TABLE IF NOT EXISTS prompts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS apps (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        path TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        github_org TEXT,
        github_repo TEXT,
        github_branch TEXT,
        supabase_project_id TEXT,
        neon_project_id TEXT,
        neon_development_branch_id TEXT,
        neon_preview_branch_id TEXT,
        vercel_project_id TEXT,
        vercel_project_name TEXT,
        vercel_team_id TEXT,
        vercel_deployment_url TEXT,
        install_command TEXT,
        start_command TEXT,
        chat_context TEXT
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS chats (
        id SERIAL PRIMARY KEY,
        app_id INTEGER NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
        title TEXT,
        initial_commit_hash TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        chat_id INTEGER NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
        role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
        content TEXT NOT NULL,
        approval_state TEXT CHECK (approval_state IN ('approved', 'rejected')),
        commit_hash TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS versions (
        id SERIAL PRIMARY KEY,
        app_id INTEGER NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
        commit_hash TEXT NOT NULL,
        neon_db_timestamp TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(app_id, commit_hash)
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS language_model_providers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        api_base_url TEXT NOT NULL,
        env_var_name TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS language_models (
        id SERIAL PRIMARY KEY,
        display_name TEXT NOT NULL,
        api_name TEXT NOT NULL,
        builtin_provider_id TEXT,
        custom_provider_id TEXT REFERENCES language_model_providers(id) ON DELETE CASCADE,
        description TEXT,
        max_output_tokens INTEGER,
        context_window INTEGER,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log('Database migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
