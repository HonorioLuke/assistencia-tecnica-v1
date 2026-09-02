import type { ClienteRespostaDto } from "../dto/cliente-resposta.dto";
import { clienteRepositorio } from "../repositories/cliente.repositorio";

export async function listarClientesUseCase(): Promise<ClienteRespostaDto[]> {
  return clienteRepositorio.findAll();
}
