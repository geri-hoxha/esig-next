import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/esig/Navbar";
import Footer from "@/components/esig/Footer";
import Sidemenu from "@/components/esig/Sidemenu";
import EnvironmentBar from "@/components/esig/Navbar/EnvironmentBar";
import Breadcrumb from "@/components/esig/Breadcrumb";
import PageTitle from "@/components/esig/PageTitle";

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
        className={"h-screen bg-background antialiased d-flex font-primary "}
      >
        <div className="flex flex-col h-full w-full relative">
          <EnvironmentBar />
          <Navbar />
          <div className="flex items-center w-full h-full">
            <Sidemenu className="hidden md:flex" />
            <div className="flex flex-col h-full w-full bg-gray-50">
              <main className="w-full h-full px-4 md:px-7  py-2 md:py-5">
                <Breadcrumb />
                <PageTitle />
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
