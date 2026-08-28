import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CMSHydrator from "@/components/CMSHydrator";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PAYPOS Ödeme Teknolojileri | Yeni Nesil POS Cihazları ve Çözümleri",
    template: "%s | PAYPOS Ödeme Teknolojileri",
  },
  description: "Türkiye genelinde 10.000+ işletmenin güvendiği yeni nesil Android POS, Mobil POS, Masaüstü POS ve GİB onaylı Yazarkasa POS ödeme çözümleri.",
  keywords: [
    "yazarkasa pos",
    "android pos",
    "mobil pos",
    "ödeme sistemleri",
    "hugin pos",
    "ingenico pos",
    "paygo pos",
    "pos cihazı fiyatları",
    "komisyonsuz pos",
  ],
  authors: [{ name: "PAYPOS Ödeme Teknolojileri A.Ş." }],
  creator: "PAYPOS",
  metadataBase: new URL("https://onpos2.vercel.app"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://onpos2.vercel.app",
    siteName: "PAYPOS Ödeme Teknolojileri",
    title: "PAYPOS Ödeme Teknolojileri | Yeni Nesil POS Cihazları ve Çözümleri",
    description: "GİB onaylı Android ve Mobil POS cihazları, düşük komisyon oranları ve 24 saatte adrese teslim garantisi.",
    images: [
      {
        url: "https://www.yazarkasasatisi.com/upload/logos/POSLOGO.jpg",
        width: 1200,
        height: 630,
        alt: "PAYPOS Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PAYPOS Ödeme Teknolojileri",
    description: "Yeni Nesil Akıllı POS ve Ödeme Altyapıları",
    images: ["https://www.yazarkasasatisi.com/upload/logos/POSLOGO.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { cookies } from "next/headers";
import { getActiveThemeAsync, getSettings } from "@/lib/cms-repository";
import { defaultCMSData } from "@/lib/default-data";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initialSettings = defaultCMSData.settings;
  let initialTheme = "theme-existing";

  try {
    const dbTheme = await getActiveThemeAsync();
    const settings = getSettings();
    const cookieStore = await cookies();
    const themeCookie = cookieStore.get("paypos_theme_id")?.value;
    
    // DB is source of truth; cookie is secondary hint
    initialTheme = dbTheme || (themeCookie === "theme-fintech" ? "theme-fintech" : "theme-existing");
    initialSettings = { ...settings, themeId: initialTheme as any };
  } catch {
    initialTheme = "theme-existing";
  }

  return (
    <html
      lang="tr"
      data-theme={initialTheme}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CMSHydrator initialSettings={initialSettings} />
        {children}
      </body>
    </html>
  );
}
