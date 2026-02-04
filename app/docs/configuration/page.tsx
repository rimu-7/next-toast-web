"use client";

import * as React from "react";
import { toast } from "next-toast";
import {
  Compass,
  Palette,
  X,
  Layers,
  Timer,
  SlidersHorizontal,
  BellRing,
  LayoutGrid,
} from "lucide-react";

import { DocsPage } from "@/components/docs/docs-page";
import { DocsHeading } from "@/components/docs/docs-heading";
import { CodeExampleTabs } from "@/components/docs/code-example-tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function ConfigurationPage() {
  return (
    <DocsPage>
      <DocsHeading as="h1" id="configuration">
        Configuration
      </DocsHeading>

      <p className="not-prose mt-4 text-muted-foreground">
        NextToast has two layers of control:
        <span className="mx-2 inline-flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Global config
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Timer className="h-3.5 w-3.5" />
            Per-toast options
          </Badge>
        </span>
        Global config changes how the renderer behaves (position, colors, close
        button, max visible). Per-toast options control an individual toast
        (duration, dismissible, description, action).
      </p>

      <Separator className="not-prose my-8" />

      <DocsHeading as="h2" id="global-config">
        Global config
      </DocsHeading>

      <p>
        Use <code>toast.setConfig()</code> to update the renderer configuration
        at runtime. You typically set global config in UI controls (like a
        settings page) or in docs demos. Global config updates immediately and
        affects toasts going forward.
      </p>

      <CodeExampleTabs
        title="Set global config"
        code={`toast.setConfig({
  position: "top-center",
  richColors: false,
  closeButton: false,
  maxVisible: 4,
});`}
        onRun={() => {
          toast.setConfig({
            position: "top-center",
            richColors: false,
            closeButton: false,
            maxVisible: 4,
          });
          toast.success("Global config applied");
        }}
        runLabel="Apply + Show Toast"
      />

      <DocsHeading as="h3" id="global-when-to-use">
        When to use global config
      </DocsHeading>

      <ul>
        <li>Choose a position that works across your whole product.</li>
        <li>
          Enable rich colors if your design system supports stronger UI states.
        </li>
        <li>Enable a close button if toasts can remain visible longer.</li>
        <li>Limit maxVisible to reduce noise when many toasts fire quickly.</li>
      </ul>

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="position">
        position
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <Compass className="mt-0.5 h-4 w-4" />
        <span>
          Controls where the toast stack is anchored. Use top positions for
          immediate visibility, bottom positions for non-blocking feedback in
          dashboard-style UIs.
        </span>
      </p>

      <p>
        Available positions:
        <code className="ml-2">
          top-left, top-center, top-right, bottom-left, bottom-center,
          bottom-right
        </code>
      </p>

      <CodeExampleTabs
        title="Position (bottom-right)"
        code={`toast.setConfig({ position: "bottom-right" });
toast.success("Position: bottom-right");`}
        onRun={() => {
          toast.setConfig({ position: "bottom-right" });
          toast.success("Position: bottom-right");
        }}
        runLabel="Apply + Show Toast"
      />

      <DocsHeading as="h3" id="position-recommendations">
        Recommendations
      </DocsHeading>

      <ul>
        <li>
          <Badge variant="secondary" className="gap-1">
            <LayoutGrid className="h-3.5 w-3.5" />
            Dashboard apps
          </Badge>{" "}
          Use <code>bottom-right</code> to keep toasts out of the main content
          area.
        </li>
        <li>
          <Badge variant="secondary" className="gap-1">
            <BellRing className="h-3.5 w-3.5" />
            Marketing / content sites
          </Badge>{" "}
          Use <code>top-center</code> for visibility without covering primary
          actions.
        </li>
      </ul>

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="richcolors">
        richColors
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <Palette className="mt-0.5 h-4 w-4" />
        <span>
          When enabled, toast variants use stronger backgrounds and more vivid
          state colors. This is useful when you want higher contrast feedback,
          or when your UI is already colorful.
        </span>
      </p>

      <CodeExampleTabs
        title="Enable rich colors"
        code={`toast.setConfig({ richColors: true });
toast.success("Rich colors enabled");`}
        onRun={() => {
          toast.setConfig({ richColors: true });
          toast.success("Rich colors enabled");
        }}
        runLabel="Enable + Show Toast"
      />

      <DocsHeading as="h3" id="richcolors-guidelines">
        Guidelines
      </DocsHeading>

      <ul>
        <li>
          Use rich colors when toasts should be highly scannable at a glance.
        </li>
        <li>
          Turn it off for minimal UIs where subtle borders and text are
          preferred.
        </li>
        <li>
          Avoid mixing multiple attention-heavy UI elements (alerts, banners,
          rich toasts) in the same view.
        </li>
      </ul>

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="closebutton">
        closeButton
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <X className="mt-0.5 h-4 w-4" />
        <span>
          Shows a close icon on each toast (when the toast is dismissible).
          Enable this when your toasts may stay visible long enough that users
          benefit from manual dismissal.
        </span>
      </p>

      <CodeExampleTabs
        title="Enable close button"
        code={`toast.setConfig({ closeButton: true });
toast.info("Close button enabled");`}
        onRun={() => {
          toast.setConfig({ closeButton: true });
          toast.info("Close button enabled");
        }}
        runLabel="Enable + Show Toast"
      />

      <DocsHeading as="h3" id="closebutton-notes">
        Notes
      </DocsHeading>

      <ul>
        <li>
          Close button only appears when <code>dismissible</code> is{" "}
          <code>true</code>.
        </li>
        <li>
          For short durations (2–4 seconds), the close button often isn’t
          necessary.
        </li>
      </ul>

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="maxvisible">
        maxVisible
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <Layers className="mt-0.5 h-4 w-4" />
        <span>
          Limits how many toasts can be visible at once. When more toasts are
          added, overflow is dismissed. This prevents UI clutter during rapid
          sequences of events.
        </span>
      </p>

      <CodeExampleTabs
        title="Set max visible to 2"
        code={`toast.setConfig({ maxVisible: 2 });
toast.success("maxVisible = 2");
toast.info("Toast 2");
toast.warning("Toast 3 will overflow");`}
        onRun={() => {
          toast.setConfig({ maxVisible: 2 });
          toast.success("maxVisible = 2");
          toast.info("Toast 2");
          toast.warning("Toast 3 will overflow");
        }}
        runLabel="Run overflow demo"
      />

      <DocsHeading as="h3" id="maxvisible-recommendations">
        Recommendations
      </DocsHeading>

      <ul>
        <li>Most apps feel good at 3–5.</li>
        <li>Use 2 for minimal interfaces or when toasts are frequent.</li>
        <li>
          Use higher values only if your toasts are rare and non-intrusive.
        </li>
      </ul>

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="per-toast-options">
        Per-toast options
      </DocsHeading>

      <p>
        Per-toast options apply to a single toast. These are passed as the
        second argument to toast calls. Use them when one toast needs different
        behavior than your global defaults.
      </p>

      <DocsHeading as="h3" id="duration">
        duration
      </DocsHeading>

      <p>Duration is in milliseconds. A good baseline:</p>
      <ul>
        <li>Success / Info: 2000–4000ms</li>
        <li>Warning / Error: 4000–6000ms</li>
        <li>
          Loading: use <code>Infinity</code> or <code>toast.loading</code>
        </li>
      </ul>

      <CodeExampleTabs
        title="Custom duration"
        code={`toast.success("Saved", { duration: 2000 });`}
        onRun={() => toast.success("Saved", { duration: 2000 })}
        runLabel="Show toast"
      />

      <DocsHeading as="h3" id="dismissible">
        dismissible
      </DocsHeading>

      <p>
        If <code>dismissible</code> is <code>false</code>, the user cannot
        manually close the toast. This is most useful for loading flows or
        required messages. Prefer short durations over non-dismissible toasts
        when possible.
      </p>

      <CodeExampleTabs
        title="Non-dismissible toast"
        code={`toast.info("Processing request...", { dismissible: false, duration: 3000 });`}
        onRun={() =>
          toast.info("Processing request...", {
            dismissible: false,
            duration: 3000,
          })
        }
        runLabel="Show toast"
      />

      <DocsHeading as="h3" id="defaults-pattern">
        Default config pattern
      </DocsHeading>

      <p>
        In production apps, set your global config once (position, maxVisible,
        etc.) and then only override per-toast options when necessary. This
        keeps behavior consistent across your UI.
      </p>

      <CodeExampleTabs
        title="Consistent defaults"
        code={`// e.g. run once (settings page, root client shell, etc.)
toast.setConfig({ position: "top-center", richColors: false, closeButton: false, maxVisible: 4 });

// later, override only when needed
toast.error("Payment failed", { duration: 6000 });`}
        onRun={() => {
          toast.setConfig({
            position: "top-center",
            richColors: false,
            closeButton: false,
            maxVisible: 4,
          });
          toast.error("Payment failed", {
            duration: 6000,
            description: "Try again or use another card.",
          });
        }}
        runLabel="Apply + Show Toast"
      />

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="render">
        Render Configure
      </DocsHeading>

      <div className="not-prose rounded-xl border bg-card">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="text-sm font-semibold">NextToast Renderer Config</div>
          <div className="text-xs text-muted-foreground">
            Props for {"<NextToast />"}
          </div>
        </div>

        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="w-[140px]">Default</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="font-mono text-sm">position</TableCell>
                <TableCell className="font-mono text-sm flex flex-col">
                  <span className="flex flex-col">
                    <p> {'"top-left" | "top-center" | "top-right"'}</p>
                    <p>{'"bottom-left" | "bottom-center" | "bottom-right"'}</p>
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">top-center</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <p className="text-wrap">
                    Controls where the toast stack appears on the screen.
                  </p>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-mono text-sm">richColors</TableCell>
                <TableCell className="font-mono text-sm">boolean</TableCell>
                <TableCell>
                  <Badge variant="secondary">false</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <p className="text-wrap">
                    Enables stronger background colors per toast type (success,
                    error, warning, info).
                  </p>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-mono text-sm">closeButton</TableCell>
                <TableCell className="font-mono text-sm">boolean</TableCell>
                <TableCell>
                  <Badge variant="secondary">false</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  Shows a close button on dismissible toasts.
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-mono text-sm">maxVisible</TableCell>
                <TableCell className="font-mono text-sm">number</TableCell>
                <TableCell>
                  <Badge variant="secondary">4</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <p className="text-wrap">
                    Maximum number of toasts shown at once. Extra toasts are
                    dismissed to enforce the limit.
                  </p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Theme note (NextThemes / shadcn) */}
          <div className="mt-5 rounded-lg border bg-muted/40 p-4">
            <div className="text-sm font-medium">Theme compatibility</div>
            <p className="mt-2 text-sm text-muted-foreground">
              NextToast follows your app’s theme automatically. If you use{" "}
              <span className="font-mono">next-themes</span> with{" "}
              <span className="font-mono">attribute="class"</span>, the toast UI
              will inherit colors from your Tailwind/shadcn theme variables.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              When <span className="font-mono">richColors</span> is enabled,
              toast backgrounds become more vibrant, but still remain readable
              in both light and dark themes.
            </p>
          </div>
        </div>
      </div>

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="next">
        Next
      </DocsHeading>

      <p className="not-prose text-muted-foreground">
        Continue to{" "}
        <Link
          href="/docs/examples"
          className="font-bold underline text-foreground"
        >
          Examples
        </Link>{" "}
        for copy-paste flows like promise handling, long-running updates, and
        reusable patterns.
      </p>
    </DocsPage>
  );
}
