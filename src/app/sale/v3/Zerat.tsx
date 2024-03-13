"use client";

import Base from "../components/Fields_v2/Base";
import Image from "next/image";
import Checkbox from "./Checkbox";
import { ButtonGeri } from "./page";

const Zerat = () => {
  return (
    <>
      <div className="flex flex-col gap-2 pl-1">
        <Checkbox
          label={
            <span className="text-lg font-bold text-gray-800">
              Shtrim ne spital
            </span>
          }
        />
        <div className="grid grid-cols-2 gap-8">
          <Base label="Primi" name="serial" className="h-8" />
          <Base
            label="Shuma e siguruar / limit i mbulimit"
            name="serial"
            className="h-8"
          />
        </div>
        <div className="grid grid-cols-2 gap-8 ">
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center">
              <span className="font-bold">Limitet</span>
              <ButtonGeri className="text-esig hover:bg-sky-50">
                <div className="flex items-center gap-x-1">
                  <Image
                    className="cursor-pointer"
                    src="/svg/edit.svg"
                    alt="edit"
                    width={"0"}
                    height={"0"}
                    style={{ width: 15, height: 15 }}
                    priority
                  />
                  <span className="text-xs">Modiko limitet</span>
                </div>
              </ButtonGeri>
            </div>

            <div className="flex flex-col text-xs gap-2">
              <div className="grid grid-cols-10 ">
                <div className="col-span-3 italic">Limiti</div>
                <div className="col-span-2 italic">Vlera</div>
                <div className="col-span-2 italic">Min</div>
                <div className="col-span-2 italic">Max</div>
              </div>

              <div className="grid grid-cols-10 ">
                <div className="col-span-3">Limiti ngjarje</div>
                <span className="font-bold text-esig col-span-2">80% SI</span>
                <span className="font-bold text-esig col-span-2">10% dem</span>
                <span className="font-bold text-esig col-span-2">-</span>
              </div>

              <div className="grid grid-cols-10 ">
                <div className="col-span-3">Franzhiza</div>
                <span className="font-bold text-esig col-span-2">80% SI</span>
                <span className="font-bold text-esig col-span-2">10% dem</span>
                <span className="font-bold text-esig col-span-2">-</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col text-sm gap-2">
            <div className="flex items-center">
              <span className="font-bold">Nenlimitet</span>
              <ButtonGeri className="text-esig hover:bg-sky-50">
                <div className="flex items-center gap-x-1">
                  <Image
                    className="cursor-pointer"
                    src="/svg/edit.svg"
                    alt="edit"
                    width={"0"}
                    height={"0"}
                    style={{ width: 15, height: 15 }}
                    priority
                  />
                  <span className="text-xs">Modiko nenlimitet</span>
                </div>
              </ButtonGeri>
            </div>
            <div className="flex flex-col text-xs gap-2">
              <div className="grid grid-cols-2 ">
                <div className="italic">Emri i limitit</div>
                <div className="italic">Vlera e limitit</div>
              </div>
              <div className="grid grid-cols-2 ">
                <div>Mbulimi 1</div>
                <div>12,000 Euro</div>
              </div>
              <div className="grid grid-cols-2 ">
                <div>Mbulimi 1</div>
                <div>12,000 Euro</div>
              </div>
              <div className="grid grid-cols-2 ">
                <div>Mbulimi 1</div>
                <div>12,000 Euro</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Zerat;
