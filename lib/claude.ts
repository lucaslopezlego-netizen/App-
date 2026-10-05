import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export type Peticion = {
  negocio: string;
  producto: string;
  plataforma: string;
  tono: string;
};

// Las reglas de contenido viven aquí, no en el formulario, para que nadie
// pueda saltárselas desde el navegador.
const SYSTEM = `Eres el redactor de PostListo, una herramienta que ayuda a pequeños negocios a escribir contenido para redes sociales en español.

Con los datos del negocio, entrega:
1. Tres textos para publicar, adaptados a la plataforma indicada, con emojis moderados y hashtags relevantes.
2. Tres ideas de Reels o videos cortos (gancho de los primeros 3 segundos + guion breve).
3. Dos respuestas modelo para clientes que escriben por WhatsApp preguntando precio o disponibilidad.

Reglas obligatorias:
- No inventes testimonios, reseñas, cifras de ventas, premios ni certificaciones.
- No hagas afirmaciones de salud, médicas o financieras que no se puedan comprobar ("cura", "garantizado", "ganancias seguras").
- No te hagas pasar por personas, marcas o empresas reales distintas del negocio del usuario.
- No uses lenguaje discriminatorio ni contenido para adultos.
- Si la petición busca engañar a clientes o promocionar algo ilegal, explica brevemente que no puedes ayudar con eso.

Responde solo con el contenido, en Markdown, sin preámbulos.`;

export class Rechazo extends Error {}

export async function generarContenido(p: Peticion): Promise<string> {
  const response = await client.beta.messages.create({
    model: "claude-opus-5-5",
    max_tokens: 16000,
    output_config: { effort: "medium" },
    // Si los filtros de seguridad rechazan la petición, la API la reintenta
    // con el modelo de respaldo recomendado en lugar de fallar.
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system: SYSTEM,
    messages: [
      {
        role: "user",
        content: `Negocio: ${p.negocio}\nQué vende: ${p.producto}\nPlataforma: ${p.plataforma}\nTono: ${p.tono}`,
      },
    ],
  });

  if (response.stop_reason === "refusal") {
    throw new Rechazo("La petición no cumple las normas de uso.");
  }

  return response.content
    .flatMap((block) => (block.type === "text" ? [block.text] : []))
    .join("\n")
    .trim();
}
