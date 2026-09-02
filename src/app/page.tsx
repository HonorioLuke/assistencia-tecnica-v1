"use client";

import { DashboardCards } from "@/components/dashboard-cards";
import { KanbanBoard } from "@/components/features/ordens/kanban-board";
import { useOrdens } from "@/hooks/ordens/use-ordens";

export default function HomePage() {
  const { ordens, carregando, erro, mudarStatus, atualizarOrdem } = useOrdens();

  return (
    <main className="p-8 bg-page min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Visão Geral — L&L AHTI</h1>
          <p className="text-secondary mt-1">Resumo operacional da bancada</p>
        </div>

        <DashboardCards />

        <h2 className="text-xl font-bold text-surface mb-4 mt-10">Esteira de Produção</h2>

        {erro && (
          <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-700 text-sm">
            {erro}
          </div>
        )}

        {carregando ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-subtle animate-pulse">Carregando a esteira...</p>
          </div>
        ) : (
          <KanbanBoard ordens={ordens} onStatusChange={mudarStatus} onSave={atualizarOrdem} />
        )}
      </div>
    </main>
  );
}
