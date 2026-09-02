import { listarEquipamentosUseCase } from "../usecases/listar-equipamentos.usecase";

export async function listarEquipamentosHandler() {
  return listarEquipamentosUseCase();
}
