import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "L&L AHTI - Sistema de Gestão",
  description: "Sistema de gestão para assistência técnica e controle de bancada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen bg-gray-50 text-gray-900">

        {/* Sidebar: fixa no desktop, drawer no mobile (gerenciado dentro do componente) */}
        <Sidebar />

        {/* Área principal */}
        <div className="flex-1 flex flex-col min-w-0">

          <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
            {/* pt-16 no mobile reserva espaço para o botão hamburguer fixo */}
            {children}
          </main>

          <Footer />

        </div>

      </body>
    </html>
  );
}