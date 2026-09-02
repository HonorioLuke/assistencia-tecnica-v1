import { ordemRepositorio } from "@/modules/ordens/repositories/ordem.repositorio";
import { equipamentoRepositorio } from "../repositories/equipamento.repositorio";

// Exclusão em cascata: equipamento -> ordens de serviço vinculadas.
export async function deletarEquipamentoUseCase(id: number): Promise<void> {
  await ordemRepositorio.removerPorEquipamentoId(id);
  await equipamentoRepositorio.remover(id);
}