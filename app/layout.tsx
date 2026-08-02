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
  title: "SarikayaDevs | Satış Odaklı Web Tasarım",
  description: "Küçük ve orta ölçekli işletmeler için hızlı, güven veren, SEO uyumlu ve satış odaklı web siteleri geliştiriyoruz.",
  keywords: ["SarikayaDevs", "web tasarım", "kurumsal web sitesi", "SEO uyumlu web sitesi", "KOBİ web sitesi", "Türkiye"],
  openGraph: {
    title: "SarikayaDevs | Satış Odaklı Web Tasarım",
    description: "KOBİ’ler için hızlı, güven veren, SEO uyumlu ve satış odaklı web siteleri geliştiriyoruz.",
    type: "website",
    locale: "tr_TR",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "SarikayaDevs — Satış odaklı web tasarım" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SarikayaDevs | Satış Odaklı Web Tasarım",
    description: "KOBİ’ler için hızlı, güven veren, SEO uyumlu ve satış odaklı web siteleri geliştiriyoruz.",
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
