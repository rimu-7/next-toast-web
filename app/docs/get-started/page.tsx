"use client";

import { toast } from "next-toast";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Layers,
  Package,
  TerminalSquare,
  TriangleAlert,
} from "lucide-react";

import { DocsPage } from "@/components/docs/docs-page";
import { DocsHeading } from "@/components/docs/docs-heading";
import { CodeExampleTabs } from "@/components/docs/code-example-tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function GetStartedPage() {
  return (
    <DocsPage>
      <DocsHeading as="h1" id="getting-started">
        Getting Started
      </DocsHeading>

      <p className="not-prose mt-4 text-muted-foreground">
        NextToast is a lightweight, zero-dependency toast notification system
        for Next.js. It’s built to be fast, simple, and predictable — with a
        clean API for <Badge variant="secondary">success</Badge>,{" "}
        <Badge variant="secondary">error</Badge>,{" "}
        <Badge variant="secondary">promise</Badge>,{" "}
        <Badge variant="secondary">confirm</Badge>, and{" "}
        <Badge variant="secondary">custom</Badge>.
      </p>

      <div className="not-prose mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Package className="h-4 w-4" />
            Install
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Add the package with pnpm, npm, or bun.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Layers className="h-4 w-4" />
            Mount once
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Place <code className="text-xs">{"<NextToast />"}</code> in your
            root layout.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Code2 className="h-4 w-4" />
            Trigger anywhere
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Call <code className="text-xs">toast.*</code> from client
            components.
          </p>
        </div>
      </div>

      <Separator className="not-prose my-8" />

      <DocsHeading as="h2" id="installation">
        Installation
      </DocsHeading>

      <p>
        Install <code>next-toast</code> using your preferred package manager. If
        you’re using a monorepo, install it in the app package that renders the
        Next.js UI.
      </p>

      <CodeExampleTabs
        title="Terminal"
        code={`pnpm add next-toast
# npm i next-toast
# bun add next-toast`}
        onRun={() => toast.success("Installed (demo toast)")}
        runLabel="Run demo toast"
      />

      <div className="not-prose mt-6 rounded-xl border bg-card p-4">
        <div className="flex items-start gap-3">
          <BookOpen className="mt-0.5 h-4 w-4 text-muted-foreground" />
          <div className="space-y-2">
            <div className="text-sm font-medium">Notes</div>
            <ul className="ml-4 list-disc text-sm text-muted-foreground space-y-1">
              <li>
                NextToast has <strong>no runtime dependencies</strong>.
              </li>
              <li>
                Works with the Next.js <strong>App Router</strong> and Client
                Components.
              </li>
              <li>
                Mount the renderer <code>{"<NextToast />"}</code> only once.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="add-nexttoast">
        Add NextToast to your app
      </DocsHeading>

      <p>
        NextToast renders notifications through a single renderer component:{" "}
        <code>{"<NextToast />"}</code>. Place it once in your app shell,
        typically in <code>app/layout.tsx</code>. You can mount it in server
        components (like the root layout) because it only renders UI and
        subscribes to updates internally.
      </p>

      <CodeExampleTabs
        title="app/layout.tsx"
        code={`import { NextToast } from "next-toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <NextToast />
      </body>
    </html>
  );
}`}
        onRun={() => toast.info("Mounted <NextToast /> in layout.tsx")}
        runLabel="Show demo toast"
      />

      <div className="not-prose mt-6 rounded-xl border bg-card p-4">
        <div className="flex items-start gap-3">
          <TriangleAlert className="mt-0.5 h-4 w-4 text-muted-foreground" />
          <div className="space-y-2">
            <div className="text-sm font-medium">Important</div>
            <p className="text-sm text-muted-foreground">
              Mounting multiple <code>{"<NextToast />"}</code> components can
              cause duplicated stacks or confusing behavior. Keep a single
              instance at the app root.
            </p>
          </div>
        </div>
      </div>

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="render-your-first-toast">
        Render your first toast
      </DocsHeading>

      <p>
        Use the <code>toast</code> API from client components (components with{" "}
        <code>"use client"</code>). A toast call returns an <strong>id</strong>,
        which you can use to update or dismiss that toast later.
      </p>

      <CodeExampleTabs
        title="Basic success toast"
        code={`import { toast } from "next-toast";

export function SaveButton() {
  return (
    <button onClick={() => toast.success("Saved")}>
      Save
    </button>
  );
}`}
        onRun={() => toast.success("Saved")}
        runLabel="Run toast"
      />

      <DocsHeading as="h3" id="where-to-call-toast">
        Where should I call toast?
      </DocsHeading>

      <div className="not-prose grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <CheckCircle2 className="h-4 w-4" />
            Recommended
          </div>
          <ul className="mt-2 ml-4 list-disc text-sm text-muted-foreground space-y-1">
            <li>Click handlers and UI events (buttons, form submit)</li>
            <li>After successful mutations (save, delete, update)</li>
            <li>Error handlers for user-visible failures</li>
          </ul>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <TerminalSquare className="h-4 w-4" />
            Avoid
          </div>
          <ul className="mt-2 ml-4 list-disc text-sm text-muted-foreground space-y-1">
            <li>Server Components (no client-side effects)</li>
            <li>Rendering time side effects (toasts should be user-driven)</li>
          </ul>
        </div>
      </div>

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="recommended-patterns">
        Recommended patterns
      </DocsHeading>

      <DocsHeading as="h3" id="use-promise-for-async">
        Use toast.promise for async actions
      </DocsHeading>

      <p>
        For async work (save, upload, delete), prefer <code>toast.promise</code>
        . It automatically handles loading and swaps to success or error based
        on the promise result.
      </p>

      <CodeExampleTabs
        title="toast.promise"
        code={`import { toast } from "next-toast";

async function save() {
  return new Promise<void>((resolve) => setTimeout(resolve, 2000));
}

export function SaveButton() {
  return (
    <button
      onClick={() =>
        toast.promise(save(), {
          loading: "Saving...",
          success: "Saved",
          error: "Save failed",
        })
      }
    >
      Save
    </button>
  );
}`}
        onRun={() =>
          toast.promise(new Promise((r) => setTimeout(r, 2000)), {
            loading: "Saving...",
            success: "Saved",
            error: "Save failed",
          })
        }
        runLabel="Run promise"
      />

      <DocsHeading as="h3" id="confirm-for-destructive">
        Use confirm for destructive actions
      </DocsHeading>

      <p>
        Use <code>toast.confirm</code> for destructive actions when a modal
        would be too heavy. Keep the message explicit: what is being deleted and
        what the impact is.
      </p>

      <CodeExampleTabs
        title="toast.confirm"
        code={`import { toast } from "next-toast";

export function DeleteButton() {
  return (
    <button
      onClick={() =>
        toast.confirm("Delete this project?", () => {
          toast.success("Deleted");
        })
      }
    >
      Delete
    </button>
  );
}`}
        onRun={() =>
          toast.confirm("Delete this project?", () => toast.success("Deleted"))
        }
        runLabel="Run confirm"
      />

      <DocsHeading as="h3" id="avoid-spam">
        Avoid toast spam
      </DocsHeading>

      <p>
        Prefer one toast per user action. If your UI can fire multiple toasts
        quickly, consider clearing older messages before showing a new, critical
        toast.
      </p>

      <CodeExampleTabs
        title="Dismiss old toasts before showing a new one"
        code={`import { toast } from "next-toast";

export function SafeNotify() {
  toast.dismissAll();
  toast.info("Updated");
}`}
        onRun={() => {
          toast.dismissAll();
          toast.info("Updated");
        }}
        runLabel="Run demo"
      />

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="troubleshooting">
        Troubleshooting
      </DocsHeading>

      <DocsHeading as="h3" id="toast-not-showing">
        Toast not showing
      </DocsHeading>

      <div className="not-prose rounded-xl border bg-card p-4">
        <ul className="ml-4 list-disc text-sm text-muted-foreground space-y-1">
          <li>
            Confirm <code>{"<NextToast />"}</code> is mounted in{" "}
            <code>app/layout.tsx</code>.
          </li>
          <li>
            Ensure the code calling <code>toast.*</code> is in a client
            component.
          </li>
          <li>Check you didn’t mount multiple toast renderers.</li>
        </ul>
      </div>

      <DocsHeading as="h3" id="server-component-usage">
        Using toast in server components
      </DocsHeading>

      <p>
        Server components can’t run client-side interactions. If you need to
        show a toast after a server action, trigger it from the client after the
        action returns (for example, in a click handler or a mutation callback).
      </p>

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="next-steps">
        Next steps
      </DocsHeading>

      <p className="not-prose flex items-center gap-2 text-muted-foreground">
        <ArrowRight className="h-4 w-4" />
        <span>
          Continue to <Link href="/docs/toasts" className="font-bold underline text-foreground">Toasts</Link> to explore all toast
          types and options.
        </span>
      </p>
    </DocsPage>
  );
}
