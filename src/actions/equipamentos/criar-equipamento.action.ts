import type { CriarEquipamentoDto } from "@/modules/equipamentos/dto/criar-equipamento.dto";
import type { respostaEquipamentoDto } from "@/modules/equipamentos/dto/equipamento-resposta.dto";

export async function criarEquipamentoAction(
  listaAtual: respostaEquipamentoDto[],
  dados: CriarEquipamentoDto
): Promise<respostaEquipamentoDto[]> {
  const resposta = await fetch("/api/equipamentos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.mensagem ?? "Erro ao criar equipamento");
  }

  const novoEquipamento: respostaEquipamentoDto = await resposta.json();
  return [...listaAtual, novoEquipamento];
}
