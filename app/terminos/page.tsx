// PLANTILLA: completa los campos entre corchetes y haz que la revise un abogado
// de tu país antes de empezar a cobrar.

export const metadata = { title: "Términos de uso · PostListo" };

export default function Terminos() {
  return (
    <article className="legal">
      <h1>Términos de uso</h1>
      <p className="ayuda">Última actualización: [fecha]</p>

      <h2>1. Quiénes somos</h2>
      <p>
        PostListo es un servicio operado por [nombre del titular o empresa], con domicilio en
        [dirección] y correo de contacto [correo].
      </p>

      <h2>2. El servicio</h2>
      <p>
        PostListo genera textos de marketing a partir de los datos que introduces. El contenido se
        produce con inteligencia artificial mediante la API de Claude, de Anthropic. PostListo no
        está afiliado a Anthropic ni a las redes sociales mencionadas.
      </p>

      <h2>3. Suscripción y pagos</h2>
      <p>
        PostListo ofrece un plan gratuito y planes de pago anuales. Cada plan incluye un número
        máximo de generaciones al mes, indicado en la página de planes, que se renueva el día 1 de
        cada mes. Los pagos los procesa Lemon Squeezy, que actúa como
        vendedor registrado y emite la factura. La suscripción se renueva automáticamente salvo que
        la canceles antes de la fecha de renovación. [Indica aquí tu política de reembolsos.]
      </p>

      <h2>4. Uso aceptable</h2>
      <p>No puedes usar PostListo para:</p>
      <ul>
        <li>crear reseñas o testimonios falsos, o engañar a consumidores;</li>
        <li>suplantar a personas, marcas o empresas;</li>
        <li>promocionar productos o actividades ilegales;</li>
        <li>enviar spam o contenido que infrinja derechos de terceros.</li>
      </ul>
      <p>
        También debes cumplir la política de uso de Anthropic. Podemos suspender las licencias que
        incumplan estas normas.
      </p>

      <h2>5. Tu responsabilidad sobre el contenido</h2>
      <p>
        La IA puede cometer errores. Revisa cada texto antes de publicarlo; tú eres responsable de lo
        que publicas. Los textos generados son tuyos y puedes usarlos con fines comerciales.
      </p>

      <h2>6. Limitación de responsabilidad</h2>
      <p>
        El servicio se ofrece &quot;tal cual&quot;. No garantizamos resultados de ventas ni
        disponibilidad ininterrumpida. [Ajusta esta cláusula a la ley aplicable.]
      </p>

      <h2>7. Ley aplicable</h2>
      <p>Estos términos se rigen por las leyes de [país].</p>
    </article>
  );
}
