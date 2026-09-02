"use client";

import { useState } from "react";
import { EquipamentoForm } from "@/components/features/equipamentos/equipamento-form";
import { useEquipamentos } from "@/hooks/equipamentos/use-equipamentos";

const TIPOS = ["Notebook", "PC Desktop", "Placa de Vídeo", "Impressora", "Smartphone", "Outro"];

export default function EquipamentosPage() {
  const {
    equipamentos,
    carregando,
    salvando,
    erro,
    adicionarEquipamento,
    atualizarEquipamento,
    removerEquipamento,
  } = useEquipamentos();

  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ tipo: "", marca: "", modelo: "" });
  const [busy, setBusy] = useState(false);

  const startEdit = (eq: { id: number; tipo: string; marca: string; modelo: string }) => {
    setEditId(eq.id);
    setEditData({ tipo: eq.tipo, marca: eq.marca, modelo: eq.modelo });
  };

  const cancelEdit = () => setEditId(null);

  const saveEdit = async (id: number) => {
    setBusy(true);
    const sucesso = await atualizarEquipamento(id, editData);
    if (sucesso) setEditId(null);
    setBusy(false);
  };

  const handleDelete = async (id: number, label: string) => {
    if (
      !confirm(
        `Excluir o equipamento "${label}"?\n\nIsso também excluirá TODAS as ordens de serviço vinculadas a ele. Essa ação não pode ser desfeita.`
      )
    )
      return;
    setBusy(true);
    await removerEquipamento(id);
    setBusy(false);
  };

  return (
    <main className="p-8 bg-page min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">Gestão de Equipamentos</h1>

        {erro && (
          <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-700 text-sm">
            {erro}
          </div>
        )}

        <EquipamentoForm onSubmit={adicionarEquipamento} salvando={salvando} />

        <div className="bg-surface rounded-xl shadow-sm border border-divider overflow-hidden">
          {carregando ? (
            <p className="p-8 text-center text-subtle animate-pulse">Carregando equipamentos...</p>
          ) : equipamentos.length === 0 ? (
            <p className="p-8 text-center text-subtle">Nenhum equipamento cadastrado ainda.</p>
          ) : (
            <table className="min-w-full text-left">
              <thead className="bg-surface-hover border-b border-divider">
                <tr>
                  <th className="p-4 text-sm font-semibold text-muted">ID</th>
                  <th className="p-4 text-sm font-semibold text-muted">Cliente</th>
                  <th className="p-4 text-sm font-semibold text-muted">Tipo</th>
                  <th className="p-4 text-sm font-semibold text-muted">Marca</th>
                  <th className="p-4 text-sm font-semibold text-muted">Modelo</th>
                  <th className="p-4 text-sm font-semibold text-muted text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {equipamentos.map((eq) => {
                  const isEditing = editId === eq.id;
                  return (
                    <tr key={eq.id} className="border-t border-divider hover:bg-surface-hover transition">
                      <td className="p-4 text-sm text-muted">{eq.id}</td>
                      <td className="p-4 text-sm font-semibold text-heading">{eq.clienteNome}</td>

                      <td className="p-4 text-sm">
                        {isEditing ? (
                          <select
                            className="border-field-border bg-field border rounded p-1.5 text-sm"
                            value={editData.tipo}
                            onChange={(e) => setEditData({ ...editData, tipo: e.target.value })}
                          >
                            {TIPOS.map((t) => (
                              <option key={t}>{t}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-onsurface">{eq.tipo}</span>
                        )}
                      </td>

                      <td className="p-4 text-sm">
                        {isEditing ? (
                          <input
                            className="border-field-border bg-field border rounded p-1.5 w-full text-sm"
                            value={editData.marca}
                            onChange={(e) => setEditData({ ...editData, marca: e.target.value })}
                          />
                        ) : (
                          <span className="text-onsurface">{eq.marca}</span>
                        )}
                      </td>

                      <td className="p-4 text-sm">
                        {isEditing ? (
                          <input
                            className="border-field-border bg-field border rounded p-1.5 w-full text-sm"
                            value={editData.modelo}
                            onChange={(e) => setEditData({ ...editData, modelo: e.target.value })}
                          />
                        ) : (
                          <span className="text-onsurface">{eq.modelo}</span>
                        )}
                      </td>

                      <td className="p-4 text-center whitespace-nowrap">
                        {isEditing ? (
                          <>
                            <button
                              disabled={busy}
                              onClick={() => saveEdit(eq.id)}
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
                              onClick={() => startEdit(eq)}
                              className="text-primary hover:underline mr-3 text-sm font-semibold"
                            >
                              Editar
                            </button>
                            <button
                              disabled={busy}
                              onClick={() => handleDelete(eq.id, `${eq.marca} ${eq.modelo}`)}
                              className="text-red-400 hover:underline text-sm font-semibold disabled:opacity-50"
                            >
                              Excluir
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
