import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Lexend } from "next/font/google";

import { NextToast } from "next-toast";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteNavbar } from "@/components/navbar";
import { SiteFooter } from "@/components/footer";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

const SITE_URL = "https://toast.rimubhai.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: "NextToast",

  title: {
    default: "NextToast — Toast Notifications for Next.js",
    template: "%s — NextToast",
  },

  description:
    "NextToast is a lightweight, zero-dependency toast notification library for Next.js and React. Clean API, rich colors, promise handling, and confirm flows.",

  keywords: [
    "NextToast",
    "toast notifications",
    "Next.js toast",
    "React toast",
    "toast component",
    "sonner alternative",
    "Next.js App Router",
    "UI notifications",
  ],

  alternates: {
    canonical: SITE_URL,
  },

  verification: {
    google: "LU3V9H0GGuC8ow7uQSCv05MSnC1vQyM0dFOx0zkbFII",
  },


  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "NextToast — Toast Notifications for Next.js",
    description:
      "A lightweight, zero-dependency toast notification system for Next.js.",
    siteName: "NextToast",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "NextToast — Toast Notifications for Next.js",
      },
    ],
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
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",

  // Optional but nice: helps SERP branding
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
