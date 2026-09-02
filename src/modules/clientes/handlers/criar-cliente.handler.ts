import type { CriarClienteDto } from "../dto/criar-cliente.dto";
import type { ClienteRespostaDto } from "../dto/cliente-resposta.dto";
import { criarClienteUseCase } from "../usecases/criar-cliente.usecase";

function capitalizarPrimeiraLetra(texto: string): string {
  if (!texto) return texto;
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

export async function criarClienteHandler(
  dados: CriarClienteDto
): Promise<ClienteRespostaDto> {
  const dadosNormalizados: CriarClienteDto = {
    nome: capitalizarPrimeiraLetra(dados.nome.trim()),
    telefone: dados.telefone.trim(),
    email: dados.email.trim().toLowerCase(),
  };

  return criarClienteUseCase(dadosNormalizados);
}
