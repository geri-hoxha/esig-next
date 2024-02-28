"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Slash } from "lucide-react";
import { IRoute } from "./Routes";

interface IProps {
  route: IRoute;
}

const MenuLink: React.FC<IProps> = ({ route }) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const pathname = usePathname();

  const isSelected: boolean = pathname === route.href;

  const { href = "", items = [] } = route;

  useEffect(() => {
    if (items.length === 0) return;

    const hrefs = items.map((item) => item.href);

    setToggle(hrefs?.includes(pathname) ?? false);
  }, []);

  const onMenuClick = () => {
    setToggle(!toggle);
  };

  if (!!route.notifications && items?.length !== 0) {
    throw new Error(
      "You can not pass notification and menu children on the same route. Notification must be only at single level!"
    );
  }

  // even his children should not be rendered
  if (route.hidden) {
    return <></>;
  }

  // no children
  if (items?.length === 0) {
    return (
      <Link href={href}>
        <div
          className={`${
            isSelected ? "bg-gray-100 border-esig" : "border-transparent"
          } border-r-2 mb-2  flex items-center justify-between p-2 text-sm font-medium text-gray-900  hover:bg-gray-100 select-none`}
        >
          <div className="w-full flex items-center">
            {route.icon?.(isSelected)}
            <span className="ml-3">{route.text}</span>
          </div>
          {route.notifications}
        </div>
      </Link>
    );
  }

  // menu dropdown
  return (
    <div className="flex flex-col select-none cursor-pointer">
      <div
        className={`flex items-center justify-between mb-2 p-2 text-sm font-medium text-gray-900 rounded-sm  select-none`}
        onClick={onMenuClick}
      >
        <div className="w-full flex items-center">
          {route.icon?.(isSelected)}
          <span className="ml-3">{route.text}</span>
        </div>
        <div className="flex items-center">
          <div
            className={`transition-all duration-300 ${
              toggle ? "rotate-0" : "rotate-90"
            }`}
          >
            <Slash size={6} strokeWidth={6} />
          </div>
          <div
            className={`transition-all -ml-px duration-300 ${
              toggle ? "rotate-90" : "rotate-0"
            }`}
          >
            <Slash size={6} strokeWidth={6} />
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col w-full transition-all duration-300 ease-linear	overflow-hidden ${
          toggle ? "max-h-52 visible" : "max-h-0    invisible"
        }`}
      >
        {items.map((item, index) => {
          const isChildrenSelected = pathname === item.href;

          // todo: add recursive functionality
          const { href = "", items = [] } = item;

          return (
            <Link
              key={index}
              className="flex items-center w-full justify-between pt-2 cursor-pointer "
              href={href}
            >
              <div
                className={`${
                  isChildrenSelected
                    ? "bg-esig-surface-20 border-esig"
                    : "border-transparent"
                } border-r-2 px-7 flex items-center justify-between p-2 text-sm font-medium text-gray-900 rounded-none  hover:bg-esig-surface-20 group w-full`}
              >
                <span>{item.text}</span>
                <div>{item.notifications}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MenuLink;
