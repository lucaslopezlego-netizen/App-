// Valida licencias emitidas por Lemon Squeezy al comprar (o activar gratis) un plan.
// Lemon Squeezy actúa como "merchant of record": cobra, emite la factura y
// gestiona los impuestos de cada país del comprador.

import { planPorId, planPorVariante, type Plan } from "@/lib/plans";

type RespuestaValidacion = {
  valid: boolean;
  license_key?: { status: string; expires_at: string | null };
  meta?: { store_id: number; variant_id: number };
};

// Devuelve el plan de la licencia, o null si no es válida.
export async function planDeLicencia(clave: string): Promise<Plan | null> {
  const devKey = process.env.DEV_LICENSE_KEY;
  if (process.env.NODE_ENV !== "production" && devKey && clave === devKey) {
    return planPorId("emprendedor");
  }

  const res = await fetch("https://api.lemonsqueezy.com/v1/licenses/validate", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ license_key: clave }),
    cache: "no-store",
  });
  if (!res.ok) return null;

  const data = (await res.json()) as RespuestaValidacion;
  if (!data.valid || data.license_key?.status !== "active") return null;

  // Sin esta comprobación serviría cualquier licencia de otra tienda.
  if (String(data.meta?.store_id) !== process.env.LEMONSQUEEZY_STORE_ID) return null;

  return planPorVariante(data.meta?.variant_id) ?? null;
}
