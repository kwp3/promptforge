import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { BASE_URL, getCanonicalUrl } from "@/lib/canonical";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0C10" },
    { media: "(prefers-color-scheme: light)", color: "#FF5500" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | PromptForge",
    default: "PromptForge — Free AI Prompt Generator | Build Better Prompts",
  },
  description:
    "Generate powerful AI prompts instantly. Free, no signup. 9 categories: coding, writing, business, creative, education, marketing, AI agents, system prompts, and agent workflows.",
  keywords: [
    "ai prompt generator",
    "free prompt generator",
    "chatgpt prompts",
    "prompt engineering",
    "system prompt generator",
    "ai agent prompts",
  ],
  openGraph: {
    title: "PromptForge — Free AI Prompt Generator | Build Better Prompts",
    description:
      "Generate powerful AI prompts instantly. Free, no signup. 9 categories: coding, writing, business, creative, education, marketing, AI agents, system prompts, and agent workflows.",
    url: BASE_URL,
    siteName: "PromptForge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptForge — Free AI Prompt Generator | Build Better Prompts",
    description:
      "Generate powerful AI prompts instantly. Free, no signup. 9 categories: coding, writing, business, creative, education, marketing, AI agents, system prompts, and agent workflows.",
  },
  alternates: {
    canonical: getCanonicalUrl(),
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PromptForge",
  description:
    "Free AI prompt generator with 9 categories. No signup required.",
  url: BASE_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "ForgeWorks" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="forge">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
