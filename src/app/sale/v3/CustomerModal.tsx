import Image from "next/image";
import Base from "../components/Fields_v2/Base";
import RadioGroup from "./RadioGroup";
import AgGrid from "@/components/ag/Ag-grid";
import type { ColDef } from "ag-grid-community";
import { useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import CustomerDonut from "./CustomerDonut";
import { Button } from "@/components/ui/button";
import { ButtonGeri } from "./page";
import { DrawerClose } from "@/components/ui/drawer";

interface CustomerModel {
  displayName: string;
  id: number;
  taxNumber: string;
  contactType: "Person" | "Organization";
}

const CustomerModal = () => {
  const rowData: CustomerModel[] = [
    {
      id: 1,
      displayName: "Geri Hoxha",
      taxNumber: "J91223011S",
      contactType: "Person",
    },
    {
      id: 2,
      displayName: "Erin Hoxha",
      taxNumber: "M23094000L",
      contactType: "Organization",
    },
    {
      id: 3,
      displayName: "Oltion Driza",
      taxNumber: "K23490232S",
      contactType: "Person",
    },
    {
      id: 4,
      displayName: "Kledi Kallastra",
      taxNumber: "G24234232S",
      contactType: "Organization",
    },
  ];

  const colDefs: ColDef[] = [
    {
      headerName: "NIPT",
      field: "taxNumber",
      maxWidth: 100,
    },
    {
      headerName: "Full name",
      field: "displayName",
      minWidth: 110,
      flex: 1
    },

    {
      headerName: "Contact Type",
      field: "contactType",
      maxWidth: 100,
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-4 divide-x-2 divide-dashed">
      <div className="col-span-4">
        <div className="flex flex-col  gap-4">
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
          <div className="flex items-center  ">
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
          <AgGrid<CustomerModel> rowData={rowData} colDefs={colDefs} />
        </div>
      </div>

      <div className="col-span-5 pl-4">
        <div className=" flex items-center mb-4">
          Te dhenat e klientit: <span className="italic pl-2">Geri Hoxha</span>
          <ButtonGeri className="text-esig hover:bg-sky-50">
            <div className="flex items-center gap-x-1">
              <Image
                className="cursor-pointer"
                src="/svg/edit.svg"
                alt="edit"
                width={"0"}
                height={"0"}
                style={{ width: 20, height: 20 }}
                priority
              />
              <span>Shiko te gjitha</span>
            </div>
          </ButtonGeri>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Base label="Nipt i klientit" name="serial" />
          <Base label="Emri i plote" name="serial" />
          <Base label="Lloji i kontaktit" name="serial" />
          <Base label="Numri i telefonit" name="serial" />
          <Base label="Email" name="serial" />
          <Base label="Gjinia" name="serial" />
        </div>
        <div className="h-80">
          <CustomerDonut />
        </div>
      </div>
      <div className="col-span-3 pl-4 ">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4 border-b-2 border-dashed pb-4">
            <div className="">Konfigurime per kete police</div>
            <div className="flex items-center">
              <div className="mr-2 text-gray-700 font-semibold text-sm">
                Extra Charge:
              </div>
              <div className="w-10">
                <RadioGroup
                  options={[
                    {
                      id: "1",
                      title: "Po",
                    },
                    {
                      id: "2",
                      title: "Jo",
                    },
                  ]}
                />
              </div>
            </div>
            <Base className="bg-red-0" label="Serial" name="serial" />
          </div>
          <div className="flex items-end h-auto  mt-auto gap-2 pt-4 border-t-2 border-dashed">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Button variant="default">Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
