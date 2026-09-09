"use client";

import { useEffect, useId, useState } from "react";

export type EntityCard = {
  id: string;
  kind: string;
  name: string;
  role: string;
  faz: string;
  ganha: string;
  assume: string;
};

type EntityStageProps = {
  entities: EntityCard[];
};

export function EntityStage({ entities }: EntityStageProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const titleId = useId();
  const open = entities.find((e) => e.id === openId) ?? null;

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpenId(null);
      }
    }
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open]);

  return (
    <div className="entity-grid" style={{ position: "relative" }}>
      {entities.map((entity) => (
        <button
          key={entity.id}
          type="button"
          className={openId === entity.id ? "entity is-open" : "entity"}
          onClick={() => setOpenId(entity.id)}
          aria-expanded={openId === entity.id}
        >
          <p className="entity-kind">{entity.kind}</p>
          <h2>{entity.name}</h2>
          <p className="role">{entity.role}</p>
        </button>
      ))}

      {open ? (
        <div
          className="entity-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setOpenId(null)}
        >
          <div className="entity-panel" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="close-x" aria-label="Fechar" onClick={() => setOpenId(null)}>
              ×
            </button>
            <p className="entity-kind">{open.kind}</p>
            <h3 id={titleId}>{open.name}</h3>
            <dl>
              <div>
                <dt>Faz</dt>
                <dd>{open.faz}</dd>
              </div>
              <div>
                <dt>Ganha</dt>
                <dd>{open.ganha}</dd>
              </div>
              <div>
                <dt>Assume</dt>
                <dd>{open.assume}</dd>
              </div>
            </dl>
          </div>
        </div>
      ) : null}
    </div>
  );
}
