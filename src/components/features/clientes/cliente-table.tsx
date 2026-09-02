"use client";

import { useState } from "react";
import type { ClienteRespostaDto } from "@/modules/clientes/dto/cliente-resposta.dto";

interface ClienteTableProps {
  clientes: ClienteRespostaDto[];
  loading: boolean;
  onUpdate: (
    id: number,
    dados: { nome: string; telefone: string; email: string }
  ) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
}

export function ClienteTable({
  clientes,
  loading,
  onUpdate,
  onDelete,
}: ClienteTableProps) {
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ nome: "", telefone: "", email: "" });
  const [busy, setBusy] = useState(false);

  if (loading)
    return <p className="p-8 text-center text-subtle animate-pulse">Carregando clientes...</p>;
  if (clientes.length === 0)
    return <p className="p-8 text-center text-subtle">Nenhum cliente cadastrado ainda.</p>;

  const startEdit = (cliente: ClienteRespostaDto) => {
    setEditId(cliente.id);
    setEditData({ nome: cliente.nome, telefone: cliente.telefone, email: cliente.email });
  };

  const cancelEdit = () => setEditId(null);

  const saveEdit = async (id: number) => {
    setBusy(true);
    const sucesso = await onUpdate(id, editData);
    if (sucesso) setEditId(null);
    setBusy(false);
  };

  const handleDelete = async (id: number, nome: string) => {
    if (
      !confirm(
        `Excluir o cliente "${nome}"?\n\nIsso também excluirá TODOS os equipamentos e ordens de serviço vinculados a ele. Essa ação não pode ser desfeita.`
      )
    )
      return;
    setBusy(true);
    await onDelete(id);
    setBusy(false);
  };

  const isEditing = (id: number) => editId === id;

  return (
    <div className="bg-surface rounded-xl shadow-sm border border-divider overflow-hidden">
      {/* ── Tabela — visível só no desktop ── */}
      <table className="hidden md:table min-w-full text-left">
        <thead className="bg-surface-hover border-b border-divider">
          <tr>
            <th className="p-4 text-sm font-semibold text-muted">ID</th>
            <th className="p-4 text-sm font-semibold text-muted">Nome</th>
            <th className="p-4 text-sm font-semibold text-muted">Telefone</th>
            <th className="p-4 text-sm font-semibold text-muted">E-mail</th>
            <th className="p-4 text-sm font-semibold text-muted text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id} className="border-t border-divider hover:bg-surface-hover transition">
              <td className="p-4 text-sm text-muted">{cliente.id}</td>

              <td className="p-4 text-sm">
                {isEditing(cliente.id) ? (
                  <input
                    className="border-field-border bg-field border rounded p-1.5 w-full text-sm"
                    value={editData.nome}
                    onChange={(e) => setEditData({ ...editData, nome: e.target.value })}
                  />
                ) : (
                  <span className="font-semibold text-heading">{cliente.nome}</span>
                )}
              </td>

              <td className="p-4 text-sm">
                {isEditing(cliente.id) ? (
                  <input
                    className="border-field-border bg-field border rounded p-1.5 w-full text-sm"
                    value={editData.telefone}
                    onChange={(e) => setEditData({ ...editData, telefone: e.target.value })}
                  />
                ) : (
                  <span className="text-onsurface">{cliente.telefone}</span>
                )}
              </td>

              <td className="p-4 text-sm">
                {isEditing(cliente.id) ? (
                  <input
                    type="email"
                    className="border-field-border bg-field border rounded p-1.5 w-full text-sm"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  />
                ) : (
                  <span className="text-onsurface">{cliente.email}</span>
                )}
              </td>

              <td className="p-4 text-center whitespace-nowrap">
                {isEditing(cliente.id) ? (
                  <>
                    <button
                      disabled={busy}
                      onClick={() => saveEdit(cliente.id)}
                      className="text-secondary hover:underline mr-3 text-sm font-semibold disabled:opacity-50"
                    >
                      Salvar
                    </button>
                    <button
                      disabled={busy}
                      onClick={cancelEdit}
                      className="text-muted hover:underline text-sm disabled:opacity-50"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(cliente)}
                      className="text-primary hover:underline mr-3 text-sm font-semibold"
                    >
                      Editar
                    </button>
                    <button
                      disabled={busy}
                      onClick={() => handleDelete(cliente.id, cliente.nome)}
                      className="text-red-400 hover:underline text-sm font-semibold disabled:opacity-50"
                    >
                      Excluir
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Cards — visível só no mobile ── */}
      <ul className="md:hidden divide-y divide-divider">
        {clientes.map((cliente) => (
          <li key={cliente.id} className="p-4 flex flex-col gap-3">
            {isEditing(cliente.id) ? (
              <div className="flex flex-col gap-2">
                <input
                  className="border-field-border bg-field border rounded p-2 text-sm"
                  placeholder="Nome"
                  value={editData.nome}
                  onChange={(e) => setEditData({ ...editData, nome: e.target.value })}
                />
                <input
                  className="border-field-border bg-field border rounded p-2 text-sm"
                  placeholder="Telefone"
                  value={editData.telefone}
                  onChange={(e) => setEditData({ ...editData, telefone: e.target.value })}
                />
                <input
                  type="email"
                  className="border-field-border bg-field border rounded p-2 text-sm"
                  placeholder="E-mail"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                />
                <div className="flex gap-2 mt-1">
                  <button
                    disabled={busy}
                    onClick={() => saveEdit(cliente.id)}
                    className="flex-1 bg-secondary text-white text-sm font-bold py-2 rounded disabled:opacity-50"
                  >
                    Salvar
                  </button>
                  <button
                    disabled={busy}
                    onClick={cancelEdit}
                    className="flex-1 border border-divider text-muted text-sm py-2 rounded disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-heading text-sm">{cliente.nome}</p>
                    <p className="text-xs text-muted mt-0.5">ID #{cliente.id}</p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <button onClick={() => startEdit(cliente)} className="text-primary text-sm font-semibold">
                      Editar
                    </button>
                    <button
                      disabled={busy}
                      onClick={() => handleDelete(cliente.id, cliente.nome)}
                      className="text-red-400 text-sm font-semibold disabled:opacity-50"
                    >
                      Excluir
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-sm text-onsurface">
                  <span>📞 {cliente.telefone}</span>
                  <span>✉️ {cliente.email}</span>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
