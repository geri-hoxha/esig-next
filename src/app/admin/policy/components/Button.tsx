import Image from "next/image";
import { ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "danger";
}

const Button: React.FC<IProps> = ({
  variant = "default",
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={`px-1.5 py-1 text-sm rounded-md bg-transparent border-none transition-all duration-100 ${
        variant === "default"
          ? "text-esig hover:bg-sky-50"
          : "text-esig-error hover:bg-red-50"
      } ${className}`}
      {...props}
    >
      <div className="flex items-center gap-x-1">
        {variant === "default" ? (
          <Image
            className="cursor-pointer"
            src="/svg/edit.svg"
            alt="edit"
            width={"0"}
            height={"0"}
            style={{ width: 20, height: 20 }}
            priority
          />
        ) : (
          <Image
            src="/svg/close.svg"
            alt="edit"
            width={"0"}
            height={"0"}
            style={{ width: 20, height: 20 }}
            priority
          />
        )}
        <span>{children}</span>
      </div>
    </button>
  );
};

export default Button;
