import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';
import path from 'path';

const databaseUrl =
  process.env.POSTGRES_URL_NON_POOLING ??
  process.env.MIGRATION_DATABASE_URL ??
  process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("URL do banco de dados não encontrada. Verifique seu arquivo .env.");
}

export default defineConfig({
  schema: [
    './src/infrastructure/schemas/clientes.ts',
    './src/infrastructure/schemas/equipamentos.ts',
    './src/infrastructure/schemas/ordens.ts',
  ],
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: { 
    url: databaseUrl 
  },
});