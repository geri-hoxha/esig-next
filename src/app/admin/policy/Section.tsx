import { ReactNode } from "react";

interface IProps {
  title: string | ReactNode;
  items: {
    title: string | ReactNode;
    children: ReactNode;
    cols?: string;
    className?: string;
  }[];
}

const Section: React.FC<Partial<IProps>> = ({ title, items = [] }) => {
  return (
    <div className="flex flex-col gap-4">
      {typeof title === "string" ? (
        <h2 className="text-xl md:text-2xl">{title}</h2>
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
