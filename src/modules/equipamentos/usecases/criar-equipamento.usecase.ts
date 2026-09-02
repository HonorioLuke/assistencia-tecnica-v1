import type { CriarEquipamentoDto } from "../dto/criar-equipamento.dto";
import { equipamentoRepositorio } from "../repositories/equipamento.repositorio";

export async function criarEquipamentoUseCase(dado: CriarEquipamentoDto) {
  if (!dado.tipo || !dado.marca || !dado.modelo) {
    throw new Error("Tipo, marca e modelo são obrigatórios.");
  }

  if (!dado.clienteId) {
    throw new Error("É necessário vincular o equipamento a um cliente.");
  }

  return equipamentoRepositorio.criar(dado);
}