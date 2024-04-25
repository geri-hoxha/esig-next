import React, { ReactNode } from "react";

interface IProps {
  label: ReactNode;
  defaultChecked?: boolean;
  name?: string;
  onChange?: any;
}

function generateRandomString(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const Checkbox: React.FC<IProps> = React.forwardRef(
  (
    {
      label,
      onChange,
      defaultChecked = false,
      name = generateRandomString(10),
      ...register
    }: IProps,
    ref
  ) => {
    return (
      <fieldset>
        <legend className="sr-only"></legend>
        <div className="relative flex items-center">
          <div className="flex h-6 items-center">
            <input
              ref={ref}
              id={name}
              aria-describedby="comments-description"
              name={name}
              type="checkbox"
              {...register}

              defaultChecked={defaultChecked}
              onClick={onChange}
              className="h-4 w-4 rounded border-gray-300 text-esig focus:ring-esig"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor={name} className="font-medium text-gray-900">
              {label}
            </label>
          </div>
        </div>
      </fieldset>
    );
  }
);

export default Checkbox;
