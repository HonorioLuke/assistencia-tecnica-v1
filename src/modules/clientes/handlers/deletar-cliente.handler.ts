import { deletarClienteUseCase } from "../usecases/deletar-cliente.usecase";

export async function deletarClienteHandler(id: number): Promise<void> {
  return deletarClienteUseCase(id);
}
