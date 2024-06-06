import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarVisiteur from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Index",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="light">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen items-center max-sm:text-sm">
          <NavbarVisiteur />
          <main className="flex flex-grow w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
