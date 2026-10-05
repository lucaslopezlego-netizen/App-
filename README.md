# PostListo

Web de suscripción (50 $/año) que genera contenido para redes sociales de pequeños negocios usando la API de Claude: 3 textos para publicar, 3 ideas de Reels y 2 respuestas modelo para WhatsApp.

## Cómo funciona

1. El cliente paga la suscripción anual en **Lemon Squeezy** y recibe una clave de licencia por correo.
2. En `/generar` escribe su licencia y los datos de su negocio.
3. El servidor comprueba la licencia con Lemon Squeezy, descuenta un uso del mes y llama a Claude (`claude-opus-5-5`).

| Archivo | Qué hace |
|---|---|
| `lib/claude.ts` | Llamada a Claude y reglas de contenido (sin reseñas falsas, sin suplantaciones, etc.) |
| `lib/license.ts` | Validación de licencias de Lemon Squeezy |
| `lib/usage.ts` | Límite de generaciones por licencia y mes |
| `app/api/generar/route.ts` | Endpoint que une todo |
| `app/terminos`, `app/privacidad` | Plantillas legales |

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # rellena las variables
npm run dev                  # http://localhost:3000
```

Para probar sin Lemon Squeezy, pon `DEV_LICENSE_KEY=prueba` en `.env.local` y usa `prueba` como licencia. Solo funciona fuera de producción.

## Checklist legal antes de cobrar

- [ ] **API de Claude con cuenta propia.** Crea la clave en console.anthropic.com y acepta los Commercial Terms. Nunca uses ni compartas una suscripción personal de Claude.ai.
- [ ] **País soportado.** Comprueba que tu país está en la lista de regiones soportadas por la API de Anthropic.
- [ ] **Política de uso.** Las reglas de `lib/claude.ts` aplican la Usage Policy de Anthropic; no las quites.
- [ ] **Transparencia.** La web indica que el contenido se genera con IA (pie de página y resultado). Mantenlo.
- [ ] **Términos y privacidad.** Completa los campos `[entre corchetes]` de `/terminos` y `/privacidad` y haz que los revise un abogado de tu país.
- [ ] **Pagos e impuestos.** Lemon Squeezy actúa como vendedor registrado (merchant of record) y gestiona el IVA y la facturación al comprador. Aun así, declara tus ingresos en tu país; consulta a un contador.
- [ ] **Marca.** Puedes decir "funciona con Claude", pero no usar el logo de Anthropic ni dar a entender que eres un producto oficial.

## Antes de producción

- `lib/usage.ts` guarda el contador en un archivo JSON, que solo sirve en un servidor único. En hosting serverless (Vercel, etc.) cámbialo por Postgres o Redis.
- Revisa los costos en la consola de Anthropic y ajusta `MONTHLY_LIMIT` para que cada cliente te deje margen.
