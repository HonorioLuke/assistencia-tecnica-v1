"use client";

import { useEffect, useState } from "react";
import { listarClientesAction } from "@/actions/clientes/listar-clientes.action";
import type { CriarEquipamentoDto } from "@/modules/equipamentos/dto/criar-equipamento.dto";
import type { ClienteRespostaDto } from "@/modules/clientes/dto/cliente-resposta.dto";

const TIPOS = ["Notebook", "PC Desktop", "Placa de Vídeo", "Impressora", "Outro"];

interface EquipamentoFormProps {
  onSubmit: (dados: CriarEquipamentoDto) => Promise<boolean>;
  salvando?: boolean;
}

export function EquipamentoForm({ onSubmit, salvando }: EquipamentoFormProps) {
  const [tipo, setTipo] = useState(TIPOS[0]);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [serial, setSerial] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [clientes, setClientes] = useState<ClienteRespostaDto[]>([]);

  useEffect(() => {
    listarClientesAction()
      .then(setClientes)
      .catch(() => setClientes([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteId) return;

    const sucesso = await onSubmit({
      tipo,
      marca,
      modelo,
      serial,
      clienteId: Number(clienteId),
    });

    if (sucesso) {
      setMarca("");
      setModelo("");
      setClienteId("");
      setTipo(TIPOS[0]);
      setSerial("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface p-6 rounded-xl shadow-sm border border-divider mb-6">
      <h2 className="text-lg font-bold text-heading mb-4">Novo Equipamento</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div>
          <label className="block text-sm font-semibold text-muted mb-1">Cliente</label>
          <select
            required
            className="w-full border-field-border bg-field border p-2.5 rounded outline-none text-sm"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
          >
            <option value="" disabled>Selecione...</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-muted mb-1">Tipo</label>
          <select
            className="w-full border-field-border bg-field border p-2.5 rounded outline-none text-sm"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            {TIPOS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-muted mb-1">Marca</label>
          <input
            required
            placeholder="Ex: Dell, Acer"
            className="w-full border-field-border bg-field border p-2.5 rounded outline-none text-sm"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-muted mb-1">Modelo</label>
          <input
            required
            placeholder="Ex: Inspiron 15"
            className="w-full border-field-border bg-field border p-2.5 rounded outline-none text-sm"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <button
            type="submit"
            disabled={salvando}
            className="bg-primary text-white font-bold py-2.5 px-4 rounded hover:bg-purple-700 transition w-full disabled:bg-gray-400 text-sm"
          >
            {salvando ? "Salvando..." : "Cadastrar"}
          </button>
        </div>
      </div>
    </form>
  );
}
