import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SLIDE_TOTAL } from "@/data/slides";

type SlideFrameProps = {
  id: string;
  n: number;
  tone?: "light" | "dark" | "cover";
  kicker: string;
  title: string;
  titleHero?: boolean;
  lead?: string;
  headCenter?: boolean;
  /** Se false, o corpo não recebe um único data-reveal (órbita da capa). */
  bodyReveal?: boolean;
  children: ReactNode;
};

export function SlideFrame({
  id,
  n,
  tone = "light",
  kicker,
  title,
  titleHero,
  lead,
  headCenter,
  bodyReveal = true,
  children,
}: SlideFrameProps) {
  const padded = String(n).padStart(2, "0");
  const total = String(SLIDE_TOTAL).padStart(2, "0");

  return (
    <section
      id={id}
      className={cn("slide", tone === "dark" && "slide-dark", tone === "cover" && "slide-cover")}
      aria-labelledby={`${id}-title`}
      data-slide={id}
    >
      <div className="slide-inner">
        <header className={cn("slide-head", headCenter && "center")} data-reveal>
          <p className="kicker">{kicker}</p>
          <h1 id={`${id}-title`} className={cn("slide-title", titleHero && "slide-title-hero")}>
            {title}
          </h1>
          {lead ? <p className="slide-lead">{lead}</p> : null}
        </header>
        <div data-reveal={bodyReveal ? true : undefined}>{children}</div>
      </div>
      <p className="slide-index" aria-hidden="true">
        {padded} / {total}
      </p>
    </section>
  );
}
