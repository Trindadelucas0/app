"use client";

import { useEffect, useState } from "react";
import { navItems, sectionIds } from "@/data/meetingScript";
import { scrollToId } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function Header({
  presentation,
  onTogglePresentation,
}: {
  presentation: boolean;
  onTogglePresentation: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target.id) setActive(vis.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25] },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  function go(href: string) {
    const id = href.replace("#", "");
    scrollToId(id);
    setOpen(false);
  }

  return (
    <header
      data-site-header
      className="sticky top-0 z-40 border-b border-[var(--exito-line)] bg-card"
    >
      <div className="site-wrap flex h-[var(--header-h)] items-center justify-between gap-4">
        <a href="#inicio" className="shrink-0 leading-tight" onClick={(e) => { e.preventDefault(); go("#inicio"); }}>
          <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-green">Êxito</span>
          <span className="block text-lg font-semibold tracking-tight text-navy">Grupo JPG</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Seções">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                go(item.href);
              }}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-sm",
                active === item.href.slice(1) ? "font-medium text-green" : "text-navy hover:text-green",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <p className="hidden max-w-[11rem] text-right text-[11px] leading-snug text-muted sm:block">
            Simulação preliminar · apresentado pelo contador
          </p>
          <button
            type="button"
            className="hidden rounded-lg border border-[var(--exito-line)] px-2.5 py-1.5 text-xs text-navy md:inline"
            onClick={onTogglePresentation}
          >
            {presentation ? "Sair da apresentação" : "Apresentar"}
          </button>
          <button
            type="button"
            className="rounded-lg border border-green px-2.5 py-1.5 text-sm lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t border-[var(--exito-line)] bg-card px-4 py-3 lg:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block py-2 text-navy"
              onClick={(e) => {
                e.preventDefault();
                go(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
