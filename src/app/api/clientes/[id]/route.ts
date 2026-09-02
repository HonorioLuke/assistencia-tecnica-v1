import { NextRequest, NextResponse } from "next/server";
import { atualizarClienteHandler } from "@/modules/clientes/handlers/atualizar-cliente.handler";
import { deletarClienteHandler } from "@/modules/clientes/handlers/deletar-cliente.handler";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clienteId = Number(id);

    if (Number.isNaN(clienteId)) {
      return NextResponse.json({ mensagem: "ID inválido." }, { status: 400 });
    }

    const dados = await req.json();
    const cliente = await atualizarClienteHandler(clienteId, dados);
    return NextResponse.json(cliente);
  } catch (erro: unknown) {
    const mensagem =
      erro instanceof Error ? erro.message : "Erro ao atualizar cliente";
    return NextResponse.json({ mensagem }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const clienteId = Number(id);

    if (Number.isNaN(clienteId)) {
      return NextResponse.json({ mensagem: "ID inválido." }, { status: 400 });
    }

    await deletarClienteHandler(clienteId);
    return NextResponse.json({ sucesso: true });
  } catch (erro: unknown) {
    const mensagem =
      erro instanceof Error ? erro.message : "Erro ao remover cliente";
    return NextResponse.json({ mensagem }, { status: 400 });
  }
}
