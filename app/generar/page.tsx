"use client";

import { useEffect, useState } from "react";

const CLAVE_LOCAL = "postlisto-licencia";

export default function Generar() {
  const [licencia, setLicencia] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [resultado, setResultado] = useState("");

  useEffect(() => {
    try {
      setLicencia(localStorage.getItem(CLAVE_LOCAL) ?? "");
    } catch {}
  }, []);

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(e.currentTarget));
    setCargando(true);
    setError("");
    setResultado("");
    try {
      localStorage.setItem(CLAVE_LOCAL, licencia);
    } catch {}

    try {
      const res = await fetch("/api/generar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...datos, licencia }),
      });
      const json = (await res.json()) as { resultado?: string; error?: string };
      if (!res.ok || !json.resultado) setError(json.error ?? "Algo salió mal.");
      else setResultado(json.resultado);
    } catch {
      setError("No hay conexión con el servidor.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <>
      <h1>Generar contenido</h1>
      <form onSubmit={enviar}>
        <label>
          Clave de licencia
          <input
            value={licencia}
            onChange={(e) => setLicencia(e.target.value)}
            required
            autoComplete="off"
          />
          <span className="ayuda">La recibiste por correo al suscribirte.</span>
        </label>
        <label>
          Tu negocio
          <input name="negocio" placeholder="Panadería artesanal en Chacao" required maxLength={500} />
        </label>
        <label>
          ¿Qué quieres promocionar?
          <textarea
            name="producto"
            rows={3}
            placeholder="Pan de jamón para diciembre, encargos por WhatsApp"
            required
            maxLength={500}
          />
        </label>
        <label>
          Plataforma
          <select name="plataforma" defaultValue="Instagram">
            <option>Instagram</option>
            <option>Facebook</option>
            <option>TikTok</option>
            <option>WhatsApp Estados</option>
          </select>
        </label>
        <label>
          Tono
          <select name="tono" defaultValue="cercano">
            <option value="cercano">Cercano</option>
            <option value="profesional">Profesional</option>
            <option value="divertido">Divertido</option>
            <option value="elegante">Elegante</option>
          </select>
        </label>
        <button className="boton" disabled={cargando}>
          {cargando ? "Generando…" : "Generar"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {resultado && (
        <div className="tarjeta">
          <p className="aviso">Generado con IA. Revisa precios, datos y ortografía antes de publicar.</p>
          <div className="resultado">{resultado}</div>
        </div>
      )}
    </>
  );
}
