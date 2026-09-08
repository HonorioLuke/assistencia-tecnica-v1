"use client";

import { useState, useEffect } from "react";
import type { OrdemRespostaDto } from "@/modules/ordens/dto/ordem-resposta.dto";
import type { AtualizarOrdemDto } from "@/modules/ordens/dto/atualizar-ordem.dto";
import { StatusOS } from "@/shared/constants/os-status";
import type { TipoStatusOS } from "@/shared/types/domain/ordens/ordens";

interface EditOSModalProps {
  ordem: OrdemRespostaDto | null;
  onClose: () => void;
  onSave: (id: number, dados: AtualizarOrdemDto) => Promise<boolean>;
}

// Deriva as opções direto do objeto StatusOS, garantindo que batem com TipoStatusOS
const STATUS_OPTIONS = Object.values(StatusOS) as TipoStatusOS[];
const PRIORIDADE_OPTIONS = ["Normal", "Retorno", "Emergência"];
const TIPO_SERVICO_OPTIONS = [
  "Limpeza",
  "Manutenção",
  "Troca de peça",
  "Formatação",
  "Diagnóstico",
  "Outro",
];

function nomeEquipamento(ordem: OrdemRespostaDto): string {
  return (
    [ordem.equipamentoTipo, ordem.equipamentoMarca, ordem.equipamentoModelo]
      .filter(Boolean)
      .join(" ") || "—"
  );
}

export function EditOSModal({ ordem, onClose, onSave }: EditOSModalProps) {
  // Inicializados direto a partir de `ordem`. O componente é remontado via
  // `key={ordem?.id}` no componente pai a cada troca de ordem, então não
  // precisamos de um useEffect para sincronizar esses valores.
  const [status, setStatus] = useState<TipoStatusOS>(
    ordem?.status ?? STATUS_OPTIONS[0]
  );
  const [descricao, setDescricao] = useState(ordem?.descricao ?? "");
  const [observacao, setObservacao] = useState(ordem?.observacao ?? "");
  const [prioridade, setPrioridade] = useState(ordem?.prioridade ?? "Normal");
  const [tipoServico, setTipoServico] = useState(ordem?.tipoServico ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = ordem ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ordem]);

  if (!ordem) return null;

  const handleSave = async () => {
    setSaving(true);
    const sucesso = await onSave(ordem.id, {
      status,
      descricao,
      observacao: observacao || null,
      prioridade,
      tipoServico: tipoServico || null,
    });
    setSaving(false);
    if (sucesso) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
              Editar OS
            </p>
            <h2 className="text-lg font-black text-purple-700">{ordem.numero}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-800">{ordem.clienteNome ?? "—"}</p>
          <p className="text-sm text-gray-500">{nomeEquipamento(ordem)}</p>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Status</label>
              <select
                className="w-full border border-gray-200 bg-gray-50 rounded-lg p-2.5 text-sm outline-none focus:border-purple-400"
                value={status}
                onChange={(e) => setStatus(e.target.value as TipoStatusOS)}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Prioridade</label>
              <select
                className="w-full border border-gray-200 bg-gray-50 rounded-lg p-2.5 text-sm outline-none focus:border-purple-400"
                value={prioridade}
                onChange={(e) => setPrioridade(e.target.value)}
              >
                {PRIORIDADE_OPTIONS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Tipo de Serviço</label>
            <select
              className="w-full border border-gray-200 bg-gray-50 rounded-lg p-2.5 text-sm outline-none focus:border-purple-400"
              value={tipoServico}
              onChange={(e) => setTipoServico(e.target.value)}
            >
              <option value="">Selecione...</option>
              {TIPO_SERVICO_OPTIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Defeito / Relato do Cliente</label>
            <textarea
              rows={3}
              className="w-full border border-gray-200 bg-gray-50 rounded-lg p-2.5 text-sm outline-none focus:border-purple-400 resize-none"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Observação Interna</label>
            <textarea
              rows={3}
              placeholder="Anotações internas sobre o reparo..."
              className="w-full border border-gray-200 bg-gray-50 rounded-lg p-2.5 text-sm outline-none focus:border-purple-400 resize-none"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-purple-700 text-white text-sm font-bold hover:bg-purple-800 transition disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}