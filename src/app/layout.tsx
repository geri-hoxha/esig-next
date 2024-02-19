import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "../lib/utils";
import Navbar from "@/components/esig/Navbar";
import Footer from "@/components/esig/Footer";
import Sidemenu from "@/components/esig/Sidemenu";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ESIG",
  description: "Esig - Sigal core system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "h-screen bg-background font-sans antialiased d-flex",
          fontSans.variable
        )}
      >
        <div className="flex flex-col h-full w-full">
          <Navbar />
          <div className="flex items-center w-full h-full">
            <Sidemenu />
            <div className="flex flex-col h-full w-full">
              <main className="w-full h-full p-7">{children}</main>
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
