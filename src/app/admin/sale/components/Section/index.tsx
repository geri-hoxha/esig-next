import { ReactNode } from "react";

interface Items {
  title: string;
  children: ReactNode;
}

interface IProps {
  title: string;
  items: Items[];
}

const Section = ({ title, items }: IProps) => {
  return (
    <div className="grid grid-cols-12 h-full gap-4">
      <div className="col-span-3 border-r-2 border-gray-600 text-right text-base text-gray-800 font-extrabold pr-2 pt-2">
        {title}
      </div>
      <div className="col-span-9 flex flex-col h-full pt-2">
        {items.map((item, index: number) => {
          return (
            <div key={index} className="flex flex-col mb-2">
              <span className="mb-2 text-gray-600">{item.title}</span>
              {item.children}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Section;
