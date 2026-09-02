import { deletarEquipamentoUseCase } from "../usecases/deletar-equipamento.usecase";

export async function deletarEquipamentoHandler(id: number): Promise<void> {
  return deletarEquipamentoUseCase(id);
}
