import { StatusOS } from "@/shared/constants/os-status";
import type { AtualizarStatusDto } from "../dto/atualizar-status.dto";
import { ordemRepositorio } from "../repositories/ordem.repositorio";

const STATUS_VALIDOS = Object.values(StatusOS);

export async function atualizarStatusUseCase(
  id: number,
  dado: AtualizarStatusDto
) {
  if (!STATUS_VALIDOS.includes(dado.novoStatus)) {
    throw new Error("Status inválido.");
  }

  return ordemRepositorio.atualizarStatus(id, dado.novoStatus);
}