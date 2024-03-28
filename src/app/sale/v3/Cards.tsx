"use client";
import Image from "next/image";
import { ButtonGeri } from "./page";
import Modal from "@/components/esig/Modal";
import CustomerModal from "./CustomerModal";

const Cards = ({object, objects, setObjects}) => {
  const onSave = (values) => {
    setObjects([...objects.map((_object) => {
      if(_object.id === object.id) {
        return values
      }
      return _object;
    })])
  }
  return (
    <div className="cursor-pointer group hover:shadow-md rounded-xl h-max   transition-all duration-200 relative">
      <div className="hover:!bg-sky-50  hover:text-esig text-sm z-10 rounded-xl">
        <div className="p-4">
          <div className="font-semibold text-gray-700 group-hover:text-esig py-2">
            {object?.displayName}, {object?.taxNumber}
          </div>
          <ul className="flex flex-col gap-y-2">
            <li>
              <div className="flex items-center gap-4 ">
                <div>Datelindja</div>
                <div className="border-b-2 border-dotted w-full"></div>
                <div>{object?.birthday}</div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-4">
                <div>Nr.Tel</div>
                <div className="border-b-2 border-dotted w-full"></div>
                <div>{object?.phoneNumber}</div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-4">
                <div>Gjinia</div>
                <div className="border-b-2 border-dotted w-full"></div>

                <div>{object?.gender}</div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-4">
                <div>Atesia</div>
                <div className="border-b-2 border-dotted w-full"></div>
                <div>{object?.fathersName}</div>
              </div>
            </li>
          </ul>
          <div className="mt-2">Adresa: Rr. Medar shtylla, Tirane, 1060</div>
        </div>
        <div className="flex items-center justify-between">


        <Modal
                        title="Modali i objekteve te siguruara"
                        description="Ketu mund te modikoni klientin e perzgjedhur."
                        body={<CustomerModal onSave={onSave} />}
                        noButtons
                      >
                                          <div className="w-1/2 text-center">
            <ButtonGeri className="text-esig bg-transparent !w-full  !h-12">
              <div className="flex items-center gap-x-1 mx-auto">
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
      </div>
      <div className="absolute bottom-0 right-0 w-1/2 z-20" onClick={() => {
        setObjects([...objects.filter((_object:any) => _object.id !== object.id)])
      }}
      
      >
        <ButtonGeri className="text-esig-error bg-white   hover:bg-red-50 !w-full !h-12 rounded-lg transition-all duration-200">
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
  );
};

const EmptyCard = () => {
  return (
    <div className="cursor-pointer group border   w-full h-full border-dashed min-h-[268px] border-transparent  hover:border-esig flex items-center justify-center hover:bg-sky-50 hover:shadow-md rounded-xl   transition-all duration-200 relative">
      <svg
        className="stroke-esig"
        width="30"
        height="30"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path d="M14 14v-14h1v14h14v1h-14v14h-1v-14h-14v-1h14z" />
      </svg>
    </div>
  );
};

export { EmptyCard };

export default Cards;
