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
          <Link href="/" className="marca">PostListo</Link>
          <nav>
            <Link href="/generar">Generar</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="pie">
          <p>
            El contenido de PostListo se genera con inteligencia artificial (Claude, de Anthropic).
            Revísalo antes de publicarlo.
          </p>
          <p>
            <Link href="/terminos">Términos de uso</Link> · <Link href="/privacidad">Privacidad</Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
