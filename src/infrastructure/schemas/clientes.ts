import { pgTable, text, serial, timestamp } from 'drizzle-orm/pg-core';

export const clientes = pgTable('clientes', {
    id: serial('id').primaryKey(),
    nome: text('nome').notNull(),
    telefone: text('telefone').notNull(),
    email: text('email').notNull(),
    criadoEm: timestamp('criado_em').notNull().defaultNow(),
});