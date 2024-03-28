import Image from "next/image";
import Base from "../components/Fields_v2/Base";
import RadioGroup from "./RadioGroup";
import AgGrid from "@/components/ag/Ag-grid";
import type { ColDef } from "ag-grid-community";
import { useEffect, useState } from "react";
import { AgChartsReact } from "ag-charts-react";
import CustomerDonut from "./CustomerDonut";
import { Button } from "@/components/ui/button";
import { ButtonGeri } from "./page";
import { DrawerClose } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import request from "@/request";
import { token } from "@/components/esig/Navbar/Currencies";

interface CustomerModel {
  displayName: string;
  id: number;
  taxNumber: string;
  contactType: "Person" | "Organization";
}

const CustomerModal = ({ onSave }) => {
  const [rowData, setRowData] = useState<any>([]);
  const [values, setValues] = useState(null);
  const [searchedName, setSeachedName] = useState();

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

  const onNameChange = (event) => {
    console.log(event.target.value)
    setSeachedName(event.target.value)
  }
  const onSearch = async () => {
    if (!searchedName) return;
    const response = await request('/customer/ag',
      token,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          startRow: 0,
          endRow: 100,
          filterModel: {
            searchName: {
              filterType: 'text',
              type: 'contains',
              filter: searchedName
            }
          },
          sortModel: []
        })
      })

    setRowData(response.data);
  }

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
              onChange={onNameChange}
            />
            <div className="bg-esig p-2 rounded-md" onClick={onSearch}>
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
          <AgGrid<CustomerModel> rowSelection='single' domLayout='normal' onRowClicked={(params) => {
            setValues(params.data);
          }} height={'h-80'} rowData={rowData} colDefs={colDefs} />
        </div>
      </div>

      <div className="col-span-8 border-l-2 border-dashed pl-4">
        <div className=" flex items-center mb-4">
          <span className="text-lg flex items-center ">
            {" "}
            Te dhenat e klientit:{" "}
            <div className="italic pl-2 truncate w-40">{values?.displayName}</div>
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
          <Base label="Nipt i klientit" name="serial" value={values?.taxNumber} />
          <Base label="Emri i plote" name="serial" value={values?.displayName} />
          <Base label="Lloji i kontaktit" name="serial" value={values?.contactType} />
          <Base label="Numri i telefonit" name="serial" value={values?.phoneNumber} />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-4">
            <Base label="Email" name="serial" value={values?.email} />
            <Base label="Gjinia" name="serial" value={values?.gender} />
            <Base label="Shtetesia" name="serial" value={values?.isLocal === true ? 'Shqiptar' : 'I huaj'} />

            <Base label="Atesia" name="serial" value={values?.fathersName} />
            <Base label="Ditelindja" name="serial" value={values?.birthday} />
            <Base label="Tjeter" name="serial" value={''} />
          </div>
          <div className="h-72">
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
              <Base className="bg-red-0" label="Perqindja" name="serial" suffix={'%'} />
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
              <Button variant="outline" onClick={() => {
                setRowData([]);
                setValues(null)
                setSeachedName(undefined)
              }}>Anullo veprimin</Button>
            </DrawerClose>
            <DrawerClose onClick={() => {
              onSave(values)
            }} asChild>

              <Button variant="default">Ruaj dhe apliko</Button>
            </DrawerClose>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
