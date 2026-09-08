"use client";

import { useState } from "react";
import { StatusOS } from "@/shared/constants/os-status";
import { EditOSModal } from "@/components/features/ordens/kanban/EditOSModal";
import type { OrdemRespostaDto } from "@/modules/ordens/dto/ordem-resposta.dto";
import type { AtualizarOrdemDto } from "@/modules/ordens/dto/atualizar-ordem.dto";
import type { TipoStatusOS } from "@/shared/types/domain/ordens/ordens";

interface KanbanProps {
  ordens: OrdemRespostaDto[];
  onStatusChange: (id: number, status: TipoStatusOS) => void;
  onSave: (id: number, dados: AtualizarOrdemDto) => Promise<boolean>;
}

type FiltroKanban = "ativas" | "hoje" | "todas";

const FILTROS: { value: FiltroKanban; label: string }[] = [
  { value: "ativas", label: "Em andamento" },
  { value: "hoje", label: "Abertas hoje" },
  { value: "todas", label: "Todas" },
];

const PRIORIDADE_BADGE: Record<string, string> = {
  Normal: "bg-gray-200 text-gray-600",
  Urgente: "bg-orange-100 text-orange-700",
  VIP: "bg-yellow-100 text-yellow-700",
};

function isHoje(data?: string | Date): boolean {
  if (!data) return false;
  const d = new Date(data);
  const hoje = new Date();
  return (
    d.getDate() === hoje.getDate() &&
    d.getMonth() === hoje.getMonth() &&
    d.getFullYear() === hoje.getFullYear()
  );
}

export function KanbanBoard({ ordens, onStatusChange, onSave }: KanbanProps) {
  const [filtro, setFiltro] = useState<FiltroKanban>("ativas");
  const [ordemEditando, setOrdemEditando] = useState<OrdemRespostaDto | null>(null);
  const colunas = Object.values(StatusOS);

  const ordensFiltradas = ordens.filter((os) => {
    if (filtro === "ativas") return os.status !== StatusOS.ENTREGUE;
    if (filtro === "hoje") return isHoje(os.createdAt);
    return true;
  });

  const totalOcultas = ordens.filter((os) => os.status === StatusOS.ENTREGUE).length;

  return (
    <>
      <EditOSModal ordem={ordemEditando} onClose={() => setOrdemEditando(null)} onSave={onSave} />

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {FILTROS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFiltro(f.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              filtro === f.value
                ? "bg-primary text-white"
                : "bg-surface border border-divider text-muted hover:bg-surface-hover"
            }`}
          >
            {f.label}
          </button>
        ))}
        {filtro === "ativas" && totalOcultas > 0 && (
          <span className="ml-auto text-xs text-muted">
            {totalOcultas} OS entregue{totalOcultas !== 1 ? "s" : ""} oculta{totalOcultas !== 1 ? "s" : ""} —{" "}
            <button className="text-primary underline" onClick={() => setFiltro("todas")}>ver todas</button>
          </span>
        )}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6" style={{ minHeight: "400px" }}>
        {colunas.map((coluna) => {
          if (filtro === "ativas" && coluna === StatusOS.ENTREGUE) return null;
          const ordensColuna = ordensFiltradas.filter((os) => os.status === coluna);

          return (
            <div key={coluna} className="min-w-65 bg-surface rounded-xl p-4 flex flex-col border border-divider">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-heading text-sm">{coluna}</h3>
                <span className="bg-surface-hover text-onsurface text-xs font-bold px-2 py-1 rounded-full">
                  {ordensColuna.length}
                </span>
              </div>

              <div className="flex flex-col gap-3 overflow-y-auto">
                {ordensColuna.length === 0 && (
                  <p className="text-xs text-muted text-center py-4">Nenhuma OS</p>
                )}
                {ordensColuna.map((os) => (
                  <div
                    key={os.id}
                    className="bg-surface-hover p-4 rounded-lg shadow-sm border border-divider hover:shadow-md transition cursor-pointer"
                    onClick={() => setOrdemEditando(os)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-black text-primary text-sm">{os.numero}</span>
                      <span className="text-xs text-muted">
                        {os.createdAt ? new Date(os.createdAt).toLocaleDateString("pt-BR") : ""}
                      </span>
                    </div>

                    <div className="flex gap-1.5 flex-wrap mb-2">
                      {os.prioridade && os.prioridade !== "Normal" && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${PRIORIDADE_BADGE[os.prioridade] ?? "bg-gray-100 text-gray-600"}`}>
                          {os.prioridade}
                        </span>
                      )}
                      {os.tipoServico && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-medium">
                          {os.tipoServico}
                        </span>
                      )}
                    </div>

                    {os.clienteNome && (
                      <p className="text-xs font-semibold text-secondary mb-1">{os.clienteNome}</p>
                    )}

                    {os.equipamentoMarca && (
                      <p className="text-xs text-onsurface mb-2">
                        {os.equipamentoTipo} {os.equipamentoMarca} {os.equipamentoModelo}
                      </p>
                    )}

                    <p className="text-sm text-onsurface mb-3 line-clamp-1">{os.descricao}</p>

                    <select
                      className="w-full text-xs border-field-border bg-field border p-1.5 rounded outline-none cursor-pointer"
                      value={os.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        e.stopPropagation();
                        onStatusChange(os.id, e.target.value as TipoStatusOS);
                      }}
                    >
                      {colunas.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}