import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "PromptForge — Free AI Prompt Generator",
  description:
    "Turn rough ideas into powerful AI prompts. Free, instant, no signup required. Sponsored by ForgeWorks.",
  openGraph: {
    title: "PromptForge — Free AI Prompt Generator",
    description:
      "Turn rough ideas into powerful AI prompts. Free, instant, no signup.",
    url: "https://promptforge.vercel.app",
    siteName: "PromptForge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptForge — Free AI Prompt Generator",
    description:
      "Turn rough ideas into powerful AI prompts. Free, instant, no signup.",
  },
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
        {children}
      </body>
    </html>
  );
}
