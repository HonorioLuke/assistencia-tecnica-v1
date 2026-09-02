import type { AtualizarStatusDto } from "../dto/atualizar-status.dto";
import { atualizarStatusUseCase } from "../usecases/atualizar-status.usecase";

export async function atualizarStatusHandler(
  id: number,
  dado: AtualizarStatusDto
) {
  return atualizarStatusUseCase(id, dado);
}
