"use client";
import Image from "next/image";
import { ButtonGeri } from "./page";

const Cards = () => {
  return (
    <div className="cursor-pointer hover:shadow-md ">
      <div className="relative overflow-hidden bg-cover bg-no-repeat border border-gray-200">
        <div className=" transition-all duration-300 text-sm hover:scale-[1.02]">
          <div className="p-4">
            <div className="font-semibold text-gray-700 pb-2">
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
            <span>Adresa: Rr. Medar shtylla, Tirane, 1060</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-1/2 text-center">
              <ButtonGeri className="text-esig bg-transparent !w-full hover:!bg-sky-50 !h-12">
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
        <div className="absolute -bottom-[3px] right-0 w-1/2">
          <ButtonGeri className="text-esig-error bg-white !rounded-none hover:bg-red-50 !w-full !h-12 !rounded-tl-lg">
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
    </div>
  );
};

export default Cards;
