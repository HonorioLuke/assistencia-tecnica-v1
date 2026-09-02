import type { CriarOrdemDto } from "@/modules/ordens/dto/criar-ordem.dto";
import type { OrdemRespostaDto } from "@/modules/ordens/dto/ordem-resposta.dto";

export async function criarOrdemAction(
  dados: CriarOrdemDto
): Promise<OrdemRespostaDto> {
  const resposta = await fetch("/api/ordens", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.mensagem ?? "Erro ao criar ordem de serviço");
  }

  return resposta.json();
}
