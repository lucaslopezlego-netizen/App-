// Catálogo de planes. Cada plan es una variante de producto en Lemon Squeezy
// (el plan gratis es un producto de 0 $ que también emite licencia).
//
// Los límites están pensados para dejar margen: cada generación cuesta
// aproximadamente 0,03–0,04 $ en la API de Claude. Revisa el costo real en la
// consola de Anthropic y ajústalos.

export type PlanId = "gratis" | "emprendedor" | "pro" | "agencia";

export type Plan = {
  id: PlanId;
  nombre: string;
  precioAnual: number;
  limiteMensual: number;
  descripcion: string;
  incluye: string[];
  destacado?: boolean;
  checkoutUrl?: string;
  variantId?: string;
};

export const PLANES: Plan[] = [
  {
    id: "gratis",
    nombre: "Gratis",
    precioAnual: 0,
    limiteMensual: 5,
    descripcion: "Para probar PostListo sin compromiso.",
    incluye: ["5 generaciones al mes", "Todas las plataformas y tonos", "Sin tarjeta de crédito"],
    checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_GRATIS,
    variantId: process.env.LEMONSQUEEZY_VARIANT_GRATIS,
  },
  {
    id: "emprendedor",
    nombre: "Emprendedor",
    precioAnual: 50,
    limiteMensual: 60,
    descripcion: "Para un negocio que publica casi todos los días.",
    incluye: [
      "60 generaciones al mes",
      "Textos, ideas de Reels y respuestas de WhatsApp",
      "Todas las plataformas y tonos",
    ],
    destacado: true,
    checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_EMPRENDEDOR,
    variantId: process.env.LEMONSQUEEZY_VARIANT_EMPRENDEDOR,
  },
  {
    id: "pro",
    nombre: "Pro",
    precioAnual: 120,
    limiteMensual: 200,
    descripcion: "Para negocios con varias líneas de producto o sucursales.",
    incluye: ["200 generaciones al mes", "Todo lo del plan Emprendedor", "Soporte por correo prioritario"],
    checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_PRO,
    variantId: process.env.LEMONSQUEEZY_VARIANT_PRO,
  },
  {
    id: "agencia",
    nombre: "Agencia",
    precioAnual: 300,
    limiteMensual: 500,
    descripcion: "Para community managers que llevan varias marcas.",
    incluye: ["500 generaciones al mes", "Úsalo para todos tus clientes", "Soporte por correo prioritario"],
    checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_AGENCIA,
    variantId: process.env.LEMONSQUEEZY_VARIANT_AGENCIA,
  },
];

export function planPorVariante(variantId: string | number | undefined): Plan | undefined {
  if (variantId === undefined) return undefined;
  return PLANES.find((p) => p.variantId && p.variantId === String(variantId));
}

export function planPorId(id: PlanId): Plan {
  return PLANES.find((p) => p.id === id)!;
}
