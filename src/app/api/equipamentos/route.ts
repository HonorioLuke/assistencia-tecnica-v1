import { NextRequest, NextResponse } from "next/server";
import { listarEquipamentosHandler } from "@/modules/equipamentos/handlers/listar-equipamentos.handler";
import { criarEquipamentoHandler } from "@/modules/equipamentos/handlers/criar-equipamento.handler";

export async function GET() {
  try {
    const equipamentos = await listarEquipamentosHandler();
    return NextResponse.json(equipamentos);
  } catch (erro: unknown) {
    const mensagem =
      erro instanceof Error ? erro.message : "Erro ao listar equipamentos";
    return NextResponse.json({ mensagem }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const dados = await req.json();
    const equipamento = await criarEquipamentoHandler(dados);
    return NextResponse.json(equipamento, { status: 201 });
  } catch (erro: unknown) {
    const mensagem =
      erro instanceof Error ? erro.message : "Erro ao criar equipamento";
    return NextResponse.json({ mensagem }, { status: 400 });
  }
}
