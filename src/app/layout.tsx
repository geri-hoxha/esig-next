import type { Metadata } from "next";
import "@/app/globals.css";
import "ag-grid-enterprise";
import { AgCharts } from "ag-charts-enterprise";
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
      <body>{children}</body>
    </html>
  );
}
