import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
// Se você tiver um arquivo central exportando todos os schemas, importe-o:
// import * as schema from '../schemas';

// 1. Pegamos a string de conexão das variáveis de ambiente
const connectionString = process.env.DATABASE_URL!;

// 2. Tipagem global para evitar erros no TypeScript com o globalThis
declare global {
  var postgresClient: postgres.Sql | undefined;
}

// 3. Instanciamos o cliente do Postgres
// Em dev, usamos o globalThis para evitar estourar o limite de conexões a cada reload (HMR).
// A flag prepare: false é OBRIGATÓRIA para o Transaction Pooler do Supabase.
const client = globalThis.postgresClient || postgres(connectionString, { 
  prepare: false, 
  max: 10 // Limite seguro para o ambiente Serverless da Vercel
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.postgresClient = client;
}

// 4. Exportamos a instância do banco
// Se estiver importando o schema, use: export const db = drizzle(client, { schema });
export const db = drizzle(client);