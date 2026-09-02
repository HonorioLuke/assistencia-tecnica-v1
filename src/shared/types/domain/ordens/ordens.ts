import type { StatusOS } from "@/shared/constants/os-status";

export interface Ordem {
  id: number;
  numero: string;
  descricao: string;
  status: StatusOS;
  valor: string | null;
  equipamentoId: number;
  createdAt: Date;
  deliveredAt: Date | null;
  prioridade: string;
  tipoServico: string | null;
  observacao: string | null;
}