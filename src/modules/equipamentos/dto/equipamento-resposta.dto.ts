import { Equipamento } from "@/shared/types/domain/equipamentos/equipamentos";

// Estende o domínio com o campo que só existe por causa do JOIN com clientes.
// Não é um simples alias (`= Equipamento`) porque clienteNome não é
// coluna da tabela equipamentos.
export type respostaEquipamentoDto = Equipamento & {
  clienteNome: string | null;
};