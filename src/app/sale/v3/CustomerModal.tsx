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
import { Separator } from "@/components/ui/separator";

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
      flex: 1,
    },

    {
      headerName: "Contact Type",
      field: "contactType",
      maxWidth: 100,
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-4  ">
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
          <div className="flex items-center gap-2">
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

      <div className="col-span-8 border-l-2 border-dashed pl-4">
        <div className=" flex items-center mb-4">
          <span className="text-lg  ">
            {" "}
            Te dhenat e klientit:{" "}
            <span className="italic pl-2">Geri Hoxha</span>
          </span>

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
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Base label="Nipt i klientit" name="serial" />
          <Base label="Emri i plote" name="serial" />
          <Base label="Lloji i kontaktit" name="serial" />
          <Base label="Numri i telefonit" name="serial" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-4">
            <Base label="Email" name="serial" />
            <Base label="Gjinia" name="serial" />
            <Base label="Shtetesia" name="serial" />

            <Base label="Atesia" name="serial" />
            <Base label="Ditelindja" name="serial" />
            <Base label="Tjeter" name="serial" />
          </div>
          <div className="h-50">
            <CustomerDonut />
          </div>
        </div>
      </div>

      <div className="col-span-12  border-t-2 border-dashed">
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-4 ">
            <Image
              className="cursor-pointer"
              src="/svg/question.svg"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 30, height: 20 }}
              priority
            />
            <div className="w-full">
              <Base className="bg-red-0" label="Perqindja" name="serial" />
            </div>
            <Image
              className="cursor-pointer"
              src="/svg/question.svg"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 30, height: 20 }}
              priority
            />
            <div className="flex items-center w-full">
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
          </div>
          <div className="flex items-center gap-4">
            <DrawerClose asChild>
              <Button variant="outline">Anullo veprimin</Button>
            </DrawerClose>
            <Button variant="default">Ruaj dhe apliko</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
