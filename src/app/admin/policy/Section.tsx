import { ReactNode } from "react";

export type ISectionItemProps = {
  title: string | ReactNode;
  children: ReactNode;
  cols?: string;
  className?: string;
};

interface ISectionProps {
  title: string | ReactNode;
  items: ISectionItemProps[];
}

const Section: React.FC<Partial<ISectionProps>> = ({ title, items = [] }) => {
  return (
    <div className="flex flex-col gap-4">
      {typeof title === "string" ? (
        <h2 className="text-xl">{title}</h2>
      ) : (
        title
      )}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8`}>
        {items.map((item, index) => {
          return (
            <div key={index} className="flex flex-col gap-4">
              {typeof item.title === "string" ? (
                <h3 className="text-lg md:text-xl">{item.title}</h3>
              ) : (
                item.title
              )}
              <div
                className={`grid grid-cols-1  md:grid-cols-${
                  item?.cols ?? "2"
                } gap-6 ${item.className ?? ""}`}
              >
                {item.children}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Section;
