'use client'

import { useState } from 'react';
import { OrdemServico } from './types';
import { StatusBadge } from "./StatusBadge";
import { Pagination } from "./Pagination";
import { ViewOSModal } from "./ViewOSModal";
import { PrintOSModal } from "./PrintOSModal";

interface ReportTableProps {
  ordens: OrdemServico[];
  totalRegistros: number;
  paginaAtual: number;
  registrosPorPagina: number;
  onPaginaChange: (pagina: number) => void;
  onRegistrosPorPaginaChange: (valor: number) => void;
}

function formatarData(data: Date | null | undefined): string {
  if (!data) return '—';
  return new Date(data).toLocaleDateString('pt-BR');
}

function nomeEquipamento(ordem: OrdemServico): string {
  return [ordem.equipamentoTipo, ordem.equipamentoMarca, ordem.equipamentoModelo]
    .filter(Boolean).join(' ') || '—';
}

function IconeOlho() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function IconeImpressora() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9"/>
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
      <rect x="6" y="14" width="12" height="8"/>
    </svg>
  );
}

export function ReportTable({
  ordens,
  totalRegistros,
  paginaAtual,
  registrosPorPagina,
  onPaginaChange,
  onRegistrosPorPaginaChange,
}: ReportTableProps) {
  const totalPaginas = Math.ceil(totalRegistros / registrosPorPagina);
  const [ordemVisualizando, setOrdemVisualizando] = useState<OrdemServico | null>(null);
  const [ordemImprimindo, setOrdemImprimindo] = useState<OrdemServico | null>(null);

  return (
    <>
      {/* Modal visualização */}
      <ViewOSModal
        ordem={ordemVisualizando}
        onClose={() => setOrdemVisualizando(null)}
        onImprimir={() => {
          setOrdemImprimindo(ordemVisualizando);
          setOrdemVisualizando(null);
        }}
      />

      {/* Modal impressão */}
      <PrintOSModal
        ordem={ordemImprimindo}
        onClose={() => setOrdemImprimindo(null)}
      />

      <div className="bg-surface rounded-xl shadow-sm border border-divider overflow-hidden">

        <div className="flex items-center justify-between px-6 py-4 border-b border-divider">
          <h2 className="text-base font-bold text-heading">Resultados</h2>
          <span className="text-sm text-muted font-medium">
            {totalRegistros} OS encontrada{totalRegistros !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-surface-hover border-b border-divider">
              <tr>
                {['Nº OS', 'Cliente', 'Equipamento', 'Defeito', 'Status', 'Data Entrada', 'Data Saída', 'Ações'].map(col => (
                  <th key={col} className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {ordens.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-muted text-sm">
                    Nenhuma OS encontrada com os filtros aplicados.
                  </td>
                </tr>
              ) : (
                ordens.map(ordem => (
                  <tr key={ordem.id} className="border-t border-divider hover:bg-surface-hover transition">
                    <td className="px-4 py-3 text-sm font-bold text-primary whitespace-nowrap">{ordem.numero}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-heading whitespace-nowrap">{ordem.clienteNome ?? '—'}</td>
                    <td className="px-4 py-3 text-sm text-onsurface whitespace-nowrap max-w-[180px] truncate">{nomeEquipamento(ordem)}</td>
                    <td className="px-4 py-3 text-sm text-onsurface max-w-[200px] truncate">{ordem.descricao}</td>
                    <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={ordem.status} /></td>
                    <td className="px-4 py-3 text-sm text-onsurface whitespace-nowrap">{formatarData(ordem.createdAt)}</td>
                    <td className="px-4 py-3 text-sm text-onsurface whitespace-nowrap">{formatarData(ordem.deliveredAt)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setOrdemVisualizando(ordem)}
                          aria-label="Visualizar OS"
                          title="Visualizar"
                          className="p-2 rounded text-primary hover:bg-purple-50 transition"
                        >
                          <IconeOlho />
                        </button>
                        <button
                          onClick={() => setOrdemImprimindo(ordem)}
                          aria-label="Imprimir OS"
                          title="Imprimir"
                          className="p-2 rounded text-muted hover:bg-surface-hover transition"
                        >
                          <IconeImpressora />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4">
          <Pagination
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            registrosPorPagina={registrosPorPagina}
            totalRegistros={totalRegistros}
            onPaginaChange={onPaginaChange}
            onRegistrosPorPaginaChange={onRegistrosPorPaginaChange}
          />
        </div>
      </div>
    </>
  );
}