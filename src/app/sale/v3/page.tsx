import { Checkbox } from "@/components/ui/checkbox";
import Base from "../components/Fields_v2/Base";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Sale() {
  return (
    <div className="mt-6">
      <div className="font-bold">Informacione te pergjithshme</div>
      <div className="mt-2">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <span className="mb-4 text-sm">Te pergjithshme</span>
            <div className="grid grid-cols-2  gap-6">
              <Base label="Seriali" name="serial" />
              <Base label="Monedha" name="serial" />
              <Base label="Lloji i pages" name="serial" />
              <Base label="Kanali i shperndarjes" name="serial" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="mb-4 text-sm">Datat</span>
            <div className="grid grid-cols-2 gap-6 ">
              <Base label="Data e fillimit" name="serial" />
              <Base label="Data e perfundimit" name="serial" />
              <Base label="Data e leshimit" name="serial" />
              <Base label="Data retroaktive" name="serial" />
            </div>
          </div>
        </div>
      </div>
      <div className="font-bold mt-5">Palet pjesemarrese</div>
      <div className="grid grid-cols-7 gap-6 mt-4">
        <div className="flex flex-col gap-4 col-span-3">
          <span className="text-sm">Perdoruesit e polices</span>
          <div className="flex items-center">
            <Base label="Lideri *" name="serial" />
            <div className="flex items-center gap-x-5">
              <Image
                className="cursor-pointer stroke-esig"
                src="/svg/edit.svg"
                alt="edit"
                width={"0"}
                height={"0"}
                style={{ width: 30, height: 30 }}
                priority
              />
            </div>
          </div>
          <Base label="Perdoruesi 2" name="serial" />
          <Base label="Perdoruesi 3" name="serial" />
          <div className="text-center text-esig">
            -- shto perdorues tjeter --
          </div>
        </div>

        <div className="flex flex-col col-span-4 ">
          <span className="text-sm mb-0">Palet pjesemarrese ne police</span>
          <div className="grid grid-cols-2 mt-4 gap-6 text-[12px]">
            <div className="flex flex-col  gap-2">
              <div>
                {" "}
                Policembajtesit do te jene{" "}
                <span className="text-esig"> &#40; modifiko &#41;</span>
              </div>
              <div className="flex items-center ">
                <Checkbox className="  w-3 h-3" />
                <span className="w-full pl-1">
                  Ndaj policembajtesit ne menyre te barabarte
                </span>
              </div>
              <ul className="list-disc ml-10">
                <li>Erin Hoxha, 100%</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <div>
                {" "}
                Perfituesit do te jene{" "}
                <span className="text-esig"> &#40; modifiko &#41;</span>
              </div>
              <div className="flex items-center ">
                <Checkbox className="  w-3 h-3" />
                <span className="w-full pl-1">
                  Ndaj policembajtesit ne menyre te barabarte
                </span>
              </div>
              <ul className="list-disc ml-10">
                <li>Erin Hoxha, 100%</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <div>
                {" "}
                Te faturuar do te jene{" "}
                <span className="text-esig"> &#40; modifiko &#41;</span>
              </div>
              <div className="flex items-center ">
                <Checkbox className="  w-3 h-3" />
                <span className="w-full pl-1">
                  Ndaj policembajtesit ne menyre te barabarte
                </span>
              </div>
              <ul className="list-disc ml-10">
                <li>Erin Hoxha, 100%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="font-bold mt-7">Zerat e polices &#40; zeri 1 &#41;</div>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col">
          <span className="text-sm my-4">Objektet e siguruara</span>
          <div className="grid grid-cols-2 gap-6">
            <div className="border border-esig rounded-xl p-4 flex flex-col shadow-md bg-white text-sm">
              <div className="font-bold mb-2">Erin Hoxha, J91223011S</div>
              <ul className="list-disc pl-7 text- flex flex-col gap-y-1.5">
                <li>
                  <div className="flex items-center ">
                    <div>Datelindja</div>
                    <div className="dot"></div>
                    <div>25.04.1998</div>
                  </div>
                </li>
                <li>
                  <div className="flex items-center ">
                    <div className="w-full">Nr.Tel</div>
                    <div className="dot"></div>
                    <div>+3556935032</div>
                  </div>
                </li>
                <li>
                  <div className="flex items-center ">
                    <div>Gjinia</div>
                    <div className="dot"></div>
                    <div>Mashkull</div>
                  </div>
                </li>
                <li>
                  <div className="flex items-center ">
                    <div>Atesia</div>
                    <div className="dot"></div>
                    <div>Veli</div>
                  </div>
                </li>
              </ul>
              <span className="mt-3 text-xs">
                Adresa: Rr. Medar shtylla, Tirane, 1060
              </span>
              <div className="flex items-center mt-3 gap-x-4">
                <Button
                  variant={"outline"}
                  className="border-esig border  text-esig bg-transparent h-7"
                >
                  Modifiko
                </Button>
                <Button
                  variant={"outline"}
                  className="border-esig-error border  text-esig-error bg-transparent h-7"
                >
                  Fshij
                </Button>
              </div>
            </div>

            <div className="border border-esig rounded-xl p-4 flex flex-col shadow-md bg-white text-sm">
              <div className="font-bold mb-2">Erin Hoxha, J91223011S</div>
              <ul className="list-disc pl-7 text- flex flex-col gap-y-1.5">
                <li>
                  <div className="flex items-center ">
                    <div>Datelindja</div>
                    <div className="dot"></div>
                    <div>25.04.1998</div>
                  </div>
                </li>
                <li>
                  <div className="flex items-center ">
                    <div className="w-full">Nr.Tel</div>
                    <div className="dot"></div>
                    <div>+3556935032</div>
                  </div>
                </li>
                <li>
                  <div className="flex items-center ">
                    <div>Gjinia</div>
                    <div className="dot"></div>
                    <div>Mashkull</div>
                  </div>
                </li>
                <li>
                  <div className="flex items-center ">
                    <div>Atesia</div>
                    <div className="dot"></div>
                    <div>Veli</div>
                  </div>
                </li>
              </ul>
              <span className="mt-3 text-xs">
                Adresa: Rr. Medar shtylla, Tirane, 1060
              </span>
              <div className="flex items-center mt-3 gap-x-4">
                <Button
                  variant={"outline"}
                  className="border-esig border  text-esig bg-transparent h-7"
                >
                  Modifiko
                </Button>
                <Button
                  variant={"outline"}
                  className="border-esig-error border  text-esig-error bg-transparent h-7"
                >
                  Fshij
                </Button>
              </div>
            </div>

            <div className="border border-esig rounded-xl p-4 flex flex-col shadow-md bg-white text-sm">
              <div className="font-bold mb-2">Erin Hoxha, J91223011S</div>
              <ul className="list-disc pl-7 text- flex flex-col gap-y-1.5">
                <li>
                  <div className="flex items-center ">
                    <div>Datelindja</div>
                    <div className="dot"></div>
                    <div>25.04.1998</div>
                  </div>
                </li>
                <li>
                  <div className="flex items-center ">
                    <div className="w-full">Nr.Tel</div>
                    <div className="dot"></div>
                    <div>+3556935032</div>
                  </div>
                </li>
                <li>
                  <div className="flex items-center ">
                    <div>Gjinia</div>
                    <div className="dot"></div>
                    <div>Mashkull</div>
                  </div>
                </li>
                <li>
                  <div className="flex items-center ">
                    <div>Atesia</div>
                    <div className="dot"></div>
                    <div>Veli</div>
                  </div>
                </li>
              </ul>
              <span className="mt-3 text-xs">
                Adresa: Rr. Medar shtylla, Tirane, 1060
              </span>
              <div className="flex items-center mt-3 gap-x-4">
                <Button
                  variant={"outline"}
                  className="border-esig border  text-esig bg-transparent h-7"
                >
                  Modifiko
                </Button>
                <Button
                  variant={"outline"}
                  className="border-esig-error border  text-esig-error bg-transparent h-7"
                >
                  Fshij
                </Button>
              </div>
            </div>

            <div className="border-2 group hover:border-solid cursor-pointer hover:bg-white transition-all duration-200 border-dashed border-esig rounded-xl p-4 flex shadow-md bg-transparent items-center justify-center">
              <div className="text-esig  font-thin">
                <svg
                  className="stroke-esig"
                  width="41"
                  height="41"
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                >
                  <path d="M20 20v-20h1v20h20v1h-20v20h-1v-20h-20v-1h20z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
