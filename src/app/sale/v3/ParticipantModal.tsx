import Image from "next/image";
import Base from "../components/Fields_v2/Base";
import Checkbox from "./Checkbox";
import { DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ButtonGeri } from "./page";
import Modal from "@/components/esig/Modal";
import CustomerModal from "./CustomerModal";
import { ReactNode } from "react";
import Draggable from "./Draggable";

export const beneficiaries = [
  {
    id: 1,
    displayName: "Erin Hoxha",
    percentage: 0.34,
  },
  {
    id: 2,
    displayName: "Geri Hoxha",
    percentage: 0.33,
  },
  {
    id: 3,
    displayName: "Oltion Driza",
    percentage: 0.33,
  },
];

const ParticipantModal: React.FC<{ children: ReactNode  }> = ({
  children
 }) => {



  return (
    <>
      <div className="flex flex-col gap-4">
       <Draggable />
      </div>

        {children}
      <div className="flex gap-2  items-center w-1/2 ml-auto mt-4">
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
        <Button variant="default">Ruaj pjesemarresit</Button>
      </div>
    </>
  );
};

export default ParticipantModal;
