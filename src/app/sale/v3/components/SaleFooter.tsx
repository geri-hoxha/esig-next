import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Close } from "@radix-ui/react-popover";
const SaleFooter = () => {
  return (
    <div
      className="fixed bottom-0 bg-white shadow-inner

      border-t border-gray-200 left-64 w-full flex items-center justify-between px-6 py-4"
      style={{ width: "-webkit-fill-available" }}
    >
      <div className="flex items-center gap-4">
        <span className="text-2xl text-esig font-bold rounded-lg bg-sky-100 py-1 px-4">
          200,000 EUR
        </span>

        <button className="w-max px-2 py-1 text-sm rounded-md  bg-transparent border-none text-esig-products-health font-bold hover:bg-green-100 transition-all duration-100">
          <div className="flex items-center gap-x-2">
            <Image
              className="cursor-pointer"
              src="/svg/give_money.svg"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 25, height: 25 }}
              priority
            />
            <span className="leading-none">Axhusto primin</span>
          </div>
        </button>

        <Popover>
          <PopoverContent>
            <div className="relative px-4 ">
              <ul className="list-disc ">
                <li className="text-sm">
                  Primi i llogaritur:{" "}
                  <span className="font-bold text-base">25,000 EUR</span>
                </li>
                <li className="text-sm">
                  Axhustim primi:{" "}
                  <span className="font-bold text-base">0 EUR</span>
                </li>
                <li className="text-sm">
                  Kontribut AMF:{" "}
                  <span className="font-bold text-base">530 EUR</span>
                </li>
                <li className="text-sm">
                  Komisioni juaj (agjentit):
                  <span className="font-bold text-base"> 1,200 EUR</span>
                </li>
                <li className="text-sm">
                  Totali për klientin:{" "}
                  <span className="font-bold text-base">25,000 EUR</span>
                </li>
              </ul>
            </div>

            <Close className="absolute top-4 right-4" aria-label="Close">
              <Image
                src="/svg/close.svg"
                alt="edit"
                width={"0"}
                height={"0"}
                style={{ width: 20, height: 20 }}
                priority
              />
            </Close>
          </PopoverContent>
          <PopoverTrigger asChild>
            <button className="w-max px-2 py-2 text-sm rounded-md  bg-transparent border-none text-esig font-bold hover:bg-sky-100 transition-all duration-100">
              <div className="flex items-center gap-x-2">
                <Image
                  src="/svg/info.svg"
                  alt="edit"
                  width={"0"}
                  height={"0"}
                  style={{ width: 17, height: 17 }}
                  priority
                />
                <span className="leading-none">
                  Detajet per strukturen e primit
                </span>
              </div>
            </button>
          </PopoverTrigger>
        </Popover>
      </div>

      <div className="flex items-center gap-4">
        {" "}
        <button className="w-max px-2 py-2 text-sm rounded-md  bg-transparent border-none text-esig-error font-bold hover:bg-red-100 transition-all duration-100">
          <div className="flex items-center gap-x-2">
            <Image
              src="/svg/restart.svg"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 20, height: 20 }}
              priority
            />
            <span className="leading">Rifillo shitjen</span>
          </div>
        </button>
        <button className="w-max px-2 py-2 text-sm rounded-md  bg-transparent border-none text-esig font-bold hover:bg-sky-100 transition-all duration-100">
          <div className="flex items-center gap-x-2">
            <Image
              src="/svg/check.svg"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 20, height: 20 }}
              priority
            />
            <span className="leading-none">Finalizo shitjen</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SaleFooter;
