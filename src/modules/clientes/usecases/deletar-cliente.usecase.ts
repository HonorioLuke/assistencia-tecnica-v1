import { equipamentoRepositorio } from "@/modules/equipamentos/repositories/equipamento.repositorio";
import { ordemRepositorio } from "@/modules/ordens/repositories/ordem.repositorio";
import { clienteRepositorio } from "../repositories/cliente.repositorio";

// Exclusão em cascata: cliente -> equipamentos -> ordens de serviço.
export async function deletarClienteUseCase(id: number): Promise<void> {
  const equipamentoIds = await equipamentoRepositorio.buscarIdsPorClienteId(id);

  await ordemRepositorio.removerPorEquipamentoIds(equipamentoIds);
  await equipamentoRepositorio.removerPorClienteId(id);
  await clienteRepositorio.delete(id);
}