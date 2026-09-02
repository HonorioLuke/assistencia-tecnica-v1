import { NextRequest, NextResponse } from "next/server";
import { listarOrdensHandler } from "@/modules/ordens/handlers/listar-ordens.handler";
import { criarOrdemHandler } from "@/modules/ordens/handlers/criar-ordem.handler";

export async function GET() {
  try {
    const ordens = await listarOrdensHandler();
    return NextResponse.json(ordens);
  } catch (erro: unknown) {
    const mensagem =
      erro instanceof Error ? erro.message : "Erro ao listar ordens de serviço";
    return NextResponse.json({ mensagem }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const dados = await req.json();
    const ordem = await criarOrdemHandler(dados);
    return NextResponse.json(ordem, { status: 201 });
  } catch (erro: unknown) {
    const mensagem =
      erro instanceof Error ? erro.message : "Erro ao criar ordem de serviço";
    return NextResponse.json({ mensagem }, { status: 400 });
  }
}
