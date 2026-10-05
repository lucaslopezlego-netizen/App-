// PLANTILLA: completa los campos entre corchetes y haz que la revise un abogado
// de tu país antes de empezar a cobrar.

export const metadata = { title: "Privacidad · PostListo" };

export default function Privacidad() {
  return (
    <article className="legal">
      <h1>Política de privacidad</h1>
      <p className="ayuda">Última actualización: [fecha]</p>

      <h2>Responsable</h2>
      <p>[Nombre del titular o empresa], [correo de contacto].</p>

      <h2>Qué datos tratamos</h2>
      <ul>
        <li>
          <strong>Lo que escribes en el formulario</strong> (negocio, producto, plataforma y tono).
          Se envía a Anthropic para generar el contenido. No lo guardamos en nuestros servidores.
        </li>
        <li>
          <strong>Tu clave de licencia.</strong> Se comprueba con Lemon Squeezy en cada uso.
          Guardamos solo una huella cifrada (hash) para contar tus usos del mes.
        </li>
        <li>
          <strong>Datos de compra</strong> (nombre, correo, pago). Los gestiona Lemon Squeezy; no
          tenemos acceso a los datos de tu tarjeta.
        </li>
      </ul>
      <p>
        No escribas en el formulario datos personales de clientes ni información confidencial.
      </p>

      <h2>Con quién compartimos datos</h2>
      <ul>
        <li>Anthropic (generación de contenido), según su política de privacidad comercial.</li>
        <li>Lemon Squeezy (pagos y licencias).</li>
        <li>[Proveedor de hosting].</li>
      </ul>
      <p>No vendemos tus datos.</p>

      <h2>Almacenamiento local</h2>
      <p>
        Tu navegador guarda tu clave de licencia para que no tengas que escribirla cada vez. Puedes
        borrarla limpiando los datos del sitio.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes pedir acceso, corrección o eliminación de tus datos escribiendo a [correo].
      </p>
    </article>
  );
}
