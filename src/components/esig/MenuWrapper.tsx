"use client";
import Link from "next/link";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { IProps, baseMenuClassName } from "./MenuItem";

interface IMenuWrapper {
  toggle: boolean;
  children: ReactNode;
  href?: string;
  items: IProps[];
  setToggle: Dispatch<SetStateAction<boolean>>;
}

const MenuWrapper: React.FC<IMenuWrapper> = ({
  href,
  items,
  children,
  setToggle,
  toggle,
}) => {
  const pathname = usePathname();

  useEffect(() => {
    if (items.length === 0) return;

    const hrefs = items.map((item) => item.href);

    setToggle(hrefs?.includes(pathname) ?? false);
  }, []);

  const onMenuClick = () => {
    setToggle((prev) => !prev);
  };

  if (!!href)
    return (
      <Link className="select-none" href={href}>
        {children}
      </Link>
    );

  return (
    <div className="flex flex-col select-none" onClick={onMenuClick}>
      {children}
      <div
        className={`flex flex-col  w-full   transition-all ${
          toggle ? "h-full opacity-1 visible" : "h-0 opacity-0 invisible"
        }`}
      >
        {items.map((item, index) => {
          const isSelected = pathname === item.href;

          return (
            <Link
              key={index}
              className="flex items-center w-full justify-between pt-2 cursor-pointer"
              href={item.href ?? "/"}
              onClick={() => setToggle(false)}
            >
              <div
                className={`${
                  isSelected ? "bg-gray-100 " : ""
                } ${baseMenuClassName} w-full pl-11`}
              >
                {item.text} {item.children}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MenuWrapper;
