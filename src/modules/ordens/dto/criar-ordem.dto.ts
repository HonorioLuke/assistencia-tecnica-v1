import { Ordem } from "@/shared/types/domain/ordens/ordens";


export type CriarOrdemDto = Omit<Ordem, "id" | "numero" | "status" | "valor" | "createdAt" | "deliveredAt" | "prioridade" | "tipoServico" | "observacao">;
