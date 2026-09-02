import type { AtualizarEquipamentoDto } from "../dto/atualizar-equipamento.dto";
import { equipamentoRepositorio } from "../repositories/equipamento.repositorio";

export async function atualizarEquipamentoUseCase(
  id: number,
  dado: AtualizarEquipamentoDto
) {
  if (dado.tipo !== undefined && !dado.tipo.trim()) {
    throw new Error("Tipo não pode ficar vazio.");
  }

  if (dado.marca !== undefined && !dado.marca.trim()) {
    throw new Error("Marca não pode ficar vazia.");
  }

  if (dado.modelo !== undefined && !dado.modelo.trim()) {
    throw new Error("Modelo não pode ficar vazio.");
  }

  return equipamentoRepositorio.atualizar(id, dado);
}