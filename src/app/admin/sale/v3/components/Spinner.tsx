import Image from "next/image";
import { ReactNode } from "react";

const Spinner: React.FC<{ children: ReactNode; loading: boolean }> = ({
  children,
  loading,
}) => {
  return (
    <div className="w-auto h-full relative">
      {children}

      <div
        className={` w-full absolute top-0 left-0 h-full bg-gray-200 opacity-15 ${
          loading
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      ></div>

      <div
        className={`absolute top-1/2 left-1/2 z-40 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
          loading
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
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
  );
};

export default Spinner;
