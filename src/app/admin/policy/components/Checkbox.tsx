import { ChangeEventHandler, HTMLInputTypeAttribute, LegacyRef, ReactNode, forwardRef } from "react";

interface IProps {
  id: string;
  name: string;
  children: ReactNode;
  defaultChecked: boolean;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  type: HTMLInputTypeAttribute;
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
      type = 'checkbox',
      ...register
    }: Partial<IProps>,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    return (
      <div className="flex items-center cursor-pointer">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          defaultChecked={defaultChecked}
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 border-gray-300 text-esig focus:ring-esig"
          ref={ref}
          {...register}
        />
        {children && (
          <label
            htmlFor={id}
            className="ml-3 block text-sm font-medium leading-6 text-gray-900"
          >
            {children}
          </label>
        )}
      </div>
    );
  }
);

export default Checkbox;
