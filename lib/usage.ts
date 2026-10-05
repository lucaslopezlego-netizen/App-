import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

// Contador de usos por licencia y mes, guardado en un archivo JSON.
// Sirve para un único servidor; si despliegas en serverless (Vercel, etc.)
// cámbialo por una base de datos como Postgres o Redis.

const DIR = ".data";
const ARCHIVO = `${DIR}/usage.json`;

type Registro = Record<string, number>;

export const LIMITE_MENSUAL = Number(process.env.MONTHLY_LIMIT ?? 100);

// Guardamos un hash, no la licencia, para no almacenar datos sensibles.
function clave(licencia: string): string {
  const mes = new Date().toISOString().slice(0, 7);
  const hash = createHash("sha256").update(licencia).digest("hex").slice(0, 32);
  return `${mes}:${hash}`;
}

async function leer(): Promise<Registro> {
  try {
    return JSON.parse(await readFile(ARCHIVO, "utf8")) as Registro;
  } catch {
    return {};
  }
}

let cola: Promise<unknown> = Promise.resolve();

// Reserva un uso antes de llamar a Claude. Devuelve false si se agotó el mes.
export function reservarUso(licencia: string): Promise<boolean> {
  const tarea = cola.then(async () => {
    const datos = await leer();
    const k = clave(licencia);
    if ((datos[k] ?? 0) >= LIMITE_MENSUAL) return false;
    datos[k] = (datos[k] ?? 0) + 1;
    await mkdir(DIR, { recursive: true });
    await writeFile(ARCHIVO, JSON.stringify(datos));
    return true;
  });
  cola = tarea.catch(() => undefined);
  return tarea;
}

// Devuelve el uso si la generación falló, para no cobrárselo al cliente.
export function devolverUso(licencia: string): Promise<void> {
  const tarea = cola.then(async () => {
    const datos = await leer();
    const k = clave(licencia);
    if (datos[k]) {
      datos[k] -= 1;
      await writeFile(ARCHIVO, JSON.stringify(datos));
    }
  });
  cola = tarea.catch(() => undefined);
  return tarea;
}
