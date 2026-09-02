"use client";

import { useEffect, useState } from "react";
import { criarEquipamentoAction } from "@/actions/equipamentos/criar-equipamento.action";
import { atualizarEquipamentoAction } from "@/actions/equipamentos/atualizar-equipamento.action";
import { deletarEquipamentoAction } from "@/actions/equipamentos/deletar-equipamento.action";
import { listarEquipamentosAction } from "@/actions/equipamentos/listar-equipamentos.action";
import type { CriarEquipamentoDto } from "@/modules/equipamentos/dto/criar-equipamento.dto";
import type { AtualizarEquipamentoDto } from "@/modules/equipamentos/dto/atualizar-equipamento.dto";
import type { respostaEquipamentoDto } from "@/modules/equipamentos/dto/equipamento-resposta.dto";

export function useEquipamentos() {
  const [equipamentos, setEquipamentos] = useState<respostaEquipamentoDto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function carregarEquipamentos() {
    try {
      setCarregando(true);
      setErro(null);
      const lista = await listarEquipamentosAction();
      setEquipamentos(lista);
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    void carregarEquipamentos();
  }, []);

  async function adicionarEquipamento(
    dados: CriarEquipamentoDto
  ): Promise<boolean> {
    try {
      setSalvando(true);
      setErro(null);
      const listaNova = await criarEquipamentoAction(equipamentos, dados);
      setEquipamentos(listaNova);
      return true;
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro desconhecido");
      return false;
    } finally {
      setSalvando(false);
    }
  }

  async function atualizarEquipamento(
    id: number,
    dados: AtualizarEquipamentoDto
  ): Promise<boolean> {
    try {
      setSalvando(true);
      setErro(null);
      const listaNova = await  atualizarEquipamentoAction(equipamentos, id, dados);
      setEquipamentos(listaNova);
      return true;
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro desconhecido");
      return false;
    } finally {
      setSalvando(false);
    }
  }

  async function removerEquipamento(id: number): Promise<boolean> {
    try {
      setErro(null);
      const listaNova = await deletarEquipamentoAction(equipamentos, id);
      setEquipamentos(listaNova);
      return true;
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro desconhecido");
      return false;
    }
  }

  return {
    equipamentos,
    carregando,
    salvando,
    erro,
    adicionarEquipamento,
    atualizarEquipamento,
    removerEquipamento,
  };
}
