import type { CriarClienteDto } from "../dto/criar-cliente.dto";
import type { ClienteRespostaDto } from "../dto/cliente-resposta.dto";
import { clienteRepositorio } from "../repositories/cliente.repositorio";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function criarClienteUseCase(
  dado: CriarClienteDto
): Promise<ClienteRespostaDto> {
  if (!dado.nome || !dado.telefone || !dado.email) {
    throw new Error("Nome, telefone e email são obrigatórios.");
  }

  if (dado.nome.trim().length < 3) {
    throw new Error("Nome deve ter ao menos 3 caracteres.");
  }

  const telefoneDigitos = dado.telefone.replace(/\D/g, "");
  if (telefoneDigitos.length < 10 || telefoneDigitos.length > 11) {
    throw new Error("Telefone inválido. Use um número com DDD.");
  }
  // Tem colocar uma para telefone fixo

  if (!EMAIL_REGEX.test(dado.email)) {
    throw new Error("Email inválido.");
  }

  return clienteRepositorio.create(dado);
}
