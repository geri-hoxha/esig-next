"use client";

import { removeQueryParam } from "@/app/admin/sale/v3/components/PolicyUsers";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect, useState } from "react";
import {
  DefaultValues,
  FieldValues,
  useForm,
  FormProvider,
} from "react-hook-form";
import { ZodRawShape, z } from "zod";

type AsyncDefaultValues<TFieldValues> = (
  payload?: unknown
) => Promise<TFieldValues>;

interface IProps<T> {
  title: string;
  description: string;
  children: ReactNode;
  open: boolean;
  width: string;
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

  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    setIsDesktop(width > 768);
  }, []);

  const onCancelClick = () => {
    setShow(false);
    onCancel();
  };

  const onSaveClick = async () => {
    setShow(false);
    const result = await form.trigger(); // Trigger validation for all fields

    console.log(form.formState.errors)
    console.log(result)
    const fieldsValues = form.getValues();

    await onOk(fieldsValues);
  };

  const onSubmit = data => {
    console.log(data);
  };

  const onError = data=> {
    console.log(data)
  }

  if (isDesktop) {
    return (
      <Dialog
        open={show}
        onOpenChange={(open) => {
          if (!open) {
            onCancel();

            // in any case
            removeQueryParam("id");
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
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>{children}</form>
          </FormProvider>
          <div className="flex items-center w-max ml-auto gap-x-2 absolute bottom-3 right-3">
            <DrawerClose asChild>
              <Button variant="outline" onClick={onCancelClick}>
                Anullo veprimin
              </Button>
            </DrawerClose>
            <Button variant="default" type="submit"  >
              Ruaj dhe apliko
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={show}
      onOpenChange={(open) => {
        if (!open) {
          onCancel();

          // in any case
          removeQueryParam("id");
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
          <form>{children}</form>
        </FormProvider>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline" onClick={onCancelClick}>
              Anullo veprimin
            </Button>
          </DrawerClose>
          <Button variant="default" onClick={onSaveClick}>
            Ruaj dhe apliko
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Modal;
