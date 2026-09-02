import type { AtualizarOrdemDto } from "@/modules/ordens/dto/atualizar-ordem.dto";
import type { OrdemRespostaDto } from "@/modules/ordens/dto/ordem-resposta.dto";

export async function atualizarOrdemAction(
  id: number,
  dados: AtualizarOrdemDto
): Promise<OrdemRespostaDto> {
  const resposta = await fetch(`/api/ordens/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.mensagem ?? "Erro ao atualizar ordem de serviço");
  }

  return resposta.json();
}
