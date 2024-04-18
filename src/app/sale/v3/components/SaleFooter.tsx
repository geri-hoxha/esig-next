import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Close } from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import Base from "../../components/Fields_v2/Base";
import Modal from "@/components/esig/Modal";
import Popconfirm from "@/components/Popconfirm";
import { classNames } from "@/lib/utils";
import Preview from "../../components/Preview";
const SaleFooter = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const myState = useState(false);

  return (
    <div
      className="fixed bottom-0 bg-white shadow-inner

      border-t border-gray-200 left-64 w-full flex items-center justify-between px-6 py-4"
      style={{ width: "-webkit-fill-available" }}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-[330px] flex items-center transition-all duration-200 ${
            openEdit
              ? "visible pointer-events-auto opacity-100"
              : "invisible pointer-events-none opacity-0 fixed"
          }`}
        >
          <div className="h-11 mr-4 w-full flex items-center justify-center">
            <Base
              value={200000}
              suffix={"EUR"}
              className="bg-red-0"
              label="Premium"
              name="primi"
            />
          </div>
          <div className="flex items-center justify-center gap-4 ring-1 ring-inset rounded-r-lg z-10 bg-white  -ml-5 px-4 h-9 ring-gray-300">
            <Image
              onClick={() => setOpenEdit(false)}
              src={"/svg/success.svg"}
              className="cursor-pointer"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 17, height: 17 }}
              priority
            />
            <Image
              onClick={() => setOpenEdit(false)}
              src="/svg/close.svg"
              alt="edit"
              className="cursor-pointer"
              width={"0"}
              height={"0"}
              style={{ width: 22, height: 22 }}
              priority
            />
          </div>
        </div>
        <div
          className={`w-[330px] flex items-center gap-4 transition-all duration-200 ${
            !openEdit
              ? "visible pointer-events-auto opacity-100"
              : "invisible pointer-events-none opacity-0 fixed"
          }`}
        >
          <div className="text-xl px-4 text-esig font-bold rounded-lg bg-sky-100 h-11  flex items-center justify-center">
            200,000 EUR
          </div>

          <button
            onClick={() => setOpenEdit(true)}
            className="px-2  py-1 text-sm rounded-md  bg-transparent border-none text-esig-products-health font-bold hover:bg-green-100 transition-all duration-100"
          >
            <div className="flex items-center gap-x-2 justify-center">
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
        </div>

        <Popover>
          <PopoverContent className="w-80 p-2 border-esig border-dashed">
            <div className="relative text-black flex flex-col divide-y">
              <div className="text-sm rounded-r-md pl-3 py-2 hover:bg-sky-100 cursor-pointer">
                1. Primi i llogaritur:{" "}
                <span className="font-bold text-base">25,000 EUR</span>
              </div>
              <div className="text-sm   rounded-r-md pl-3 py-2 hover:bg-sky-100 cursor-pointer">
                2. Axhustim primi:{" "}
                <span className="font-bold text-base">0 EUR</span>
              </div>
              <div className="text-sm rounded-r-md pl-3 py-2 hover:bg-sky-100 cursor-pointer">
                3. Kontribut AMF:{" "}
                <span className="font-bold text-base">530 EUR</span>
              </div>
              <div className="text-sm  rounded-r-md pl-3 py-2 hover:bg-sky-100 cursor-pointer">
                4. Komisioni juaj (agjentit):
                <span className="font-bold text-base"> 1,200 EUR</span>
              </div>
              <div className="text-sm rounded-r-md pl-3 py-2 hover:bg-sky-100 cursor-pointer">
                5. Totali për klientin:{" "}
                <span className="font-bold text-base">25,000 EUR</span>
              </div>
            </div>

            {/* <Close className="absolute top-1 right-3" aria-label="Close">
              <span className="text-lg text-esig-error font-bold">x</span>
            </Close> */}
          </PopoverContent>
          <PopoverTrigger asChild>
            <button className="w-max px-2.5 py-2 text-sm rounded-md  bg-transparent border-none text-esig font-bold hover:bg-sky-100 transition-all duration-100">
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
        <button
          onClick={() => setOpen(true)}
          className="w-max px-2 py-2 text-sm rounded-md  bg-transparent border-none text-esig font-bold hover:bg-sky-100 transition-all duration-100"
        >
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
        <Modal
          title="Finalizim shitjes!"
          description="Ndiqni procesimin nga sistemi!"
          body={<SaleStepper myState={myState} setOpen={setOpen} />}
          noButtons
          width={myState[0] ? "!max-w-lg " : "!max-w-4xl"}
          openProp={open}
          setOpenProp={setOpen}
        >
          <></>
        </Modal>
      </div>
    </div>
  );
};

export default SaleFooter;

const stepsStatic = [
  {
    name: "Polica po procesohet ne sistem",
    description: "Validim seriali dhe kalkulim primi.",
    status: "current",
  },
  {
    name: "PDF polices po gjenerohet",
    description: "Duke u perdorur template-i per policat motorrike.",
    status: "upcoming",
    button: "Shiko PDF",
  },
  {
    name: "Duke exportuar policen ne StartBroker",
    description: "StarBroker ka mesatarisht 22 timeout ne dite.",
    status: "upcoming",
  },
  {
    name: "Duke exportuar policen ne IOSA",
    description: "IOSA ka mesatarisht 54 timeout ne dite.",
    status: "upcoming",
  },
  {
    name: "Duke gjeneruar faturen ne TETRA",
    description: "Ne rast deshtimi, financa do te njoftohet.",
    status: "upcoming",
    button: "Shiko Faturen",
  },
];

const SaleStepper = ({ myState, setOpen }) => {
  const [steps, setSteps] = useState<any>([]);

 
  const [confirmed, setConfirmed] = myState;

  const [zoomIn, setZoomIn] = useState(false);

  useEffect(() => {
    if (!confirmed) return;

    setSteps(stepsStatic);

    const intervalId = setInterval(() => {
      setSteps((steps) => {
        const curretIndex = steps.findIndex(
          (step) => step.status === "current"
        );

        if (curretIndex === steps.length - 1) {
           clearInterval(intervalId);
        }

        return steps.map((step, index) => {
          if (index <= curretIndex) {
            return {
              ...step,
              status: "complete",
            };
          }

          if (index === curretIndex + 1) {
            return {
              ...step,
              status: "current",
            };
          }

          return {
            ...step,
            status: "upcoming",
          };
        });
      });
    }, 2000);

    return () => {
      clearInterval(intervalId);
       setConfirmed(false);
      setSteps([]);
    };
  }, [confirmed]);

  const setZoomInHandler = () => {
    setZoomIn(!zoomIn);
  };

  if (confirmed) {
    return (
      <div
        className={`flex flex-col gap-8 p-4 col-span-8 ${
          confirmed ? "" : "hidden"
        }`}
      >
        <nav aria-label="Progress">
          <ol role="list" className="overflow-hidden">
            {steps.map((step, stepIdx) => (
              <li
                key={step.name}
                className={classNames(
                  stepIdx !== steps.length - 1 ? "pb-7" : "",
                  "relative"
                )}
              >
                {step.status === "complete" ? (
                  <>
                    {stepIdx !== steps.length - 1 ? (
                      <div
                        className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-esig"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="flex items-end justify-between gap-5">
                      <div className="group relative flex items-center cursor-pointer  ">
                        <span className="flex h-9 items-center">
                          <span className="relative bg-white z-10 flex h-8 w-8 items-center justify-center rounded-full   ">
                            <Image
                              src="/svg/check.svg"
                              alt="edit"
                              width={"0"}
                              height={"0"}
                              style={{ width: 24, height: 24 }}
                              priority
                            />
                          </span>
                        </span>
                        <span className="ml-4 flex min-w-0 flex-col">
                          <span className="text-sm font-medium">
                            {step.name}
                          </span>
                          {/* <span className="text-sm text-gray-500">
                          {step.description}
                        </span> */}
                        </span>
                      </div>
                      {step.button && (
                        <button className="w-max px-2 py-2 text-sm rounded-md  bg-transparent border-none text-esig font-semibold hover:bg-sky-100 transition-all duration-100">
                          <div className="flex items-center gap-x-2">
                            <Image
                              src="/svg/info.svg"
                              alt="edit"
                              width={"0"}
                              height={"0"}
                              style={{ width: 16, height: 16 }}
                              priority
                            />
                            <span className="leading-none">{step.button}</span>
                          </div>
                        </button>
                      )}
                    </div>
                  </>
                ) : step.status === "current" ? (
                  <>
                    {stepIdx !== steps.length - 1 ? (
                      <div
                        className="absolute  cursor-pointer left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div
                      className="group animate-pulse duration-500 relative flex items-center"
                      aria-current="step"
                    >
                      <span
                        className="flex h-9  items-center"
                        aria-hidden="true"
                      >
                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-esig bg-white">
                          <span className="h-2.5 w-2.5 rounded-full bg-esig" />
                        </span>
                      </span>
                      <span className="ml-4 flex min-w-0 flex-col">
                        <span className="text-sm font-medium text-esig">
                          {step.name}
                        </span>
                        {/* <span className="text-sm text-gray-500">
                        {step.description}
                      </span> */}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    {stepIdx !== steps.length - 1 ? (
                      <div
                        className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="group relative flex items-center cursor-pointer">
                      <span
                        className="flex h-9 items-center"
                        aria-hidden="true"
                      >
                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                          <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                        </span>
                      </span>
                      <span className="ml-4 flex min-w-0 flex-col">
                        <span className="text-sm font-medium text-gray-500">
                          {step.name}
                        </span>
                        {/* <span className="text-sm text-gray-500">
                        {step.description}
                      </span> */}
                      </span>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ol>
        </nav>

      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className={`${zoomIn ? "col-span-12" : "col-span-7"}`}>
        <Preview zoomIn={zoomIn} setZoomInHandler={setZoomInHandler} />
      </div>

      <div className={`col-span-5 ${zoomIn ? "hidden" : ""}`}>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col mb-4 gap-4 p-4 border-l-2 border-gray-400 border-dashed">
            <span>
              Seriali: <span className="font-bold">23432423</span>
            </span>
            <span>
              Datat:
              <span className="font-bold">18.04.2024 -- 17.04.2025</span>
            </span>
            <span>
              Perdorues police: <span className="font-bold">3 persona</span>
            </span>
            <span>
              Primi: <span className="font-bold">18,176.00 ALL</span>
            </span>
            <span>
              Objekte te siguruara: <span className="font-bold">4</span>
            </span>
            <span>
              Paketa e zgjedhur:{" "}
              <span className="font-bold">Paketa Standard (12 mbulime)</span>
            </span>
          </div>

          <div className="flex items-center  gap-4">
            <button
              onClick={() => setOpen(false)}
              className="ml-auto w-max px-3 py-1 text-sm rounded-md border-2 border-dashed border-esig-error bg-transparent   text-esig-error font-semibold hover:bg-red-50 transition-all duration-100"
            >
              <div className="flex items-center gap-x-2">
                <Image
                  src="/svg/stop.svg"
                  alt="edit"
                  width={"0"}
                  height={"0"}
                  style={{ width: 18, height: 18 }}
                  priority
                />
                <span>{confirmed ? "Anullo!" : "Anullo shitjen!"}</span>
              </div>
            </button>

            <button
              onClick={() => setConfirmed(true)}
              className=" w-max px-3 py-1 text-sm rounded-md border-2 border-dashed border-esig bg-transparent   text-esig font-semibold hover:bg-sky-50 transition-all duration-100"
            >
              <div className="flex items-center gap-x-2">
                <Image
                  src="/svg/check.svg"
                  alt="edit"
                  width={"0"}
                  height={"0"}
                  style={{ width: 18, height: 18 }}
                  priority
                />
                <span>{confirmed ? "Finalizo!" : "Finalizo shitjen!"}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
