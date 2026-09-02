import type { AtualizarOrdemDto } from "../dto/atualizar-ordem.dto";
import { atualizarOrdemUseCase } from "../usecases/atualizar-ordem.usecase";

export async function atualizarOrdemHandler(id: number, dado: AtualizarOrdemDto) {
  const dadosNormalizados: AtualizarOrdemDto = {
    status: dado.status,
    descricao: dado.descricao.trim(),
    observacao: dado.observacao?.trim() || null,
    prioridade: dado.prioridade,
    tipoServico: dado.tipoServico || null,
  };

  return atualizarOrdemUseCase(id, dadosNormalizados);
}
