"use client";

import * as React from "react";
import { toast } from "next-toast";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function CodeExampleTabs({
  title,
  code,
  onRun,
  runLabel = "Run Toast",
  defaultTab = "run",
  className,
}: {
  title?: string;
  code: string;
  onRun: () => void;
  runLabel?: string;
  defaultTab?: "run" | "code";
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Copied!");
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    // IMPORTANT: remove overflow-hidden so header buttons never clip
    <div className={cn("rounded-xl border bg-card", className)}>
      {title ? (
        <div className="border-b px-4 py-3">
          <div className="font-medium">{title}</div>
        </div>
      ) : null}

      <Tabs defaultValue={defaultTab} className="w-full">
        {/* Header row */}
        <div
          className="
            flex items-center justify-between gap-2
            border-b px-3 sm:px-4 py-2
            min-w-0
          "
        >
          {/* TabsList must be allowed to shrink/scroll */}
          <div className="min-w-0 flex-1">
            <TabsList
              className="
                h-9 w-max
                max-w-full
                overflow-x-auto
                whitespace-nowrap
                [&::-webkit-scrollbar]:hidden
                [-ms-overflow-style:none]
                [scrollbar-width:none]
              "
            >
              <TabsTrigger value="run">Run</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
          </div>

          {/* Copy button must NEVER shrink or be pushed out */}
          <Button
            variant="ghost"
            size="icon"
            onClick={copy}
            aria-label="Copy code"
            className="shrink-0"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>

        <TabsContent value="run" className="p-4">
          <Button onClick={onRun}>{runLabel}</Button>
          <p className="mt-3 text-sm text-muted-foreground">
            Click to trigger the toast. Switch to{" "}
            <span className="font-medium">Code</span> to copy.
          </p>
        </TabsContent>

        <TabsContent value="code" className="p-4">
          {/* Make sure code scrolls horizontally without affecting header */}
          <pre className="max-w-full text-wrap overflow-x-auto rounded-lg bg-muted/40 p-4 text-sm leading-relaxed">
            <code className="font-mono">{code}</code>
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  );
}
