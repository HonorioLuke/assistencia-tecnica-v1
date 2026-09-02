import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/database";
import { clientes } from "@/infrastructure/schemas/clientes";
import type { CriarClienteDto } from "../dto/criar-cliente.dto";
import type { AtualizarClienteDto } from "../dto/atualizar-cliente.dto";
import type { ClienteRespostaDto } from "../dto/cliente-resposta.dto";

// Objeto literal com métodos async, igual ao padrão do repositorio-pet.ts do
// petshop (não é uma classe, como estava antes).
export const clienteRepositorio = {
  async findAll(): Promise<ClienteRespostaDto[]> {
    return db.select().from(clientes);
  },

  async findById(id: number): Promise<ClienteRespostaDto | null> {
    const [cliente] = await db.select().from(clientes).where(eq(clientes.id, id));
    return cliente ?? null;
  },

  async create(dado: CriarClienteDto): Promise<ClienteRespostaDto> {
    const [criado] = await db.insert(clientes).values(dado).returning();

    if (!criado) {
      throw new Error("Não foi possível cadastrar o cliente.");
    }

    return criado;
  },

  async update(id: number, dado: AtualizarClienteDto): Promise<ClienteRespostaDto> {
    const [atualizado] = await db
      .update(clientes)
      .set(dado)
      .where(eq(clientes.id, id))
      .returning();

    if (!atualizado) {
      throw new Error("Cliente não encontrado.");
    }

    return atualizado;
  },

  async delete(id: number): Promise<void> {
    const [removido] = await db.delete(clientes).where(eq(clientes.id, id)).returning();

    if (!removido) {
      throw new Error("Cliente não encontrado.");
    }
  },
};
