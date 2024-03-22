import Image from "next/image";
import { ButtonGeri } from "./page";
import { useEffect, useState } from "react";
import Modal from "@/components/esig/Modal";
import { DrawerClose } from "@/components/ui/drawer";
import Base from "../components/Fields_v2/Base";
import Checkbox from "./Checkbox";
import {SimpleChartBar, RangeBar } from "./Charts";

const Box = ({ name, description, index, setCoverageOpen }: any) => {
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const randomNumber2 = Math.floor(10 + Math.random() * 90);

  return (
    <div className={` text-esig  font-medium  cursor-pointer group`}>
      <div className=" flex items-center gap-4">
        <span className="bg-sky w-7 h-7 text-sm grow shrink-0 rounded-full bg-sky-100 flex items-center justify-center">
          {index}
        </span>

        <div className="flex items-center  gap-2 group-hover:bg-sky-50 rounded-xl w-full px-3 py-2  transition-all duration-100">
          <span className="text-base w-48	 truncate   ">{name}</span>

          <div className="h-5 ml-auto flex items-center">
            <button
              onClick={() => setCoverageOpen(true)}
              className="    hidden group-hover:block    text-xs rounded-md  px-3 py-1     text-esig hover:bg-white   border border-transparent hover:border-esig transition-all duration-200"
            >
              <div className="flex items-center gap-x-1">
                <Image
                  src="/svg/edit.svg"
                  alt="edit"
                  width={"0"}
                  height={"0"}
                  style={{ width: 15, height: 15 }}
                  priority
                />
                <span>Modifiko limitet / nenlimitet etc...</span>
              </div>
            </button>
          </div>
          <div className="ml-auto  group-hover:hidden truncate   text-xs text-gray-600">
            <span>
              {randomNumber2}% SI dhe {randomNumber}$ primi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ICoverages {
  name: string;
  description: string;
}

const staticCoverages: ICoverages[] = [
  {
    name: "Katastrofat natyrore",
    description:
      "Siguruesi do të paguajë të gjitha dëmet sipas kushteve te kontrates.",
  },
  {
    name: "Vjedhja (totale e mjetit)",
    description:
      "Siguruesi do të paguajë të gjitha dëmet sipas kushteve te kontrates.",
  },
  {
    name: "Zjarr, Rrufe, Eksplozion",
    description:
      "Siguruesi do të paguajë të gjitha dëmet sipas kushteve te kontrates.",
  },
  {
    name: "Thyerja e xhamave",
    description:
      "Siguruesi do të paguajë të gjitha dëmet sipas kushteve te kontrates.",
  },
  {
    name: "Demtime aksidentale",
    description:
      "Siguruesi do të paguajë të gjitha dëmet sipas kushteve te kontrates.",
  },
  {
    name: "Katastrofat natyrore",
    description:
      "Siguruesi do të paguajë të gjitha dëmet sipas kushteve te kontrates.",
  },
  {
    name: "Vjedhja (totale e mjetit)",
    description:
      "Siguruesi do të paguajë të gjitha dëmet sipas kushteve te kontrates.",
  },
  {
    name: "Zjarr, Rrufe, Eksplozion",
    description:
      "Siguruesi do të paguajë të gjitha dëmet sipas kushteve te kontrates.",
  },
  {
    name: "Thyerja e xhamave",
    description:
      "Siguruesi do të paguajë të gjitha dëmet sipas kushteve te kontrates.",
  },
  {
    name: "Demtime aksidentale",
    description:
      "Siguruesi do të paguajë të gjitha dëmet sipas kushteve te kontrates.",
  },
];

const CoveragesModal: React.FC<{ setCoverageOpen: any }> = ({
  setCoverageOpen,
}) => {
  const [x, setX] = useState(false);

  const [geri, setGeri] = useState(false);

  useEffect(() => {
    setGeri(true);
  }, []);

  const onClick = () => {
    setX(!x);
  };

  if (x) {
    return <div>geri</div>;
  }

  return (
    <div className="flex flex-col gap-6  overflow-x-hidden">
      <div
        className={`flex flex-col   scrollArea max-h-[320px] overflow-x-hidden overflow-y-auto pr-2  transition-all duration-500
      
      ${
        geri
          ? " translate-x-0 opacity-100 visible pointer-events-auto"
          : "-translate-x-10 opacity-0 invisible pointer-events-none"
      } 
      `}
      >
        {staticCoverages.map((coverage, index) => {
          return (
            <Box
              key={index}
              index={index + 1}
              name={coverage.name}
              description={coverage.description}
              setCoverageOpen={setCoverageOpen}
            />
          );
        })}
      </div>
      <div className="border-t-2 border-dashed w-full pt-3 text-right">
        <button
          onClick={onClick}
          className="w-max   text-base rounded-md  px-3 py-1     text-esig-error hover:bg-red-50 transition-all duration-100"
        >
          <div className="flex items-center gap-x-1">
            <Image
              src="/svg/close.svg"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 30, height: 30 }}
              priority
            />
            <span>Anullo veprimin</span>
          </div>
        </button>
      </div>
    </div>
  );
};

const Limit = ({ name }: any) => {
  const [type, setType] = useState(false);

  const onChange = (e: any) => {
    const value = e.target.value;
    setType(value === "2" || value === "3");
  };
  return (
    <>
      <div className="col-span-4">
        <div className="font-bold pl-2 text-sm h-full flex items-center justify-center">
          <span className="text-esig w-full   ">- {name}</span>
          <div className="w-full  h-px border-b border-dotted border-gray-400"></div>
        </div>
      </div>
      <div className="col-span-8">
        <div className="flex items-center gap-4">
          <Base
            label="Tipi i limitit"
            name="serial"
            type="select"
            onChange={onChange}
            options={[
              {
                value: "1",
                key: "Vlere fikse",
              },
              {
                value: "2",
                key: "% e shumes se siguruar",
              },
              {
                value: "3",
                key: "% e cdo demi",
              },
            ]}
          />
          <Base label="Vlera" name="serial" suffix={type ? "%" : "Euro"} />
          {type && (
            <>
              <Base
                label="Vlera min"
                name="serial"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 9l5 6 5-6"
                      style={{ stroke: "#e3000f" }}
                    />
                  </svg>
                }
              />
              <Base
                label="Vlera max"
                name="serial"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                  >
                    <path
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 15l-5-6-5 6"
                      style={{ stroke: "#007432" }}
                    />
                  </svg>
                }
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

const Body = ({ setCoverageOpen }: any) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <div className="col-span-2">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <span className="font-bold text-gray-600">1. Premium: </span>
          </div>
          <div className="col-span-9">
            <div className="w-full flex items-center ml-auto gap-4 max-w-lg">
              <div>
                <Checkbox
                  label={
                    <span className="text-sm font-semibold text-gray-800 w-max block">
                      I sheshte
                    </span>
                  }
                />
              </div>
              <Base
                className="bg-red-0 "
                label="Premium"
                name="serial"
                suffix="Euro"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                }
              />
            </div>
          </div>

          <div className="col-span-3">
            <span className="font-bold text-gray-600 text-base ">
              2. Shuma e siguruar:
            </span>
          </div>

          <div className="col-span-9">
            <div className="w-full flex items-center gap-4 ml-auto  max-w-lg">
              <div>
                <Checkbox
                  label={
                    <span className="text-sm font-semibold text-gray-800 w-max block">
                      I sheshte
                    </span>
                  }
                />
              </div>
              <Base
                className="bg-red-0 "
                label="Shuma e siguruar"
                name="serial"
                suffix="Euro"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                }
              />
            </div>
          </div>

          <div className="col-span-3">
            <span className="font-bold text-gray-600 ">3. Limitet:</span>
          </div>
          <div className="col-span-9"></div>

          <Limit name="Franzhiza" />
          <Limit name="Pjesa e zbritshme" />
          <Limit name="Ne ngjarje" />
          <Limit name="Ne persona" />
          <Limit name="Ne periudhe" />
        </div>
      </div>
      <div className="col-span-1">
        <SimpleChartBar />
        <RangeBar />
      </div>
    </div>
  );
};

const ZeratModal = () => {
  const [open, setOpen] = useState(false);

  const [coverageOpen, setCoverageOpen] = useState(false);

  if (coverageOpen) {
    return (
      <Modal
        title="Demtime aksidentate"
        description="Siguruesi do të paguajë të gjitha dëmet sipas kushteve te kontrates."
        body={<Body setCoverageOpen={setCoverageOpen} />}
        noButtons
        openProp
        setOpenProp={setCoverageOpen}
        width={"min-w-[90%]"}
        back
      >
        <ButtonGeri className="text-esig hover:bg-sky-50">
          <div className="flex items-center gap-x-1 text-lg">
            <Image
              className="cursor-pointer"
              src="/svg/edit.svg"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 20, height: 20 }}
              priority
            />
            <span>Modifiko mbulimet</span>
          </div>
        </ButtonGeri>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        title="Modali i mbulimeve"
        description="Selektoni cilin mbulimin doni te perditesoni"
        body={<CoveragesModal setCoverageOpen={setCoverageOpen} />}
        noButtons
        openProp={open}
        setOpenProp={setOpen}
        width={"min-w-[40%]"}
      >
        <ButtonGeri className="text-esig hover:bg-sky-50">
          <div className="flex items-center gap-x-1 text-lg">
            <Image
              className="cursor-pointer"
              src="/svg/edit.svg"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 20, height: 20 }}
              priority
            />
            <span>Modifiko mbulimet</span>
          </div>
        </ButtonGeri>
      </Modal>
    </>
  );
};

export default ZeratModal;
