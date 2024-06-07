// import 'reflect-metadata';
import type { Metadata } from "next";
import "@/app/globals.css";
import "ag-grid-enterprise";
import { AgCharts } from "ag-charts-enterprise";
import EnvironmentBar from "@/components/esig/Navbar/EnvironmentBar";
import Navbar from "@/components/esig/Navbar";
import PageTitle from "@/components/esig/PageTitle";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WebVitals } from "./web-vitals";

AgCharts.setLicenseKey("your license key");

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
      <body>
      <WebVitals />

        <div className="min-h-screen full relative w-full bg-white bg-background antialiased flex flex-col font-primary">
          <TooltipProvider delayDuration={300}>
            {children}
          </TooltipProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
