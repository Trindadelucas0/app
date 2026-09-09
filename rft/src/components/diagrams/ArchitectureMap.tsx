import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ArchitectureNodeProps = {
  title: string;
  label?: string;
  variant?: "default" | "anchor" | "pending";
  size?: "sm" | "md" | "lg";
  /** Canal digital: preenchimento verde claro, borda #2EA44E. */
  channel?: boolean;
  className?: string;
  reveal?: boolean;
};

export function ArchitectureNode({
  title,
  label,
  variant = "default",
  size = "md",
  channel = false,
  className,
  reveal = false,
}: ArchitectureNodeProps) {
  return (
    <article
      className={cn(
        "arch-node",
        variant === "anchor" && "arch-node-anchor",
        variant === "pending" && "arch-node-pending",
        size === "lg" && "arch-node-lg",
        size === "sm" && "arch-node-sm",
        channel && "arch-node-channel",
        className,
      )}
      data-reveal={reveal ? true : undefined}
    >
      {label ? <p className="arch-node-label">{label}</p> : null}
      <p className="arch-node-title">{title}</p>
    </article>
  );
}

export function ArchitectureRail({
  nodes,
  className,
}: {
  nodes: ArchitectureNodeProps[];
  className?: string;
}) {
  return (
    <div className={cn("arch-rail", className)}>
      {nodes.map((node, i) => (
        <Fragment key={`${node.title}-${i}`}>
          {i > 0 ? (
            <span className="arch-arrow" aria-hidden="true">
              →
            </span>
          ) : null}
          <ArchitectureNode {...node} />
        </Fragment>
      ))}
    </div>
  );
}

export function ArchitectureMap({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("arch-map", className)}>{children}</div>;
}

export type MoneyStage = ArchitectureNodeProps & {
  chips: string[];
};

export function MoneyRail({ stages }: { stages: MoneyStage[] }) {
  return (
    <div className="money-rail">
      {stages.map((stage, i) => {
        const { chips, ...node } = stage;
        return (
          <Fragment key={`${stage.title}-${i}`}>
            {i > 0 ? (
              <span className="arch-arrow money-arrow" aria-hidden="true">
                →
              </span>
            ) : null}
            <div className="money-stage">
              <ArchitectureNode {...node} />
              <ul className="layer-chips">
                {chips.map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
