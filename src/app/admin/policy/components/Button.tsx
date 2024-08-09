import Image from "next/image";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "" | "edit" | "danger";
  icon?: ReactNode;
  iconSrc?: string;
}

const Button: React.FC<IProps> = ({
  variant = "",
  className,
  children,
  icon = null,
  iconSrc = undefined,
  type = "button",
  ...props
}) => {
  return (
    <button
      className={`mx-1.5 px-4 py-1 text-sm rounded-md  transition-all duration-100 ${
        variant === "danger"
          ? "text-esig-error hover:bg-red-50 "
          : variant === "edit"
          ? "text-esig hover:bg-sky-50"
          : ""
      } ${className}`}
      {...props}
      type={type}
    >
      <div className="flex items-center gap-x-1.5 justify-center">
        {icon ? (
          icon
        ) : (
          <Image
            className="cursor-pointer"
            src={`${
              !!iconSrc
                ? iconSrc
                : variant === "edit"
                ? "/svg/edit.svg"
                : variant === "danger" ? "/svg/close.svg" : ''
            }`}
            alt=":("
            width={"0"}
            height={"0"}
            style={{ width: 17, height: 17 }}
            priority
          />
        )}
        <span>{children}</span>
      </div>
    </button>
  );
};

export default Button;
