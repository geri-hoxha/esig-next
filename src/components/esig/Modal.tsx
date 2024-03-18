"use client";
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
}

const Modal: React.FC<IProps> = ({
  title,
  description,
  body,
  children,
  noButtons = false,
  width = "min-w-[65%]",
  openProp = false,
  setOpenProp,
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
          setOpenProp(open);
        }}
      >
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className={width}>
          <DialogHeader className="pb-2 border-gray-300 border-b-2 border-dashed">
            <DialogTitle className="text-xl">{title}</DialogTitle>
            <DialogDescription className="text-base">
              {description}
            </DialogDescription>
          </DialogHeader>
          {body}

          {noButtons ? null : (
            <div className="flex items-center w-max ml-auto gap-x-2">
              <DrawerClose asChild>
                <Button variant="outline">Anullo veprimin</Button>
              </DrawerClose>
              <Button variant="default">Ruaj dhe apliko</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={openProp} onOpenChange={setOpenProp}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
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
