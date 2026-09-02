"use client";

import { useState } from "react";
import type { CriarClienteDto } from "@/modules/clientes/dto/criar-cliente.dto";

const formatarCelular = (valor: string) => {
  let v = valor.replace(/\D/g, "");
  v = v.substring(0, 11);
  if (v.length === 0) return "";
  if (v.length <= 2) return `(${v}`;
  if (v.length <= 7) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
  return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
};

interface ClienteFormProps {
  onSubmit: (dados: CriarClienteDto) => Promise<boolean>;
  salvando?: boolean;
}

export function ClienteForm({ onSubmit, salvando }: ClienteFormProps) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelefone(formatarCelular(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sucesso = await onSubmit({ nome, telefone, email });
    if (sucesso) {
      setNome("");
      setTelefone("");
      setEmail("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface p-6 rounded-xl shadow-sm border border-divider mb-6">
      <h2 className="text-lg font-bold text-heading mb-4">Novo Cliente</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-semibold text-muted mb-1">Nome</label>
          <input
            required
            placeholder="Nome completo"
            className="w-full border-field-border bg-field border p-2.5 rounded outline-none text-sm"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-muted mb-1">Telefone</label>
          <input
            required
            placeholder="(85) 99999-9999"
            maxLength={15}
            className="w-full border-field-border bg-field border p-2.5 rounded outline-none text-sm"
            value={telefone}
            onChange={handleTelefoneChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-muted mb-1">E-mail</label>
          <input
            required
            type="email"
            placeholder="email@exemplo.com"
            className="w-full border-field-border bg-field border p-2.5 rounded outline-none text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
