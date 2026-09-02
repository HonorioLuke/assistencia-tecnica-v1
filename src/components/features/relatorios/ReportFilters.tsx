import { FiltrosRelatorio, CampoPesquisa } from './types';

interface ReportFiltersProps {
  filtros: FiltrosRelatorio;
  onChange: (filtros: FiltrosRelatorio) => void;
  onPesquisar: () => void;
  onLimpar: () => void;
  onImprimir: () => void;
  onExportarPDF: () => void;
}

const PLACEHOLDER_MAP: Record<CampoPesquisa, string> = {
  numero:      'Digite o número da OS...',
  cliente:     'Digite o nome do cliente...',
  equipamento: 'Digite o equipamento...',
};

const STATUS_OPTIONS = [
  'Todos',
  'Recebido',
  'Em análise',
  'Em reparo',
  'Pronto',
  'Entregue',
];

export function ReportFilters({
  filtros,
  onChange,
  onPesquisar,
  onLimpar,
  onImprimir,
  onExportarPDF,
}: ReportFiltersProps) {
  const set = (partial: Partial<FiltrosRelatorio>) =>
    onChange({ ...filtros, ...partial });

  return (
    <div className="bg-surface rounded-xl shadow-sm border border-divider p-6 mb-6">

      {/* Linha 1 — campos de filtro */}
      <div className="flex flex-wrap gap-4 items-end">

        <div className="flex flex-col gap-1 min-w-[160px]">
          <label className="text-xs font-semibold text-muted">Pesquisar por</label>
          <select
            className="border-field-border bg-field border p-2.5 rounded outline-none text-sm"
            value={filtros.campoPesquisa}
            onChange={e => set({ campoPesquisa: e.target.value as CampoPesquisa, termoPesquisa: '' })}
          >
            <option value="numero">Ordem de Serviço</option>
            <option value="cliente">Nome do Cliente</option>
            <option value="equipamento">Equipamento</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
          <label className="text-xs font-semibold text-muted">Termo</label>
          <input
            type="text"
            placeholder={PLACEHOLDER_MAP[filtros.campoPesquisa]}
            className="border-field-border bg-field border p-2.5 rounded outline-none text-sm"
            value={filtros.termoPesquisa}
            onChange={e => set({ termoPesquisa: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1 min-w-[150px]">
          <label className="text-xs font-semibold text-muted">Data Inicial</label>
          <input
            type="date"
            className="border-field-border bg-field border p-2.5 rounded outline-none text-sm"
            value={filtros.dataInicial}
            onChange={e => set({ dataInicial: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1 min-w-[150px]">
          <label className="text-xs font-semibold text-muted">Data Final</label>
          <input
            type="date"
            className="border-field-border bg-field border p-2.5 rounded outline-none text-sm"
            value={filtros.dataFinal}
            onChange={e => set({ dataFinal: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1 min-w-[140px]">
          <label className="text-xs font-semibold text-muted">Status</label>
          <select
            className="border-field-border bg-field border p-2.5 rounded outline-none text-sm"
            value={filtros.status}
            onChange={e => set({ status: e.target.value })}
          >
            {STATUS_OPTIONS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Linha 2 — botões */}
      <div className="flex flex-wrap gap-3 mt-5 justify-end">
        <button
          onClick={onLimpar}
          className="px-4 py-2.5 rounded border border-divider text-sm font-semibold text-muted hover:bg-surface-hover transition"
        >
          Limpar filtros
        </button>

        <button
          onClick={onImprimir}
          className="px-4 py-2.5 rounded border border-divider text-sm font-semibold text-muted hover:bg-surface-hover transition flex items-center gap-2"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"/>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          Imprimir
        </button>

        <button
          onClick={onExportarPDF}
          className="px-4 py-2.5 rounded border border-divider text-sm font-semibold text-muted hover:bg-surface-hover transition flex items-center gap-2"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          Exportar PDF
        </button>

        <button
          onClick={onPesquisar}
          className="px-6 py-2.5 rounded bg-primary text-white text-sm font-bold hover:bg-purple-700 transition"
        >
          Pesquisar
        </button>
      </div>
    </div>
  );
}