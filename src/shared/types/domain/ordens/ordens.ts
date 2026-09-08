import type { StatusOS } from "@/shared/constants/os-status";

export type TipoStatusOS = typeof StatusOS[keyof typeof StatusOS];

export interface Ordem {
  id: number;
  numero: string;
  descricao: string;
  status: TipoStatusOS;
  valor: string | null;
  equipamentoId: number;
  createdAt: Date;
  deliveredAt: Date | null;
  prioridade: string;
  tipoServico: string | null;
  observacao: string | null;

  // 👉 Adicione estes campos opcionais aqui no domain:
  equipamentoTipo?: string;
  equipamentoMarca?: string;
  equipamentoModelo?: string;
  clienteNome?: string;
}