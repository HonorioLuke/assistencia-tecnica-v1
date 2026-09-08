"use client";

import { useEffect, useState } from "react";
import { listarEquipamentosAction } from "@/actions/equipamentos/listar-equipamentos.action";
import { criarOrdemAction } from "@/actions/ordens/criar-ordem.action";
import type { respostaEquipamentoDto } from "@/modules/equipamentos/dto/equipamento-resposta.dto";
import { BuscaEquipamento } from "@/components/features/ordens/BuscaEquipamento";

export default function OrdensPage() {
  const [descricao, setDescricao] = useState("");
  const [equipamentoId, setEquipamentoId] = useState("");
  const [equipamentos, setEquipamentos] = useState<respostaEquipamentoDto[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    listarEquipamentosAction()
      .then(setEquipamentos)
      .catch(() => setEquipamentos([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErro(null);

    try {
      await criarOrdemAction({ descricao, equipamentoId: Number(equipamentoId) });
      alert("Ordem de Serviço criada com sucesso!");
      setDescricao("");
      setEquipamentoId("");
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="p-8 bg-page min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Abertura de OS</h1>
          <p className="text-subtle mt-1">Dê entrada em um novo equipamento na assistência técnica</p>
        </div>

        {erro && (
          <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-700 text-sm">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-surface p-6 rounded-xl shadow-sm border border-divider mb-8 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-muted mb-1">Equipamento Vinculado</label>
            <BuscaEquipamento
              equipamentos={equipamentos}
              value={equipamentoId ? Number(equipamentoId) : null}
              onChange={(id) => setEquipamentoId(String(id))}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-muted mb-1">Defeito / Relato do Cliente</label>
            <textarea
              required
              rows={4}
              placeholder="Descreva o problema em detalhes..."
              className="w-full border-field-border bg-field border p-2.5 rounded focus:ring-primary outline-none text-sm resize-none"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={isSubmitting || !equipamentoId}
              className="bg-secondary text-white font-bold py-2.5 px-8 rounded hover:bg-emerald-600 transition text-sm disabled:bg-gray-400"
            >
              {isSubmitting ? "Salvando..." : "Gerar Nova OS"}
            </button>
          </div>
        </form>

        <div className="bg-info p-8 rounded-xl shadow-sm border border-divider text-center">
          <p className="text-heading">
            Para acompanhar o status das máquinas, acesse o{" "}
            <strong className="text-secondary">Dashboard</strong> no menu lateral.
          </p>
        </div>
      </div>
    </main>
  );
}