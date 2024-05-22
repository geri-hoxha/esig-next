"use client";

import React, { LegacyRef, ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

export interface IOptions {
  key: string;
  value: string;
}

export interface ISelect extends React.InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  icon: ReactNode;
  suffix: ReactNode;
  options: IOptions[];
}

const Select = React.forwardRef(
  (props: Partial<ISelect>, ref: LegacyRef<HTMLSelectElement>) => {
    const {
      name,
      label,
      placeholder,
      icon = undefined,
      className = "",
      onChange,
      value,
      readOnly = false,
      suffix,
      options = [],
      ...register
    }: Partial<ISelect> = props;

    const {
      formState: { errors },
    } = useFormContext<Record<string, any>>();

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

    return (
      <div className="w-full">
        <div className="relative rounded-md shadow-sm">
          <label
            htmlFor={name}
            className={`absolute -top-3 left-2 inline-block rounded-md  px-1 text-xs font-medium text-gray-900 ${
              readOnly ? "bg-gray-100" : "bg-white"
            }`}
          >
            {label}
          </label>
          {iconDiv}
          <select
            {...register}
            id={name}
            name={name}
            onChange={onChange}
            className={`block w-full rounded-md border-0 py-1.5 ${pl10} text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-esig  focus:ring-inset  sm:text-sm sm:leading-6 ${className}
          ${readOnly ? "bg-gray-100" : ""}`}
            ref={ref}
          >
            {options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.key}
                </option>
              );
            })}
          </select>
          <ErrorMessage error={errors[name ?? ""]} />
        </div>
      </div>
    );
  }
);

export default Select;
