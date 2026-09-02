import type { AtualizarClienteDto } from "@/modules/clientes/dto/atualizar-cliente.dto";
import type { ClienteRespostaDto } from "@/modules/clientes/dto/cliente-resposta.dto";

export async function atualizarClienteAction(
  listaAtual: ClienteRespostaDto[],
  id: number,
  dados: AtualizarClienteDto
): Promise<ClienteRespostaDto[]> {
  const resposta = await fetch(`/api/clientes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.mensagem ?? "Erro ao atualizar cliente");
  }

  const clienteAtualizado: ClienteRespostaDto = await resposta.json();
  return listaAtual.map((c) => (c.id === id ? clienteAtualizado : c));
}
