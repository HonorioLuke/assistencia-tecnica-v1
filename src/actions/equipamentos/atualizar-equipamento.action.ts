import type { AtualizarEquipamentoDto } from "@/modules/equipamentos/dto/atualizar-equipamento.dto";
import type { respostaEquipamentoDto } from "@/modules/equipamentos/dto/equipamento-resposta.dto";

export async function atualizarEquipamentoAction(
  listaAtual: respostaEquipamentoDto[],
  id: number,
  dados: AtualizarEquipamentoDto
): Promise<respostaEquipamentoDto[]> {
  const resposta = await fetch(`/api/equipamentos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.mensagem ?? "Erro ao atualizar equipamento");
  }

  const atualizado: respostaEquipamentoDto = await resposta.json();
  // O PATCH não faz join com cliente; preserva o clienteNome que já estava na lista.
  return listaAtual.map((e) =>
    e.id === id ? { ...atualizado, clienteNome: e.clienteNome } : e
  );
}
