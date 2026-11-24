import React, { useCallback, useEffect, useRef, useState } from "react";
import { CloseIcon } from "./Icons";

interface DemoContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoContactModal: React.FC<DemoContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [standard, setStandard] = useState("Programa País Carbono Neutralidad 2.0");
  const [meters, setMeters] = useState("10 - 50 medidores");
  const [submitted, setSubmitted] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleResetAndClose = useCallback(() => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setCompany("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    nameInputRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleResetAndClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, handleResetAndClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !company.trim()) return;
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#0d0e0e]/80 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={handleResetAndClose}
    >
      <div
        className="w-full max-w-[520px] rounded-t-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[#161817] p-6 sm:rounded-[var(--radius-lg)] sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div>
            <span className="font-mono-tech text-[12px] text-[var(--accent-mint)]">[demo]</span>
            <h2
              id="demo-modal-title"
              className="mt-1 text-[20px] font-semibold tracking-tight text-[var(--text-primary)]"
            >
              Solicitar evaluación técnica
            </h2>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Cerrar ventana"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          <div role="status" className="py-6">
            <p className="text-[16px] font-medium text-[var(--accent-mint)]">
              Solicitud registrada para {company}
            </p>
            <p className="mt-2 text-[14px] leading-[1.6] text-[var(--text-secondary)]">
              Un especialista de ingeniería de KoraGrid revisará sus requerimientos de {standard} y se comunicará al correo {email}.
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="mt-6 rounded-[6px] bg-[#f5f7f6] px-5 py-2 text-[13px] font-semibold text-[#0d0e0e] cursor-pointer"
            >
              Volver a la página
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label htmlFor="kg-name" className="block text-[13px] font-medium text-[var(--text-secondary)]">
                Nombre completo
              </label>
              <input
                ref={nameInputRef}
                id="kg-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Laura Méndez"
                className="mt-1.5 w-full rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[#0d0e0e] px-3.5 py-2.5 text-[16px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-emerald)] focus:outline-none sm:text-[14px]"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="kg-email" className="block text-[13px] font-medium text-[var(--text-secondary)]">
                  Correo corporativo
                </label>
                <input
                  id="kg-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ingenieria@empresa.cr"
                  className="mt-1.5 w-full rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[#0d0e0e] px-3.5 py-2.5 text-[16px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-emerald)] focus:outline-none sm:text-[14px]"
                />
              </div>

              <div>
                <label htmlFor="kg-company" className="block text-[13px] font-medium text-[var(--text-secondary)]">
                  Organización
                </label>
                <input
                  id="kg-company"
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Nombre de planta u hotel"
                  className="mt-1.5 w-full rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[#0d0e0e] px-3.5 py-2.5 text-[16px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-emerald)] focus:outline-none sm:text-[14px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="kg-standard" className="block text-[13px] font-medium text-[var(--text-secondary)]">
                  Estándar prioritario
                </label>
                <select
                  id="kg-standard"
                  value={standard}
                  onChange={(e) => setStandard(e.target.value)}
                  className="mt-1.5 w-full rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[#0d0e0e] px-3 py-2.5 text-[16px] text-[var(--text-primary)] focus:border-[var(--accent-emerald)] focus:outline-none sm:text-[14px]"
                >
                  <option value="Programa País Carbono Neutralidad 2.0">Programa País 2.0</option>
                  <option value="ISO 14064">ISO 14064</option>
                  <option value="GRI">GRI</option>
                  <option value="Bandera Azul Ecológica">Bandera Azul Ecológica</option>
                </select>
              </div>

              <div>
                <label htmlFor="kg-meters" className="block text-[13px] font-medium text-[var(--text-secondary)]">
                  Volumen de medidores
                </label>
                <select
                  id="kg-meters"
                  value={meters}
                  onChange={(e) => setMeters(e.target.value)}
                  className="mt-1.5 w-full rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[#0d0e0e] px-3 py-2.5 text-[16px] text-[var(--text-primary)] focus:border-[var(--accent-emerald)] focus:outline-none sm:text-[14px]"
                >
                  <option value="1 - 10 medidores">1 - 10 medidores</option>
                  <option value="10 - 50 medidores">10 - 50 medidores</option>
                  <option value="50+ medidores multisite">50+ medidores multisite</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-[var(--border-subtle)] pt-4">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="rounded-[6px] border border-[var(--border-subtle)] px-4 py-2 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-[6px] bg-[#f5f7f6] px-5 py-2 text-[13px] font-semibold text-[#0d0e0e] transition-colors duration-150 hover:bg-[#e2e8e5] cursor-pointer"
              >
                Enviar solicitud
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
