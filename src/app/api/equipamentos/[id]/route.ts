import { NextRequest, NextResponse } from "next/server";
import { atualizarEquipamentoHandler } from "@/modules/equipamentos/handlers/atualizar-equipamento.handler";
import { deletarEquipamentoHandler } from "@/modules/equipamentos/handlers/deletar-equipamento.handler";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const equipamentoId = Number(id);

    if (Number.isNaN(equipamentoId)) {
      return NextResponse.json({ mensagem: "ID inválido." }, { status: 400 });
    }

    const dados = await req.json();
    const equipamento = await atualizarEquipamentoHandler(equipamentoId, dados);
    return NextResponse.json(equipamento);
  } catch (erro: unknown) {
    const mensagem =
      erro instanceof Error ? erro.message : "Erro ao atualizar equipamento";
    return NextResponse.json({ mensagem }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const equipamentoId = Number(id);

    if (Number.isNaN(equipamentoId)) {
      return NextResponse.json({ mensagem: "ID inválido." }, { status: 400 });
    }

    await deletarEquipamentoHandler(equipamentoId);
    return NextResponse.json({ sucesso: true });
  } catch (erro: unknown) {
    const mensagem =
      erro instanceof Error ? erro.message : "Erro ao remover equipamento";
    return NextResponse.json({ mensagem }, { status: 400 });
  }
}
