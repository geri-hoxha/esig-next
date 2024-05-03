import React, { HTMLInputTypeAttribute, LegacyRef, ReactNode } from "react";

export interface IInput {
  name: string;
  label: string;
  placeholder: string;
  icon: ReactNode;
  className: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  suffix: ReactNode;
  readOnly: boolean;
  type: HTMLInputTypeAttribute;
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
      value,
      readOnly = false,
      suffix,
      type = "text",
      ...register
    }: Partial<IInput> = props;

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
          <input
            type={type}
            name={name}
            id={name}
            value={value}
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
            <div className="absolute text-gray-500 h-[calc(100%-4px)] mr-0.5 flex items-center justify-center px-2 border-l-2 rounded-r-md  top-0.5 right-0 font-medium text-sm">
              {suffix}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default Input;
