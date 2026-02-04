// app/docs/toasts/page.tsx
"use client";

import * as React from "react";
import { toast } from "next-toast";
import {
  BadgeCheck,
  CircleAlert,
  Info,
  TriangleAlert,
  XCircle,
  Loader2,
  Undo2,
  ShieldAlert,
  Puzzle,
  Trash2,
  RefreshCcw,
  Ban,
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

export default function ToastsPage() {
  return (
    <DocsPage>
      <DocsHeading as="h1" id="toasts">
        Toasts
      </DocsHeading>

      <p className="not-prose mt-4 text-muted-foreground">
        NextToast exposes a small, consistent API. Most methods accept a{" "}
        <Badge variant="secondary">message</Badge> and optional options like{" "}
        <Badge variant="secondary">description</Badge>,{" "}
        <Badge variant="secondary">duration</Badge>,{" "}
        <Badge variant="secondary">dismissible</Badge>, and{" "}
        <Badge variant="secondary">action</Badge>.
      </p>

      <Separator className="not-prose my-8" />

      <DocsHeading as="h2" id="basic">
        Basic notifications
      </DocsHeading>

      <p>
        Use these for straightforward user feedback. Keep titles short and avoid
        repeating UI context. For example, prefer <code>Saved</code> over{" "}
        <code>Settings saved successfully</code> if the action is already
        obvious.
      </p>

      <DocsHeading as="h3" id="message">
        toast.message
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4" />
        <span>
          Neutral message toast. Best for low-priority feedback that should not
          steal attention.
        </span>
      </p>

      <CodeExampleTabs
        title="Neutral toast"
        code={`toast.message("Document saved");`}
        onRun={() => toast.message("Document saved")}
        runLabel="Show message"
      />

      <DocsHeading as="h3" id="success">
        toast.success
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <BadgeCheck className="mt-0.5 h-4 w-4" />
        <span>
          Use for completed actions: save, create, update, publish. Keep it
          short and affirmative.
        </span>
      </p>

      <CodeExampleTabs
        title="Success toast"
        code={`toast.success("Project created successfully");`}
        onRun={() => toast.success("Project created successfully")}
        runLabel="Show success"
      />

      <DocsHeading as="h3" id="info">
        toast.info
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4" />
        <span>
          Use for informational updates: new version available, background jobs
          started, sync scheduled.
        </span>
      </p>

      <CodeExampleTabs
        title="Info toast"
        code={`toast.info("Update available");`}
        onRun={() => toast.info("Update available")}
        runLabel="Show info"
      />

      <DocsHeading as="h3" id="warning">
        toast.warning
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <TriangleAlert className="mt-0.5 h-4 w-4" />
        <span>
          Use for recoverable problems: missing configuration, partial
          validation, limited access. Provide guidance in{" "}
          <code>description</code> when possible.
        </span>
      </p>

      <CodeExampleTabs
        title="Warning toast"
        code={`toast.warning("Missing API key", {
  description: "Add NEXT_PUBLIC_API_KEY to your environment.",
});`}
        onRun={() =>
          toast.warning("Missing API key", {
            description: "Add NEXT_PUBLIC_API_KEY to your environment.",
          })
        }
        runLabel="Show warning"
      />

      <DocsHeading as="h3" id="error">
        toast.error
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <XCircle className="mt-0.5 h-4 w-4" />
        <span>
          Use for failed actions. Prefer actionable error text: what failed and
          what to do next.
        </span>
      </p>

      <CodeExampleTabs
        title="Error toast"
        code={`toast.error("Save failed", {
  description: "Check your connection and try again.",
});`}
        onRun={() =>
          toast.error("Save failed", {
            description: "Check your connection and try again.",
          })
        }
        runLabel="Show error"
      />

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="options">
        Common options
      </DocsHeading>

      <DocsHeading as="h3" id="description">
        description
      </DocsHeading>

      <p>
        Use <code>description</code> to add a second line of detail. This is the
        best place for small guidance like which setting to change, why an
        action failed, or what happens next.
      </p>

      <CodeExampleTabs
        title="Toast with description"
        code={`toast.info("Sync started", {
  description: "This may take a few minutes in large projects.",
});`}
        onRun={() =>
          toast.info("Sync started", {
            description: "This may take a few minutes in large projects.",
          })
        }
        runLabel="Show toast"
      />

      <DocsHeading as="h3" id="duration">
        duration
      </DocsHeading>

      <p>
        Duration is in milliseconds. Use shorter durations for success/info and
        longer durations for warning/error. For loading states, prefer an
        infinite toast and update it later.
      </p>

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
        Set <code>dismissible</code> to <code>false</code> when the toast should
        not be manually dismissed (usually for loading or required flows). Use
        sparingly.
      </p>

      <CodeExampleTabs
        title="Non-dismissible"
        code={`toast.info("Policy updated", { dismissible: false, duration: 3000 });`}
        onRun={() =>
          toast.info("Policy updated", { dismissible: false, duration: 3000 })
        }
        runLabel="Show toast"
      />

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="actions">
        Action button
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <Undo2 className="mt-0.5 h-4 w-4" />
        <span>
          Use <code>action</code> for quick, reversible operations like Undo,
          Retry, or View. Keep the label short and the behavior safe.
        </span>
      </p>

      <CodeExampleTabs
        title="Error with Undo"
        code={`toast.error("File deleted", {
  action: {
    label: "Undo",
    onClick: () => console.log("Undo"),
  },
});`}
        onRun={() =>
          toast.error("File deleted", {
            action: {
              label: "Undo",
              onClick: () => toast.success("Undo complete"),
            },
          })
        }
        runLabel="Show action toast"
      />

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="confirm">
        Confirm
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <ShieldAlert className="mt-0.5 h-4 w-4" />
        <span>
          <code>toast.confirm</code> is useful for destructive actions when you
          want a lightweight confirmation without opening a modal. Keep the
          message specific.
        </span>
      </p>

      <CodeExampleTabs
        title="Confirm delete"
        code={`toast.confirm("Delete this project?", () => {
  toast.success("Deleted");
}, {
  label: "Delete",
  cancelLabel: "Cancel",
});`}
        onRun={() =>
          toast.confirm(
            "Delete this project?",
            () => toast.success("Deleted"),
            { label: "Delete", cancelLabel: "Cancel" },
          )
        }
        runLabel="Show confirm"
      />

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="loading-and-update">
        Loading and update
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <Loader2 className="mt-0.5 h-4 w-4 animate-spin" />
        <span>
          Use <code>toast.loading</code> when an operation has unknown duration.
          It returns an id. Later you can <code>toast.update</code> the same
          toast to success/error.
        </span>
      </p>

      <CodeExampleTabs
        title="Loading then update"
        code={`const id = toast.loading("Uploading...");
setTimeout(() => {
  toast.update(id, {
    type: "success",
    message: "Upload complete",
    duration: 2000,
    dismissible: true,
  });
}, 1500);`}
        onRun={() => {
          const id = toast.loading("Uploading...", {
            description: "Please wait…",
          });
          setTimeout(() => {
            toast.update(id, {
              type: "success",
              message: "Upload complete",
              description: "Your file is ready.",
              duration: 2000,
              dismissible: true,
            });
          }, 1500);
        }}
        runLabel="Run example"
      />

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="promise">
        Promise
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <RefreshCcw className="mt-0.5 h-4 w-4" />
        <span>
          <code>toast.promise</code> is the simplest way to handle async flows.
          It shows a loading toast, then swaps to success or error
          automatically.
        </span>
      </p>

      <CodeExampleTabs
        title="Promise helper"
        code={`toast.promise(new Promise((r) => setTimeout(r, 2000)), {
  loading: "Saving...",
  success: "Saved",
  error: "Save failed",
});`}
        onRun={() =>
          toast.promise(new Promise((r) => setTimeout(r, 2000)), {
            loading: "Saving...",
            success: "Saved",
            error: "Save failed",
          })
        }
        runLabel="Run promise"
      />

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="custom">
        Custom
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <Puzzle className="mt-0.5 h-4 w-4" />
        <span>
          Use <code>toast.custom</code> when you need complete control over
          layout and interactions. Keep it lightweight: short text, one primary
          action, optional dismiss.
        </span>
      </p>

      <CodeExampleTabs
        title="Custom JSX"
        code={`toast.custom((t) => (
  <div className="bg-black text-white px-6 py-4 rounded-lg shadow-xl flex items-center justify-between gap-4">
    <span className="font-semibold">Custom toast</span>
    <button onClick={() => toast.dismiss(t.id)} className="text-xs bg-white text-black px-2 py-1 rounded">
      Dismiss
    </button>
  </div>
));`}
        onRun={() =>
          toast.custom((t) => (
            <div className="bg-black text-white px-6 py-4 rounded-none  shadow-xl flex items-center justify-between gap-4">
              <span className="font-semibold">Custom toast</span>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="text-xs bg-white text-black px-2 py-1 rounded hover:opacity-90"
              >
                Dismiss
              </button>
            </div>
          ))
        }
        runLabel="Show custom"
      />

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="dismiss">
        Dismiss
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <Ban className="mt-0.5 h-4 w-4" />
        <span>
          Dismiss a single toast by id, or clear everything with{" "}
          <code>toast.dismissAll()</code>. This is useful when navigating
          between screens or replacing stale messages.
        </span>
      </p>

      <CodeExampleTabs
        title="Dismiss all"
        code={`toast.dismissAll();`}
        onRun={() => toast.dismissAll()}
        runLabel="Dismiss all"
      />

      <DocsHeading as="h3" id="dismiss-by-id">
        Dismiss by id
      </DocsHeading>

      <CodeExampleTabs
        title="Create and dismiss"
        code={`const id = toast.info("This will dismiss in 1.2s");
setTimeout(() => toast.dismiss(id), 1200);`}
        onRun={() => {
          const id = toast.info("This will dismiss in 1.2s", {
            duration: 6000,
          });
          setTimeout(() => toast.dismiss(id), 1200);
        }}
        runLabel="Run example"
      />

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="guidelines">
        Guidelines
      </DocsHeading>

      <ul>
        <li>
          Prefer <code>toast.promise</code> for async work; it reduces
          boilerplate and keeps state consistent.
        </li>
        <li>
          Keep titles short. Use <code>description</code> for details, next
          steps, or context.
        </li>
        <li>
          Avoid stacking repeated errors. Consider{" "}
          <code>toast.dismissAll()</code> before showing a critical toast.
        </li>
        <li>
          Use confirm for destructive actions when a modal would be too heavy.
        </li>
      </ul>

      <Separator className="not-prose my-10" />

      <DocsHeading as="h2" id="api">
        API References
      </DocsHeading>
      <div className="not-prose rounded-xl border bg-card">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="text-sm font-semibold">Toast Options</div>
          <div className="text-xs text-muted-foreground">
            Applies to: toast.message / success / error / warning / info
          </div>
        </div>

        <div className="p-4 text-wrap">
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
                <TableCell className="font-mono text-sm">description</TableCell>
                <TableCell className="font-mono text-sm">
                  React.ReactNode
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">—</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  Optional second line of text shown under the message.
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-mono text-sm">duration</TableCell>
                <TableCell className="font-mono text-sm">number</TableCell>
                <TableCell>
                  <Badge variant="secondary">2000</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-wrap">
                  Auto-dismiss time in milliseconds. Use{" "}
                  <span className="font-mono">Infinity</span> to keep it open.
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-mono text-sm">dismissible</TableCell>
                <TableCell className="font-mono text-sm">boolean</TableCell>
                <TableCell>
                  <Badge variant="secondary">true</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-wrap">
                  <p className="text-wrap">
                    Whether the toast can be dismissed manually.
                  </p>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-mono text-sm">action</TableCell>
                <TableCell className="font-mono text-sm">
                  {"{ label: string; onClick: (e) => void }"}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">—</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-wrap">
                  <p className="text-wrap">
                    Adds an action button (for example Undo / Retry). The
                    handler receives the button click event.
                  </p>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-mono text-sm">id</TableCell>
                <TableCell className="font-mono text-sm">
                  string | number
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">auto</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <p className="text-wrap">
                    Optional custom id. If not provided, NextToast generates
                    one. Useful to update or dismiss a specific toast.
                  </p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-4 text-xs text-muted-foreground">
            Note: <span className="font-mono">toast.loading</span> defaults to{" "}
            <span className="font-mono">duration = Infinity</span> and{" "}
            <span className="font-mono">dismissible = false</span>.
          </div>
        </div>
      </div>
      <DocsHeading as="h2" id="next">
        Next
      </DocsHeading>

      <p className="not-prose text-muted-foreground py-10 flex items-start gap-3">
        <CircleAlert className="mt-0.5 h-4 w-4" />
        <span>
          Continue to{" "}
          <Link
            href="/docs/configuration"
            className="font-bold underline text-foreground"
          >
            Configuration
          </Link>{" "}
          to learn how to set global behavior like position, rich colors, close
          button, and max visible.
        </span>
      </p>
    </DocsPage>
  );
}
