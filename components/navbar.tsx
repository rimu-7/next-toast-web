"use client";

import * as React from "react";
import Link from "next/link";
import { Github } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Rubik_Puddles } from "next/font/google";

function formatStars(count: number) {
  if (count < 1000) return count.toString();
  if (count < 10_000) return `${(count / 1000).toFixed(1)}k`;
  return `${Math.round(count / 1000)}k`;
}

const fruk = Rubik_Puddles({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-system-ui",
});

export function SiteNavbar() {
  const [stars, setStars] = React.useState<number | null>(null);

  React.useEffect(() => {
    fetch("https://api.github.com/repos/rimu-7/next-toast")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => setStars(null));
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex flex-wrap py-4 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Left: Brand */}
        <Link
          href="/"
          className={cn(
            "text-2xl font-extrabold tracking-widest",
            fruk.className,
            "text-2xl tracking-tight",
          )}
        >
          NextToast
        </Link>

        {/* Right: Navigation */}
        <nav className="flex items-center gap-1">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">Home</Link>
          </Button>

          <Button asChild variant="ghost" size="sm">
            <Link href="/docs/get-started">Docs</Link>
          </Button>

          <Separator orientation="vertical" className="mx-1 h-5" />

          <Button asChild variant="outline" size="sm" className="gap-2">
            <a
              href="https://github.com/rimu-7/next-toast"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4" />

              {stars !== null && (
                <>
                  <span className="h-4 w-px bg-border" />
                  <span className="flex items-center gap-1 text font-medium">
                    {formatStars(stars)}
                  </span>
                </>
              )}
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
