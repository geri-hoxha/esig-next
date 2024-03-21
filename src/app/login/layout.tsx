import type { Metadata } from "next";

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
  <div className="">
     {children}</div>
  )
}
