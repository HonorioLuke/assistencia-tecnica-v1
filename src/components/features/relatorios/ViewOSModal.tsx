'use client'

import { useEffect } from 'react';
import { OrdemServico } from './types';

interface ViewOSModalProps {
  ordem: OrdemServico | null;
  onClose: () => void;
  onImprimir: () => void;
}

function formatarData(data: Date | null | undefined): string {
  if (!data) return '—';
  return new Date(data).toLocaleDateString('pt-BR');
}

function nomeEquipamento(ordem: OrdemServico): string {
  return [ordem.equipamentoTipo, ordem.equipamentoMarca, ordem.equipamentoModelo]
    .filter(Boolean).join(' ') || '—';
}

const PRIORIDADE_BADGE: Record<string, string> = {
  Normal:  'bg-gray-100 text-gray-600',
  Urgente: 'bg-orange-100 text-orange-700',
  VIP:     'bg-yellow-100 text-yellow-700',
};

const STATUS_BADGE: Record<string, string> = {
  'Recebido':   'bg-gray-100 text-gray-600',
  'Em análise': 'bg-purple-100 text-purple-700',
  'Em reparo':  'bg-blue-100 text-blue-700',
  'Pronto':     'bg-yellow-100 text-yellow-700',
  'Entregue':   'bg-emerald-100 text-emerald-700',
};

function Campo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-sm text-gray-800">{value || '—'}</p>
    </div>
  );
}

export function ViewOSModal({ ordem, onClose, onImprimir }: ViewOSModalProps) {
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
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Ordem de Serviço</p>
            <h2 className="text-lg font-black text-purple-700">{ordem.numero}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Badges status + prioridade */}
        <div className="flex gap-2 px-6 pt-4">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${STATUS_BADGE[ordem.status] ?? 'bg-gray-100 text-gray-600'}`}>
            {ordem.status}
          </span>
          {ordem.prioridade && (
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${PRIORIDADE_BADGE[ordem.prioridade] ?? 'bg-gray-100 text-gray-600'}`}>
              {ordem.prioridade}
            </span>
          )}
          {ordem.tipoServico && (
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-50 text-purple-700">
              {ordem.tipoServico}
            </span>
          )}
        </div>

        {/* Campos */}
        <div className="px-6 py-5 grid grid-cols-2 gap-5">
          <Campo label="Cliente" value={ordem.clienteNome ?? '—'} />
          <Campo label="Equipamento" value={nomeEquipamento(ordem)} />
          <Campo label="Data de Entrada" value={formatarData(ordem.createdAt)} />
          <Campo label="Data de Saída" value={formatarData(ordem.deliveredAt)} />
          {ordem.valor != null && ordem.valor > 0 && (
            <Campo
              label="Valor"
              value={ordem.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            />
          )}
        </div>

        <div className="px-6 pb-2 flex flex-col gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Defeito / Relato do Cliente</p>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <p className="text-sm text-gray-800">{ordem.descricao}</p>
            </div>
          </div>

          {ordem.observacao && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Observação Interna</p>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <p className="text-sm text-gray-800">{ordem.observacao}</p>
              </div>
            </div>
          )}
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 mt-4 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
          >
            Fechar
          </button>
          <button
            onClick={onImprimir}
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
  );
}