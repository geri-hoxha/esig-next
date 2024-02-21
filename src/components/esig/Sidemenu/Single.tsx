import Link from "next/link";
import { ReactNode, useState } from "react";
import { IRoute } from "./Sidemenu2";

interface IProps {
  href?: string;
  icon: IRoute["icon"];
  children: ReactNode;
}

const Single = ({ href = "/", children, icon }: IProps) => {

  return (
    <Link className="select-none" href={href}>
      <div className={`flex items-center justify-between p-2 text-sm font-medium text-gray-900 rounded-lg  hover:bg-gray-100  group cursor-pointer`}>
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
    </Link>
  );
};

export default Single;
