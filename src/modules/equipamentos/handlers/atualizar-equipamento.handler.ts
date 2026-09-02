import type { AtualizarEquipamentoDto } from "../dto/atualizar-equipamento.dto";
import { atualizarEquipamentoUseCase } from "../usecases/atualizar-equipamento.usecase";

export async function atualizarEquipamentoHandler(
  id: number,
  dado: AtualizarEquipamentoDto
) {
  const dadosNormalizados: AtualizarEquipamentoDto = {
    ...(dado.tipo !== undefined ? { tipo: dado.tipo.trim() } : {}),
    ...(dado.marca !== undefined ? { marca: dado.marca.trim() } : {}),
    ...(dado.modelo !== undefined ? { modelo: dado.modelo.trim() } : {}),
    ...(dado.serial !== undefined
      ? { serial: dado.serial ? dado.serial.trim() : null }
      : {}),
    ...(dado.clienteId !== undefined ? { clienteId: dado.clienteId } : {}),
  };

  return atualizarEquipamentoUseCase(id, dadosNormalizados);
}