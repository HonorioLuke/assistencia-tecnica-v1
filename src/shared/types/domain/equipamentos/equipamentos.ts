export interface Equipamento {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  serial: string | null;
  clienteId: number;
}