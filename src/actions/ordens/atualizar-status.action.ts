import type { StatusOS } from "@/shared/constants/os-status";
import type { OrdemRespostaDto } from "@/modules/ordens/dto/ordem-resposta.dto";

export async function atualizarStatusAction(
  id: number,
  novoStatus: StatusOS
): Promise<OrdemRespostaDto> {
  const resposta = await fetch(`/api/ordens/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ novoStatus }),
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.mensagem ?? "Erro ao atualizar status da OS");
  }

  return resposta.json();
}
