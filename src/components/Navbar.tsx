import React, { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/koragrid";
import { ChevronRightIcon, CloseIcon, KoraGridLogo, MenuIcon } from "./Icons";

interface NavbarProps {
  onOpenDemo: () => void;
}

const MOBILE_NAV_LINKS = [
  ...NAV_LINKS,
  { label: "Cobertura", href: "#cobertura" },
  { label: "Contacto", href: "#contacto" },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll while mobile drawer is open & close on Escape or desktop resize
  useEffect(() => {
    if (!mobileOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[#141414]/92 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1060px] items-center justify-between px-5 sm:px-6">
          <div className="flex items-center gap-8">
            <a
              href="#"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-emerald)]"
            >
              <KoraGridLogo className="h-5 w-5" />
              <span className="text-[15px] font-medium tracking-tight">KoraGrid</span>
            </a>

            <nav aria-label="Navegación principal" className="hidden items-center gap-6 lg:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap font-mono-tech text-[11.5px] text-[#a1a1aa] transition-colors duration-150 hover:text-[var(--text-primary)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="hidden items-center gap-2.5 lg:flex">
            <button
              type="button"
              onClick={onOpenDemo}
              className="whitespace-nowrap rounded-[6px] border border-white/12 bg-transparent px-3.5 py-1.5 text-[12px] font-medium text-[#d4d4d8] transition-colors duration-150 hover:border-white/25 hover:text-white cursor-pointer"
            >
              Hablar con ingeniería
            </button>
            <button
              type="button"
              onClick={onOpenDemo}
              className="whitespace-nowrap rounded-[6px] bg-[#ffffff] px-3.5 py-1.5 text-[12px] font-semibold text-[#111111] transition-colors duration-150 hover:bg-[#e5e5e5] cursor-pointer"
            >
              Solicitar demo
            </button>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-white/14 bg-[#1a1a1a] text-[var(--text-primary)] transition-colors duration-150 active:scale-95 lg:hidden cursor-pointer"
          >
            {mobileOpen ? <CloseIcon className="h-4.5 w-4.5" /> : <MenuIcon className="h-4.5 w-4.5" />}
          </button>
        </div>
      </header>

      {/* Fixed Full-Viewport Mobile Overlay Drawer (zero layout shift, smooth transition, scroll-locked) */}
      <div
        id="mobile-nav-drawer"
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-x-0 top-14 bottom-0 z-40 flex flex-col justify-between bg-[#0e0f0f]/95 backdrop-blur-xl transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] lg:hidden ${
          mobileOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav
          aria-label="Navegación móvil"
          onClick={(e) => e.stopPropagation()}
          className="flex flex-1 flex-col overflow-y-auto px-5 pt-4 pb-6"
        >
          <div className="divide-y divide-white/[0.08] border-b border-white/[0.08]">
            {MOBILE_NAV_LINKS.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                tabIndex={mobileOpen ? 0 : -1}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[54px] items-center justify-between py-3 text-[17px] font-normal tracking-[-0.01em] text-[#e4e4e7] transition-colors duration-150 active:text-[#60a5fa]"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono-tech text-[11px] text-[#60a5fa]/90">
                    0{idx + 1}
                  </span>
                  <span>{link.label}</span>
                </span>
                <ChevronRightIcon className="h-4 w-4 text-[#71717a]" />
              </a>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-2.5 pt-8">
            <button
              type="button"
              tabIndex={mobileOpen ? 0 : -1}
              onClick={() => {
                setMobileOpen(false);
                onOpenDemo();
              }}
              className="w-full rounded-[6px] bg-[#ffffff] px-4 py-3 text-[14px] font-semibold text-[#111111] transition-transform duration-150 active:scale-[0.98] cursor-pointer"
            >
              Solicitar demo
            </button>
            <button
              type="button"
              tabIndex={mobileOpen ? 0 : -1}
              onClick={() => {
                setMobileOpen(false);
                onOpenDemo();
              }}
              className="w-full rounded-[6px] border border-white/14 bg-[#1a1a1a] px-4 py-3 text-[14px] font-medium text-[#e4e4e7] transition-transform duration-150 active:scale-[0.98] cursor-pointer"
            >
              Hablar con ingeniería
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};
