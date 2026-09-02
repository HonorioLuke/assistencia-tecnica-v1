export function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer
      className="text-center p-4 text-sm mt-auto"
      style={{
        background: 'var(--color-sidebar)',
        borderTop: '1px solid var(--color-divider)',
        color: 'var(--color-muted)',
      }}
    >
      &copy; {anoAtual} L&L AHTI. Todos os direitos reservados.
    </footer>
  );
}