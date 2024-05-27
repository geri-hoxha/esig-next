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
import {
  EventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import {
  DefaultValues,
  FieldValues,
  useForm,
  FormProvider,
} from "react-hook-form";
import { ZodRawShape, z } from "zod";
import Button from "./Button";
import { CustomerModel, PolicyParticipantPolicyUserRequest } from "../type";

type AsyncDefaultValues<TFieldValues> = (
  payload?: unknown
) => Promise<TFieldValues>;

interface IProps<T> {
  title: string;
  description: string;
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  width: string;
  footer?: ReactNode;
  onOk: (values: T | {}) => void | Promise<void>;
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
  setOpen = () => { },
  width = "min-w-[70%]",
  footer = null,
  onOk = () => { },
  onCancel = () => { },
  onReleaseClose = () => { },
  formSchema = z.object({}),
  defaultValues,
}: Partial<IProps<T>>) {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const form = useForm<T extends FieldValues ? T : FieldValues>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    setIsDesktop(width > 768);
  }, []);

  const onCancelClick = () => {
    closeModalAndResetForm();

    onCancel();
  };

  const onSubmit = async () => {
    const values: FieldValues = form.getValues();

    console.log(values)

    for (const key in values) {
      const value = values[key];

      if (key === ("extraCharge" as keyof PolicyParticipantPolicyUserRequest)) {
        values[key] = value === "true";
      }
    }

    closeModalAndResetForm();

    await onOk(values);
  };

  const closeModalAndResetForm = () => {
    setOpen(false);

    form.reset({} as any);

    // in any case
    removeQueryParam("id");
  };

  const handleEnterPress: KeyboardEventHandler = (event) => {
    if (event.key === "Enter" || event.key == "Space") {
      onSubmit();
    }
  };

  if (isDesktop) {
    return (
      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);

          if (!open) {
            onCancelClick();
          }
        }}
      >
        {/* <DialogTrigger asChild></DialogTrigger> */}
        <DialogContent onKeyDown={handleEnterPress} className={width}>
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
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
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
