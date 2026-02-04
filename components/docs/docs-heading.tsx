"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
};

export function DocsHeading({ id, children, as = "h2" }: Props) {
  const Tag = as as any;
  return (
    <Tag
      id={id}
      data-docs-heading="true"
      data-level={as}
      className={cn(
        "scroll-mt-24 font-semibold tracking-tight",
        as === "h1" && "text-3xl md:text-4xl",
        as === "h2" && "text-xl md:text-2xl mt-10",
        as === "h3" && "text-lg md:text-xl mt-6"
      )}
    >
      {children}
    </Tag>
  );
}
