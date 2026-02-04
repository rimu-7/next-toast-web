"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "@/lib/docs/config";
import { cn } from "@/lib/utils";

export function DocsSidebar({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="space-y-2 py-10">
      <div className="flex flex-col pb-2">
        <span className="text-2xl font-black">Next Toast</span>
        <Link
          href="https://rimubhai.com"
          className="text-xs tracking-tight"
          onClick={onNavigate}
        >
          by rimubhai
        </Link>
      </div>

      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Documentation
      </div>

      <div className="space-y-1">
        {docsNav.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "block rounded-lg border px-3 py-2 transition",
                active
                  ? "bg-muted text-foreground border-border"
                  : "hover:bg-muted/50 text-muted-foreground border-transparent hover:border-border"
              )}
            >
              <div className="font-medium">{item.title}</div>
              {item.description ? (
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {item.description}
                </div>
              ) : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
