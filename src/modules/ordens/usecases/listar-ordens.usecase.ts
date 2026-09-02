import { ordemRepositorio } from "../repositories/ordem.repositorio";

export async function listarOrdensUseCase() {
  return ordemRepositorio.buscarTodos();
}