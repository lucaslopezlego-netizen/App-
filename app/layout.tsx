import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "PostListo",
  description: "Textos, ideas de Reels y respuestas de WhatsApp para tu negocio, generados con IA.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="cabecera">
          <div className="contenedor cabecera-fila">
            <Link href="/" className="marca">
              <span className="marca-logo" aria-hidden>P</span>PostListo
            </Link>
            <nav className="menu">
              <Link href="/#como-funciona" className="menu-extra">Cómo funciona</Link>
              <Link href="/#planes">Planes</Link>
              <Link href="/#preguntas" className="menu-extra">Preguntas</Link>
              <Link href="/generar" className="boton boton-chico">Generar</Link>
            </nav>
          </div>
        </header>
        <main className="contenedor">{children}</main>
        <footer className="pie">
          <div className="contenedor">
            <p>
              El contenido de PostListo se genera con inteligencia artificial (Claude, de Anthropic).
              Revísalo antes de publicarlo. PostListo no está afiliado a Anthropic.
            </p>
            <p>
              <Link href="/terminos">Términos de uso</Link> · <Link href="/privacidad">Privacidad</Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
