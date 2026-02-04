"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function DocsPage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "prose prose-neutral max-w-none dark:prose-invert",
        className,
      )}
    >
      {children}
    </article>
  );
}
