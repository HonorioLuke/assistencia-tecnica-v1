import type { CriarOrdemDto } from "../dto/criar-ordem.dto";
import { criarOrdemUseCase } from "../usecases/criar-ordem.usecase";

export async function criarOrdemHandler(dado: CriarOrdemDto) {
  const dadosNormalizados: CriarOrdemDto = {
    descricao: dado.descricao.trim(),
    equipamentoId: dado.equipamentoId,
  };

  return criarOrdemUseCase(dadosNormalizados);
}
