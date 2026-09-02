import type { ClienteRespostaDto } from "@/modules/clientes/dto/cliente-resposta.dto";

export async function listarClientesAction(): Promise<ClienteRespostaDto[]> {
  const resposta = await fetch("/api/clientes");

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.mensagem ?? "Erro ao listar clientes");
  }

  return resposta.json();
}
