import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/database";
import { equipamentos } from "@/infrastructure/schemas/equipamentos";
import { clientes } from "@/infrastructure/schemas/clientes";
import type { CriarEquipamentoDto } from "../dto/criar-equipamento.dto";
import type { AtualizarEquipamentoDto } from "../dto/atualizar-equipamento.dto";
import type { respostaEquipamentoDto } from "../dto/equipamento-resposta.dto";

const DADOS = {
  id: equipamentos.id,
  tipo: equipamentos.tipo,
  marca: equipamentos.marca,
  modelo: equipamentos.modelo,
  serial: equipamentos.serial,
  clienteId: equipamentos.clienteId,
  clienteNome: clientes.nome,
};

export const equipamentoRepositorio = {
  async buscarTodos(): Promise<respostaEquipamentoDto[]> {
    return db
      .select(DADOS)
      .from(equipamentos)
      .leftJoin(clientes, eq(equipamentos.clienteId, clientes.id));
  },

  async buscarPorId(id: number): Promise<respostaEquipamentoDto | null> {
    const [equipamento] = await db
      .select(DADOS)
      .from(equipamentos)
      .leftJoin(clientes, eq(equipamentos.clienteId, clientes.id))
      .where(eq(equipamentos.id, id));
    return equipamento ?? null;
  },

  async criar(dado: CriarEquipamentoDto) {
    const [criado] = await db.insert(equipamentos).values(dado).returning();

    if (!criado) {
      throw new Error("Não foi possível cadastrar o equipamento.");
    }

    return criado;
  },

  async atualizar(id: number, dado: AtualizarEquipamentoDto) {
    const [atualizado] = await db
      .update(equipamentos)
      .set(dado)
      .where(eq(equipamentos.id, id))
      .returning();

    if (!atualizado) {
      throw new Error("Equipamento não encontrado.");
    }

    return atualizado;
  },

  async remover(id: number): Promise<void> {
    const [removido] = await db
      .delete(equipamentos)
      .where(eq(equipamentos.id, id))
      .returning();

    if (!removido) {
      throw new Error("Equipamento não encontrado.");
    }
  },

  // Usados em cascata quando um cliente é excluído.
  async buscarIdsPorClienteId(clienteId: number): Promise<number[]> {
    const linhas = await db
      .select({ id: equipamentos.id })
      .from(equipamentos)
      .where(eq(equipamentos.clienteId, clienteId));
    return linhas.map((l) => l.id);
  },

  async removerPorClienteId(clienteId: number): Promise<void> {
    await db.delete(equipamentos).where(eq(equipamentos.clienteId, clienteId));
  },
};