"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { respostaEquipamentoDto } from "@/modules/equipamentos/dto/equipamento-resposta.dto";

interface BuscaEquipamentoProps {
  equipamentos: respostaEquipamentoDto[];
  value: number | null;
  onChange: (equipamentoId: number) => void;
  placeholder?: string;
}

function rotuloEquipamento(eq: respostaEquipamentoDto): string {
  return `${eq.tipo} ${eq.marca} ${eq.modelo} — ${eq.clienteNome ?? "Sem cliente"}`;
}

export function BuscaEquipamento({
  equipamentos,
  value,
  onChange,
  placeholder = "Buscar por equipamento ou cliente...",
}: BuscaEquipamentoProps) {
  const [termo, setTermo] = useState("");
  const [aberto, setAberto] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selecionado = equipamentos.find((eq) => eq.id === value) ?? null;

  const filtrados = useMemo(() => {
    const busca = termo.trim().toLowerCase();
    if (!busca) return equipamentos;

    return equipamentos.filter((eq) => {
      const alvo = [eq.tipo, eq.marca, eq.modelo, eq.serial, eq.clienteNome]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return alvo.includes(busca);
    });
  }, [equipamentos, termo]);

  useEffect(() => {
    function handleClickFora(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  const handleSelecionar = (eq: respostaEquipamentoDto) => {
    onChange(eq.id);
    setTermo("");
    setAberto(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        placeholder={selecionado ? rotuloEquipamento(selecionado) : placeholder}
        className="w-full border-field-border bg-field border p-2.5 rounded outline-none text-sm"
        value={termo}
        onFocus={() => setAberto(true)}
        onChange={(e) => {
          setTermo(e.target.value);
          setAberto(true);
        }}
      />

      {aberto && (
        <div className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto bg-surface border border-divider rounded-lg shadow-lg">
          {filtrados.length === 0 ? (
            <p className="p-3 text-sm text-muted text-center">Nenhum equipamento encontrado.</p>
          ) : (
            filtrados.map((eq) => (
              <button
                type="button"
                key={eq.id}
                onClick={() => handleSelecionar(eq)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-surface-hover transition ${
                  eq.id === value ? "bg-surface-hover" : ""
                }`}
              >
                <span className="font-semibold text-heading">
                  {eq.tipo} {eq.marca} {eq.modelo}
                </span>
                <span className="block text-xs text-muted">
                  {eq.clienteNome ?? "Sem cliente vinculado"}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}