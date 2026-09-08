import { eq, inArray } from "drizzle-orm";
import { db } from "@/infrastructure/database";
import { ordensServico } from "@/infrastructure/schemas/ordens";
import { equipamentos } from "@/infrastructure/schemas/equipamentos";
import { clientes } from "@/infrastructure/schemas/clientes";
import { StatusOS } from "@/shared/constants/os-status";
import type { TipoStatusOS } from "@/shared/types/domain/ordens/ordens";
import type { CriarOrdemDto } from "../dto/criar-ordem.dto";
import type { AtualizarOrdemDto } from "../dto/atualizar-ordem.dto";
import type { OrdemRespostaDto } from "../dto/ordem-resposta.dto";

const SELECT_COM_JOINS = {
  id: ordensServico.id,
  numero: ordensServico.numero,
  descricao: ordensServico.descricao,
  status: ordensServico.status,
  valor: ordensServico.valor,
  equipamentoId: ordensServico.equipamentoId,
  createdAt: ordensServico.createdAt,
  deliveredAt: ordensServico.deliveredAt,
  prioridade: ordensServico.prioridade,
  tipoServico: ordensServico.tipoServico,
  observacao: ordensServico.observacao,
  equipamentoTipo: equipamentos.tipo,
  equipamentoMarca: equipamentos.marca,
  equipamentoModelo: equipamentos.modelo,
  clienteNome: clientes.nome,
};

// O Drizzle infere `status` como `string` (coluna não tipada com o enum no
// schema) e os campos vindos do leftJoin como `string | null`. Normalizamos
// os dois aqui, num único lugar, em vez de espalhar casts pelo código que
// consome esses dados.
function mapOrdem<
  T extends {
    status: string;
    equipamentoTipo?: string | null;
    equipamentoMarca?: string | null;
    equipamentoModelo?: string | null;
    clienteNome?: string | null;
  }
>(row: T): Omit<T, "status" | "equipamentoTipo" | "equipamentoMarca" | "equipamentoModelo" | "clienteNome"> & {
  status: TipoStatusOS;
  equipamentoTipo?: string;
  equipamentoMarca?: string;
  equipamentoModelo?: string;
  clienteNome?: string;
} {
  return {
    ...row,
    status: row.status as TipoStatusOS,
    equipamentoTipo: row.equipamentoTipo ?? undefined,
    equipamentoMarca: row.equipamentoMarca ?? undefined,
    equipamentoModelo: row.equipamentoModelo ?? undefined,
    clienteNome: row.clienteNome ?? undefined,
  };
}

export const ordemRepositorio = {
  async buscarTodos(): Promise<OrdemRespostaDto[]> {
    const linhas = await db
      .select(SELECT_COM_JOINS)
      .from(ordensServico)
      .leftJoin(equipamentos, eq(ordensServico.equipamentoId, equipamentos.id))
      .leftJoin(clientes, eq(equipamentos.clienteId, clientes.id));

    return linhas.map(mapOrdem);
  },

  async buscarPorId(id: number): Promise<OrdemRespostaDto | null> {
    const [ordem] = await db
      .select(SELECT_COM_JOINS)
      .from(ordensServico)
      .leftJoin(equipamentos, eq(ordensServico.equipamentoId, equipamentos.id))
      .leftJoin(clientes, eq(equipamentos.clienteId, clientes.id))
      .where(eq(ordensServico.id, id));

    return ordem ? mapOrdem(ordem) : null;
  },

  async criar(dado: CriarOrdemDto & { numero: string }) {
    const [criada] = await db
      .insert(ordensServico)
      .values({
        numero: dado.numero,
        descricao: dado.descricao,
        equipamentoId: dado.equipamentoId,
        status: StatusOS.RECEBIDO,
        createdAt: new Date(),
      })
      .returning();

    if (!criada) {
      throw new Error("Não foi possível registrar a ordem de serviço.");
    }

    return criada;
  },

  async atualizar(id: number, dado: AtualizarOrdemDto) {
    const deliveredAt = dado.status === StatusOS.ENTREGUE ? new Date() : null;

    const [atualizada] = await db
      .update(ordensServico)
      .set({ ...dado, deliveredAt })
      .where(eq(ordensServico.id, id))
      .returning();

    if (!atualizada) {
      throw new Error("Ordem de serviço não encontrada.");
    }

    return atualizada;
  },

  async atualizarStatus(id: number, novoStatus: TipoStatusOS) {
    const deliveredAt = novoStatus === StatusOS.ENTREGUE ? new Date() : null;

    const [atualizada] = await db
      .update(ordensServico)
      .set({ status: novoStatus, deliveredAt })
      .where(eq(ordensServico.id, id))
      .returning();

    if (!atualizada) {
      throw new Error("Ordem de serviço não encontrada.");
    }

    return atualizada;
  },

  // Usado em cascata quando um equipamento (ou, transitivamente, um cliente) é excluído.
  async removerPorEquipamentoId(equipamentoId: number): Promise<void> {
    await db.delete(ordensServico).where(eq(ordensServico.equipamentoId, equipamentoId));
  },

  async removerPorEquipamentoIds(equipamentoIds: number[]): Promise<void> {
    if (equipamentoIds.length === 0) return;
    await db.delete(ordensServico).where(inArray(ordensServico.equipamentoId, equipamentoIds));
  },
};