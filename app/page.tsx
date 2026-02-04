"use client";

import React, { useEffect, useMemo, useState } from "react";
import { toast } from "next-toast";
import { BookOpen, Check, Copy, Github, Package } from "lucide-react";
import { Rubik_Puddles } from "next/font/google";

import { cn } from "@/lib/utils";

// shadcn/ui
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

const fruk = Rubik_Puddles({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-system-ui",
});

type InstallType = "pnpm" | "npm" | "bun";

function parseRepo(input?: string | null) {
  if (!input) return null;
  if (/^[\w-]+\/[\w.-]+$/.test(input.trim())) return input.trim();
  try {
    const url = new URL(input.trim());
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length >= 2) return `${parts[0]}/${parts[1]}`;
  } catch {}
  return null;
}

export default function ToastDocs() {
  // --- State ---
  const [activeSnippet, setActiveSnippet] = useState(
    `toast.success("Operation successful")`,
  );
  const [installTab, setInstallTab] = useState<InstallType>("pnpm");

  // Controls for docs UI
  const [showCloseBtn, setShowCloseBtn] = useState(false);
  const [isRichColors, setIsRichColors] = useState(false);

  // --- Repo / Links ---
  const repoFromEnv =
    process.env.NEXT_PUBLIC_GITHUB_REPO ||
    process.env.NEXT_PUBLIC_GITHUB_REPO_URL ||
    "https://github.com/rimu-7/next-toast";

  const repo = useMemo(
    () => parseRepo(repoFromEnv) ?? "rimu-7/next-toast",
    [repoFromEnv],
  );
  const repoUrl = `https://github.com/${repo}`;

  // --- Effects ---
  useEffect(() => {
    // Default behavior for docs
    toast.setConfig({ closeButton: false, richColors: false });
  }, []);

  // keep renderer config in sync with switches
  useEffect(() => {
    toast.setConfig({ closeButton: showCloseBtn, richColors: isRichColors });
  }, [showCloseBtn, isRichColors]);

  const getInstallCommand = (type: InstallType) => {
    switch (type) {
      case "pnpm":
        return "pnpm add next-toast";
      case "npm":
        return "npm i next-toast";
      case "bun":
        return "bun add next-toast";
    }
  };

  const LINKS = [
    {
      id: 1,
      label: "GitHub",
      href: repoUrl,
      icon: <Github className="h-4 w-4" />,
      badge: null,
      tooltip: null as string | null,
    },
    {
      id: 2,
      label: "NPM",
      href: "https://www.npmjs.com/package/next-toast",
      icon: <Package className="h-4 w-4" />,
      badge: null,
      tooltip: null as string | null,
    },
    {
      id: 3,
      label: "Docs",
      href: "/docs/get-started",
      icon: <BookOpen className="h-4 w-4" />,
      badge: null,
      tolltip: "Docs",
    },
  ] as const;

  // --- Actions ---
  const runDemo = (code: string, action: () => void) => {
    setActiveSnippet(code);
    action();
  };

  // --- Code helpers (fix: do not leak richColors into unrelated code blocks) ---
  const closeButtonSnippet = showCloseBtn
    ? `<NextToast closeButton={true} />`
    : `<NextToast closeButton={false} />`;

  const richColorsSnippet = isRichColors
    ? `<NextToast richColors={true} />`
    : `<NextToast richColors={false} />`;

  const richColorsOrDefaultSnippet = `richColors={${isRichColors ? "true" : "false"}}`;

  const basicDefaultConfigSnippet = `<NextToast closeButton={${showCloseBtn ? "true" : "false"}} ${richColorsOrDefaultSnippet} />`;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* --- HEADER --- */}
        <header className="mb-12 space-y-6">
          <div className="space-y-4">
            <h1 className="relative inline-block leading-none">
              <span
                aria-hidden
                className={cn(
                  "absolute inset-0 select-none translate-y-1 blur-md",
                  fruk.className,
                  "text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-emerald-900/35",
                )}
              >
                NextToast
              </span>

              <span
                className={cn(
                  "relative inline-block",
                  fruk.className,
                  "text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter pb-2",
                  "bg-gradient-to-b md:bg-gradient-to-r from-emerald-300 via-green-500 to-emerald-800",
                  "bg-clip-text text-transparent",
                )}
              >
                NextToast
              </span>
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              A lightweight, zero-dependency toast notification system for
              Next.js. Designed for simplicity and performance.
            </p>
          </div>

          {/* External Links */}
          <div className="flex flex-wrap gap-3">
            {LINKS.map((link) => (
              <TooltipProvider key={link.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={link.href}
                      rel="noopener noreferrer"
                      className={cn(
                        "group inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium",
                        "text-muted-foreground transition hover:text-foreground hover:border-border/80",
                        "active:scale-[0.98]",
                      )}
                    >
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {link.icon}
                      </span>

                      <span>{link.label}</span>

                      {/* keep skeleton block removed now (no stars) */}
                      {link.badge && (
                        <>
                          <Separator
                            orientation="vertical"
                            className="mx-1 h-4"
                          />
                          <Badge variant="secondary" className="gap-1">
                            {link.badge}
                          </Badge>
                        </>
                      )}
                    </Link>
                  </TooltipTrigger>

                  {link.tooltip ? (
                    <TooltipContent>
                      <p className="max-w-[280px] text-sm">{link.tooltip}</p>
                    </TooltipContent>
                  ) : null}
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </header>

        {/* --- INSTALLATION --- */}
        <section className="mb-12 ">
          <Card className="shadow-none">
            <CardHeader className="pb-3 ">
              <CardTitle className="text-xl">Installation</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 ">
              <Tabs
                value={installTab}
                onValueChange={(v) => setInstallTab(v as InstallType)}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                  <TabsTrigger value="npm">npm</TabsTrigger>
                  <TabsTrigger value="bun">bun</TabsTrigger>
                </TabsList>

                {(["pnpm", "npm", "bun"] as const).map((type) => (
                  <TabsContent key={type} value={type} className="mt-3">
                    <CodeBlock
                      label="Install"
                      code={getInstallCommand(type)}
                      onCopyToast
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* --- USAGE --- */}
        <section className="mb-12">
          <Card className="shadow-none ">
            <CardHeader className="pb-3 ">
              <CardTitle className="text-xl">Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 ">
              <p className="text-muted-foreground">
                Add the provider to your root layout.
              </p>

              <CodeBlock
                label="app/layout.tsx"
                code={`// app/layout.tsx
import { NextToast } from "next-toast"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <NextToast />
      </body>
    </html>
  )
}`}
              />
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        {/* --- BASIC TOASTS --- */}
        <section className="mb-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-xl font-semibold">Basic Notifications</h2>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Close button
                </span>
                <Switch
                  checked={showCloseBtn}
                  onCheckedChange={(v) => setShowCloseBtn(Boolean(v))}
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Rich colors
                </span>
                <Switch
                  checked={isRichColors}
                  onCheckedChange={(v) => setIsRichColors(Boolean(v))}
                />
              </div>
            </div>
          </div>

          <Card className="shadow-none">
            <CardContent className="pt-6 space-y-6 ">
              {/* NEW: show config snippet that matches close button switch */}
              <CodeBlock
                label="Renderer config"
                code={basicDefaultConfigSnippet}
                onCopyToast
              />
              <Tabs
                defaultValue="success"
                className="w-full"
                onValueChange={(v) => {
                  // IMPORTANT: basic demos should always show basic code (no richColors line leaked)
                  // We still apply current config through effect above; code snippet stays clean.

                  switch (v) {
                    case "success":
                      runDemo(
                        'toast.success("Project created successfully")',
                        () => toast.success("Project created successfully"),
                      );
                      break;

                    case "info":
                      runDemo(`toast.info("Update available")`, () =>
                        toast.info("Update available"),
                      );
                      break;

                    case "warning":
                      runDemo('toast.warning("Missing API Key")', () =>
                        toast.warning("Missing API Key"),
                      );
                      break;

                    case "action":
                      runDemo(
                        `toast.error("File deleted", {\n  action: {\n    label: "Undo",\n    onClick: () => console.log("Undo")\n  }\n})`,
                        () =>
                          toast.error("File deleted", {
                            action: {
                              label: "Undo",
                              onClick: () => toast.success("Undone!"),
                            },
                          }),
                      );
                      break;

                    case "confirm":
                      runDemo(
                        `toast.confirm("Are you sure?", () => console.log("Confirmed"))`,
                        () =>
                          toast.confirm(
                            "Are you sure you want to delete?",
                            () => toast.success("Deleted!"),
                          ),
                      );
                      break;

                    case "custom":
                      runDemo(
                        `toast.custom((t) => (\n  <div className="bg-white text-black p-4 rounded">\n    Hello Custom!\n  </div>\n))`,
                        () =>
                          toast.custom((t) => (
                            <div className=" px-6 py-4 rounded-md  shadow-xl flex items-center justify-between gap-4">
                              <span className="font-bold">Custom Toast</span>
                              <button
                                onClick={() => toast.dismiss(t.id)}
                                className="text-xs bg-black text-white px-2 py-1 rounded hover:opacity-90"
                              >
                                Dismiss
                              </button>
                            </div>
                          )),
                      );
                      break;

                    case "message":
                      runDemo(
                        `const date = new Date().toLocaleDateString();\ntoast.message(\`Document saved: \${date}\`);`,
                        () =>
                          toast.message(
                            `Document saved: ${new Date().toLocaleDateString()}`,
                          ),
                      );
                      break;

                    case "promise":
                      runDemo(
                        `const promise = new Promise(...);\n\ntoast.promise(promise, {\n  loading: "Loading...",\n  success: "Done!",\n  error: "Failed"\n});`,
                        () =>
                          toast.promise(
                            new Promise((r) => setTimeout(r, 2000)),
                            {
                              loading: "Loading...",
                              success: "Done!",
                              error: "Failed",
                            },
                          ),
                      );
                      break;
                  }
                }}
              >
                <TabsList className="w-full flex flex-wrap gap-1 h-auto">
                  <TabsTrigger value="success">Success</TabsTrigger>
                  <TabsTrigger value="info">Info</TabsTrigger>
                  <TabsTrigger value="warning">Warning</TabsTrigger>
                  <TabsTrigger value="action">Action</TabsTrigger>
                  <TabsTrigger value="confirm">Confirm</TabsTrigger>
                  <TabsTrigger value="custom">Custom</TabsTrigger>
                  <TabsTrigger value="message">Message</TabsTrigger>
                  <TabsTrigger value="promise">Promise</TabsTrigger>
                </TabsList>
              </Tabs>

              <CodeBlock label="Code" code={activeSnippet} onCopyToast />
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        {/* --- POSITIONING --- */}
        <section className="mb-12">
          <div className="mb-6 space-y-2">
            <h2 className="text-xl font-semibold">Positioning</h2>
            <p className="text-muted-foreground">
              Click a position to move the toaster.
            </p>
          </div>

          <Card className="shadow-none">
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-3 gap-3 max-w-sm">
                {(
                  [
                    "top-left",
                    "top-center",
                    "top-right",
                    "bottom-left",
                    "bottom-center",
                    "bottom-right",
                  ] as const
                ).map((pos) => (
                  <Button
                    key={pos}
                    variant="outline"
                    className="h-12 justify-center text-xs"
                    onClick={() => {
                      toast.setConfig({ position: pos });
                      setActiveSnippet(`<NextToast position="${pos}" />`);
                      toast.success(`Position: ${pos}`);
                    }}
                  >
                    {pos}
                  </Button>
                ))}
              </div>

              <CodeBlock
                label="Code"
                code={
                  activeSnippet.includes("<NextToast")
                    ? activeSnippet
                    : `<NextToast position="top-center" />`
                }
                onCopyToast
              />
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        {/* --- RICH COLORS --- */}
        <section className="mb-20">
          <div className="mb-6 space-y-2">
            <h2 className="text-xl font-semibold">Rich Colors</h2>
            <p className="text-muted-foreground">
              Enable <code className="rounded bg-muted px-1">richColors</code>{" "}
              for vibrant backgrounds.
            </p>
          </div>

          <Card className="shadow-none">
            <CardContent className="pt-6 space-y-6">
              <div className="flex flex-wrap gap-3">
                <Button
                  className="bg-emerald-100 text-emerald-900 hover:bg-emerald-200"
                  variant="outline"
                  onClick={() => {
                    setIsRichColors(true);
                    toast.setConfig({ richColors: true });
                    setActiveSnippet(`toast.success("Operation successful!")`);
                    toast.success("Operation successful!");
                  }}
                >
                  Rich Success
                </Button>

                <Button
                  className="bg-rose-100 text-rose-900 hover:bg-rose-200"
                  variant="outline"
                  onClick={() => {
                    setIsRichColors(true);
                    toast.setConfig({ richColors: true });
                    setActiveSnippet(
                      `toast.error("Database connection failed")`,
                    );
                    toast.error("Database connection failed");
                  }}
                >
                  Rich Error
                </Button>

                <Button
                  className="bg-blue-100 text-blue-900 hover:bg-blue-200"
                  variant="outline"
                  onClick={() => {
                    setIsRichColors(true);
                    toast.setConfig({ richColors: true });
                    setActiveSnippet(
                      `toast.promise(new Promise((r) => setTimeout(r, 2000)), {\n  loading: "Uploading...",\n  success: "Finished!",\n  error: "Error"\n});`,
                    );
                    toast.promise(new Promise((r) => setTimeout(r, 2000)), {
                      loading: "Uploading...",
                      success: "Finished!",
                      error: "Error",
                    });
                  }}
                >
                  Rich Promise
                </Button>
              </div>

              <CodeBlock
                label="Renderer config"
                code={richColorsOrDefaultSnippet}
                onCopyToast
              />
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

/* ---------------------------------------------
   Reusable shadcn-ish Code Block (copy + toast)
---------------------------------------------- */

function CodeBlock({
  label,
  code,
  onCopyToast,
}: {
  label: string;
  code: string;
  onCopyToast?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (onCopyToast) toast.success("Copied to clipboard!");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      if (onCopyToast) toast.error("Copy failed");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-lg border bg-muted/40">
      <div className="flex items-center justify-between border-b bg-muted/60 px-3 py-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>

        <Button
          variant="ghost"
          size="icon"
          onClick={doCopy}
          className="h-8 w-8"
          aria-label="Copy"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-foreground">{code}</code>
      </pre>
    </div>
  );
}
