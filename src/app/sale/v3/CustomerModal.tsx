import Image from "next/image";
import Base from "../components/Fields_v2/Base";
import RadioGroup from "./RadioGroup";
import AgGrid from "@/components/ag/Ag-grid";

const CustomerModal = () => {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-5">
        <div className="flex flex-col gap-4">
          <RadioGroup
            options={[
              {
                id: "1",
                title: "Kerko me emer",
              },
              {
                id: "2",
                title: "Kerko me Nipt",
              },
            ]}
          />

          <div className="flex items-center gap-2 mt-6">
            <Base
              className="bg-red-0"
              label="Emri / Nipt i klientit"
              name="serial"
            />
            <div className="bg-esig p-2 rounded-md">
              <Image
                className="cursor-pointer"
                src="/svg/search.svg"
                alt="edit"
                width={"0"}
                height={"0"}
                style={{ width: 30, height: 20 }}
                priority
              />
            </div>
          </div>
          <AgGrid />
        </div>
      </div>

      <div className="col-span-5"></div>

      <div className="col-span-2"></div>
    </div>
  );
};

export default CustomerModal;
