import type { ClienteRespostaDto } from "../dto/cliente-resposta.dto";
import { listarClientesUseCase } from "../usecases/listar-clientes.usecase";

export async function listarClientesHandler(): Promise<ClienteRespostaDto[]> {
  return listarClientesUseCase();
}
