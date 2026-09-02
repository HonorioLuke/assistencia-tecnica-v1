"use client";

import { useState, useMemo, useEffect } from "react";
import { ReportFilters } from "@/components/features/relatorios/ReportFilters";
import { ReportTable } from "@/components/features/relatorios/ReportTable";
import { OrdemServico, FiltrosRelatorio } from "@/components/features/relatorios/types";
import { listarOrdensAction } from "@/actions/ordens/listar-ordens.action";

const FILTROS_INICIAIS: FiltrosRelatorio = {
  campoPesquisa: "numero",
  termoPesquisa: "",
  dataInicial: "",
  dataFinal: "",
  status: "Todos",
};

export default function RelatoriosPage() {
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState<FiltrosRelatorio>(FILTROS_INICIAIS);
  const [filtrosAtivos, setFiltrosAtivos] = useState<FiltrosRelatorio>(FILTROS_INICIAIS);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [registrosPorPagina, setRegistrosPorPagina] = useState(10);

  useEffect(() => {
    listarOrdensAction()
      .then((lista) => setOrdens(lista as unknown as OrdemServico[]))
      .catch(() => setOrdens([]))
      .finally(() => setLoading(false));
  }, []);

  const ordensFiltradas = useMemo(() => {
    return ordens.filter((ordem) => {
      if (filtrosAtivos.termoPesquisa.trim()) {
        const termo = filtrosAtivos.termoPesquisa.toLowerCase();
        const valorCampo =
          filtrosAtivos.campoPesquisa === "numero"
            ? ordem.numero
            : filtrosAtivos.campoPesquisa === "cliente"
            ? ordem.clienteNome ?? ""
            : [ordem.equipamentoTipo, ordem.equipamentoMarca, ordem.equipamentoModelo]
                .filter(Boolean)
                .join(" ");
        if (!valorCampo.toLowerCase().includes(termo)) return false;
      }
      if (filtrosAtivos.status !== "Todos" && ordem.status !== filtrosAtivos.status) return false;
      if (filtrosAtivos.dataInicial) {
        if (new Date(ordem.createdAt).toISOString().slice(0, 10) < filtrosAtivos.dataInicial) return false;
      }
      if (filtrosAtivos.dataFinal) {
        if (new Date(ordem.createdAt).toISOString().slice(0, 10) > filtrosAtivos.dataFinal) return false;
      }
      return true;
    });
  }, [ordens, filtrosAtivos]);

  const ordensPaginadas = useMemo(() => {
    const inicio = (paginaAtual - 1) * registrosPorPagina;
    return ordensFiltradas.slice(inicio, inicio + registrosPorPagina);
  }, [ordensFiltradas, paginaAtual, registrosPorPagina]);

  return (
    <main className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Relatórios de Ordens de Serviço</h1>
          <p className="text-gray-500 mt-1">Consulte, pesquise e imprima as Ordens de Serviço cadastradas.</p>
        </div>
        <ReportFilters
          filtros={filtros}
          onChange={setFiltros}
          onPesquisar={() => {
            setFiltrosAtivos(filtros);
            setPaginaAtual(1);
          }}
          onLimpar={() => {
            setFiltros(FILTROS_INICIAIS);
            setFiltrosAtivos(FILTROS_INICIAIS);
            setPaginaAtual(1);
          }}
          onImprimir={() => window.print()}
          onExportarPDF={() => alert("Exportação de PDF será implementada em breve.")}
        />
        {loading ? (
          <div className="bg-surface rounded-xl shadow-sm border border-divider p-12 text-center">
            <p className="text-muted animate-pulse">Carregando ordens de serviço...</p>
          </div>
        ) : (
          <ReportTable
            ordens={ordensPaginadas}
            totalRegistros={ordensFiltradas.length}
            paginaAtual={paginaAtual}
            registrosPorPagina={registrosPorPagina}
            onPaginaChange={setPaginaAtual}
            onRegistrosPorPaginaChange={(v) => {
              setRegistrosPorPagina(v);
              setPaginaAtual(1);
            }}
          />
        )}
      </div>
    </main>
  );
}
