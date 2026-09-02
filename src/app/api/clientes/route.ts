import { NextRequest, NextResponse } from "next/server";
import { listarClientesHandler } from "@/modules/clientes/handlers/listar-clientes.handler";
import { criarClienteHandler } from "@/modules/clientes/handlers/criar-cliente.handler";

export async function GET() {
  try {
    const clientes = await listarClientesHandler();
    return NextResponse.json(clientes);
  } catch (erro: unknown) {
    const mensagem =
      erro instanceof Error ? erro.message : "Erro ao listar clientes";
    return NextResponse.json({ mensagem }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const dados = await req.json();
    const cliente = await criarClienteHandler(dados);
    return NextResponse.json(cliente, { status: 201 });
  } catch (erro: unknown) {
    const mensagem =
      erro instanceof Error ? erro.message : "Erro ao criar cliente";
    return NextResponse.json({ mensagem }, { status: 400 });
  }
}

//API para atualizar os dados
//