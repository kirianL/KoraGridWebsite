import React, { useEffect, useState } from "react";
import { NAV_LINKS_BY_LOCALE } from "../data/koragrid";
import { useLocale, type Locale } from "../i18n/LocaleContext";
import { scrollToElementSmooth, scrollToTopImmediate } from "../hooks/useLenis";
import { ChevronRightIcon, CloseIcon, KoraGridLogo, MenuIcon } from "./Icons";

interface NavbarProps {
  onOpenDemo: () => void;
  isPricing?: boolean;
  onNavigate?: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo, isPricing = false, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, isEn, setLocale } = useLocale();

  const navLinks = NAV_LINKS_BY_LOCALE[locale];
  const mobileLinks = [
    ...navLinks,
    { label: isEn ? "Coverage" : "Cobertura", href: "#cobertura" },
    { label: isEn ? "Contact" : "Contacto", href: "#contacto" },
  ];

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

  const handleLocaleSwitch = (e: React.MouseEvent<HTMLAnchorElement>, target: Locale) => {
    e.preventDefault();
    setLocale(target);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.endsWith("/pricing")) {
      e.preventDefault();
      setMobileOpen(false);
      onNavigate?.(href);
      return;
    }
    if (href.startsWith("#")) {
      e.preventDefault();
      setMobileOpen(false);
      if (isPricing) {
        onNavigate?.(`${isEn ? "/en" : "/es"}${href}`);
        return;
      }
      const targetEl = document.getElementById(href.slice(1));
      if (targetEl) {
        scrollToElementSmooth(targetEl);
      }
      return;
    }
    setMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 transform-gpu border-b border-[var(--border-subtle)] bg-[#141414]/92 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1060px] items-center justify-between px-5 sm:px-6">
          <div className="flex items-center gap-8">
            <a
              href={isEn ? "/en" : "/es"}
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                if (isPricing && onNavigate) {
                  onNavigate(isEn ? "/en" : "/es");
                } else {
                  const topEl = document.documentElement;
                  if (topEl) scrollToElementSmooth(topEl);
                  else scrollToTopImmediate();
                }
              }}
              className="flex items-center gap-2 text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3b82f6]"
            >
              <KoraGridLogo className="h-5 w-5" />
              <span className="text-[15px] font-medium tracking-tight">KoraGrid</span>
            </a>

            <nav
              aria-label={isEn ? "Main navigation" : "Navegación principal"}
              className="hidden items-center gap-6 lg:flex"
            >
              {navLinks.map((link) => {
                const isActivePricing = isPricing && link.href.endsWith("/pricing");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`whitespace-nowrap font-mono-tech text-[11.5px] transition-colors duration-150 ${
                      isActivePricing
                        ? "text-[var(--text-primary)]"
                        : "text-[#a1a1aa] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="hidden items-center gap-2.5 lg:flex">
            {/* Compact /es | /en language switcher */}
            <div
              role="group"
              aria-label={isEn ? "Language" : "Idioma"}
              className="mr-1 inline-flex items-center rounded-[6px] border border-white/12 bg-white/[0.03] p-0.5 font-mono-tech text-[11px]"
            >
              <a
                href="/es"
                aria-current={locale === "es" ? "page" : undefined}
                onClick={(e) => handleLocaleSwitch(e, "es")}
                className={`rounded-[4px] px-2 py-1 transition-colors ${
                  locale === "es"
                    ? "bg-white/15 text-white"
                    : "text-[#8e8e93] hover:text-white"
                }`}
              >
                ES
              </a>
              <a
                href="/en"
                aria-current={locale === "en" ? "page" : undefined}
                onClick={(e) => handleLocaleSwitch(e, "en")}
                className={`rounded-[4px] px-2 py-1 transition-colors ${
                  locale === "en"
                    ? "bg-white/15 text-white"
                    : "text-[#8e8e93] hover:text-white"
                }`}
              >
                EN
              </a>
            </div>

            <button
              type="button"
              onClick={onOpenDemo}
              className="whitespace-nowrap rounded-[6px] border border-white/12 bg-transparent px-3.5 py-1.5 text-[12px] font-medium text-[#d4d4d8] transition-colors duration-150 hover:border-white/25 hover:text-white cursor-pointer"
            >
              {isEn ? "Talk to engineering" : "Hablar con ingeniería"}
            </button>
            <button
              type="button"
              onClick={onOpenDemo}
              className="whitespace-nowrap rounded-[6px] bg-[#ffffff] px-3.5 py-1.5 text-[12px] font-semibold text-[#111111] transition-colors duration-150 hover:bg-[#e5e5e5] cursor-pointer"
            >
              {isEn ? "Request demo" : "Solicitar demo"}
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <div
              role="group"
              aria-label={isEn ? "Language" : "Idioma"}
              className="inline-flex items-center rounded-[6px] border border-white/12 bg-white/[0.03] p-0.5 font-mono-tech text-[11px]"
            >
              <a
                href="/es"
                aria-current={locale === "es" ? "page" : undefined}
                onClick={(e) => handleLocaleSwitch(e, "es")}
                className={`rounded-[4px] px-2 py-1 transition-colors ${
                  locale === "es" ? "bg-white/15 text-white" : "text-[#8e8e93]"
                }`}
              >
                ES
              </a>
              <a
                href="/en"
                aria-current={locale === "en" ? "page" : undefined}
                onClick={(e) => handleLocaleSwitch(e, "en")}
                className={`rounded-[4px] px-2 py-1 transition-colors ${
                  locale === "en" ? "bg-white/15 text-white" : "text-[#8e8e93]"
                }`}
              >
                EN
              </a>
            </div>

            <button
              type="button"
              aria-label={
                mobileOpen
                  ? isEn
                    ? "Close menu"
                    : "Cerrar menú"
                  : isEn
                    ? "Open menu"
                    : "Abrir menú"
              }
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-white/14 bg-[#1a1a1a] text-[var(--text-primary)] transition-colors duration-150 active:scale-95 cursor-pointer"
            >
              {mobileOpen ? <CloseIcon className="h-4.5 w-4.5" /> : <MenuIcon className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>
      </header>

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
          aria-label={isEn ? "Mobile navigation" : "Navegación móvil"}
          onClick={(e) => e.stopPropagation()}
          className="flex flex-1 flex-col overflow-y-auto px-5 pt-4 pb-6"
        >
          <div className="divide-y divide-white/[0.08] border-b border-white/[0.08]">
            {mobileLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                tabIndex={mobileOpen ? 0 : -1}
                onClick={(e) => handleLinkClick(e, link.href)}
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
              {isEn ? "Request demo" : "Solicitar demo"}
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
              {isEn ? "Talk to engineering" : "Hablar con ingeniería"}
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};
