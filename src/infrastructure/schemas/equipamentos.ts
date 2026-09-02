import { pgTable, text, serial, integer } from 'drizzle-orm/pg-core';
import { clientes } from './clientes'; // Importa para fazer o relacionamento 1:N

export const equipamentos = pgTable('equipamentos', {
  id: serial('id').primaryKey(),
  tipo: text('tipo').notNull(),   // Ex: Notebook, PC Gamer, Impressora
  marca: text('marca').notNull(),
  modelo: text('modelo').notNull(),
  serial: text('serial'), // Número de série do equipamento
  
  // A chave estrangeira continua como integer, pois o serial gera um número inteiro no banco
  clienteId: integer('cliente_id').references(() => clientes.id).notNull(),
});