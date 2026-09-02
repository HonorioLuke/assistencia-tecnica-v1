"use client";

import { ClienteForm } from "@/components/features/clientes/cliente-form";
import { ClienteTable } from "@/components/features/clientes/cliente-table";
import { useClientes } from "@/hooks/clientes/use-clientes";

export default function ClientesPage() {
  const {
    clientes,
    carregando,
    salvando,
    erro,
    adicionarCliente,
    atualizarCliente,
    removerCliente,
  } = useClientes();

  return (
    <main className="p-8 bg-page min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Gestão de Clientes</h1>
          <p className="text-subtle mt-1">Cadastre e consulte os clientes da assistência</p>
        </div>

        {erro && (
          <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-700 text-sm">
            {erro}
          </div>
        )}

        <ClienteForm onSubmit={adicionarCliente} salvando={salvando} />
        <ClienteTable
          clientes={clientes}
          loading={carregando}
          onUpdate={atualizarCliente}
          onDelete={removerCliente}
        />
      </div>
    </main>
  );
}
