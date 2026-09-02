import { NextRequest, NextResponse } from "next/server";
import { atualizarOrdemHandler } from "@/modules/ordens/handlers/atualizar-ordem.handler";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ordemId = Number(id);

    if (Number.isNaN(ordemId)) {
      return NextResponse.json({ mensagem: "ID inválido." }, { status: 400 });
    }

    const dados = await req.json();
    const ordem = await atualizarOrdemHandler(ordemId, dados);
    return NextResponse.json(ordem);
  } catch (erro: unknown) {
    const mensagem =
      erro instanceof Error ? erro.message : "Erro ao atualizar ordem de serviço";
    return NextResponse.json({ mensagem }, { status: 400 });
  }
}
