"use client";

import { useEffect, useState } from "react";
import { criarClienteAction } from "@/actions/clientes/criar-cliente.action";
import { atualizarClienteAction } from "@/actions/clientes/atualizar-cliente.action";
import { deletarClienteAction } from "@/actions/clientes/deletar-cliente.action";
import { listarClientesAction } from "@/actions/clientes/listar-clientes.action";
import type { CriarClienteDto } from "@/modules/clientes/dto/criar-cliente.dto";
import type { AtualizarClienteDto } from "@/modules/clientes/dto/atualizar-cliente.dto";
import type { ClienteRespostaDto } from "@/modules/clientes/dto/cliente-resposta.dto";

export function useClientes() {
  const [clientes, setClientes] = useState<ClienteRespostaDto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function carregarClientes() {
    try {
      setCarregando(true);
      setErro(null);
      const lista = await listarClientesAction();
      setClientes(lista);
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    void carregarClientes();
  }, []);

  // Retorna boolean (sucesso/falha) além de atualizar `erro`, porque a
  // cliente-table.tsx precisa saber se fecha o modo de edição inline.
  async function adicionarCliente(dados: CriarClienteDto): Promise<boolean> {
    try {
      setSalvando(true);
      setErro(null);
      const listaNova = await criarClienteAction(clientes, dados);
      setClientes(listaNova);
      return true;
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro desconhecido");
      return false;
    } finally {
      setSalvando(false);
    }
  }

  async function atualizarCliente(
    id: number,
    dados: AtualizarClienteDto
  ): Promise<boolean> {
    try {
      setSalvando(true);
      setErro(null);
      const listaNova = await atualizarClienteAction(clientes, id, dados);
      setClientes(listaNova);
      return true;
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro desconhecido");
      return false;
    } finally {
      setSalvando(false);
    }
  }

  async function removerCliente(id: number): Promise<boolean> {
    try {
      setErro(null);
      const listaNova = await deletarClienteAction(clientes, id);
      setClientes(listaNova);
      return true;
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro desconhecido");
      return false;
    }
  }

  return {
    clientes,
    carregando,
    salvando,
    erro,
    adicionarCliente,
    atualizarCliente,
    removerCliente,
  };
}
