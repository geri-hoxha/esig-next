import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ESIG",
  description: "Esig - Sigal core system",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-black/90  w-full text-white flex items-center justify-center h-screen">{children}</div>;
}
