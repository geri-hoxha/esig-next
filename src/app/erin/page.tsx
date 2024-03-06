import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function Erin() {
  return (
    <div className=" grid grid-cols-12 gap-4 h-full">
      <div className="col-span-9">
        <div className="pr-4">
          <div className="grid grid-cols-12 gap-4 mt-5 h-full">
            <div className="col-span-3 border-r-2  	 border-gray-600 h-con text-right pr-4 text-lg text-gray-600 font-bold">
              Te pergjithshme
            </div>
            <div className="col-span-9 flex flex-col h-full">
              <div className="flex flex-col gap-3 mt-4">
                <span className="">Kryesore</span>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <Label
                      className="text-xs uppercase font-mono	"
                      htmlFor="serial"
                    >
                      Serial
                    </Label>
                    <Input type="serial" id="serial" className="" />
                  </div>
                  <div>
                    <Label
                      className="text-xs uppercase font-mono	"
                      htmlFor="serial"
                    >
                      Serial
                    </Label>
                    <Input type="serial" id="serial" />
                  </div>
                  <div>
                    <Label
                      className="text-xs uppercase font-mono	"
                      htmlFor="serial"
                    >
                      Serial
                    </Label>
                    <Input type="serial" id="serial" />
                  </div>
                  <div>
                    <Label
                      className="text-xs uppercase font-mono	"
                      htmlFor="serial"
                    >
                      Serial
                    </Label>
                    <Input type="serial" id="serial" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <span className="">Kryesore</span>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <Label
                      className="text-xs uppercase font-mono	"
                      htmlFor="serial"
                    >
                      Serial
                    </Label>
                    <Input type="serial" id="serial" />
                  </div>
                  <div>
                    <Label
                      className="text-xs uppercase font-mono	"
                      htmlFor="serial"
                    >
                      Serial
                    </Label>
                    <Input type="serial" id="serial" />
                  </div>
                  <div>
                    <Label
                      className="text-xs uppercase font-mono	"
                      htmlFor="serial"
                    >
                      Serial
                    </Label>
                    <Input type="serial" id="serial" />
                  </div>
                  <div>
                    <Label
                      className="text-xs uppercase font-mono	"
                      htmlFor="serial"
                    >
                      Serial
                    </Label>
                    <Input type="serial" id="serial" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pr-4">
          <div className="grid grid-cols-12 gap-4 mt-5 h-full">
            <div className="col-span-3 border-r-2  	 border-gray-600 h-con text-right pr-4 text-lg text-gray-600 font-bold">
              Pjesemarresit
            </div>
            <div className="col-span-9 flex flex-col h-full">
              <div className="flex flex-col gap-3 mt-4">
                <span className="">Siguruesit</span>

                <div className="flex flex-col gap-4 text-xs pl-10">
                  <div className="flex items-center justify-between">
                    <span>
                      SIGAL UNIQA Group
                      AUSTRIA........................................................................................................60%
                    </span>
                    <div>
                      <Button
                        variant={"outline"}
                        className="text-sky-600 bg-transparent border-sky-600 w-14 h-7"
                      >
                        edit
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>
                      SIGAL UNIQA Group
                      AUSTRIA........................................................................................................60%
                    </span>
                    <div className="flex items-center">
                      <Button
                        variant={"outline"}
                        className="text-sky-600 bg-transparent border-sky-600 w-14 h-7 mr-3"
                      >
                        edit
                      </Button>
                      <Button
                        variant={"outline"}
                        className="text-red-600 bg-transparent border-red-600 w-14 h-7"
                      >
                        delete
                      </Button>
                    </div>
                  </div>
                  <div className="w-full text-center text-sky-600">
                    -- shto sigurues tjeter --
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-4">
                <span className="">Te siguruarit</span>

                <div className="flex flex-col gap-4 text-xs pl-10">
                  <div className="flex items-center justify-between">
                    <span>
                      SIGAL UNIQA Group
                      AUSTRIA........................................................................................................60%
                    </span>
                    <div>
                      <Button
                        variant={"outline"}
                        className="text-sky-600 bg-transparent border-sky-600 w-14 h-7"
                      >
                        edit
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>
                      SIGAL UNIQA Group
                      AUSTRIA........................................................................................................60%
                    </span>
                    <div className="flex items-center">
                      <Button
                        variant={"outline"}
                        className="text-sky-600 bg-transparent border-sky-600 w-14 h-7 mr-3"
                      >
                        edit
                      </Button>
                      <Button
                        variant={"outline"}
                        className="text-red-600 bg-transparent border-red-600 w-14 h-7"
                      >
                        delete
                      </Button>
                    </div>
                  </div>
                  <div className="w-full text-center text-sky-600">
                    -- shto sigurues tjeter --
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-3">
        <div className="rounded-lg p-3 border-2 border-gray-400  h-full">
          <div className="flex flex-col   text-lg text-gray-600 font-bold">
            <span>Shitje e kombinuar</span>
            <span className="my-3">Motorrike</span>
            <div className="grid grid-cols-3 gap-4">
              <div className="  rounded-md bg-sky-500 text-white px-3 py-7 w-full flex items-center">
                TPL
              </div>
              <div className="  rounded-md bg-yellow-500 text-white px-3 py-7 w-full flex items-center">
                CASCO
              </div>
              <div className=" t rounded-md bg-green-500 text-white px-3 py-7 w-full flex items-center">
                <span className="truncate w-24">GREEN CARD</span>
              </div>
            </div>

            <span className="my-3">Shendeti</span>
            <div className="grid grid-cols-3 gap-4">
              <div className="  rounded-md bg-sky-500 text-white px-3 py-7 w-full flex items-center">
                SHU
              </div>
              <div className="  rounded-md bg-yellow-500 text-white px-3 py-7 w-full flex items-center">
                GERI
              </div>
              <div className=" t rounded-md bg-red-500 text-white px-3 py-7 w-full flex items-center">
                <span className="truncate w-24">ERINI</span>
              </div>
            </div>

            <Separator className="my-6 h-px bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
}
