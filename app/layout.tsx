import type { Metadata, Viewport } from "next";
import "./globals.css";

// Unique Font Contenders
import {
  Space_Grotesk,
  Bricolage_Grotesque,
  Plus_Jakarta_Sans,
  Outfit,
  Lexend,
  DM_Serif_Text,
} from "next/font/google";

import { NextToast } from "next-toast";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteNavbar } from "@/components/navbar";
import { SiteFooter } from "@/components/footer";

// Font Configurations
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });
const dmserif = DM_Serif_Text({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://next-toast.vercel.app"),
  applicationName: "NextToast",
  title: {
    default: "NextToast — Toast Notifications for Next.js",
    template: "%s — NextToast",
  },
  description:
    "NextToast is a lightweight, zero-dependency toast notification library for Next.js and React. Clean API, rich colors, promise handling, and confirm flows.",
  keywords: [
    "next toast",
    "nextjs toast",
    "toast notifications",
    "react toast",
    "notification component",
    "sonner alternative",
    "next.js app router toast",
    "ui toast library",
    "nexttoast",
  ],
  authors: [{ name: "NextToast" }],
  creator: "NextToast",
  publisher: "NextToast",
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://next-toast.vercel.app",
    title: "NextToast — Toast Notifications for Next.js",
    description:
      "A lightweight, zero-dependency toast notification system for Next.js.",
    siteName: "NextToast",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "NextToast" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextToast — Toast Notifications for Next.js",
    description:
      "Lightweight, zero-dependency toast notifications for Next.js and React.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={[
          lexend.className,
          "antialiased selection:bg-green-100 dark:selection:bg-green-300 selection:text-black",
        ].join(" ")}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteNavbar />
          <div className="min-h-[calc(100vh-3.5rem)]">{children}</div>
          <NextToast />
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
