import type { respostaEquipamentoDto } from "@/modules/equipamentos/dto/equipamento-resposta.dto";

export async function listarEquipamentosAction(): Promise<respostaEquipamentoDto[]> {
  const resposta = await fetch("/api/equipamentos");

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.mensagem ?? "Erro ao listar equipamentos");
  }

  return resposta.json();
}
