import { Ordem } from "@/shared/types/domain/ordens/ordens";

export interface AtualizarStatusDto {
  novoStatus: Ordem["status"];
}