"use client";

import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  LegacyRef,
  ReactNode,
  forwardRef,
} from "react";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

interface IProps {
  id: string;
  name: string;
  children: ReactNode;
  defaultChecked: boolean;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  type: HTMLInputTypeAttribute;
  noErrorMessage: boolean;
}

const Checkbox: React.FC<Partial<IProps>> = forwardRef(
  (
    {
      id,
      name,
      children,
      onChange,
      value,
      defaultChecked = false,
      checked,
      noErrorMessage = false,
      type = "checkbox",
      ...register
    }: Partial<IProps>,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    const {
      formState: { errors },
    } = useFormContext<Record<string, any>>();

    const getAtributtes = () => {
      if (typeof checked === "undefined") return { defaultChecked };
      return { checked };
    };

    const getInputAttr = () => {
      if (!!value) return { value };
      return {name};
    };

    return (
      <div className="relative flex items-center ">
        <input
          id={id}
          type={type}
          {...getAtributtes()}
          {...getInputAttr()}
          onChange={onChange}
          className="h-4 w-4 border-gray-300 text-esig focus:ring-esig"
          ref={ref}
          {...register}
        />
        {children && (
          <label
            htmlFor={id}
            className="ml-1.5 block text-sm font-medium leading-6 text-gray-900"
          >
            {children}
          </label>
        )}
        {noErrorMessage ? null : <ErrorMessage error={errors[name ?? ""]} />}
      </div>
    );
  }
);

export default Checkbox;
