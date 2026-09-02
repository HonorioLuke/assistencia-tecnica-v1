import { listarOrdensUseCase } from "../usecases/listar-ordens.usecase";

export async function listarOrdensHandler() {
  return listarOrdensUseCase();
}
