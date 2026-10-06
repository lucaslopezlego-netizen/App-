import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

// Contador de usos por licencia y mes, guardado en un archivo JSON.
// Sirve para un único servidor; si despliegas en serverless (Vercel, etc.)
// cámbialo por una base de datos como Postgres o Redis.

const DIR = ".data";
const ARCHIVO = `${DIR}/usage.json`;

type Registro = Record<string, number>;

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

// Reserva un uso antes de llamar a Claude. Devuelve cuántos quedan después de
// esta generación, o null si ya se agotó el mes.
export function reservarUso(licencia: string, limite: number): Promise<number | null> {
  const tarea = cola.then(async () => {
    const datos = await leer();
    const k = clave(licencia);
    const usados = datos[k] ?? 0;
    if (usados >= limite) return null;
    datos[k] = usados + 1;
    await mkdir(DIR, { recursive: true });
    await writeFile(ARCHIVO, JSON.stringify(datos));
    return limite - usados - 1;
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
