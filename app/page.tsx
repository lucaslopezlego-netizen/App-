import Link from "next/link";

const checkout = process.env.NEXT_PUBLIC_CHECKOUT_URL;

export default function Inicio() {
  return (
    <>
      <h1>El contenido de tu negocio, listo en segundos.</h1>
      <p>
        Dinos qué vendes y PostListo te entrega textos para Instagram, Facebook o TikTok,
        ideas de Reels y respuestas modelo para WhatsApp.
      </p>

      <div className="tarjeta">
        <p className="precio">50 $ / año</p>
        <ul>
          <li>Hasta {process.env.MONTHLY_LIMIT ?? 100} generaciones al mes</li>
          <li>3 textos, 3 ideas de video y 2 respuestas de WhatsApp en cada generación</li>
          <li>Cancela cuando quieras desde el correo de tu compra</li>
        </ul>
        {checkout ? (
          <a className="boton" href={checkout}>Suscribirme</a>
        ) : (
          <p className="ayuda">La tienda aún no está configurada.</p>
        )}
        <p className="ayuda">
          El pago lo procesa Lemon Squeezy, que emite la factura y aplica los impuestos de tu país.
          Al comprar recibirás por correo tu clave de licencia.
        </p>
      </div>

      <p>
        ¿Ya tienes tu licencia? <Link href="/generar">Empieza a generar</Link>.
      </p>
    </>
  );
}
