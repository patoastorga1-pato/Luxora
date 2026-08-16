"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type React from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const reveal = {
  hidden: { opacity: 0, scale: 0.985, filter: "blur(10px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const heroVideo =
  "https://videos.pexels.com/video-files/1650628/1650628-hd_1920_1080_30fps.mp4";

const experienceCards = [
  {
    title: "Viaje privado",
    copy: "Rutas directas, cabina privada y coordinacion puerta a puerta.",
    image:
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1500&q=85",
  },
  {
    title: "Escapada exclusiva",
    copy: "Villas, traslados y experiencias disenadas alrededor del destino.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1500&q=85",
  },
  {
    title: "Dia en el mar",
    copy: "Yates, tripulacion, catering y rutas costeras bajo solicitud.",
    image:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1500&q=85",
  },
  {
    title: "Experiencia extraordinaria",
    copy: "Activos, servicios y concierge para momentos irrepetibles.",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1500&q=85",
  },
];

const categories = [
  { name: "Aviacion", status: "Activa", image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=85" },
  { name: "Yates", status: "Proximamente", image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=85" },
  { name: "Autos de lujo", status: "Proximamente", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85" },
  { name: "Villas", status: "Proximamente", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=85" },
  { name: "Helicopteros", status: "Proximamente", image: "https://images.unsplash.com/photo-1532566599434-219f010e1f6b?auto=format&fit=crop&w=1200&q=85" },
];

const aircraft = [
  {
    name: "Gulfstream G650ER",
    model: "Ultra long range",
    image:
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1600&q=85",
    capacity: "14 pasajeros",
    base: "Teterboro, New York",
    price: "Desde USD 13,900/h",
  },
  {
    name: "Bombardier Global 7500",
    model: "Suite privada",
    image:
      "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1600&q=85",
    capacity: "16 pasajeros",
    base: "Farnborough, Londres",
    price: "Desde USD 15,400/h",
  },
  {
    name: "Dassault Falcon 8X",
    model: "Cabina silenciosa",
    image: "https://www.outlierjets.com/images/blog-new-arrivals-main.jpg",
    capacity: "12 pasajeros",
    base: "Le Bourget, Paris",
    price: "Desde USD 11,800/h",
  },
];

const benefits = [
  ["Operadores verificados", "Red privada con operadores revisados y documentacion validada."],
  ["Servicio personalizado 24/7", "Concierge humano para rutas, preferencias y cambios de ultimo minuto."],
  ["Pagos protegidos", "Reservas estructuradas con anticipos, saldos y confirmaciones seguras."],
  ["Experiencias excepcionales", "Activos y servicios seleccionados para viajes que no se sienten ordinarios."],
];

export function LuxoraPlatform() {
  return (
    <main className="luxora-shell min-h-screen overflow-hidden bg-[#050505] text-[#f4efe6]">
      <Nav />
      <Hero />
      <WhyLuxora />
      <ExperienceIntent />
      <CategoryShowcase />
      <FeaturedAircraft />
      <AircraftDetail />
      <OwnerInvitation />
      <ControlSection />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-[#050505]/35 backdrop-blur-xl">
      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <a className="brand-logo refined" href="#" aria-label="Luxora">
          <Image
            alt="Luxora"
            className="h-full w-full object-contain"
            height={72}
            priority
            src="/logo-luxora.png"
            unoptimized
            width={148}
          />
        </a>
        <div className="hidden items-center gap-9 text-sm text-[#d7d0c4] md:flex">
          {["Aviacion", "Yates", "Villas", "Experiencias"].map((item) => (
            <a className="nav-link" href={item === "Aviacion" ? "#aviacion" : "#experiencias"} key={item}>
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a className="hidden text-sm text-[#d7d0c4] transition hover:text-white sm:inline" href="#propietarios">
            Publicar
          </a>
          <a className="nav-pill" href="#buscar">
            Iniciar sesion
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section relative flex min-h-[92vh] items-end overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-55"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.pexels.com/videos/1650628/free-video-1650628.jpg?auto=compress&dpr=1&h=1080&w=1920"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_30%,rgba(201,165,107,0.18),transparent_32%),linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.82)_42%,rgba(5,5,5,0.38)_100%),linear-gradient(180deg,rgba(5,5,5,0.18)_0%,#050505_100%)]" />
      <motion.div
        className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-5 pb-8 pt-36 sm:px-8 lg:px-10"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <div className="max-w-5xl">
          <motion.p className="eyebrow-chip" variants={fadeUp}>
            Private aviation
          </motion.p>
          <motion.h1
            className="mt-7 max-w-5xl text-balance text-6xl font-medium leading-[0.92] text-white sm:text-7xl lg:text-[7.8rem]"
            variants={fadeUp}
          >
            Viaja sin limites.
          </motion.h1>
          <motion.p
            className="mt-8 max-w-3xl text-balance text-xl leading-8 text-[#e0d8cc] sm:text-2xl"
            variants={fadeUp}
          >
            Accede a aviacion privada, yates, villas y experiencias
            extraordinarias desde una sola plataforma.
          </motion.p>
          <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row" variants={fadeUp}>
            <a className="premium-button" href="#aviacion">
              Explorar vuelos
            </a>
            <a className="ghost-button" href="#propietarios">
              Publicar un activo
            </a>
          </motion.div>
        </div>
        <SearchConcierge />
      </motion.div>
    </section>
  );
}

function SearchConcierge() {
  return (
    <motion.form
      id="buscar"
      className="search-panel grid gap-3 border border-white/10 bg-[#0b0b0b]/82 p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.85fr_0.65fr_auto]"
      variants={reveal}
    >
      {["Origen", "Destino", "Fecha", "Pasajeros"].map((label) => (
        <label className="search-field" key={label}>
          <span>{label}</span>
          <input
            type={label === "Fecha" ? "date" : label === "Pasajeros" ? "number" : "text"}
            placeholder={
              label === "Origen"
                ? "Toluca / MMTO"
                : label === "Destino"
                  ? "Van Nuys / KVNY"
                  : label === "Pasajeros"
                    ? "6"
                    : undefined
            }
            min={label === "Pasajeros" ? 1 : undefined}
          />
        </label>
      ))}
      <button className="premium-button min-h-16" type="button">
        Buscar
      </button>
    </motion.form>
  );
}

function WhyLuxora() {
  return (
    <Section eyebrow="Por que Luxora" title="Confianza privada, servicio excepcional.">
      <motion.div
        className="benefit-row grid gap-10 md:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        {benefits.map(([title, copy]) => (
          <motion.article className="benefit-item" key={title} variants={fadeUp}>
            <span className="line-icon" />
            <h3>{title}</h3>
            <p>{copy}</p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}

function ExperienceIntent() {
  return (
    <Section
      eyebrow="Empieza por lo que quieres vivir"
      title="No reservas un activo. Disenas un momento."
      copy="Luxora traduce tu intencion en rutas, activos y servicios cuidadosamente seleccionados."
      id="experiencias"
    >
      <div className="experience-grid">
        {experienceCards.map((card) => (
          <motion.article
            className="experience-card group"
            key={card.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={reveal}
          >
            <Image
              alt={card.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              src={card.image}
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10 transition duration-500 group-hover:via-black/32" />
            <div className="relative z-10 mt-auto">
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </div>
            <span className="card-arrow">→</span>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function CategoryShowcase() {
  return (
    <Section eyebrow="Categorias" title="Una membresia visual al mundo privado.">
      <div className="category-strip">
        {categories.map((category) => (
          <article className="lux-category group" key={category.name}>
            <Image
              alt={category.name}
              className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-60"
              fill
              sizes="(min-width: 1024px) 20vw, 50vw"
              src={category.image}
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
            <div className="relative z-10">
              <p>{category.name}</p>
              <span className={category.status === "Activa" ? "active-status" : ""}>
                {category.status}
              </span>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function FeaturedAircraft() {
  return (
    <Section
      eyebrow="Aviacion destacada"
      title="Aeronaves seleccionadas para rutas exigentes."
      copy="Fotografia dominante, informacion esencial y una accion clara para avanzar con concierge."
      id="aviacion"
    >
      <div className="aircraft-grid">
        {aircraft.map((item) => (
          <motion.article
            className="aircraft-card group"
            key={item.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={reveal}
          >
            <div className="aircraft-image">
              <Image
                alt={item.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                src={item.image}
                unoptimized
              />
            </div>
            <div className="aircraft-content">
              <div>
                <p>{item.model}</p>
                <h3>{item.name}</h3>
              </div>
              <div className="aircraft-facts">
                <span>{item.capacity}</span>
                <span>{item.base}</span>
                <span>{item.price}</span>
              </div>
              <button className="ghost-button" type="button">
                Ver aeronave
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function AircraftDetail() {
  return (
    <Section eyebrow="Detalle de experiencia" title="Como una suite privada, en movimiento.">
      <div className="detail-experience">
        <div className="detail-gallery">
          <Image
            alt="Interior de jet privado"
            className="absolute inset-0 h-full w-full object-cover"
            fill
            sizes="(min-width: 1024px) 62vw, 100vw"
            src="https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=1600&q=85"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />
          <div className="gallery-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
        <aside className="detail-panel">
          <p className="eyebrow-text">Bombardier Global 7500</p>
          <h3>Mexico City a Los Angeles</h3>
          <p className="detail-copy">
            Suite privada, WiFi satelital, catering premium, tripulacion
            internacional y handling coordinado en origen y destino.
          </p>
          <div className="detail-specs">
            {[
              ["Pasajeros", "16"],
              ["Autonomia", "7,700 nm"],
              ["Velocidad", "Mach 0.925"],
              ["Base", "Toluca"],
              ["Precio", "Desde USD 15,400/h"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="premium-button flex-1" type="button">
              Solicitar cotizacion
            </button>
            <button className="ghost-button flex-1" type="button">
              Hablar con concierge
            </button>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function OwnerInvitation() {
  return (
    <Section
      eyebrow="Tambien para propietarios"
      title="Convierte tu activo en una oportunidad."
      copy="Publica aeronaves, yates, villas o autos premium con una experiencia curada para propietarios y operadores."
      id="propietarios"
    >
      <div className="owner-section">
        <div className="owner-image">
          <Image
            alt="Operador de aviacion privada"
            className="absolute inset-0 h-full w-full object-cover"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1500&q=85"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
        <div className="owner-copy">
          <p className="eyebrow-text">Asset marketplace</p>
          <h3>Menos friccion. Mejores solicitudes.</h3>
          <p>
            Luxora ordena disponibilidad, solicitudes, reservas e ingresos en
            una experiencia discreta para activos de alto valor.
          </p>
          <a className="premium-button mt-8" href="#buscar">
            Publicar mi activo
          </a>
          <div className="owner-benefits">
            {["Gestiona disponibilidad", "Recibe solicitudes", "Administra reservas", "Consulta ingresos"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function ControlSection() {
  return (
    <Section
      eyebrow="Concierge digital"
      title="Todo bajo control."
      copy="Habla directamente con operadores, recibe cotizaciones y gestiona tu reserva desde un solo lugar."
    >
      <div className="control-mockup">
        <div className="mockup-phone">
          <div className="mockup-top">
            <span />
            <p>Luxora Concierge</p>
          </div>
          <Message side="left" text="Tenemos disponible un Global 7500 para salida a las 18:40." />
          <Message side="right" text="Perfecto. Necesito catering ligero y traslado al llegar." />
          <Message side="left" text="Confirmado. Te envio cotizacion final y condiciones de reserva." />
          <div className="quote-line">
            <span>Cotizacion estimada</span>
            <strong>USD 58,400</strong>
          </div>
        </div>
        <div className="control-copy">
          <p className="eyebrow-text">Reserva asistida</p>
          <h3>Conversaciones, documentos y pagos en una experiencia privada.</h3>
          <p>
            La plataforma mantiene la experiencia simple para el cliente:
            solicitar, conversar, confirmar y viajar.
          </p>
        </div>
      </div>
    </Section>
  );
}

function Message({ side, text }: { side: "left" | "right"; text: string }) {
  return <p className={`message ${side}`}>{text}</p>;
}

function Section({
  eyebrow,
  title,
  copy,
  children,
  id,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="lux-section px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="section-heading mb-14 max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <p className="eyebrow-text">{eyebrow}</p>
          <div className="section-kicker-line" />
          <h2 className="mt-6 text-balance text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          {copy ? <p className="mt-6 max-w-3xl text-lg leading-8 text-[#bfb6a9]">{copy}</p> : null}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer-premium border-t border-white/10 px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Image
            alt="Luxora"
            className="footer-logo h-auto object-contain"
            height={132}
            src="/logo-luxora.png"
            unoptimized
            width={260}
          />
          <p className="mt-6 text-2xl text-white">Beyond Ordinary.</p>
          <p className="mt-4 max-w-sm leading-7 text-[#bfb6a9]">
            Aviacion privada hoy. Marketplace de experiencias extraordinarias
            manana.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-4">
          <FooterColumn title="Explorar" items={["Aviacion", "Yates", "Villas", "Experiencias"]} />
          <FooterColumn title="Luxora" items={["Nosotros", "Publicar", "Concierge"]} />
          <FooterColumn title="Legal" items={["Privacidad", "Terminos"]} />
          <FooterColumn title="Social" items={["Instagram", "LinkedIn", "X"]} />
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-7 text-sm text-[#857d72] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Luxora. Todos los derechos reservados.</p>
        <p>Private access. Global availability.</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-sm uppercase tracking-[0.22em] text-[#d6b783]">{title}</h3>
      <div className="mt-5 grid gap-3 text-[#c9c0b3]">
        {items.map((item) => (
          <a className="footer-link" href="#" key={item}>
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}
