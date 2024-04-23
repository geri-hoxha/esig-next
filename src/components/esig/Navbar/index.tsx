"use client";
import Image from "next/image";
import UserActions from "./UserActions";
import Balance from "./Balance";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import React, { Suspense } from "react";
import {
  Sheet,
  SheetContent,
  SheetOverlay,
  SheetTrigger,
} from "@/components/ui/sheet";
import DrawerContent from "./DrawerContent";
import { useToast } from "@/components/ui/use-toast";
import Base from "@/app/admin/sale/components/Fields_v2/Base";

// const Currencies = React.lazy(() => import("./Currencies"));

const EsigLogo = () => {
  return (
    <Image
      src="/esig_black_text.svg"
      alt="Logo"
      width={"0"}
      height={"0"}
      style={{ width: 80, height: 35 }}
      priority
    />
  );
};

const Navbar: React.FC = () => {
  const { toast } = useToast();

  return (
    <div className="fixed top-0 left-0 w-full z-50 ">
      <div className="w-full py-1.5 my-0 mx-auto bg-esig flex items-center justify-center text-white font-bold text-sm">
        <span>Development environment</span>
      </div>

      <nav className=" w-full px-3 py-2 md:px-4 md:py-3 bg-white flex items-center border-gray-200 border-b z-50">
        <div className="lg:min-w-52  ">
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger>
                <Image
                  src="/svg/menu.svg"
                  alt="Logo"
                  width={"0"}
                  height={"0"}
                  style={{ width: 40, height: 35 }}
                  priority
                />
              </SheetTrigger>
              <SheetContent className="px-0 mt-[84px] h-auto" side="left">
                <DrawerContent />
              </SheetContent>
              <SheetOverlay className="mt-[84px] bg-gray-900/40"></SheetOverlay>
            </Sheet>
          </div>
          <div className="hidden md:block">
            <EsigLogo />
          </div>
        </div>
        <Suspense fallback={<></>}>{/* <Currencies /> */}</Suspense>
        <div className="ml-auto flex items-center gap-x-3">
          <div className="hidden md:block">
            <Base
              className="!w-60 !h-10"
              type="select"
              icon={
                <Image
                  className="cursor-pointer"
                  src="/svg/user.svg"
                  alt="edit"
                  width={"0"}
                  height={"0"}
                  style={{ width: 20, height: 20 }}
                  priority
                />
              }
              options={[
                {
                  key: "Geri Hoxha",
                  value: "Geri Hoxha",
                },
                {
                  key: "Erin Hoxha",
                  value: "Erin Hoxha",
                },
                {
                  key: "Oltion Driza",
                  value: "Oltion Driza",
                },
                {
                  key: "Kledi Kallastra",
                  value: "Kledi Kallastra",
                },
              ]}
              label="Agjenti"
              name="serial"
              onChange={(e: any) => {
                toast({
                  variant: "default",
                  title: `Jeni duke shitur si agjenti: ${e.target.value}`,
                  description: "Veprim me sukses!",
                });
              }}
            />
          </div>
          <UserActions />
          <Balance />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
