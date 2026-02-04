"use client";

import * as React from "react";
import { toast } from "next-toast";
import {
  Upload,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Timer,
  Layers,
  LayoutTemplate,
} from "lucide-react";

import { DocsPage } from "@/components/docs/docs-page";
import { DocsHeading } from "@/components/docs/docs-heading";
import { CodeExampleTabs } from "@/components/docs/code-example-tabs";
import { Separator } from "@/components/ui/separator";

export default function ExamplesPage() {
  return (
    <DocsPage>
      <DocsHeading as="h1" id="examples">
        Examples
      </DocsHeading>

      <p className="not-prose mt-4 text-muted-foreground">
        This page contains real-world, copy-paste-ready patterns for common UI flows.
        These examples focus on clarity, user feedback, and predictable behavior.
      </p>

      <Separator className="not-prose my-8" />

      {/* ---------------- Upload / Promise ---------------- */}
      <DocsHeading as="h2" id="async-upload">
        Async upload (promise)
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <Upload className="mt-0.5 h-4 w-4" />
        <span>
          For uploads, saves, or background jobs, use{" "}
          <code>toast.promise</code>. It automatically handles loading,
          success, and error states without extra boilerplate.
        </span>
      </p>

      <CodeExampleTabs
        title="Upload with toast.promise"
        code={`toast.promise(
  new Promise((resolve) => setTimeout(resolve, 2000)),
  {
    loading: "Uploading file...",
    success: "Upload complete",
    error: "Upload failed",
  }
);`}
        onRun={() =>
          toast.promise(new Promise((r) => setTimeout(r, 2000)), {
            loading: "Uploading file...",
            success: "Upload complete",
            error: "Upload failed",
          })
        }
        runLabel="Run upload"
      />

      <Separator className="not-prose my-10" />

      {/* ---------------- Delete + Undo ---------------- */}
      <DocsHeading as="h2" id="delete-with-undo">
        Delete with undo
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <Trash2 className="mt-0.5 h-4 w-4" />
        <span>
          This pattern avoids blocking modals. Perform the delete immediately,
          then give the user a short window to undo the action.
        </span>
      </p>

      <CodeExampleTabs
        title="Delete with undo"
        code={`toast.error("Item deleted", {
  action: {
    label: "Undo",
    onClick: () => {
      // restore item
      toast.success("Restored");
    },
  },
});`}
        onRun={() =>
          toast.error("Item deleted", {
            action: {
              label: "Undo",
              onClick: () => toast.success("Restored"),
            },
          })
        }
        runLabel="Run delete"
      />

      <Separator className="not-prose my-10" />

      {/* ---------------- Confirm then delete ---------------- */}
      <DocsHeading as="h2" id="confirm-delete">
        Confirm before delete
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <AlertTriangle className="mt-0.5 h-4 w-4" />
        <span>
          Use <code>toast.confirm</code> when an action is destructive and
          cannot be easily undone. Keep the copy specific and explicit.
        </span>
      </p>

      <CodeExampleTabs
        title="Confirm delete"
        code={`toast.confirm("Delete this project?", () => {
  toast.success("Project deleted");
});`}
        onRun={() =>
          toast.confirm("Delete this project?", () =>
            toast.success("Project deleted"),
          )
        }
        runLabel="Run confirm"
      />

      <Separator className="not-prose my-10" />

      {/* ---------------- Loading → Update ---------------- */}
      <DocsHeading as="h2" id="loading-update">
        Loading → update
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <Timer className="mt-0.5 h-4 w-4" />
        <span>
          When you need more control than <code>toast.promise</code>, use
          <code> toast.loading</code> and later update the same toast.
        </span>
      </p>

      <CodeExampleTabs
        title="Manual loading and update"
        code={`const id = toast.loading("Processing...");
setTimeout(() => {
  toast.update(id, {
    type: "success",
    message: "Completed",
    duration: 2000,
    dismissible: true,
  });
}, 1500);`}
        onRun={() => {
          const id = toast.loading("Processing...", {
            description: "Please wait",
          });
          setTimeout(() => {
            toast.update(id, {
              type: "success",
              message: "Completed",
              description: "Operation finished successfully",
              duration: 2000,
              dismissible: true,
            });
          }, 1500);
        }}
        runLabel="Run update flow"
      />

      <Separator className="not-prose my-10" />

      {/* ---------------- Multi-toast control ---------------- */}
      <DocsHeading as="h2" id="dismiss-and-replace">
        Dismiss and replace
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <Layers className="mt-0.5 h-4 w-4" />
        <span>
          When showing a critical message, it’s often better to clear older toasts
          first so the user focuses on the latest state.
        </span>
      </p>

      <CodeExampleTabs
        title="Dismiss all before notify"
        code={`toast.dismissAll();
toast.error("Connection lost");`}
        onRun={() => {
          toast.dismissAll();
          toast.error("Connection lost");
        }}
        runLabel="Run example"
      />

      <Separator className="not-prose my-10" />

      {/* ---------------- Custom UI ---------------- */}
      <DocsHeading as="h2" id="custom-layout">
        Custom layout
      </DocsHeading>

      <p className="not-prose flex items-start gap-3 text-muted-foreground">
        <LayoutTemplate className="mt-0.5 h-4 w-4" />
        <span>
          Use <code>toast.custom</code> when you need full control over layout,
          multiple actions, or custom styling. Keep it compact and focused.
        </span>
      </p>

      <CodeExampleTabs
        title="Custom JSX toast"
        code={`toast.custom((t) => (
  <div className="bg-black text-white px-6 py-4 rounded-lg flex items-center gap-4">
    <CheckCircle2 className="h-5 w-5" />
    <span>Custom layout</span>
    <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
  </div>
));`}
        onRun={() =>
          toast.custom((t) => (
            <div className="bg-black text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-4">
              <CheckCircle2 className="h-5 w-5" />
              <span className="flex-1">Custom layout</span>
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

      {/* ---------------- UX Guidelines ---------------- */}
      <DocsHeading as="h2" id="guidelines">
        UX guidelines
      </DocsHeading>

      <ul>
        <li>
          Prefer <code>toast.promise</code> for async work to keep UI state consistent.
        </li>
        <li>
          Keep messages concise; move details into <code>description</code>.
        </li>
        <li>
          Avoid stacking multiple errors; dismiss older toasts when showing critical ones.
        </li>
        <li>
          Use custom toasts sparingly for complex interactions.
        </li>
      </ul>

      <Separator className="not-prose my-10" />

      {/* ---------------- End ---------------- */}
      <DocsHeading as="h2" id="end">
        That’s it
      </DocsHeading>

      <p className="not-prose text-muted-foreground">
        You now have all the building blocks to integrate NextToast cleanly and
        consistently across your application.
      </p>
    </DocsPage>
  );
}
