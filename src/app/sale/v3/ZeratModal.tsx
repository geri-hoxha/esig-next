import Image from "next/image";
import { ButtonGeri } from "./page";
import { useEffect, useState } from "react";
import Modal from "@/components/esig/Modal";

const Box = ({ name, description, index }: any) => {
  return (
    <div className={` text-esig  font-medium  cursor-pointer group`}>
      <div className=" flex items-center gap-4">
        <span className="bg-sky w-7 h-7 text-sm grow shrink-0 rounded-full bg-sky-100 flex items-center justify-center">
          {index}
        </span>

        <span className="text-base  group-hover:bg-sky-50 rounded-xl w-full px-3 py-2  transition-all duration-200">
          {name}
        </span>

        <button className="group/edit invisible  group-hover:visible    text-xs rounded-md  px-3 py-1     text-esig hover:bg-esig-virtualization-purple-100 hover:text-white transition-all duration-100">
          <div className="flex items-center gap-x-1">
            <Image
              src="/svg/edit.svg"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 15, height: 15 }}
              priority
            />
            <span>Modifiko limitet</span>
          </div>
        </button>

        <button className="group/edit  invisible  group-hover:visible    text-xs rounded-md  px-3 py-1     text-esig hover:bg-esig-virtualization-green-100 hover:text-white transition-all duration-100">
          <div className="flex items-center gap-x-1 w-full">
            <Image
              src="/svg/edit.svg"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 15, height: 15 }}
              priority
            />
            <span className="w-full">Modifiko nenlimitet</span>
          </div>
        </button>
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

const CoveragesModal = () => {
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
    <div className="flex flex-col gap-6">
      <div
        className={`flex flex-col gap-3 scrollArea max-h-[300px] overflow-y-auto pr-2  transition-all duration-500
      
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

const ZeratModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal
        title="Modali i mbulimeve"
        description="Selektoni cilin mbulimin doni te perditesoni"
        body={<CoveragesModal />}
        noButtons
        openProp={open}
        setOpenProp={setOpen}
        width={"min-w-[50%]"}
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
