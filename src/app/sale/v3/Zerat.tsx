import { Checkbox } from "@/components/ui/checkbox";
import Base from "../components/Fields_v2/Base";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const Zerat = () => {
    return (
        <>
         <div className="text-2xl pb-4">Zerat e polices &#40; zeri 1 &#41;</div>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col">
          <span className=" my-2">Objektet e siguruara</span>
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
                  className="border-esig border  text-esig bg-transparent h-7 hover:bg-sky-50 hover:text-esig transition-all duration-300"
                >
                  Modifiko
                </Button>
                <Button
                  variant={"outline"}
                  className="border-esig-error border  text-esig-error bg-transparent h-7 hover:bg-red-50 hover:text-esig-error transition-all duration-300"
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
                  className="border-esig border  text-esig bg-transparent h-7 hover:bg-sky-50 hover:text-esig transition-all duration-300"
                >
                  Modifiko
                </Button>
                <Button
                  variant={"outline"}
                  className="border-esig-error border  text-esig-error bg-transparent h-7 hover:bg-red-50 hover:text-esig-error transition-all duration-300"
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
                  className="border-esig border  text-esig bg-transparent h-7 hover:bg-sky-50 hover:text-esig transition-all duration-300"
                >
                  Modifiko
                </Button>
                <Button
                  variant={"outline"}
                  className="border-esig-error border  text-esig-error bg-transparent h-7 hover:bg-red-50 hover:text-esig-error transition-all duration-300"
                >
                  Fshij
                </Button>
              </div>
            </div>

            <div className="border-2 group   cursor-pointer hover:bg-sky-50 hover:text-esig transition-all duration-200 border-dashed border-esig rounded-xl p-4 flex shadow-md bg-transparent items-center justify-center">
              <div className="text-esig  font-thin">
                <svg
                  className="stroke-esig"
                  width="41"
                  height="41"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                >
                  <path d="M20 20v-20h1v20h20v1h-20v20h-1v-20h-20v-1h20z" />
                </svg>
              </div>
            </div>
          </div>
        </div>


        <div className="flex flex-col">
          <div className="mmy-2 flex items-center justify-between">
            <span className="">Mbulimet e objektit / eve</span>
            <Button className="w-min text-esig font-bold bg-white hover:bg-sky-50 hover:text-esig border border-esig border-dotted">
              Zgjidh nje pakete
            </Button>
          </div>
          <div className={'flex items-center'}>
            <Checkbox />
            <span className="font-bold ml-2.5">Shtrim ne spital</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex flex-col">
              <Base label="Primi" name="serial" />
              <span className="font-bold text-xs pt-1">Limitet</span>


              <div className="text-xs my-1">
                <span className="italic text-gray-500 ">Limiti per ngjarje</span>
                <div className="flex items-center pl-1">
                  <span>
                    <span className="font-bold">vlera e limitit</span> eshte <span className="text-esig pl-2">80% e SI</span><br />
                    me nje <span className="font-bold">vlere minimale</span> prej <span className="text-esig pr-2">10% te demit</span><br />
                    dhe nje <span className="font-bold">vlere maximale</span> te <span className="text-esig pl-2">pa limituar</span>
                  </span>
                  <Image
                    className="cursor-pointer border-b border-transparent hover:border-esig-error mx-auto"
                    src="/svg/close.svg"
                    alt="edit"
                    width={"0"}
                    height={"0"}
                    style={{ width: 25, height: 25 }}
                    priority
                  />
                </div>
              </div>

              <div className="text-xs my-1">
                <span className="italic text-gray-500 ">Limiti per ngjarje</span>
                <div className="flex items-center pl-1">
                  <span>
                    <span className="font-bold">vlera e limitit</span> eshte <span className="text-esig pl-2">80% e SI</span><br />
                    me nje <span className="font-bold">vlere minimale</span> prej <span className="text-esig pl-2">10% te demit</span><br />
                    dhe nje <span className="font-bold">vlere maximale</span> te <span className="text-esig pl-2">pa limituar</span>
                  </span>
                  <Image
                    className="cursor-pointer border-b border-transparent hover:border-esig-error mx-auto"
                    src="/svg/close.svg"
                    alt="edit"
                    width={"0"}
                    height={"0"}
                    style={{ width: 25, height: 25 }}
                    priority
                  />
                </div>
              </div>

              <Button className="w-min mt-2 mx-auto text-xs h-6 text-esig font-bold bg-white hover:bg-sky-50 hover:text-esig border border-esig border-dotted">
                Shto 1 limit tjeter
              </Button>

            </div>

            <div className="flex flex-col">
              <Base  label="Shuma e siguruar / limiti i mbulimit" name="serial" />
              <span className="font-bold text-xs my-1 mb-1.5">Nenlimitet</span>

              <div className="flex items-center gap-4">

                <Base className="h-9" label="Emri  limitit" name="serial" />
                <Base className="h-9" label="Vlera e limitit" name="serial" />
                <Image
                  className="cursor-pointer border-b border-transparent hover:border-esig-error mx-auto"
                  src="/svg/close.svg"
                  alt="edit"
                  width={"0"}
                  height={"0"}
                  style={{ width: 25, height: 25 }}
                  priority
                />


              </div>
              <div className="flex items-center gap-4 mt-3">

                <Base className="h-9" label="Emri  limitit" name="serial" />
                <Base className="h-9" label="Vlera e limitit" name="serial" />
                <Image
                  className="cursor-pointer border-b border-transparent hover:border-esig-error mx-auto"
                  src="/svg/close.svg"
                  alt="edit"
                  width={"0"}
                  height={"0"}
                  style={{ width: 25, height: 25 }}
                  priority
                />


              </div>
              <Button className="w-min mt-2 mx-auto text-xs h-6 text-esig font-bold bg-white hover:bg-sky-50 hover:text-esig border border-esig border-dotted">
                Shto 1 nenlimit tjeter
              </Button>

            </div>

          </div>


          <div className="mt-3 flex items-center">
            <Checkbox />
            <span className="font-bold ml-2.5">Shtrim ne spital</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex flex-col">
              <Base label="Primi" name="serial" />
              <span className="font-bold text-xs my-1 mt-2">Limitet</span>


              <div className="text-xs my-1">
                <span className="italic text-gray-500 ">Limiti per ngjarje</span>
                <div className="flex items-center pl-1">
                  <span>
                    <span className="font-bold">vlera e limitit</span> eshte <span className="text-esig pl-2">80% e SI</span><br />
                    me nje <span className="font-bold">vlere minimale</span> prej <span className="text-esig pl-2">10% te demit</span><br />
                    dhe nje <span className="font-bold">vlere maximale</span> te <span className="text-esig pl-2">pa limituar</span>
                  </span>
                  <Image
                    className="cursor-pointer border-b border-transparent hover:border-esig-error mx-auto"
                    src="/svg/close.svg"
                    alt="edit"
                    width={"0"}
                    height={"0"}
                    style={{ width: 25, height: 25 }}
                    priority
                  />
                </div>
              </div>

              <div className="text-xs my-1">
                <span className="italic text-gray-500 ">Limiti per ngjarje</span>
                <div className="flex items-center pl-1">
                  <span>
                    <span className="font-bold">vlera e limitit</span> eshte <span className="text-esig pl-2">80% e SI</span><br />
                    me nje <span className="font-bold">vlere minimale</span> prej <span className="text-esig pl-2">10% te demit</span><br />
                    dhe nje <span className="font-bold">vlere maximale</span> te <span className="text-esig pl-2">pa limituar</span>
                  </span>
                  <Image
                    className="cursor-pointer border-b border-transparent hover:border-esig-error mx-auto"
                    src="/svg/close.svg"
                    alt="edit"
                    width={"0"}
                    height={"0"}
                    style={{ width: 25, height: 25 }}
                    priority
                  />
                </div>
              </div>

              <Button className="w-min mt-2 mx-auto text-xs h-6 text-esig font-bold bg-white hover:bg-sky-50 hover:text-esig border border-esig border-dotted">
                Shto 1 limit tjeter
              </Button>

            </div>

            <div className="flex flex-col">
              <Base  label="Shuma e siguruar / limiti i mbulimit" name="serial" />
              <span className="font-bold text-xs my-1 mb-1">Nenlimitet</span>

              <div className="flex items-center gap-4">

                <Base className="h-9" label="Emri  limitit" name="serial" />
                <Base className="h-9" label="Vlera e limitit" name="serial" />
                <Image
                  className="cursor-pointer border-b border-transparent hover:border-esig-error "
                  src="/svg/close.svg"
                  alt="edit"
                  width={"0"}
                  height={"0"}
                  style={{ width: 25, height: 25 }}
                  priority
                />


              </div>
              <div className="flex items-center gap-4 mt-3">

                <Base className="h-9" label="Emri  limitit" name="serial" />
                <Base className="h-9" label="Vlera e limitit" name="serial" />
                <Image
                  className="cursor-pointer border-b border-transparent hover:border-esig-error"
                  src="/svg/close.svg"
                  alt="edit"
                  width={"0"}
                  height={"0"}
                  style={{ width: 25, height: 25 }}
                  priority
                />


              </div>
              <Button className="w-min mt-2 mx-auto text-xs h-6 text-esig font-bold bg-white hover:bg-sky-50 hover:text-esig border border-esig border-dotted">
                Shto 1 nenlimit tjeter
              </Button>

            </div>

          </div>


        </div>
      </div>

        </>
    )
}

export default Zerat;