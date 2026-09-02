import type { AtualizarOrdemDto } from "../dto/atualizar-ordem.dto";
import { ordemRepositorio } from "../repositories/ordem.repositorio";

export async function atualizarOrdemUseCase(id: number, dado: AtualizarOrdemDto) {
  if (!dado.descricao || !dado.descricao.trim()) {
    throw new Error("Descrição do defeito é obrigatória.");
  }

  return ordemRepositorio.atualizar(id, dado);
}