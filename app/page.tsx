import Link from "next/link";
import Planes from "@/app/components/Planes";

const PASOS = [
  { titulo: "Elige tu plan", texto: "Empieza gratis o suscríbete. Recibes tu clave de licencia por correo al instante." },
  { titulo: "Cuéntanos qué vendes", texto: "Tu negocio, el producto que quieres mover, la red social y el tono de tu marca." },
  { titulo: "Copia y publica", texto: "En segundos tienes textos, ideas de video y respuestas listas para usar." },
];

const FUNCIONES = [
  { icono: "✍️", titulo: "3 textos para publicar", texto: "Adaptados a Instagram, Facebook, TikTok o Estados de WhatsApp, con hashtags y emojis medidos." },
  { icono: "🎬", titulo: "3 ideas de Reels", texto: "Con el gancho de los primeros 3 segundos y un guion corto para grabar con el móvil." },
  { icono: "💬", titulo: "2 respuestas de WhatsApp", texto: "Para cuando te preguntan precio o disponibilidad, y no dejar a ningún cliente sin respuesta." },
  { icono: "🎯", titulo: "El tono de tu marca", texto: "Cercano, profesional, divertido o elegante: tú decides cómo suena tu negocio." },
  { icono: "🛡️", titulo: "Contenido honesto", texto: "Nunca inventa reseñas, cifras ni promesas falsas. Tu reputación queda a salvo." },
  { icono: "⚡", titulo: "En segundos", texto: "Lo que antes te llevaba una tarde, ahora lo tienes antes de terminar el café." },
];

const PREGUNTAS = [
  {
    p: "¿Quién escribe el contenido?",
    r: "Una inteligencia artificial (Claude, de Anthropic) siguiendo nuestras reglas de calidad. Revisa siempre los textos antes de publicarlos: tú conoces tu negocio mejor que nadie.",
  },
  {
    p: "¿Puedo usar los textos en mi negocio?",
    r: "Sí. Los textos generados son tuyos y puedes usarlos con fines comerciales.",
  },
  {
    p: "¿Cómo pago? ¿Qué métodos aceptan?",
    r: "El pago lo procesa Lemon Squeezy, con tarjeta o PayPal. Te emiten la factura y aplican los impuestos de tu país.",
  },
  {
    p: "¿Puedo cancelar o cambiar de plan?",
    r: "Sí. Desde el correo de tu compra puedes cancelar la renovación o cambiar de plan cuando quieras.",
  },
  {
    p: "¿Qué pasa si se me acaban las generaciones del mes?",
    r: "Se renuevan el día 1 de cada mes. Si necesitas más antes, puedes pasarte a un plan superior.",
  },
  {
    p: "¿Guardan lo que escribo?",
    r: "No guardamos tus textos. Se envían a Anthropic para generar el resultado. Más detalles en nuestra política de privacidad.",
  },
];

export default function Inicio() {
  return (
    <>
      <section className="hero">
        <div className="hero-texto">
          <span className="etiqueta">Contenido para redes con IA</span>
          <h1>
            Publica todos los días <span className="resaltado">sin quedarte en blanco.</span>
          </h1>
          <p className="hero-sub">
            PostListo escribe los posts, las ideas de Reels y las respuestas de WhatsApp de tu negocio
            en segundos. Tú solo copias y publicas.
          </p>
          <div className="hero-botones">
            <a className="boton" href="#planes">Ver planes</a>
            <Link className="boton boton-secundario" href="/generar">Ya tengo licencia</Link>
          </div>
          <p className="ayuda">Plan gratis disponible · Sin permanencia</p>
        </div>

        <div className="demo" aria-label="Ejemplo de resultado">
          <div className="demo-barra">
            <span /> <span /> <span />
            <small>Ejemplo de resultado</small>
          </div>
          <p className="demo-pide">🥖 Panadería artesanal · Pan de jamón · Instagram · Cercano</p>
          <div className="demo-bloque">
            <strong>Post 1</strong>
            <p>
              Diciembre huele a pan de jamón recién horneado 🎄 Este año lo hacemos como en casa: masa
              suave, jamón, pasas y aceitunas. Encárgalo por WhatsApp y te lo apartamos 🙌
            </p>
            <p className="demo-tags">#PanDeJamon #Navidad #Panaderia</p>
          </div>
          <div className="demo-bloque">
            <strong>Idea de Reel</strong>
            <p>Gancho: el cuchillo cortando el pan caliente en cámara lenta. «¿A quién le guardamos uno?»</p>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="seccion">
        <h2>Cómo funciona</h2>
        <ol className="pasos">
          {PASOS.map((paso, i) => (
            <li key={paso.titulo}>
              <span className="paso-num">{i + 1}</span>
              <h3>{paso.titulo}</h3>
              <p>{paso.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="seccion">
        <h2>Todo lo que recibes en cada generación</h2>
        <div className="funciones">
          {FUNCIONES.map((f) => (
            <div key={f.titulo} className="funcion">
              <span className="funcion-icono" aria-hidden>{f.icono}</span>
              <h3>{f.titulo}</h3>
              <p>{f.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="planes" className="seccion">
        <h2>Planes</h2>
        <p className="seccion-sub">Paga una vez al año y olvídate. Todos los planes incluyen todas las funciones.</p>
        <Planes />
      </section>

      <section id="preguntas" className="seccion">
        <h2>Preguntas frecuentes</h2>
        <div className="preguntas">
          {PREGUNTAS.map((q) => (
            <details key={q.p}>
              <summary>{q.p}</summary>
              <p>{q.r}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta-final">
        <h2>Tu próximo post ya puede estar listo.</h2>
        <a className="boton" href="#planes">Empezar gratis</a>
      </section>
    </>
  );
}
