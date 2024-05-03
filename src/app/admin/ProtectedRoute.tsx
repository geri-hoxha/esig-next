"use client";

import { X } from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("token"); // Implement this function

    if (isAuthenticated) {
      if (pathname === "/login") {
        redirect("/admin/sale/v3");
      }
    } else {
      // Redirect to login page if not authenticated

      if (pathname !== "/login") {
        redirect("/login");
      }
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
