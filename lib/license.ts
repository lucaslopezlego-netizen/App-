// Valida licencias emitidas por Lemon Squeezy al comprar la suscripción anual.
// Lemon Squeezy actúa como "merchant of record": cobra, emite la factura y
// gestiona los impuestos de cada país del comprador.

type RespuestaValidacion = {
  valid: boolean;
  license_key?: { status: string; expires_at: string | null };
  meta?: { store_id: number };
};

export async function licenciaValida(clave: string): Promise<boolean> {
  const devKey = process.env.DEV_LICENSE_KEY;
  if (process.env.NODE_ENV !== "production" && devKey && clave === devKey) {
    return true;
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
  if (!res.ok) return false;

  const data = (await res.json()) as RespuestaValidacion;
  if (!data.valid || data.license_key?.status !== "active") return false;

  // Sin esta comprobación serviría cualquier licencia de otra tienda.
  return String(data.meta?.store_id) === process.env.LEMONSQUEEZY_STORE_ID;
}
