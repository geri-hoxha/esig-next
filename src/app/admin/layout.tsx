import type { Metadata } from "next";
import "@/app/globals.css";
import Footer from "@/components/esig/Footer";
import Sidemenu from "@/components/esig/Sidemenu";
import Breadcrumb from "@/components/esig/Breadcrumb";
import "ag-grid-enterprise";
import { AgCharts } from "ag-charts-enterprise";
import Navbar from "@/components/esig/Navbar";
import ProtectedRoute from "./ProtectedRoute";
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
    <ProtectedRoute>
      <Navbar />
      <div className="flex w-full h-full grow mt-[93px]">
        <Sidemenu className="hidden md:flex" />
        <div className="flex flex-col h-auto w-full ml-0 md:ml-[255px]">
          <main className="w-full h-full p-4 md:p-6 bg-gray-50 flex flex-col gap-4 md:gap-6">
            <Breadcrumb />
            {/* <PageTitle /> */}
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </ProtectedRoute>
  );
}
