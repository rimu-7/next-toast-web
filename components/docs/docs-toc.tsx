// components/docs/docs-toc.tsx
"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type TocItem = { id: string; text: string; level: "h1" | "h2" | "h3" };

function uniqById(items: TocItem[]) {
  const seen = new Set<string>();
  return items.filter((i) => {
    if (!i.id || seen.has(i.id)) return false;
    seen.add(i.id);
    return true;
  });
}

export function DocsToc() {
  const pathname = usePathname();

  const [items, setItems] = React.useState<TocItem[]>([]);
  const [activeId, setActiveId] = React.useState<string>("");

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef(new Map<string, HTMLAnchorElement>());
  const [indicator, setIndicator] = React.useState({
    top: 0,
    height: 0,
    ready: false,
  });

  const build = React.useCallback(() => {
    // Scope headings ONLY to docs content
    const scope = document.getElementById("docs-content");
    if (!scope) {
      setItems([]);
      setActiveId("");
      return;
    }

    const headings = Array.from(
      scope.querySelectorAll<HTMLElement>('[data-docs-heading="true"]'),
    )
      .map((el) => ({
        id: el.id,
        text: (el.textContent ?? "").trim(),
        level: (el.dataset.level as TocItem["level"]) || "h2",
      }))
      .filter((h) => h.id && h.text);

    const unique = uniqById(headings);

    // reset refs to avoid stale nodes
    itemRefs.current = new Map();

    setItems(unique);
    setActiveId((prev) =>
      unique.some((i) => i.id === prev) ? prev : (unique[0]?.id ?? ""),
    );
  }, []);

  // Rebuild TOC on route change
  React.useEffect(() => {
    // allow page content to render first
    const t = window.setTimeout(build, 0);
    return () => window.clearTimeout(t);
  }, [pathname, build]);

  // Observe active section (works for both window + scroll-area)
  React.useEffect(() => {
    if (!items.length) return;

    const scope = document.getElementById("docs-content");
    if (!scope) return;

    // If we're on desktop, ScrollArea viewport exists; use it as IO root.
    // If not found, default to window scroll.
    const scrollRoot =
      document.querySelector<HTMLElement>(".docs-scroll-viewport") ?? null;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0),
          );

        const next = visible[0]?.target?.id;
        if (next) setActiveId(next);
      },
      {
        root: scrollRoot,
        rootMargin: "-18% 0px -72% 0px",
        threshold: [0, 1],
      },
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) obs.observe(el);
    }

    return () => obs.disconnect();
  }, [items, pathname]);

  // Tracker movement
  const updateIndicator = React.useCallback(() => {
    const root = containerRef.current;
    if (!root || !activeId) return;

    const el = itemRefs.current.get(activeId);
    if (!el) return;

    const rootRect = root.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    setIndicator({
      top: elRect.top - rootRect.top,
      height: elRect.height,
      ready: true,
    });
  }, [activeId]);

  React.useEffect(() => {
    updateIndicator();

    const onResize = () => updateIndicator();
    window.addEventListener("resize", onResize);

    const t = window.setTimeout(updateIndicator, 50);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
    };
  }, [updateIndicator, pathname]);

  if (!items.length) return null;

  return (
    <div className="rounded-xl   bg-card p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </div>

      <div className="relative mt-3">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-card to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-card to-transparent" />

        <div ref={containerRef} className="relative overflow-auto pr-2">
          <div className="absolute left-0 top-0 h-full w-px bg-border/70" />
          <div
            aria-hidden
            className={cn(
              "absolute left-0 w-[3px] rounded-full bg-foreground/80",
              "transition-[top,height,opacity] duration-300 ease-out",
              indicator.ready ? "opacity-100" : "opacity-0",
            )}
            style={{ top: indicator.top, height: indicator.height }}
          />

          <div className="space-y-1 pl-3 py-1">
            {items.map((i) => {
              const isActive = activeId === i.id;
              return (
                <a
                  key={i.id}
                  href={`#${i.id}`}
                  ref={(node) => {
                    if (!node) return;
                    itemRefs.current.set(i.id, node);
                  }}
                  onClick={() => {
                    setActiveId(i.id);
                    window.setTimeout(updateIndicator, 0);
                  }}
                  className={cn(
                    "group block rounded-md px-2 py-1.5 text-sm transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    !isActive &&
                      "text-muted-foreground/70 hover:text-foreground/90",
                    isActive && "text-foreground font-medium bg-muted/50",
                    i.level === "h3" && "pl-6 text-[13px]",
                  )}
                >
                  <span className="relative">
                    {i.text}
                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute -bottom-0.5 left-0 h-px w-full",
                        "bg-foreground/30 scale-x-0 origin-left transition-transform duration-200",
                        "group-hover:scale-x-100",
                        isActive && "scale-x-100 bg-foreground/40",
                      )}
                    />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
