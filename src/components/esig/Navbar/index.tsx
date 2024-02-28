import Image from "next/image";
import UserActions from "./UserActions";
import Balance from "./Balance";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import React, { Suspense } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetOverlay,
  SheetTrigger,
} from "@/components/ui/sheet";
import DrawerContent from "./DrawerContent";
import { Button } from "@/components/ui/button";

const Currencies = React.lazy(() => import("./Currencies"));

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
  return (
    <>
      <nav className="px-3 py-2 md:px-4 md:py-3 bg-white flex items-center border-gray-200 border-b z-50">
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
        <Suspense fallback={<></>}>
          <Currencies />
        </Suspense>
        <div className="ml-auto flex items-center gap-x-3">
          <div className="hidden md:block">
            <Input
              icon={<Search size={15} />}
              className="bg-gray-50 h-9 text-gray-900 rounded-lg border-gray-300 "
            />
          </div>
          <UserActions />
          <Balance />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
