import React, { useState } from "react";
import { FOOTER_COLUMNS } from "../data/koragrid";
import type { Route } from "../routing/routes";
import { KoraGridLogo } from "./Icons";

interface ClosingCtaAndFooterProps {
  onOpenDemo: () => void;
  onNavigate?: (route: Route, sectionHash?: string) => void;
}

export const ClosingCtaAndFooter: React.FC<ClosingCtaAndFooterProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;
    setSent(true);
  };

  return (
    <footer id="contacto" className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
      {/* Upper Contact Section housing the Rounded-Top Textured Card (exact cyanotype/watercolor wash effect) */}
      <div className="rail-container bg-[var(--bg-surface-primary)] px-4 pt-12 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20">
        <div
          className="relative overflow-hidden rounded-t-[18px] sm:rounded-t-[24px]"
          style={{
            background:
              "radial-gradient(ellipse 58% 68% at 14% 42%, rgba(96, 165, 250, 0.34) 0%, transparent 62%), radial-gradient(ellipse 46% 58% at 54% 12%, rgba(147, 197, 253, 0.24) 0%, transparent 60%), radial-gradient(ellipse 52% 65% at 88% 72%, rgba(59, 130, 246, 0.26) 0%, transparent 64%), linear-gradient(135deg, #163b8a 0%, #1d4ed8 42%, #133378 76%, #18429c 100%)",
          }}
        >
          {/* Dual-frequency SVG filters: coarse organic watercolor wash + fine matte cyanotype grain */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full select-none"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="kg-watercolor-clouds" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.012 0.016"
                  numOctaves="4"
                  seed="7"
                  result="clouds"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.72  0 0 0 0 0.84  0 0 0 0 0.99  0 0 0 0.28 0"
                  in="clouds"
                />
              </filter>
              <filter id="kg-paper-grain" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.78"
                  numOctaves="3"
                  stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
              </filter>
            </defs>
            <rect
              width="100%"
              height="100%"
              filter="url(#kg-watercolor-clouds)"
              style={{ mixBlendMode: "screen" }}
            />
            <rect
              width="100%"
              height="100%"
              filter="url(#kg-paper-grain)"
              opacity="0.22"
              style={{ mixBlendMode: "overlay" }}
            />
          </svg>

          {/* Soft diagonal misty wash streak matching top-left to center reference bloom */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-45"
            style={{
              background:
                "linear-gradient(122deg, rgba(191, 219, 254, 0.22) 0%, transparent 24%, rgba(255, 255, 255, 0.1) 46%, transparent 62%, rgba(59, 130, 246, 0.14) 84%, transparent 100%)",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:px-14 lg:py-16">
            {/* Left Editorial Column (matching reference copy rhythm) */}
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <p
                  data-reveal
                  style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
                  className="text-[13px] font-medium text-white/75"
                >
                  Contacto
                </p>
                <h2
                  data-reveal
                  style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
                  className="mt-2.5 text-[30px] font-semibold leading-[1.08] tracking-[-0.025em] text-white sm:text-[40px]"
                >
                  ¿Interesado en nuestra plataforma?
                </h2>
                <p
                  data-reveal
                  style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
                  className="mt-5 max-w-[360px] text-[13.5px] leading-[1.6] text-white/85"
                >
                  Escríbenos para conocer cómo conectar medidores eléctricos inteligentes y automatizar tus reportes ESG en tiempo real.
                </p>
                <p
                  data-reveal
                  style={{ "--reveal-delay": "170ms" } as React.CSSProperties}
                  className="mt-4 max-w-[360px] text-[13.5px] leading-[1.6] text-white/75"
                >
                  Acompañamos despliegues técnicos en zonas francas, hotelería, agroindustria y centros logísticos en Costa Rica y Centroamérica.
                </p>
              </div>
            </div>

            {/* Right Minimalist Underline-Only Form (exact reference field structure) */}
            <div
              data-reveal
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
              className="lg:col-span-7"
            >
              {sent ? (
                <div
                  role="status"
                  className="flex h-full flex-col justify-center rounded-[8px] border border-white/20 bg-black/20 p-6 backdrop-blur-sm"
                >
                  <p className="text-[18px] font-medium text-white">
                    Mensaje recibido, {fullName}
                  </p>
                  <p className="mt-2 text-[14px] leading-[1.6] text-white/80">
                    Nuestro equipo de ingeniería en Costa Rica revisará tu consulta y responderá a {email}.
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false);
                        setFullName("");
                        setEmail("");
                        setSubject("");
                        setMessage("");
                      }}
                      className="rounded-[6px] bg-white px-4 py-2 text-[12.5px] font-semibold text-[#0c1e4a] transition-colors duration-150 hover:bg-white/90 cursor-pointer"
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="footer-name"
                      className="block text-[12.5px] font-medium text-white/90"
                    >
                      Nombre completo
                    </label>
                    <input
                      id="footer-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ingresa tu nombre completo"
                      className="mt-2 w-full border-b border-white/35 bg-transparent pb-2.5 text-[16px] text-white placeholder:text-white/50 focus:border-white focus:outline-none sm:text-[14px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="footer-email"
                        className="block text-[12.5px] font-medium text-white/90"
                      >
                        Correo electrónico
                      </label>
                      <input
                        id="footer-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingresa tu correo corporativo"
                        className="mt-2 w-full border-b border-white/35 bg-transparent pb-2.5 text-[16px] text-white placeholder:text-white/50 focus:border-white focus:outline-none sm:text-[14px]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="footer-subject"
                        className="block text-[12.5px] font-medium text-white/90"
                      >
                        Asunto
                      </label>
                      <input
                        id="footer-subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Ej. Telemetría planta o ISO 14064"
                        className="mt-2 w-full border-b border-white/35 bg-transparent pb-2.5 text-[16px] text-white placeholder:text-white/50 focus:border-white focus:outline-none sm:text-[14px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="footer-message"
                      className="block text-[12.5px] font-medium text-white/90"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="footer-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Cuéntanos sobre tu operación, cantidad de medidores o estándar requerido"
                      className="mt-2 w-full resize-none border-b border-white/35 bg-transparent pb-2.5 text-[16px] text-white placeholder:text-white/50 focus:border-white focus:outline-none sm:text-[14px]"
                    />
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="w-full rounded-[6px] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0c1e4a] transition-colors duration-150 hover:bg-white/90 sm:w-auto cursor-pointer"
                    >
                      Enviar mensaje
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Solid Deep Black Architectural Footer Base (flush directly under rounded card) */}
      <div className="bg-[#090a0a]">
        <div className="rail-container border-t border-white/[0.08] px-5 py-10 sm:px-10 sm:py-12 lg:px-12">
          <div className="grid grid-cols-1 gap-9 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-2.5 text-[var(--text-primary)]">
                <KoraGridLogo className="h-5 w-5" />
                <span className="text-[16px] font-semibold tracking-tight">KoraGrid</span>
              </div>
              <p className="mt-3 max-w-[300px] text-[13px] leading-[1.6] text-[var(--text-muted)]">
                Telemetría energética y gestión ESG desarrollada en Costa Rica para operaciones industriales en Centroamérica.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
              {FOOTER_COLUMNS.map((col, idx) => (
                <div
                  key={col.heading}
                  data-reveal
                  style={{ "--reveal-delay": `${idx * 60}ms` } as React.CSSProperties}
                >
                  <h3 className="text-[13px] font-semibold text-[var(--text-primary)]">
                    {col.heading}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={(e) => {
                            if (onNavigate && link.href.startsWith("#")) {
                              e.preventDefault();
                              onNavigate("home", link.href);
                            }
                          }}
                          className="text-[13px] text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--text-primary)]"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6 text-[12px] text-[var(--text-muted)]">
            <span>© 2026 KoraGrid · San José, Costa Rica</span>
            <span className="font-mono-tech">ISO 14064 · GRI · Programa País 2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
