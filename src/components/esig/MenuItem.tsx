"use client";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import MenuWrapper from "./MenuWrapper";

export interface IProps {
  text: string;
  href?: string;
  icon?: (isSelected: boolean) => ReactNode;
  items?: IProps[];
  children?: ReactNode;
}

export const baseMenuClassName =
  "flex items-center justify-between p-2 text-sm font-medium text-gray-900 rounded-lg  hover:bg-gray-100  group";

const MenuLink: React.FC<IProps> = ({
  text,
  href,
  icon,
  items = [],
  children,
}) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const pathname = usePathname();

  const isSelected: boolean = pathname === href;

  return (
    <MenuWrapper
      href={href}
      items={items}
      toggle={toggle}
      setToggle={setToggle}
    >
      <div className={`${baseMenuClassName} cursor-pointer`}>
        <div className="w-full flex items-center">
          {icon?.(toggle || isSelected)}
          <span className="ml-3">{text}</span>
        </div>
        <div
          className={`transition-all duration-500 ${
            toggle ? "rotate-180" : "rotate-0"
          }`}
        >
          {children}
        </div>
      </div>
    </MenuWrapper>
  );
};

export default MenuLink;
