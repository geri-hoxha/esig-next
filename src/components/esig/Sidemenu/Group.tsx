import { ReactNode } from "react";

interface IProps {
    children: ReactNode;
}

const Group = ({children}: IProps) => {
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
    )
}