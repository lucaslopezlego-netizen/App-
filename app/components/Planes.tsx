import { PLANES } from "@/lib/plans";

function precioMensual(anual: number): string {
  return (anual / 12).toFixed(2).replace(".", ",");
}

export default function Planes() {
  return (
    <div className="planes">
      {PLANES.map((plan) => (
        <article key={plan.id} className={`plan${plan.destacado ? " plan-destacado" : ""}`}>
          {plan.destacado && <span className="insignia">Más popular</span>}
          <h3>{plan.nombre}</h3>
          <p className="plan-desc">{plan.descripcion}</p>
          <p className="plan-precio">
            {plan.precioAnual === 0 ? "0 $" : `${plan.precioAnual} $`}
            <span>{plan.precioAnual === 0 ? " para siempre" : " / año"}</span>
          </p>
          <p className="plan-equiv">
            {plan.precioAnual === 0 ? "Sin tarjeta" : `Equivale a ${precioMensual(plan.precioAnual)} $ al mes`}
          </p>
          <ul className="lista-check">
            {plan.incluye.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {plan.checkoutUrl ? (
            <a
              className={`boton boton-ancho${plan.destacado ? "" : " boton-secundario"}`}
              href={plan.checkoutUrl}
            >
              {plan.precioAnual === 0 ? "Empezar gratis" : `Elegir ${plan.nombre}`}
            </a>
          ) : (
            <span className="boton boton-ancho boton-secundario boton-inactivo">Próximamente</span>
          )}
        </article>
      ))}
    </div>
  );
}
