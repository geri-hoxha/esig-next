import type { Metadata } from "next";
import ProtectedRoute from "../admin/ProtectedRoute";
import Image from "next/image";

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
      <div className="w-full text-white flex items-center justify-center h-screen  relative overflow-x-hidden  ">
        <div
          className="absolute top-0 left-72 w-screen h-screen object-cover bg-right 	"
          style={{ backgroundImage: "url(/bg_logo_v6.png)" }}
        ></div>
        {/* <Image
          className="absolute top-0 left-0 w-screen h-screen object-cover bg-right	"
          src="/bg_logo_v6.png"
          alt="edit"
          width={"0"}
          height={"0"}
          unoptimized
        /> */}
        <div className="grid w-full h-full grid-cols-12">
          <div className="col-span-5 z-50 flex bg-gray-300/60 items-center justify-center">
            {children}
          </div>
          <div className="col-span-7"></div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
