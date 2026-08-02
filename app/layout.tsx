import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sarikayadevs.com"),
  title: "Muhammed | sarikayadevs.com",
  description: "Muhammed tarafından geliştirilen web siteleri, otomasyon araçları ve dijital ürünler.",
  keywords: ["Muhammed", "sarikayadevs", "web geliştirme", "otomasyon", "full-stack developer", "Türkiye"],
  openGraph: {
    title: "Muhammed | sarikayadevs.com",
    description: "Web siteleri, otomasyon araçları ve dijital ürünler geliştiriyorum.",
    type: "website",
    locale: "tr_TR",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Muhammed — sarikayadevs.com" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammed | sarikayadevs.com",
    description: "Web siteleri, otomasyon araçları ve dijital ürünler geliştiriyorum.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
