import { IOptions } from "@/components/esig/Fields/type";
import React, { HTMLInputTypeAttribute, ReactNode } from "react";

export interface IField {
  name?: string;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  icon?: ReactNode;
  options?: IOptions[];
  className?: string;
  onChange?: any;
  value?: any;
  suffix?: any;
  readOnly?: boolean;
  selectDefaultValue?: string;
}

const Base = React.forwardRef(
  (
    {
      name,
      label,
      placeholder,
      icon = undefined,
      className = "",
      type = "text",
      options = [],
      onChange = () => {},
      value,
      readOnly = false,
      selectDefaultValue = "Leke",
      suffix,
      ...register
    }: IField,
    ref
  ) => {
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
          {type == "select" ? (
            <select
              id={name}
              name={name}
              onChange={onChange}
              className={`block w-full rounded-md border-0 py-1.5 ${pl10} text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-esig  focus:ring-inset  sm:text-sm sm:leading-6 ${className}`}
              defaultValue={selectDefaultValue}
            >
              {options.length === 0 ? (
                <>
                  <option>Leke</option>
                  <option>Euro</option>
                  <option>Dollar Amerikan</option>
                </>
              ) : (
                options.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.key}
                    </option>
                  );
                })
              )}
            </select>
          ) : (
            <>
              <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className={`block  w-full rounded-md border-0 py-1.5 ${pl10} text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-esig sm:text-sm sm:leading-6 ${className} ${
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
            </>
          )}
        </div>
      </div>
    );
  }
);

export default Base;
