export type StatusOS =
  | 'Recebido'
  | 'Em análise'
  | 'Em reparo'
  | 'Pronto'
  | 'Entregue';

export type Prioridade = 'Normal' | 'Urgente' | 'VIP';

export type TipoServico =
  | 'Limpeza'
  | 'Manutenção'
  | 'Troca de peça'
  | 'Formatação'
  | 'Diagnóstico'
  | 'Outro';

export type CampoPesquisa = 'numero' | 'cliente' | 'equipamento';

export interface OrdemServico {
  id: number;
  numero: string;
  descricao: string;
  status: string;
  valor: number | null;
  equipamentoId: number;
  createdAt: Date;
  deliveredAt: Date | null;
  prioridade: string | null;
  tipoServico: string | null;
  observacao: string | null;
  equipamentoTipo: string | null;
  equipamentoMarca: string | null;
  equipamentoModelo: string | null;
  clienteNome: string | null;
}

export interface FiltrosRelatorio {
  campoPesquisa: CampoPesquisa;
  termoPesquisa: string;
  dataInicial: string;
  dataFinal: string;
  status: string;
}