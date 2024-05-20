"use client";

import { removeQueryParam } from "@/app/admin/sale/v3/components/PolicyUsers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect, useState } from "react";
import {
  DefaultValues,
  FieldValues,
  useForm,
  FormProvider,
} from "react-hook-form";
import { ZodRawShape, z } from "zod";
import Button from "./Button";

type AsyncDefaultValues<TFieldValues> = (
  payload?: unknown
) => Promise<TFieldValues>;

interface IProps<T> {
  title: string;
  description: string;
  children: ReactNode;
  open: boolean;
  width: string;
  footer?: ReactNode;
  onOk: (
    values: T extends FieldValues ? T : FieldValues
  ) => void | Promise<void>;
  onCancel: () => void;
  onReleaseClose: (open: boolean) => void;
  formSchema: z.ZodObject<ZodRawShape>;
  defaultValues:
    | DefaultValues<T extends FieldValues ? T : FieldValues>
    | AsyncDefaultValues<T extends FieldValues ? T : FieldValues>;
}

// generic for the form fields
function Modal<T>({
  title = "",
  description = "",
  children = null,
  open = true,
  width = "min-w-[70%]",
  footer = null,
  onOk = () => {},
  onCancel = () => {},
  onReleaseClose = () => {},
  formSchema = z.object({}),
  defaultValues,
}: Partial<IProps<T>>) {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const [show, setShow] = useState(open);

 
  const form = useForm<T extends FieldValues ? T : FieldValues>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });


  console.log(form.getValues())
  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    setIsDesktop(width > 768);
  }, []);

  const onCancelClick = () => {
    closeModalAndResetForm();

    onCancel();
  };

  const onSubmit = async () => {
    const values = form.getValues();

    await onOk(values);

    closeModalAndResetForm();
  };

  const closeModalAndResetForm = () => {
    setShow(false);

    form.reset(undefined);

    // in any case
    removeQueryParam("id");
  };

  if (isDesktop) {
    return (
      <Dialog
        open={show}
        onOpenChange={(open) => {
          if (!open) {
            onCancelClick();
          }
        }}
      >
        {/* <DialogTrigger asChild></DialogTrigger> */}
        <DialogContent className={width}>
          <div className="flex items-center pb-2 border-gray-300 border-b-2 border-dashed">
            <DialogHeader>
              <DialogTitle className="text-xl">{title}</DialogTitle>
              <DialogDescription className="text-base text-gray-600">
                {description}
              </DialogDescription>
            </DialogHeader>
          </div>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {children}
              <div className="w-full border-t-2 border-dashed ">
                <div className="flex items-center justify-between  mt-4">
                  {footer}
                  <div className="flex items-center w-max ml-auto gap-x-2  ">
                    <DrawerClose asChild>
                      <Button
                        variant="danger"
                        onClick={onCancelClick}
                        className="border border-esig-error py-1"
                      >
                        Anullo veprimin
                      </Button>
                    </DrawerClose>
                    <Button
                      type="submit"
                      iconSrc="/svg/check_no_border.svg"
                      className="border border-esig"
                      variant="edit"
                    >
                      Ruaj dhe apliko
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={show}
      onOpenChange={(open) => {
        if (!open) {
          onCancelClick();
        }
      }}
      onRelease={(event, open) => {
        onReleaseClose(open);
      }}
    >
      {/* <DrawerTrigger asChild> </DrawerTrigger> */}
      <DrawerContent className="px-4 relative">
        <div className="flex items-center md:pb-2 mb-3 md:mb-0 border-gray-300 border-b-2 border-dashed">
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription className="text-gray-600">
              {description}
            </DrawerDescription>
          </DrawerHeader>
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {children}
            <div className="w-full border-t-2 border-dashed ">
              <div className="flex items-center justify-between  mt-4">
                {footer}
                <div className="flex items-center w-max ml-auto gap-x-2  ">
                  <DrawerClose asChild>
                    <Button
                      variant="danger"
                      onClick={onCancelClick}
                      className="border border-esig-error py-1"
                    >
                      Anullo veprimin
                    </Button>
                  </DrawerClose>
                  <Button
                    type="submit"
                    iconSrc="/svg/check_no_border.svg"
                    className="border border-esig"
                    variant="edit"
                  >
                    Ruaj dhe apliko
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
}

export default Modal;
