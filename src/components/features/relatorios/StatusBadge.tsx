interface StatusBadgeProps {
  status: string;
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  'Recebido':   { label: 'Recebido',   className: 'bg-gray-100 text-gray-600 border border-gray-200' },
  'Em análise': { label: 'Em análise', className: 'bg-purple-100 text-purple-700 border border-purple-200' },
  'Em reparo':  { label: 'Em reparo',  className: 'bg-blue-100 text-blue-700 border border-blue-200' },
  'Pronto':     { label: 'Pronto',     className: 'bg-yellow-100 text-yellow-700 border border-yellow-200' },
  'Entregue':   { label: 'Entregue',   className: 'bg-emerald-100 text-emerald-700 border border-emerald-200' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: 'bg-gray-100 text-gray-600 border border-gray-200',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${config.className}`}>
      {config.label}
    </span>
  );
}