import Image from "next/image";
import Base from "../components/Fields_v2/Base";
import RadioGroup from "./RadioGroup";
import AgGrid from "@/components/ag/Ag-grid";
import type { ColDef } from "ag-grid-community";
import { ReactNode, useEffect, useState } from "react";
import CustomerDonut from "./CustomerDonut";
import { Button } from "@/components/ui/button";
import { ButtonGeri } from "./page";
import { DrawerClose } from "@/components/ui/drawer";
import request from "@/request";
import { token } from "@/components/esig/Navbar/Currencies";
import Spinner from "./components/Spinner";
import { getQueryParams } from "./components/PolicyUsers";

interface CustomerModel {
  displayName: string;
  id: number;
  taxNumber: string;
  contactType: "Person" | "Organization";
}

const CustomerModal = ({
  onSave,
  footer,
}: {
  onSave: (value: any) => void;
  footer: ReactNode;
}) => {
  const [rowData, setRowData] = useState<any>([]);
  const [values, setValues] = useState(null);
  const [searchedName, setSeachedName] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const params = getQueryParams();
    
    if (!params.id) return;

    const response = await request(`/customer/${params.id}`, token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setValues(response.data);
  };

  const colDefs: ColDef[] = [
    {
      headerName: "NIPT",
      field: "taxNumber",
      maxWidth: 120,
      cellStyle: {
        fontSize: 14,
        padding: 3,
      },
      cellRenderer: ({ data }: any) => {
        if (data.contactType === "Person") {
          return (
            <div className="flex items-center gap-2">
              <Image
                src="/svg/person.svg"
                alt="users_group"
                width={"0"}
                className="fill-gray-700	"
                height={"0"}
                style={{ width: 20, height: 20 }}
                priority
              />

              <span>{data.taxNumber}</span>
            </div>
          );
        }

        return (
          <div className="flex items-center gap-2">
            <Image
              src="/svg/building.svg"
              alt="users_group"
              width={"0"}
              height={"0"}
              style={{ width: 20, height: 20 }}
              className=""
              priority
            />

            <span>{data.taxNumber}</span>
          </div>
        );
      },
    },
    {
      headerName: "Full name",
      field: "displayName",
      minWidth: 100,
      flex: 1,
      cellStyle: {
        fontSize: 14,
        padding: 3,
      },
    },
  ];

  const onNameChange = (event) => {
    setSeachedName(event.target.value);
  };
  const onSearch = async () => {
    if (!searchedName) return;
    try {
      setLoading(true);
      const response = await request("/customer/ag", token, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          startRow: 0,
          endRow: 100,
          filterModel: {
            searchName: {
              filterType: "text",
              type: "contains",
              filter: searchedName,
            },
          },
          sortModel: [],
        }),
      });

      setRowData(response.data);
    } finally {
      setLoading(false);
    }
  };

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
          <div className="flex items-center gap-2 mt-2">
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

          <Spinner loading={loading}>
            <AgGrid<CustomerModel>
              heightClass="h-[350px]"
              rowSelection="single"
              domLayout="normal"
              onRowClicked={(params) => {
                setValues(params.data);
              }}
              rowData={rowData}
              colDefs={colDefs}
            />
          </Spinner>
        </div>
      </div>

      <div className="col-span-8 border-l-2 border-dashed pl-4">
        {values?.displayName ? (
          <div className=" flex items-center mb-4  h-8">
            <span className="text-lg flex items-center ">
              {" "}
              Te dhenat e klientit:{" "}
              <div className="italic pl-2 truncate max-w-40">
                {values?.displayName}
              </div>
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
        ) : (
          <div className="mb-4 h-8 text-sm text-gray-600 flex items-center gap-2">
            <Image
              src="/svg/info.svg"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 17, height: 17 }}
              priority
            />
            <span>(Zgjidh klientin ne tabelen ne te majte)</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Base
            label="Nipt i klientit"
            name="serial"
            value={values?.taxNumber}
          />
          <Base
            label="Emri i plote"
            name="serial"
            value={values?.displayName}
          />
          <Base
            label="Lloji i kontaktit"
            name="serial"
            value={values?.contactType}
          />
          <Base
            label="Numri i telefonit"
            name="serial"
            value={values?.phoneNumber}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-4">
            <Base label="Email" name="serial" value={values?.email} />
            <Base label="Gjinia" name="serial" value={values?.gender} />
            <Base
              label="Shtetesia"
              name="serial"
              value={values?.isLocal === true ? "Shqiptar" : "I huaj"}
            />

            <Base label="Atesia" name="serial" value={values?.fathersName} />
            <Base label="Ditelindja" name="serial" value={values?.birthday} />
            <Base label="Tjeter" name="serial" value={""} />
          </div>
          <div className="h-72">
            <CustomerDonut />
          </div>
        </div>
      </div>

      <div className="col-span-12  border-t-2 border-dashed">
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-4 ">{footer}</div>
          <div className="flex items-center gap-4">
            <DrawerClose asChild>
              <Button
                variant="outline"
                onClick={() => {
                  setRowData([]);
                  setValues(null);
                  setSeachedName(undefined);
                }}
              >
                Anullo veprimin
              </Button>
            </DrawerClose>
            <DrawerClose
              onClick={() => {
                onSave(values);
              }}
              asChild
            >
              <Button variant="default">Ruaj dhe apliko</Button>
            </DrawerClose>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
