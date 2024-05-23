"use client";

import { LegacyRef, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
      defaultValue,
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
      if (!!defaultChecked) return { defaultChecked };
      return { checked };
    };

    return (
      <div className="relative flex items-center ">
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          {...getAtributtes()}
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
