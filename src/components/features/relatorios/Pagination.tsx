interface PaginationProps {
  paginaAtual: number;
  totalPaginas: number;
  registrosPorPagina: number;
  totalRegistros: number;
  onPaginaChange: (pagina: number) => void;
  onRegistrosPorPaginaChange: (valor: number) => void;
}

const OPCOES_REGISTROS = [10, 25, 50, 100];

export function Pagination({
  paginaAtual,
  totalPaginas,
  registrosPorPagina,
  totalRegistros,
  onPaginaChange,
  onRegistrosPorPaginaChange,
}: PaginationProps) {
  // Gera os números de página visíveis (máx 5 ao redor da atual)
  const paginas: number[] = [];
  const inicio = Math.max(1, paginaAtual - 2);
  const fim = Math.min(totalPaginas, paginaAtual + 2);
  for (let i = inicio; i <= fim; i++) paginas.push(i);

  const btnBase =
    'w-9 h-9 flex items-center justify-center rounded text-sm font-semibold transition';
  const btnAtivo =
    'bg-primary text-white';
  const btnInativo =
    'border border-divider text-muted hover:bg-surface-hover';
  const btnDesabilitado =
    'border border-divider text-muted opacity-40 cursor-not-allowed';

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-divider">

      {/* Registros por página */}
      <div className="flex items-center gap-2 text-sm text-muted">
        <span>Exibindo</span>
        <select
          className="border border-divider bg-field rounded p-1.5 text-sm outline-none"
          value={registrosPorPagina}
          onChange={e => onRegistrosPorPaginaChange(Number(e.target.value))}
        >
          {OPCOES_REGISTROS.map(n => (
            <option key={n} value={n}>{n} registros</option>
          ))}
        </select>
        <span>de <strong className="text-heading">{totalRegistros}</strong></span>
      </div>

      {/* Navegação */}
      <div className="flex items-center gap-1">
        <button
          disabled={paginaAtual === 1}
          onClick={() => onPaginaChange(paginaAtual - 1)}
          className={`${btnBase} ${paginaAtual === 1 ? btnDesabilitado : btnInativo}`}
        >
          ‹
        </button>

        {inicio > 1 && (
          <>
            <button onClick={() => onPaginaChange(1)} className={`${btnBase} ${btnInativo}`}>1</button>
            {inicio > 2 && <span className="px-1 text-muted text-sm">…</span>}
          </>
        )}

        {paginas.map(p => (
          <button
            key={p}
            onClick={() => onPaginaChange(p)}
            className={`${btnBase} ${p === paginaAtual ? btnAtivo : btnInativo}`}
          >
            {p}
          </button>
        ))}

        {fim < totalPaginas && (
          <>
            {fim < totalPaginas - 1 && <span className="px-1 text-muted text-sm">…</span>}
            <button onClick={() => onPaginaChange(totalPaginas)} className={`${btnBase} ${btnInativo}`}>
              {totalPaginas}
            </button>
          </>
        )}

        <button
          disabled={paginaAtual === totalPaginas || totalPaginas === 0}
          onClick={() => onPaginaChange(paginaAtual + 1)}
          className={`${btnBase} ${paginaAtual === totalPaginas || totalPaginas === 0 ? btnDesabilitado : btnInativo}`}
        >
          ›
        </button>
      </div>
    </div>
  );
}