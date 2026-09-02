import { Equipamento } from "@/shared/types/domain/equipamentos/equipamentos";


export type CriarEquipamentoDto = Omit<Equipamento, "id">;
