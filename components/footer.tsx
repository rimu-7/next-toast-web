"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Laptop, Moon, Sun, ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type ThemeMode = "light" | "dark" | "system";

function ThemeIconSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const active = (theme ?? "system") as ThemeMode;

  const items: Array<{
    value: ThemeMode;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
  }> = [
    { value: "light", label: "Light", Icon: Sun },
    { value: "dark", label: "Dark", Icon: Moon },
    { value: "system", label: "System", Icon: Laptop },
  ];

  if (!mounted) return <div className="h-9 w-[120px]" />; // Prevent hydration flick

  return (
    <div className="flex items-center gap-1 w-fit bg-muted/50 p-1 rounded-xl border border-border/50">
      {items.map(({ value, label, Icon }) => {
        const isActive = active === value;
        return (
          <Button
            key={value}
            variant="ghost"
            size="icon"
            onClick={() => setTheme(value)}
            className={cn(
              "h-8 w-8 rounded-lg transition-all",
              isActive
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-transparent",
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="sr-only">{label}</span>
          </Button>
        );
      })}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight">
                NextToast
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
              The lightweight, zero-dependency notification system for modern
              Next.js apps. Built for speed, accessibility, and developer
              happiness.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Docs</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/docs"
                    className="hover:text-foreground transition"
                  >
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/toasts"
                    className="hover:text-foreground transition"
                  >
                    API
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/configuration"
                    className="hover:text-foreground transition"
                  >
                    Configuration
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/configuration"
                    className="hover:text-foreground transition"
                  >
                    Examples
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Package and Source Code</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://www.npmjs.com/package/next-toast"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground transition inline-flex items-center gap-1"
                  >
                    NPM <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/rimu-7/next-toast"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground transition inline-flex items-center gap-1"
                  >
                    GitHub <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h4 className="text-sm font-medium">Theme</h4>
              <ThemeIconSwitch />
            </div>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col gap-8 items-center justify-between">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} NextToast. Released under the MIT
              License.
            </p>
            {/* PERSONAL INFO SECTION */}
            <p className="text-xs">
              Created by{" "}
              <a
                href="https://rimubhai.com"
                target="_blank"
                rel="noreferrer"
                className="text-foreground font-black underline hover:underline underline-offset-4"
              >
                rimu bhai
              </a>
              <span className="text-muted-foreground font-normal">
                {" "}
                — Full Stack Developer & UI Enthusiast.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
