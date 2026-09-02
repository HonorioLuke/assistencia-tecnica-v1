import type { CriarEquipamentoDto } from "../dto/criar-equipamento.dto";
import { criarEquipamentoUseCase } from "../usecases/criar-equipamento.usecase";

export async function criarEquipamentoHandler(dado: CriarEquipamentoDto) {
  const dadosNormalizados: CriarEquipamentoDto = {
    tipo: dado.tipo.trim(),
    marca: dado.marca.trim(),
    modelo: dado.modelo.trim(),
    serial: dado.serial ? dado.serial.trim() : null,
    clienteId: dado.clienteId,
  };

  return criarEquipamentoUseCase(dadosNormalizados);
}