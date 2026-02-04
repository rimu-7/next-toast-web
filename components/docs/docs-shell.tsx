"use client";

import * as React from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

import { DocsSidebar } from "./docs-sidebar";
import { DocsToc } from "./docs-toc";

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [leftOpen, setLeftOpen] = React.useState(false);
  const [rightOpen, setRightOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar (mobile) */}
      <div className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Mobile sidebar sheet (controlled) */}
          <Sheet open={leftOpen} onOpenChange={setLeftOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Menu className="h-4 w-4" />
                Menu
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[320px] p-0">
              <ScrollArea className="h-full p-4">
                <DocsSidebar onNavigate={() => setLeftOpen(false)} />
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <div className="text-sm font-semibold tracking-tight">Docs</div>

          {/* Mobile TOC sheet (controlled) */}
          <Sheet open={rightOpen} onOpenChange={setRightOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                On this page
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[320px] p-0">
              <ScrollArea className="h-full p-4">
                <DocsToc />
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop layout (unchanged) */}
      <div className="mx-auto px-4 md:px-6 py-6 md:py-10">
        <div
          className="
            grid grid-cols-1 gap-8
            md:grid-cols-[220px_minmax(0,1fr)]
            lg:grid-cols-[260px_minmax(0,1fr)_240px]
          "
        >
          <aside className="hidden md:block">
            <div className="sticky top-8">
              <DocsSidebar />
            </div>
          </aside>

          <main className="min-w-0">
            <div className="md:rounded-xl md:border md:bg-card">
              <ScrollArea
                className="hidden md:block md:h-[calc(100vh-7.5rem)]"
                viewportClassName="docs-scroll-viewport"
              >
                <div id="docs-content" className="p-4 md:p-6">
                  {children}
                </div>
              </ScrollArea>

              <div id="docs-content" className="md:hidden">
                {children}
              </div>
            </div>
          </main>

          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <DocsToc />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
