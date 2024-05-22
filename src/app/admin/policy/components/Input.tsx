"use client";

import React, {
  LegacyRef,
  ReactNode,
} from "react";
import ErrorMessage from "./ErrorMessage";
import { useFormContext } from "react-hook-form";

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
  suffix: ReactNode;
  label: string;
}

const Input = React.forwardRef(
  (props: Partial<IInput>, ref: LegacyRef<HTMLInputElement> | undefined) => {
    const {
      name,
      label,
      placeholder,
      icon = undefined,
      className = "",
      onChange,
      value = undefined,
      readOnly = false,
      suffix,
      type = "text",
      onClick,
      ...register
    }: Partial<IInput> = props;

    const formContext = useFormContext<Record<string, any>>();

    let iconDiv;

    let pl10 = "";

    if (icon !== undefined) {
      iconDiv = (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </div>
      );
      pl10 = "pl-10";
    }

    const getInputAttr = () => {
      if (!!name) return { name };
      return { value };
    };

    return (
      <div className="w-full relative">
        <div className=" rounded-md shadow-sm">
          <label
            htmlFor={name}
            className={`absolute -top-3 left-2 inline-block rounded-md  px-1 text-xs font-medium text-gray-900 ${
              readOnly ? "bg-gray-100" : "bg-white"
            }`}
          >
            {label}
          </label>
          {iconDiv}
          <input
            onClick={onClick}
            type={type}
            id={name}
            {...getInputAttr()}
            onChange={onChange}
            className={`block w-full rounded-md border-0 py-1.5 ${pl10} text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-esig sm:text-sm sm:leading-6 ${className} ${
              readOnly ? "bg-gray-100" : ""
            }`}
            placeholder={placeholder}
            readOnly={readOnly}
            {...register}
            ref={ref}
          />
          {suffix && (
            <div className="absolute z-10 bg-sky-50 text-gray-500 h-[calc(100%-4px)] mr-0.5 flex items-center justify-center px-2 border-l-2 rounded-r-md  top-0.5 right-0 font-medium text-sm">
              {suffix}
            </div>
          )}
        </div>

        {formContext?.formState && (
          <ErrorMessage error={formContext.formState.errors[name ?? ""]} />
        )}
      </div>
    );
  }
);

export default Input;0
