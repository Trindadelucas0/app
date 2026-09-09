"use client";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  gsap.defaults({ duration: 0.6, ease: "power2.out" });
  registered = true;
}

export function scrollToId(id: string) {
  ensureGsap();
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  const offset = header?.offsetHeight ?? 68;
  gsap.to(window, {
    duration: reduce ? 0 : 0.65,
    ease: "power2.out",
    scrollTo: { y: el, offsetY: offset + 8 },
  });
}
