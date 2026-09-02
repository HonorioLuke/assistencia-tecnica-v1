'use client'

import { useEffect } from 'react';
import { OrdemServico } from './types';

interface PrintOSModalProps {
  ordem: OrdemServico | null;
  onClose: () => void;
}

function formatarData(data: Date | null | undefined): string {
  if (!data) return '—';
  return new Date(data).toLocaleDateString('pt-BR');
}

function nomeEquipamento(ordem: OrdemServico): string {
  return [ordem.equipamentoTipo, ordem.equipamentoMarca, ordem.equipamentoModelo]
    .filter(Boolean).join(' ') || '—';
}

export function PrintOSModal({ ordem, onClose }: PrintOSModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = ordem ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [ordem]);

  if (!ordem) return null;

  return (
    <>
      <style>{`
        @media print {
          body > * { display: none !important; }
          #print-os-receipt { display: block !important; position: fixed; inset: 0; z-index: 9999; background: white; }
          #print-os-receipt .no-print { display: none !important; }
        }
      `}</style>

      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          id="print-os-receipt"
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Header modal */}
          <div className="no-print flex items-center justify-between px-8 py-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Prévia de Impressão</h2>
            <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Conteúdo imprimível */}
          <div className="px-8 py-6">

            {/* Topo */}
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
              <div>
                <p className="text-2xl font-black text-purple-700">L&L AHTI</p>
                <p className="text-sm text-gray-500">Gestão de Bancada</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-purple-700">{ordem.numero}</p>
                <p className="text-sm text-gray-500">Ordem de Serviço</p>
              </div>
            </div>

            {/* Dados */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Cliente',         value: ordem.clienteNome ?? '—' },
                { label: 'Equipamento',     value: nomeEquipamento(ordem) },
                { label: 'Data de Entrada', value: formatarData(ordem.createdAt) },
                { label: 'Data de Saída',   value: formatarData(ordem.deliveredAt) },
                { label: 'Status',          value: ordem.status },
                { label: 'Prioridade',      value: ordem.prioridade ?? '—' },
                { label: 'Tipo de Serviço', value: ordem.tipoServico ?? '—' },
                ...(ordem.valor != null && ordem.valor > 0
                  ? [{ label: 'Valor', value: ordem.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }]
                  : []),
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                  <p className="text-sm font-semibold text-gray-800">{value}</p>
                </div>
              ))}
            </div>

            {/* Defeito */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Defeito / Relato do Cliente</p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <p className="text-sm text-gray-800">{ordem.descricao}</p>
              </div>
            </div>

            {/* Observação */}
            {ordem.observacao && (
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Observação Interna</p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-sm text-gray-800">{ordem.observacao}</p>
                </div>
              </div>
            )}

            {/* Assinaturas */}
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-gray-200">
              <div>
                <div className="border-b border-gray-400 mb-2 h-8" />
                <p className="text-xs text-gray-500 text-center">Assinatura do Cliente</p>
              </div>
              <div>
                <div className="border-b border-gray-400 mb-2 h-8" />
                <p className="text-xs text-gray-500 text-center">Assinatura do Técnico</p>
              </div>
            </div>

            <p className="text-center text-xs text-gray-400 mt-6">
              L&L AHTI · Documento gerado em {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Botões */}
          <div className="no-print flex justify-end gap-3 px-8 py-5 border-t border-gray-100">
            <button onClick={onClose} className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
              Fechar
            </button>
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-lg bg-purple-700 text-white text-sm font-bold hover:bg-purple-800 transition flex items-center gap-2"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"/>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                <rect x="6" y="14" width="12" height="8"/>
              </svg>
              Imprimir
            </button>
          </div>
        </div>
      </div>
    </>
  );
}