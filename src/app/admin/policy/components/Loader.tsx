import Image from "next/image";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  loading: boolean;
}

const showElement = "opacity-100 visible pointer-events-auto";
const hideElement = "opacity-0 invisible pointer-events-none";

const Loader: React.FC<IProps> = ({ children, loading }) => {
  return (
    <div className="w-auto h-full relative">
      {children}

      <div
        className={` w-full absolute top-0 left-0 h-full bg-gray-50 opacity-40 ${
          loading ? showElement : hideElement
        }`}
      ></div>

      <div
        className={`absolute top-1/2 left-1/2 z-40 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
          loading ? showElement : hideElement
        }`}
      >
        <div className="flex item-center">
          <Image
            src="/loader.svg"
            alt="edit"
            width={"0"}
            height={"0"}
            style={{ width: 40, height: 40 }}
            priority
            className="animate-spin"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
