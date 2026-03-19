import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Best Mobile",
  description: "Azərbaycanın ən böyük telefon platforması",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%232563eb'/><rect x='35' y='15' width='30' height='55' rx='5' fill='white'/><rect x='38' y='18' width='24' height='44' rx='3' fill='%232563eb'/><circle cx='50' cy='67' r='4' fill='white'/></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <body className={inter.className}>{children}</body>
    </html>
  );
}