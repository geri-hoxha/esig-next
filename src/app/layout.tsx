import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/esig/Navbar";
import Footer from "@/components/esig/Footer";
import Sidemenu from "@/components/esig/Sidemenu";
import EnvironmentBar from "@/components/esig/Navbar/EnvironmentBar";
import Breadcrumb from "@/components/esig/Breadcrumb";
import PageTitle from "@/components/esig/PageTitle";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import 'ag-grid-enterprise';
import { AgCharts } from 'ag-charts-enterprise';
AgCharts.setLicenseKey('your license key');

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
        <div className="min-h-screen full relative w-full bg-white bg-background antialiased flex flex-col font-primary">
          <TooltipProvider delayDuration={300}>
            <Navbar />
            <div className="flex w-full h-full grow mt-[93px]">
              <Sidemenu className="hidden md:flex" />
              <div className="flex flex-col h-auto w-full ml-0 md:ml-[255px]">
                <main className="w-full h-full p-6 bg-white flex flex-col gap-6">
                  <Breadcrumb />
                  {/* <PageTitle /> */}
                  {children}
                </main>
                <Footer />
              </div>
            </div>
          </TooltipProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
