import { Ordem } from "@/shared/types/domain/ordens/ordens";

export type AtualizarOrdemDto = Omit<Ordem, "id" | "numero" | "equipamentoId" | "valor" | "createdAt" | "deliveredAt">;