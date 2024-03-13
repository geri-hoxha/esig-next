"use client";
import Image from "next/image";
import { ButtonGeri } from "./page";

const Cards = () => {
  return (
    <div className="cursor-pointer group hover:shadow-md rounded-xl h-max   transition-all duration-200 relative">
      <div className="hover:!bg-sky-50  hover:text-esig text-sm z-10 rounded-xl">
        <div className="p-4">
          <div className="font-semibold text-gray-700 group-hover:text-esig py-2">
            Erin Hoxha, J912345678D
          </div>
          <ul className="flex flex-col gap-y-2">
            <li>
              <div className="flex items-center ">
                <div>Datelindja</div>
                <div className="border-b-2 border-dotted w-full"></div>
                <div>25.04.1998</div>
              </div>
            </li>
            <li>
              <div className="flex items-center ">
                <div>Nr.Tel</div>
                <div className="border-b-2 border-dotted w-full"></div>
                <div>+3556935032</div>
              </div>
            </li>
            <li>
              <div className="flex items-center ">
                <div>Gjinia</div>
                <div className="border-b-2 border-dotted w-full"></div>

                <div>Mashkull</div>
              </div>
            </li>
            <li>
              <div className="flex items-center ">
                <div>Atesia</div>
                <div className="border-b-2 border-dotted w-full"></div>
                <div>Veli</div>
              </div>
            </li>
          </ul>
          <div className="mt-2">Adresa: Rr. Medar shtylla, Tirane, 1060</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-1/2 text-center">
            <ButtonGeri className="text-esig bg-transparent !w-full  !h-12">
              <div className="flex items-center gap-x-1 mx-auto">
                <Image
                  className="cursor-pointer"
                  src="/svg/edit.svg"
                  alt="edit"
                  width={"0"}
                  height={"0"}
                  style={{ width: 20, height: 20 }}
                  priority
                />
                <span>Ndrysho</span>
              </div>
            </ButtonGeri>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-1/2 z-20">
        <ButtonGeri className="text-esig-error bg-white   hover:bg-red-50 !w-full !h-12 rounded-lg transition-all duration-200">
          <div className="flex items-center gap-x-1 w-min mx-auto h-auto">
            <Image
              className="cursor-pointer"
              src="/svg/close.svg"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 20, height: 20 }}
              priority
            />
            <span>Fshij</span>
          </div>
        </ButtonGeri>
      </div>
    </div>
  );
};

export default Cards;
