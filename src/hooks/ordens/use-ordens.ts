"use client";

import { useEffect, useState } from "react";
import { criarOrdemAction } from "@/actions/ordens/criar-ordem.action";
import { atualizarOrdemAction } from "@/actions/ordens/atualizar-ordem.action";
import { atualizarStatusAction } from "@/actions/ordens/atualizar-status.action";
import { listarOrdensAction } from "@/actions/ordens/listar-ordens.action";
import type { CriarOrdemDto } from "@/modules/ordens/dto/criar-ordem.dto";
import type { AtualizarOrdemDto } from "@/modules/ordens/dto/atualizar-ordem.dto";
import type { OrdemRespostaDto } from "@/modules/ordens/dto/ordem-resposta.dto";
import type { StatusOS } from "@/shared/constants/os-status.ts";

export function useOrdens() {
  const [ordens, setOrdens] = useState<OrdemRespostaDto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function carregarOrdens() {
    try {
      setCarregando(true);
      setErro(null);
      const lista = await listarOrdensAction();
      setOrdens(lista);
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    void carregarOrdens();
  }, []);

  async function adicionarOrdem(dados: CriarOrdemDto): Promise<boolean> {
    try {
      setSalvando(true);
      setErro(null);
      await criarOrdemAction(dados);
      // A criação não faz join (equipamentoTipo/clienteNome), então recarrega
      // a lista inteira em vez de fazer merge manual, igual à listagem inicial.
      await carregarOrdens();
      return true;
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro desconhecido");
      return false;
    } finally {
      setSalvando(false);
    }
  }

  async function atualizarOrdem(
    id: number,
    dados: AtualizarOrdemDto
  ): Promise<boolean> {
    try {
      setSalvando(true);
      setErro(null);
      await atualizarOrdemAction(id, dados);
      await carregarOrdens();
      return true;
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro desconhecido");
      return false;
    } finally {
      setSalvando(false);
    }
  }

  async function mudarStatus(id: number, novoStatus: StatusOS): Promise<boolean> {
    try {
      setErro(null);
      await atualizarStatusAction(id, novoStatus);
      await carregarOrdens();
      return true;
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro desconhecido");
      return false;
    }
  }

  return {
    ordens,
    carregando,
    salvando,
    erro,
    adicionarOrdem,
    atualizarOrdem,
    mudarStatus,
    recarregar: carregarOrdens,
  };
}
