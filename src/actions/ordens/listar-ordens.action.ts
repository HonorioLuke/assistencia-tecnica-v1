import type { OrdemRespostaDto } from "@/modules/ordens/dto/ordem-resposta.dto";

export async function listarOrdensAction(): Promise<OrdemRespostaDto[]> {
  const resposta = await fetch("/api/ordens");

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.mensagem ?? "Erro ao listar ordens de serviço");
  }

  return resposta.json();
}
