import { Cliente } from "@/shared/types/domain/clientes/clientes";

export type CriarClienteDto = Omit<Cliente, "id" | "criadoEm">;



