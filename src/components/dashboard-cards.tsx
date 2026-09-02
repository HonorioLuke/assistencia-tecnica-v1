"use client";

import { useEffect, useState } from "react";
import { listarClientesAction } from "@/actions/clientes/listar-clientes.action";
import { listarEquipamentosAction } from "@/actions/equipamentos/listar-equipamentos.action";
import { listarOrdensAction } from "@/actions/ordens/listar-ordens.action";
import { StatusOS } from "@/shared/constants/os-status";

export function DashboardCards() {
  const [totalClientes, setTotalClientes] = useState(0);
  const [totalEquipamentos, setTotalEquipamentos] = useState(0);
  const [osAbertas, setOsAbertas] = useState(0);
  const [osFinalizadas, setOsFinalizadas] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [clientes, equipamentos, ordens] = await Promise.all([
          listarClientesAction(),
          listarEquipamentosAction(),
          listarOrdensAction(),
        ]);

        setTotalClientes(clientes.length);
        setTotalEquipamentos(equipamentos.length);
        setOsAbertas(ordens.filter((os) => os.status !== StatusOS.ENTREGUE).length);
        setOsFinalizadas(ordens.filter((os) => os.status === StatusOS.ENTREGUE).length);
      } catch {
        // Cards ficam com "—" (estado de loading) em caso de erro; a página
        // principal já mostra o erro vindo do useOrdens.
      } finally {
        setLoading(false);
      }
    }

    void fetchStats();
  }, []);

  const stats = [
    { id: 1, label: "Total Clientes", value: totalClientes },
    { id: 2, label: "Equipamentos", value: totalEquipamentos },
    { id: 3, label: "OS em Aberto", value: osAbertas },
    { id: 4, label: "OS Finalizadas", value: osFinalizadas },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-surface p-8 rounded-xl shadow-sm border border-divider flex flex-col items-center justify-center transition-transform hover:-translate-y-1"
        >
          <span className="text-4xl font-black text-primary mb-2">
            {loading ? "—" : stat.value}
          </span>
          <span className="text-muted text-sm font-semibold tracking-wide">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
