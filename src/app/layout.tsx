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
  title: "PAYPOS Ödeme Teknolojileri | Yeni Nesil POS Cihazları ve Çözümleri",
  description: "Türkiye genelinde 10.000+ işletmenin güvendiği yeni nesil Android POS, Mobil POS, Masaüstü POS ve GİB onaylı Yazarkasa POS ödeme çözümleri.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CMSHydrator />
        {children}
      </body>
    </html>
  );
}
