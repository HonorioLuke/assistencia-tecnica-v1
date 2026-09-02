import type { ClienteRespostaDto } from "@/modules/clientes/dto/cliente-resposta.dto";

export async function deletarClienteAction(
  listaAtual: ClienteRespostaDto[],
  id: number
): Promise<ClienteRespostaDto[]> {
  const resposta = await fetch(`/api/clientes/${id}`, {
    method: "DELETE",
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.mensagem ?? "Erro ao remover cliente");
  }

  return listaAtual.filter((c) => c.id !== id);
}
