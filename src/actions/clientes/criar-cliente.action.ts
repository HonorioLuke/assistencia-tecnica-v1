import type { CriarClienteDto } from "@/modules/clientes/dto/criar-cliente.dto";
import type { ClienteRespostaDto } from "@/modules/clientes/dto/cliente-resposta.dto";

export async function criarClienteAction(
  listaAtual: ClienteRespostaDto[],
  dados: CriarClienteDto
): Promise<ClienteRespostaDto[]> {
  const resposta = await fetch("/api/clientes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.mensagem ?? "Erro ao criar cliente");
  }

  const novoCliente: ClienteRespostaDto = await resposta.json();
  return [...listaAtual, novoCliente];
}
