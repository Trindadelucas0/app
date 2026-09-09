import { Fragment } from "react";
import { cn } from "@/lib/cn";

export type FlowNode = {
  id: string;
  label?: string;
  title: string;
  tone?: "paper" | "navy" | "accent";
};

function Node({ node }: { node: FlowNode }) {
  return (
    <article
      className={cn(
        "node",
        node.tone === "navy" && "node-navy",
        node.tone === "accent" && "node-accent",
      )}
    >
      {node.label ? <p className="node-label">{node.label}</p> : null}
      <p className="node-title">{node.title}</p>
    </article>
  );
}

export function FlowTree({
  root,
  branches,
  leaves,
}: {
  root: FlowNode;
  branches: FlowNode[];
  leaves?: FlowNode[];
}) {
  return (
    <div className="flow-tree">
      <Node node={root} />
      <div className="flow-stem" aria-hidden="true" />
      <div className="flow-row">
        {branches.map((node) => (
          <Node key={node.id} node={node} />
        ))}
      </div>
      {leaves ? (
        <>
          <div className="flow-stem" aria-hidden="true" />
          <div className="flow-row">
            {leaves.map((node) => (
              <Node key={node.id} node={node} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export function FlowRail({ nodes }: { nodes: FlowNode[] }) {
  return (
    <div className="flow-rail">
      {nodes.map((node, i) => (
        <Fragment key={node.id}>
          {i > 0 ? (
            <span className="flow-arrow" aria-hidden="true">
              →
            </span>
          ) : null}
          <Node node={node} />
        </Fragment>
      ))}
    </div>
  );
}
