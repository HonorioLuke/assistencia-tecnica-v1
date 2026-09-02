import type { respostaEquipamentoDto } from "@/modules/equipamentos/dto/equipamento-resposta.dto";

export async function deletarEquipamentoAction(
  listaAtual: respostaEquipamentoDto[],
  id: number
): Promise<respostaEquipamentoDto[]> {
  const resposta = await fetch(`/api/equipamentos/${id}`, { method: "DELETE" });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.mensagem ?? "Erro ao remover equipamento");
  }

  return listaAtual.filter((e) => e.id !== id);
}
