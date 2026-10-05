import { NextResponse } from "next/server";
import { generarContenido, Rechazo, type Peticion } from "@/lib/claude";
import { licenciaValida } from "@/lib/license";
import { devolverUso, LIMITE_MENSUAL, reservarUso } from "@/lib/usage";

const MAX_CAMPO = 500;

function texto(valor: unknown): string | null {
  if (typeof valor !== "string") return null;
  const limpio = valor.trim();
  return limpio && limpio.length <= MAX_CAMPO ? limpio : null;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  const licencia = texto(body?.licencia);
  const peticion: Peticion = {
    negocio: texto(body?.negocio) ?? "",
    producto: texto(body?.producto) ?? "",
    plataforma: texto(body?.plataforma) ?? "Instagram",
    tono: texto(body?.tono) ?? "cercano",
  };

  if (!licencia) {
    return NextResponse.json({ error: "Falta la clave de licencia." }, { status: 401 });
  }
  if (!peticion.negocio || !peticion.producto) {
    return NextResponse.json(
      { error: `Completa el negocio y el producto (máximo ${MAX_CAMPO} caracteres).` },
      { status: 400 },
    );
  }
  if (!(await licenciaValida(licencia))) {
    return NextResponse.json(
      { error: "La licencia no es válida o la suscripción ha caducado." },
      { status: 403 },
    );
  }
  if (!(await reservarUso(licencia))) {
    return NextResponse.json(
      { error: `Has usado tus ${LIMITE_MENSUAL} generaciones de este mes.` },
      { status: 429 },
    );
  }

  try {
    const resultado = await generarContenido(peticion);
    return NextResponse.json({ resultado });
  } catch (err) {
    await devolverUso(licencia);
    if (err instanceof Rechazo) {
      return NextResponse.json({ error: err.message }, { status: 422 });
    }
    console.error(err);
    return NextResponse.json(
      { error: "No se pudo generar el contenido. Inténtalo de nuevo." },
      { status: 502 },
    );
  }
}
