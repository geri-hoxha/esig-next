"use client";
import { removeQueryParam } from "@/app/sale/v3/components/PolicyUsers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";

interface IProps {
  title: string;
  body: ReactNode;
  children: ReactNode;
  description: string;
  noButtons?: boolean;
  width?: string;
  openProp?: boolean;
  setOpenProp?: any;
  back?: boolean;
  onReleaseClose?: any;
}

const Modal: React.FC<IProps> = ({
  title,
  description,
  body,
  children,
  noButtons = false,
  width = "min-w-[65%]",
  openProp,
  setOpenProp,
  back = false,
  onReleaseClose = () => {}
}) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    setIsDesktop(width > 768);
  }, []);

  if (isDesktop) {
    return (
      <Dialog
        open={openProp}
        onOpenChange={(open) => {
          setOpenProp?.(open);
          if (!open) {
            removeQueryParam("id");
          }
        }}
      >
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className={width}>
          <div className="flex items-center pb-2 border-gray-300 border-b-2 border-dashed">
            <div onClick={() => setOpenProp(false)}>
              {back && (
                <div className="w-7 h-7 mr-4 cursor-pointer border-2 border-esig flex items-center justify-center rounded-full bg-sky-50">
                  <Image
                    src="/svg/left_arrow.svg"
                    alt="edit"
                    width={"0"}
                    height={"0"}
                    style={{ width: 30, height: 30 }}
                    priority
                  />
                </div>
              )}
            </div>

            <DialogHeader>
              <DialogTitle className="text-xl">{title}</DialogTitle>
              <DialogDescription className="text-base">
                {description}
              </DialogDescription>
            </DialogHeader>
          </div>

          {body}

          {noButtons ? null : (
            <div className="flex items-center w-max ml-auto gap-x-2">
              <DrawerClose asChild>
                <Button variant="outline" onClick={() => setOpenProp(false)}>
                  Anullo veprimin
                </Button>
              </DrawerClose>
              <Button variant="default">Ruaj dhe apliko</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={openProp}
      onOpenChange={(open) => {
        setOpenProp?.(open);
        if (!open) {
          removeQueryParam("id");
        }
      }}

      onRelease={(event, open) => {
        onReleaseClose(open);
      }}
    >
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="px-4">
        <div className="flex items-center md:pb-2 mb-3 md:mb-0 border-gray-300 border-b-2 border-dashed">
          <div onClick={() => setOpenProp(false)}>
            {back && (
              <div className="w-7 h-7 mr-4 cursor-pointer border-2 border-esig flex items-center justify-center rounded-full bg-sky-50">
                <Image
                  src="/svg/left_arrow.svg"
                  alt="edit"
                  width={"0"}
                  height={"0"}
                  style={{ width: 30, height: 30 }}
                  priority
                />
              </div>
            )}
          </div>

          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
        </div>

        {body}
        <DrawerFooter className="pt-2">
          {noButtons ? null : (
            <DrawerClose asChild>
              <Button variant="outline">Anullo veprimin</Button>
            </DrawerClose>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Modal;
