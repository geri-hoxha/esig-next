import { Checkbox } from "@/components/ui/checkbox";
import Base from "../components/Fields_v2/Base";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function Sale() {
  return (
    <div className="mt-6">
      <div className="font-bold">Informacione te pergjithshme</div>
      <div className="mt-2">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <span className="mb-4 ">Te pergjithshme</span>
            <div className="grid grid-cols-2  gap-6">
              <Base label="Seriali" name="serial" />
              <Base label="Monedha" name="serial" />
              <Base label="Lloji i pages" name="serial" />
              <Base label="Kanali i shperndarjes" name="serial" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="mb-4 ">Datat</span>
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
      <div className="grid grid-cols-7 gap-6 mt-4 ">

        <div className="flex items-center gap-4 col-span-3 pr-7 ">

          <div className="flex flex-col gap-4 w-full">
            <span className="">Perdoruesit e polices</span>
            <div className="flex items-center ">
              <Base label="Lideri *" name="serial" />
              <div className="flex items-center gap-x-1 pl-8">
                <Image
                  className="cursor-pointer border-b border-transparent hover:border-esig"
                  src="/svg/edit.svg"
                  alt="edit"
                  width={"0"}
                  height={"0"}
                  style={{ width: 27, height: 27 }}
                  priority
                />

              </div>
            </div>


            <div className="flex items-center">
              <Base label="Perdoruesi 2" name="serial" />
              <div className="flex items-center gap-x-1 pl-10">
                <Image
                  className="cursor-pointer border-b border-transparent hover:border-esig"
                  src="/svg/edit.svg"
                  alt="edit"
                  width={"0"}
                  height={"0"}
                  style={{ width: 25, height: 25 }}
                  priority
                />
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
            </div>


            <div className="flex items-center">
              <Base label="Perdoruesi 3" name="serial" />
              <div className="flex items-center gap-x-1 pl-10">
                <Image
                  className="cursor-pointer border-b border-transparent hover:border-esig"
                  src="/svg/edit.svg"
                  alt="edit"
                  width={"0"}
                  height={"0"}
                  style={{ width: 25, height: 25 }}
                  priority
                />
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
            </div>

            <Button variant={'outline'} className="text-center border-dotted border-esig w-min mx-auto h-8 text-esig hover:bg-sky-50 hover:text-esig transition-all duration-300">
              -- shto perdorues tjeter --
            </Button>

          </div>
          {/* <Separator orientation="vertical" className="w-px" /> */}

        </div>

        <div className="flex flex-col col-span-4 ">
          <span className=" mb-0">Palet pjesemarrese ne police</span>
          <div className="grid grid-cols-2 mt-4 gap-6 text-[12px]">
            <div className="flex flex-col  gap-2">
              <div className="flex items-center gap-x-2">
                {" "}
                Policembajtesit do te jene{" "}
                <Button className="bg-transparent border w-max h-6 text-xs border-esig border-dotted  text-esig hover:bg-sky-50 hover:text-esig transition-all duration-300">
                  Modifiko
                </Button>
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
              <div className="flex items-center gap-x-2">
                {" "}
                Perfituesit do te jene{" "}
                <Button className="bg-transparent border w-max h-6 text-xs border-esig border-dotted  text-esig hover:bg-sky-50 hover:text-esig transition-all duration-300">
                  Modifiko
                </Button>
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
              <div className="flex items-center gap-x-2">
                {" "}
                Te faturuar do te jene{" "}
                <Button className="bg-transparent border w-max h-6 text-xs border-esig border-dotted  text-esig hover:bg-sky-50 hover:text-esig transition-all duration-300">
                  Modifiko
                </Button>
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
                    <span className="font-bold">vlera e limitit</span> eshte <span className="text-esig pr-1">80% e SI</span><br />
                    me nje <span className="font-bold">vlere minimale</span> prej <span className="text-esig pr-1">10% te demit</span><br />
                    dhe nje <span className="font-bold">vlere maximale</span> te <span className="text-esig">pa limituar</span>
                  </span>
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
              </div>

              <div className="text-xs my-1">
                <span className="italic text-gray-500 ">Limiti per ngjarje</span>
                <div className="flex items-center pl-1">
                  <span>
                    <span className="font-bold">vlera e limitit</span> eshte <span className="text-esig pr-1">80% e SI</span><br />
                    me nje <span className="font-bold">vlere minimale</span> prej <span className="text-esig pr-1">10% te demit</span><br />
                    dhe nje <span className="font-bold">vlere maximale</span> te <span className="text-esig">pa limituar</span>
                  </span>
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
                  className="cursor-pointer border-b border-transparent hover:border-esig-error"
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
                    <span className="font-bold">vlera e limitit</span> eshte <span className="text-esig pr-1">80% e SI</span><br />
                    me nje <span className="font-bold">vlere minimale</span> prej <span className="text-esig pr-1">10% te demit</span><br />
                    dhe nje <span className="font-bold">vlere maximale</span> te <span className="text-esig">pa limituar</span>
                  </span>
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
              </div>

              <div className="text-xs my-1">
                <span className="italic text-gray-500 ">Limiti per ngjarje</span>
                <div className="flex items-center pl-1">
                  <span>
                    <span className="font-bold">vlera e limitit</span> eshte <span className="text-esig pr-1">80% e SI</span><br />
                    me nje <span className="font-bold">vlere minimale</span> prej <span className="text-esig pr-1">10% te demit</span><br />
                    dhe nje <span className="font-bold">vlere maximale</span> te <span className="text-esig">pa limituar</span>
                  </span>
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
                  className="cursor-pointer border-b border-transparent hover:border-esig-error"
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



      <div className="font-bold mt-7">Zerat e polices &#40; zeri 2 &#41;</div>
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
          <div className="flex items-center">
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
                    <span className="font-bold">vlera e limitit</span> eshte <span className="text-esig pr-1">80% e SI</span><br />
                    me nje <span className="font-bold">vlere minimale</span> prej <span className="text-esig pr-1">10% te demit</span><br />
                    dhe nje <span className="font-bold">vlere maximale</span> te <span className="text-esig">pa limituar</span>
                  </span>
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
              </div>

              <div className="text-xs my-1">
                <span className="italic text-gray-500 ">Limiti per ngjarje</span>
                <div className="flex items-center pl-1">
                  <span>
                    <span className="font-bold">vlera e limitit</span> eshte <span className="text-esig pr-1">80% e SI</span><br />
                    me nje <span className="font-bold">vlere minimale</span> prej <span className="text-esig pr-1">10% te demit</span><br />
                    dhe nje <span className="font-bold">vlere maximale</span> te <span className="text-esig">pa limituar</span>
                  </span>
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
                  className="cursor-pointer border-b border-transparent hover:border-esig-error"
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
                    <span className="font-bold">vlera e limitit</span> eshte <span className="text-esig pr-1">80% e SI</span><br />
                    me nje <span className="font-bold">vlere minimale</span> prej <span className="text-esig pr-1">10% te demit</span><br />
                    dhe nje <span className="font-bold">vlere maximale</span> te <span className="text-esig">pa limituar</span>
                  </span>
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
              </div>

              <div className="text-xs my-1">
                <span className="italic text-gray-500 ">Limiti per ngjarje</span>
                <div className="flex items-center pl-1">
                  <span>
                    <span className="font-bold">vlera e limitit</span> eshte <span className="text-esig pr-1">80% e SI</span><br />
                    me nje <span className="font-bold">vlere minimale</span> prej <span className="text-esig pr-1">10% te demit</span><br />
                    dhe nje <span className="font-bold">vlere maximale</span> te <span className="text-esig">pa limituar</span>
                  </span>
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
                  className="cursor-pointer border-b border-transparent hover:border-esig-error"
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



    </div>
  );
}
