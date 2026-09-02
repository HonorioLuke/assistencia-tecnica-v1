import type { AtualizarClienteDto } from "../dto/atualizar-cliente.dto";
import type { ClienteRespostaDto } from "../dto/cliente-resposta.dto";
import { clienteRepositorio } from "../repositories/cliente.repositorio";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function AtualizarClienteUseCase(
  id: number,
  dado: AtualizarClienteDto
): Promise<ClienteRespostaDto> {
  if (dado.nome !== undefined && dado.nome.trim().length < 3) {
    throw new Error("Nome deve ter ao menos 3 caracteres.");
  }

  if (dado.telefone !== undefined) {
    const telefoneDigitos = dado.telefone.replace(/\D/g, "");
    if (telefoneDigitos.length < 10 || telefoneDigitos.length > 11) {
      throw new Error("Telefone inválido. Use um número com DDD.");
    }
  }

  if (dado.email !== undefined && !EMAIL_REGEX.test(dado.email)) {
    throw new Error("Email inválido.");
  }

  return clienteRepositorio.update(id, dado);
}
