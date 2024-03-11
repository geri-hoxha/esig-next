'use client';

import { Checkbox } from "@/components/ui/checkbox";
import Base from "../components/Fields_v2/Base";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Zerat from "./Zerat";
import Timeline from "./Timeline";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReactNode, useState } from "react";


interface IProps {
  title: string;
  items: { title: string, children: ReactNode, cols?: string }[];
}

const Geri: React.FC<Partial<IProps>> = ({ title = '', items = [] }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl bg-red-0">{title}</h2>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8`}>
        {items.map((item, index) => {
          return (
            <div key={index} className="flex flex-col gap-4">
              <h3 className="text-xl bg-red-0">{item.title}</h3>
              <div className={`grid grid-cols-${item?.cols ?? '2'} gap-4`}>
                {item.children}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

const Switcher = () => {


  return (
    <>
      {/* <label className="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" />
  <div className="relative w-9 h-[18px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[5px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
 </label> */}
    </>
  )
}


const Toggle = () => {
  const [x, setx] = useState(false);

  const onToggle = () => {
    setx(!x);
  }

  return (
    <ButtonGeri className="text-esig hover:bg-sky-50" onClick={onToggle}>
      <div className="flex items-center gap-x-1">
        <Image
          src="/svg/refresh.svg"
          alt="edit"
          width={"0"}
          height={"0"}
          style={{ width: 20, height: 20 }}
          priority
        />
        <span className="ml-0">
          {x ? 'Vetem lideri' : 'Ne menyre te barabarte'}
        </span>
      </div>
    </ButtonGeri>
  )
}


const ButtonGeri: React.FC<{ children: ReactNode, className: string, onClick?: any }> = ({ children, className, onClick }) => {
  return (
    <button className={`w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none transition-all duration-100 ${className}`} onClick={onClick}>
      <div className="flex items-center gap-x-1">
        {children}
      </div>
    </button>
  )
}


export default function Sale() {
  return (

    <>
      <h1 className="text-3xl font-bold border-b-4 border-dashed w-max border-sky-400">Shitje produkti <span className="text-sky-600">MTPL</span></h1>

      <Geri
        title="Informacione te pergjithshme"
        items={[
          {
            title: 'Te pergjithme',
            children: (
              <>
                <Base className="bg-red-0" label="Serial" name="serial" />
                <Base className="bg-red-0" type="select" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
} label="Monedha" name="serial" />
                <Base className="bg-red-0" label="Lloji i pageses" name="serial" />
                {/* <Base className="bg-red-0" label="Kanali i shperndarjes" name="serial" /> */}
              </>
            )
          },
          {
            title: 'Data',
            children: (
              <>
                <Base className="bg-red-0"  type="date" label="Data e fillimit" name="serial" />
                <Base className="bg-red-0"  type="date" label="Data e perfundimit" name="serial" />
                <Base className="bg-red-0"  type="date" label="Data e leshimit" name="serial" />
                <Base className="bg-red-0"  type="date" label="Data retroaktive" name="serial" />
              </>
            )
          },
        ]}
      />
      <Geri
        title="Palet pjesemarrese"
        items={[
          {
            cols: '1',
            title: 'Perdoruesit e polices',
            children: (
              <>
                <div className="flex items-center">
                  <Base className="bg-red-0" label="Lideri *" name="serial" />
                  <div>
                    <button className="w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none text-esig hover:bg-sky-50 transition-all duration-100">
                      <div className="flex items-center gap-x-1">
                        <Image
                          className="cursor-pointer"
                          src="/svg/edit.svg"
                          alt="edit"
                          width={"0"}
                          height={"0"}
                          style={{ width: 20, height: 20 }}
                          priority
                        />
                        <span>Zgjidh</span>
                      </div>
                    </button>
                  </div>

                </div>
                <div className="flex items-center">
                  <Base className="bg-red-0" label="Perdoruesi 2" name="serial" />
                  <div>
                    <button className="w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none text-esig hover:bg-sky-50 transition-all duration-100">
                      <div className="flex items-center gap-x-1">
                        <Image
                          className="cursor-pointer"
                          src="/svg/edit.svg"
                          alt="edit"
                          width={"0"}
                          height={"0"}
                          style={{ width: 20, height: 20 }}
                          priority
                        />
                        <span>Zgjidh</span>
                      </div>
                    </button>
                  </div>
                  <div>
                    <button className="w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none text-esig-error hover:bg-red-50 transition-all duration-100">
                      <div className="flex items-center gap-x-1">
                        <Image
                          src="/svg/close.svg"
                          alt="edit"
                          width={"0"}
                          height={"0"}
                          style={{ width: 20, height: 20 }}
                          priority
                        />
                        <span>Fshij</span>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <Base className="bg-red-0" label="Perdoruesi 3" name="serial" />
                  <div>
                    <button className="w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none text-esig hover:bg-sky-50 transition-all duration-100">
                      <div className="flex items-center gap-x-1">
                        <Image
                          className="cursor-pointer"
                          src="/svg/edit.svg"
                          alt="edit"
                          width={"0"}
                          height={"0"}
                          style={{ width: 20, height: 20 }}
                          priority
                        />
                        <span>Zgjidh</span>
                      </div>
                    </button>
                  </div>
                  <div>
                    <button className="w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none text-esig-error hover:bg-red-50 transition-all duration-100">
                      <div className="flex items-center gap-x-1">
                        <Image
                          src="/svg/close.svg"
                          alt="edit"
                          width={"0"}
                          height={"0"}
                          style={{ width: 20, height: 20 }}
                          priority
                        />
                        <span>Fshij</span>
                      </div>
                    </button>
                  </div>
                </div>
                <div>
                  <ButtonGeri className="text-esig hover:bg-sky-50 !text-base !w-full">
                    <div className="flex items-center gap-x-1 mx-auto">
                      <svg
                        className="stroke-esig"
                        width="14"
                        height="14"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      >
                        <path d="M6 6v-6h1v6h6v1h-6v6h-1v-6h-6v-1h6z" />
                      </svg>
                      <span>Shto perdorues tjeter</span>
                    </div>
                  </ButtonGeri>
                </div>
              </>
            )
          },
          {
            cols: '3',
            title: 'Palet pjesemarrese ne police',
            children: (
              <>

                <div className="flex flex-col">
                  <div className="flex items-center text-lg font-semibold text-gray-700">
                    Policembajtesit
                    <ButtonGeri className="text-esig hover:bg-sky-50">
                      <div className="flex items-center gap-x-1">
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
                  <Toggle />
                  - Erin Hoxha, 100%
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center text-lg font-semibold text-gray-700">
                    Perfituesit
                    <ButtonGeri className="text-esig hover:bg-sky-50">
                      <div className="flex items-center gap-x-1">
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
                  <Toggle />
                  <ul>
                    <li>* Erin Hoxha, 34%</li>
                    <li>- Geri Hoxha, 33%</li>
                    <li>- Oltion Driza, 33%</li>
                  </ul>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center text-lg font-semibold text-gray-700">
                    Te faturarit
                    <ButtonGeri className="text-esig hover:bg-sky-50">
                      <div className="flex items-center gap-x-1">
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
                  <Toggle />
                  <ul>
                    <li>* Geri Hoxha, 77%</li>
                    <li>- Kledi Kallastra, 33%</li>
                  </ul>
                </div>
              </>
            )
          },
        ]}
      />

      <Geri
        title="Zerat e polices ( zeri 1 )"
        items={[
          {
            title: 'Objektet e siguruara',
            children: (
              <>
                <div className="relative ">
                  <div className=" transition-all duration-500 bg-gradient-to-t border-t-2 border-transparent  hover:border-esig        to-white via-white from-gray-200 bg-size-200 bg-pos-0 hover:bg-pos-100">
                    <div className="p-4">
                      <div className="font-semibold text-gray-700 text-lg pb-2">Erin Hoxha, J912345678D</div>
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
                        <ButtonGeri className="text-esig bg-transparent w-full" >
                          <div className="flex items-center gap-x-1">
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
                    <ButtonGeri className="text-esig-error bg-white !rounded-none hover:bg-red-50 !w-full !h-full">
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


                <div className="relative ">
                  <div className=" transition-all duration-500 bg-gradient-to-t border-t-2 border-transparent  hover:border-esig        to-white via-white from-gray-200 bg-size-200 bg-pos-0 hover:bg-pos-100">
                    <div className="p-4">
                      <div className="font-semibold text-gray-700 text-lg pb-2">Erin Hoxha, J912345678D</div>
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
                        <ButtonGeri className="text-esig bg-transparent w-full" >
                          <div className="flex items-center gap-x-1">
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
                    <ButtonGeri className="text-esig-error bg-white !rounded-none hover:bg-red-50 !w-full !h-full">
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


                <div className="relative ">
                  <div className=" transition-all duration-500 bg-gradient-to-t border-t-2 border-transparent  hover:border-esig        to-white via-white from-gray-200 bg-size-200 bg-pos-0 hover:bg-pos-100">
                    <div className="p-4">
                      <div className="font-semibold text-gray-700 text-lg pb-2">Erin Hoxha, J912345678D</div>
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
                        <ButtonGeri className="text-esig bg-transparent w-full" >
                          <div className="flex items-center gap-x-1">
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
                    <ButtonGeri className="text-esig-error bg-white !rounded-none hover:bg-red-50 !w-full !h-full">
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






              </>
            )
          },
          {
            title: 'Mbulimet e objektit / eve',
            children: (
              <div>

                <Checkbox />


              </div>
            )
          },
        ]}
      />

    </>
  );

  //   return (
  //     <div className="mt-6">
  //             <div className="font-bold text-3xl pb-6">Shitje produkti MTPL</div>

  //       <div className=" text-2xl pb-4">Informacione te pergjithshme</div>
  //       <div className="">
  //         <div className="grid grid-cols-2  ">
  //           <div className="flex flex-col">
  //             <span className="pb-2 ">Te pergjithshme</span>
  //             <div className="grid grid-cols-2  gap-6">
  //               <Base label="Seriali" name="serial" />
  //               <Base label="Monedha" name="serial" />
  //               <Base label="Lloji i pages" name="serial" />
  //               <Base label="Kanali i shperndarjes" name="serial" />
  //             </div>
  //           </div>
  //           <div className="flex flex-col">
  //             <span className="mb-4 ">Datat</span>
  //             <div className="grid grid-cols-2 gap-6 ">
  //               <Base label="Data e fillimit" name="serial" />
  //               <Base label="Data e perfundimit" name="serial" />
  //               <Base label="Data e leshimit" name="serial" />
  //               <Base label="Data retroaktive" name="serial" />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className=" text-2xl pb-4 pt-6">Palet pjesemarrese</div>
  //       <div className="grid grid-cols-2 gap-6  ">

  //         <div className="flex items-center gap-4 pr-7 ">

  //           <div className="flex flex-col gap-4 w-full">
  //             <span className="">Perdoruesit e polices</span>
  //             <div className="flex items-center ">
  //               <Base label="Lideri *" name="serial" />
  //               <div className="flex items-center gap-x-1 pl-8">
  //                 <Image
  //                   className="cursor-pointer border-b border-transparent hover:border-esig"
  //                   src="/svg/edit.svg"
  //                   alt="edit"
  //                   width={"0"}
  //                   height={"0"}
  //                   style={{ width: 27, height: 27 }}
  //                   priority
  //                 />

  //               </div>
  //             </div>


  //             <div className="flex items-center">
  //               <Base label="Perdoruesi 2" name="serial" />
  //               <div className="flex items-center gap-x-1 pl-10">
  //                 <Image
  //                   className="cursor-pointer border-b border-transparent hover:border-esig"
  //                   src="/svg/edit.svg"
  //                   alt="edit"
  //                   width={"0"}
  //                   height={"0"}
  //                   style={{ width: 25, height: 25 }}
  //                   priority
  //                 />
  //                 <Image
  //                   className="cursor-pointer border-b border-transparent hover:border-esig-error"
  //                   src="/svg/close.svg"
  //                   alt="edit"
  //                   width={"0"}
  //                   height={"0"}
  //                   style={{ width: 25, height: 25 }}
  //                   priority
  //                 />
  //               </div>
  //             </div>


  //             <div className="flex items-center">
  //               <Base label="Perdoruesi 3" name="serial" />
  //               <div className="flex items-center gap-x-1 pl-10">
  //                 <Image
  //                   className="cursor-pointer border-b border-transparent hover:border-esig"
  //                   src="/svg/edit.svg"
  //                   alt="edit"
  //                   width={"0"}
  //                   height={"0"}
  //                   style={{ width: 25, height: 25 }}
  //                   priority
  //                 />
  //                 <Image
  //                   className="cursor-pointer border-b border-transparent hover:border-esig-error"
  //                   src="/svg/close.svg"
  //                   alt="edit"
  //                   width={"0"}
  //                   height={"0"}
  //                   style={{ width: 25, height: 25 }}
  //                   priority
  //                 />
  //               </div>
  //             </div>

  //             <Button variant={'outline'} className="text-center border-dotted border-esig w-min mx-auto h-8 text-esig hover:bg-sky-50 hover:text-esig transition-all duration-300">
  //               -- shto perdorues tjeter --
  //             </Button>

  //           </div>
  //           {/* <Separator orientation="vertical" className="w-px" /> */}

  //         </div>

  //         <div className="flex flex-col">
  //           <span className=" mb-0">Palet pjesemarrese ne police</span>
  //           <div className="grid grid-cols-2 mt-4 gap-6 text-[12px]">
  //             <div className="flex flex-col  gap-2">
  //               <div className="flex items-center gap-x-2">
  //                 {" "}
  //                 Policembajtesit do te jene{" "}
  //                 <Button className="bg-transparent border w-max h-6 text-xs border-esig border-dotted  text-esig hover:bg-sky-50 hover:text-esig transition-all duration-300">
  //                   Modifiko
  //                 </Button>
  //               </div>
  //               <div className="flex items-center ">
  //                 <Checkbox className="  w-3 h-3" />
  //                 <span className="w-full pl-1">
  //                   Ndaj policembajtesit ne menyre te barabarte
  //                 </span>
  //               </div>
  //               <ul className="list-disc ml-10">
  //                 <li>Erin Hoxha, 100%</li>
  //               </ul>
  //             </div>

  //             <div className="flex flex-col gap-2">
  //               <div className="flex items-center gap-x-2">
  //                 {" "}
  //                 Perfituesit do te jene{" "}
  //                 <Button className="bg-transparent border w-max h-6 text-xs border-esig border-dotted  text-esig hover:bg-sky-50 hover:text-esig transition-all duration-300">
  //                   Modifiko
  //                 </Button>
  //               </div>
  //               <div className="flex items-center ">
  //                 <Checkbox className="  w-3 h-3" />
  //                 <span className="w-full pl-1">
  //                   Ndaj policembajtesit ne menyre te barabarte
  //                 </span>
  //               </div>
  //               <ul className="list-disc ml-10">
  //                 <li>Erin Hoxha, 100%</li>
  //               </ul>
  //             </div>

  //             <div className="flex flex-col gap-2">
  //               <div className="flex items-center gap-x-2">
  //                 {" "}
  //                 Te faturuar do te jene{" "}
  //                 <Button className="bg-transparent border w-max h-6 text-xs border-esig border-dotted  text-esig hover:bg-sky-50 hover:text-esig transition-all duration-300">
  //                   Modifiko
  //                 </Button>
  //               </div>
  //               <div className="flex items-center ">
  //                 <Checkbox className="  w-3 h-3" />
  //                 <span className="w-full pl-1">
  //                   Ndaj policembajtesit ne menyre te barabarte
  //                 </span>
  //               </div>
  //               <ul className="list-disc ml-10">
  //                 <li>Erin Hoxha, 100%</li>
  //               </ul>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //  <Zerat />
  //  <Zerat />
  //  <div className="font-bold mt-2">Komente & Historik</div>
  //  <div className="grid grid-cols-2 gap-6 mt-6 pl-5">
  //  <Timeline />

  //     <div className="flex flex-col gap-2 mt-2 ">
  //       <Label htmlFor="message">Shenime per policen</Label>
  //       <Textarea placeholder="Type your message here." id="message" className="h-40" />
  //     </div>

  //  </div>



  //     </div>
  //   );
}
