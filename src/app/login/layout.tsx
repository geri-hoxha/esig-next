import type { Metadata } from "next";
import ProtectedRoute from "../admin/ProtectedRoute";

export const metadata: Metadata = {
  title: "ESIG",
  description: "Esig - Sigal core system",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <div className="bg-esig-surface-30  w-full text-white flex items-center justify-center h-screen">{children}</div>
    </ProtectedRoute>
  );
}
