// 1. A importação muda completamente para pg-core
// 2. Trocamos o 'integer' pelo 'serial'
import { pgTable, text, serial } from 'drizzle-orm/pg-core';

export const clientes = pgTable('clientes', {
    // 3. O serial já faz o auto-incremento automaticamente
    id: serial('id').primaryKey(),
    nome: text('nome').notNull(),
    telefone: text('telefone').notNull(),
    email: text('email').notNull(),
});