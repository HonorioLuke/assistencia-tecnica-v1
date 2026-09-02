import { equipamentoRepositorio } from "../repositories/equipamento.repositorio";

export async function listarEquipamentosUseCase() {
  return equipamentoRepositorio.buscarTodos();
}