"use client";
import Image from "next/image";
import { ButtonGeri } from "./page";
import Modal from "@/components/esig/Modal";
import CustomerModal from "./CustomerModal";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const Cards = ({ object, objects, setObjects }) => {
  const { toast } = useToast();

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onSave = (values) => {
    setObjects([
      ...objects.map((_object) => {
        if (_object.id === object.id) {
          return values;
        }
        return _object;
      }),
    ]);
  };
  return (
    <div
      className={`cursor-pointer group grid grid-cols-3 parent-card     hover:shadow-md rounded-xl min-h-36  transition-all duration-200 relative ${
        isHovered
          ? "bg-red-50 text-esig-error"
          : "hover:!bg-sky-50  hover:text-esig"
      }`}
    >
      <div className=" text-sm  py-4 px-6 col-span-2">
        <div className="font-semibold flex items-center justify-between  py-2">
          <span className="max-w-xs truncate block">{object?.displayName}</span>
          <span className=" ">{object?.taxNumber}</span>
        </div>
        <ul className="flex flex-col gap-y-2">
          {/* <li>
              <div className="flex items-center gap-4 ">
                <div>Datelindja</div>
                <div className="border-b-2 border-dotted w-full"></div>
                <div>{object?.birthday}</div>
              </div>
            </li> */}
          <li>
            <div className="flex items-center gap-4">
              <div>Nr.Tel</div>
              <div className="border-b-2 border-dotted w-full"></div>
              <div>{object?.phoneNumber || "0675835032"}</div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-4">
              <div>Email</div>
              <div className="border-b-2 border-dotted w-full"></div>

              <div>{object?.email || "geri.hoxha@gmail.com"}</div>
            </div>
          </li>
          {/* <li>
              <div className="flex items-center gap-4">
                <div>Atesia</div>
                <div className="border-b-2 border-dotted w-full"></div>
                <div>{object?.fathersName}</div>
              </div>
            </li> */}
        </ul>
        <div className="mt-4">Adresa: Rr. Medar shtylla, Tirane, 1060</div>
      </div>

      <div className="flex flex-col col-span-1 justify-center items-end">
        <div className={`flex items-center justify-between h-full rounded-bl-xl w-28  ${isHovered ? 'bg-white ' : ''}`}>
          <Modal
            title="Modali i objekteve te siguruara"
            description="Ketu mund te modikoni klientin e perzgjedhur."
            body={<CustomerModal onSave={onSave} />}
            noButtons
          >
            <div className="w-full text-center">
              <ButtonGeri className="text-esig bg-transparent    !h-12">
                <div className="flex items-center gap-x-1  mx-auto">
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
          </Modal>
        </div>

        <div className="h-full"></div>

        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="z-10 bg-white w-28 rounded-tl-xl transition-all duration-200 hover:bg-red-50 h-1/2 flex items-center justify-center absolute bottom-0 right-0"
          onClick={() => {
            setObjects([
              ...objects.filter((_object: any) => _object.id !== object.id),
            ]);

            toast({
              title: `Pjesemarresi: ${object.displayName} u fshi nga lista!`,
              description: "Klikoni 'Undo' nese ishte gabimisht.",
              action: (
                <ToastAction
                  className="bg-esig text-white hover:bg-esig-fluorite"
                  onClick={() => {
                    // using the power of closures
                    setObjects(objects);
                  }}
                  altText="Goto schedule to undo"
                >
                  Undo
                </ToastAction>
              ),
            });
          }}
        >
          <ButtonGeri className="text-esig-error  child-button     px-4 !h-12 -mr-1 rounded-l-lg transition-all duration-200">
            <div className="flex items-center gap-x-1  h-auto">
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
    </div>
  );
};

export default Cards;
