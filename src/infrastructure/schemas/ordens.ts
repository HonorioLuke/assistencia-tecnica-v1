import { pgTable, text, serial, integer, numeric, timestamp } from 'drizzle-orm/pg-core';
import { equipamentos } from './equipamentos';
import { StatusOS } from '../../shared/constants/os-status';

export const ordensServico = pgTable('ordens_servico', {
  id: serial('id').primaryKey(),
  numero: text('numero').notNull().unique(),
  descricao: text('descricao').notNull(),
  status: text('status').default(StatusOS.RECEBIDO).notNull(),
  valor: numeric('valor', { precision: 10, scale: 2 }).default('0'),
  equipamentoId: integer('equipamento_id').references(() => equipamentos.id).notNull(),
  createdAt: timestamp('created_at').notNull(),
  deliveredAt: timestamp('delivered_at'),
  prioridade: text('prioridade').default('Normal').notNull(),
  tipoServico: text('tipo_servico'),
  observacao: text('observacao'),
});