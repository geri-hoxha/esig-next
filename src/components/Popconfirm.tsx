import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

interface IProps {
  title: React.ReactNode;
  disabled?: boolean;
  description: string;
  onConfirm?: (e?: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (e?: React.MouseEvent<HTMLElement>) => void;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  showCancel?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const Popconfirm: React.FC<IProps> = ({
  children,
  title,
  description,
  okText,
  cancelText,
  onConfirm,
}) => {
  const [geri, setGeri] = useState(false);

  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setGeri(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={popupRef} >
      {geri && (
        <>
        <div className="border p-3 z-50 bg-white border-gray-200 shadow-md rounded-lg min-w-80 min-h-20 absolute left-1/2 bottom-10 transform -translate-x-1/2 flex flex-col">
          <div className="flex items-center gap-2">
            <Image
              src="/svg/info.svg"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 17, height: 17 }}
              priority
            />
            <span>{title}</span>
          </div>
          <span className="pl-7 text-sm text-gray-500">{description}</span>

          <div className="flex items-center gap-2 ml-auto mt-3">
            <button
              className="py-1 text-xs border border-gray-400 rounded-md px-2"
              onClick={() => setGeri(false)}
            >
              {cancelText}
            </button>
            <button
              className="py-1 text-xs text-white rounded-md px-2 bg-esig"
              onClick={() => {
                setGeri(false);
                onConfirm?.();
              }}
            >
              {okText}
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -transalte-x-1/2 bg-white ge">

        </div>
        </>
      )}

      <div onClick={() => setGeri(!geri)}> {children}</div>
    </div>
  );
};

export default Popconfirm;
