import { Checkbox } from "@/components/ui/checkbox";
import Base from "../components/Fields_v2/Base";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Zerat from "./Zerat";
import Timeline from "./Timeline";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
      <div className="font-bold mt-9">Palet pjesemarrese</div>
      <div className="grid grid-cols-2 gap-6 mt-4 ">

        <div className="flex items-center gap-4 pr-7 ">

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

        <div className="flex flex-col">
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
     
 <Zerat />
 <Zerat />
 <div className="font-bold mt-2">Komente & Historik</div>
 <div className="grid grid-cols-2 gap-6 mt-6 pl-5">
 <Timeline />

    <div className="flex flex-col gap-2 mt-2 ">
      <Label htmlFor="message">Shenime per policen</Label>
      <Textarea placeholder="Type your message here." id="message" className="h-40" />
    </div>

 </div>



    </div>
  );
}
