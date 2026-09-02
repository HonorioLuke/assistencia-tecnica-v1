'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Fecha o drawer ao navegar
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Bloqueia scroll do body quando drawer está aberto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const links = [
    { href: '/ordens',       label: 'Ordens de Serviço' },
    { href: '/clientes',     label: 'Clientes' },
    { href: '/equipamentos', label: 'Equipamentos' },
    { href: '/',             label: 'Dashboard' },
    { href: '/relatorios', label: 'Relatórios' },
  ];

  const NavContent = () => (
    <>
      <div
        className="p-6 text-center"
        style={{ borderBottom: '1px solid var(--color-divider)' }}
      >
        <h2 className="text-2xl font-black text-secondary">L&L AHTI</h2>
        <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
          Organização de Bancada
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const isActive = link.href === '/'
            ? pathname === '/'
            : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className="block p-3 rounded-lg transition-all duration-200 text-sm font-medium"
              style={
                isActive
                  ? { background: 'var(--color-primary)', color: '#ffffff', fontWeight: 700 }
                  : { color: 'var(--color-muted)' }
              }
              onMouseEnter={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-hover)';
              }}
              onMouseLeave={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* ── Botão hamburguer — visível só no mobile ── */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menu"
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-md"
        style={{ background: 'var(--color-sidebar)' }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect y="3"  width="22" height="2.2" rx="1.1" fill="var(--color-muted)" />
          <rect y="10" width="22" height="2.2" rx="1.1" fill="var(--color-muted)" />
          <rect y="17" width="22" height="2.2" rx="1.1" fill="var(--color-muted)" />
        </svg>
      </button>

      {/* ── Overlay escuro por trás do drawer ── */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ── Drawer mobile (desliza da esquerda) ── */}
      <aside
        className={`
          lg:hidden fixed top-0 left-0 z-50 h-full w-72 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ background: 'var(--color-sidebar)' }}
      >
        {/* Botão fechar */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Fechar menu"
          className="absolute top-4 right-4 p-1.5 rounded-lg"
          style={{ color: 'var(--color-muted)' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        </button>

        <NavContent />
      </aside>

      {/* ── Sidebar fixa — visível só no desktop ── */}
      <aside
        className="hidden lg:flex w-64 h-screen flex-col sticky top-0"
        style={{ background: 'var(--color-sidebar)' }}
      >
        <NavContent />
      </aside>
    </>
  );
}