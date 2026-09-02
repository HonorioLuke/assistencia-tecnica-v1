import type { AtualizarClienteDto } from "../dto/atualizar-cliente.dto";
import type { ClienteRespostaDto } from "../dto/cliente-resposta.dto";
import { AtualizarClienteUseCase } from "../usecases/atualizar-cliente.usecase";

export async function atualizarClienteHandler(
  id: number,
  dado: AtualizarClienteDto
): Promise<ClienteRespostaDto> {
  const dadosNormalizados: AtualizarClienteDto = {
    ...(dado.nome !== undefined ? { nome: dado.nome.trim() } : {}),
    ...(dado.telefone !== undefined ? { telefone: dado.telefone.trim() } : {}),
    ...(dado.email !== undefined ? { email: dado.email.trim().toLowerCase() } : {}),
  };

  return AtualizarClienteUseCase(id, dadosNormalizados);
}
