import type { CriarOrdemDto } from "../dto/criar-ordem.dto";
import { ordemRepositorio } from "../repositories/ordem.repositorio";

export async function criarOrdemUseCase(dado: CriarOrdemDto) {
  if (!dado.descricao || !dado.descricao.trim()) {
    throw new Error("Descrição do defeito é obrigatória.");
  }

  if (!dado.equipamentoId) {
    throw new Error("É necessário vincular a ordem a um equipamento.");
  }

  // Número de OS único baseado no timestamp (Ex: OS-482910)
  const numero = `OS-${Date.now().toString().slice(-6)}`;

  return ordemRepositorio.criar({ ...dado, numero });
}