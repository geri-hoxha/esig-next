import Image from "next/image";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  loading: boolean;
  withOverlay?: boolean;
}

const showElement = "opacity-100 visible pointer-events-auto";
const hideElement = "opacity-0 invisible pointer-events-none";

// we are using big z-index because leaflet map have z-index: 1000
const Loader: React.FC<IProps> = ({
  children,
  loading,
  withOverlay = true,
}) => {
  return (
    <div className="flex flex-col w-auto h-full relative">
      {children}

      {withOverlay && (
        <div
          className={` w-full absolute top-0 left-0 z-[1200] h-full bg-gray-50 opacity-40   ${
            loading ? showElement : hideElement
          }`}
        ></div>
      )}

      <div
        className={`absolute top-1/2 left-1/2 z-[1100] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
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

const PageLoader: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="h-4/5">
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex justify-center items-center space-x-1 font-bold text-esig">
          <svg
            fill="none"
            className="w-10 h-10 animate-spin"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>

          <div>{text}</div>
        </div>
      </div>
    </div>
  );
};

export { PageLoader };
export default Loader;
