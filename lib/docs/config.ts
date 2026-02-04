export type DocsNavItem = {
  title: string;
  href: string;
  description?: string;
};

export const docsNav: DocsNavItem[] = [
  { title: "Get Started", href: "/docs/get-started", description: "Install and set up NextToast" },
  { title: "Toasts", href: "/docs/toasts", description: "All toast methods and examples" },
  { title: "Configuration", href: "/docs/configuration", description: "Position, rich colors, close button, max visible" },
  { title: "Examples", href: "/docs/examples", description: "Promise, custom, confirm patterns" },
];
