import Image from "next/image";
import { ButtonGeri } from "./page";
import { useState } from "react";
import Modal from "@/components/esig/Modal";
import { DrawerClose } from "@/components/ui/drawer";
import Base from "../components/Fields_v2/Base";
import Checkbox from "./Checkbox";

const Limit = ({ name }: any) => {
  const [type, setType] = useState(false);

  const onChange = (e: any) => {
    const value = e.target.value;
    setType(value === "2" || value === "3");
  };
  return (
    <>
      <div className="col-span-4">
        <div className="font-bold  text-sm h-full flex items-center justify-center">
          <span className="text-esig w-full text-xs">- {name}</span>
          <div className="w-full  h-px border-b border-dotted border-gray-400 "></div>
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

const Body = ({ setCoverageOpen, openSublimits, setOpenSublimits }: any) => {
  return (
    <div className="grid grid-cols-12 gap-6 mt-2">
      <div className={` ${openSublimits ? "col-span-9 " : "col-span-12 "}   `}>
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

      <div
        className={`col-span-3 border-l-2 pl-6 border-dashed ${
          openSublimits ? "" : "hidden"
        }    `}
      >
        <div className="flex flex-col gap-6">
          <span className="font-bold text-gray-600 text-center">
            4. Nenlimitet:
          </span>
          <div className="grid grid-cols-2 gap-4">
            {Array.from(Array(4).keys()).map((index) => {
              return (
                <>
                  <div className="">
                    <Base label={`Nenmbulimi ${index + 1}`} name="serial" />
                  </div>
                  <div>
                    <Base className="bg-red-0 " label="Vlera" name="serial" />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>

      <div className="col-span-12">
        <div className="border-t-2 border-dashed w-full pt-3 flex items-center justify-between">
          {openSublimits ? (
            <ButtonGeri
              className="text-red-600 hover:bg-red-50 !text-base  "
              onClick={() => setOpenSublimits(false)}
            >
              <div className="flex items-center gap-x-2 mx-auto">
                <svg
                  className="stroke-red-600"
                  width="14"
                  height="14"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                >
                  <path d="M6 6v-6h1v6h6v1h-6v6h-1v-6h-6v-1h6z" />
                </svg>
                <span>Çaktivizo nenmbulimet</span>
              </div>
            </ButtonGeri>
          ) : (
            <ButtonGeri
              className="text-green-600 hover:bg-green-50 !text-base  "
              onClick={() => setOpenSublimits(true)}
            >
              <div className="flex items-center gap-x-2 mx-auto">
                <svg
                  className="stroke-green-600"
                  width="14"
                  height="14"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                >
                  <path d="M6 6v-6h1v6h6v1h-6v6h-1v-6h-6v-1h6z" />
                </svg>
                <span>Aktivizo nenmbulimet</span>
              </div>
            </ButtonGeri>
          )}

          <div className="flex items-center ">
            <DrawerClose asChild>
              <button className="w-max   text-base rounded-md  px-3 py-1     text-esig-error hover:bg-red-50 transition-all duration-100">
                <div className="flex items-center gap-x-1">
                  <Image
                    src="/svg/close.svg"
                    alt="edit"
                    width={"0"}
                    height={"0"}
                    style={{ width: 30, height: 30 }}
                    priority
                  />
                  <span>Mbyll modalin</span>
                </div>
              </button>
            </DrawerClose>

            <DrawerClose asChild>
              <button className="w-max   text-lg rounded-md  px-3 py-1     text-esig hover:bg-sky-50 transition-all duration-100">
                <div className="flex items-center gap-x-2">
                  <Image
                    src="/svg/edit.svg"
                    alt="edit"
                    width={"0"}
                    height={"0"}
                    style={{ width: 20, height: 20 }}
                    priority
                  />
                  <span>Ruaj dhe apliko</span>
                </div>
              </button>
            </DrawerClose>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReusableModal = ({ open = true, setCoverageOpen, children, sublimits=false }: any) => {
  const [openSublimits, setOpenSublimits] = useState(sublimits);

  return (
    <Modal
      title="Demtime aksidentate"
      description="Siguruesi do të paguajë të gjitha dëmet sipas kushteve te kontrates."
      body={
        <Body
          openSublimits={openSublimits}
          setCoverageOpen={setCoverageOpen}
          setOpenSublimits={setOpenSublimits}
        />
      }
      noButtons
      openProp={open}
      setOpenProp={setCoverageOpen}
      width={openSublimits ? "min-w-[80%]" : "min-w-[50%]"}
      back

  //     <div className="w-7 h-7 mr-4 cursor-pointer border-2 border-esig flex items-center justify-center rounded-full bg-sky-50">
  //     <Image
  //         src="/svg/left_arrow.svg"
  //         alt="edit"
  //         width={"0"}
  //         height={"0"}
  //         style={{ width: 30, height: 30 }}
  //         priority
  //     />
  // </div>
    >
      {children}
    </Modal>
  );
};

export default ReusableModal;
