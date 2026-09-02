export interface Equipamento {
  id: string;
  tipo: string;
  marca: string;
  modelo: string;
  serial: string | null;
  clienteId: number;
}