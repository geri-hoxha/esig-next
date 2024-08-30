"use client";
import AgGrid from "@/components/ag/Ag-grid";
import { ColDef } from "ag-grid-enterprise";
import Select from "../components/Select";
import FormProvider from "../context/FormProvider";
import { useCallback, useEffect, useState } from "react";
import Checkbox from "../components/Checkbox";
import { request } from "@/request";
import Image from "next/image";
import Modal from "../components/Modal";
import Input from "../components/Input";

const Rules = () => {
  const [entities, setEntities] = useState<string[][]>([]);
  const [rowData, setRowData] = useState([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    init();
  }, []);

  const getRowData = async (arg: string) => {
    const rowdata = await fetch(
      `https://apigerit.esig.al/sales/rules?param1=${arg}`,
      {
        method: "GET",
      }
    );
    const x = await rowdata.json();

    setRowData(x.value.objects);
  };

  const init = async (arg: string = "", _index: number = 0) => {
    if (!!arg) {
      getRowData(arg);
    }

    const modifiedEntity = _index + 1;

    const getParams = () => {
      if (!!arg) {
        let updatedSelectedValue;

        if (modifiedEntity > selected.length) {
          updatedSelectedValue = [...selected, arg];
        } else {
          updatedSelectedValue = selected
            .map((s, index) => {
              if (_index === index) {
                return arg;
              }

              if (index > _index) return "";

              return s;
            })
            .filter((s) => !!s);
        }

        setSelected(updatedSelectedValue);

        return updatedSelectedValue.map((value) => {
          return {
            objectType: value,
            objectId: "",
          };
        });
      }

      return [];
    };

    const response = await request("/sales/rules/next-type", {
      method: "POST",
      body: {
        currentTypes: [...getParams()],
      },
    });

    if (modifiedEntity < entities.length) {
      const updated = entities.map((entity, index) => {
        if (response.value.nextTypes.length === 0 && index > _index) {
          return [];
        }

        if (_index + 1 === index) {
          return response.value.nextTypes;
        }

        return entity;
      });

      return setEntities(updated.filter((x) => x.length > 0));
    }

    if (response.value.nextTypes.length === 0) return;

    setEntities([...entities, response.value.nextTypes]);
  };

  return (
    <>
      <FormProvider>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-4 gap-4">
            {entities.map((entity, index) => {
              return (
                <Select
                  key={index}
                  value={""}
                  options={entity.map((x) => {
                    return {
                      key: x,
                      value: x,
                    };
                  })}
                  label="Entiteti"
                  onChange={(e) => {
                    init(e.target.value, index);
                  }}
                />
              );
            })}
          </div>
          <AgGrid
            className="h-[150px] md:h-[370px]"
            rowSelection="single"
            domLayout="normal"
            rowData={rowData}
            columnDefs={
              [
                {
                  headerName: "Celesi",
                  field: "key",
                },
                {
                  headerName: "Pershkrimi",
                  field: "description",
                },
                {
                  headerName: "For",
                  field: "for",
                  // cellRenderer: ({ value }) => {
                  //   return (
                  //     <div className="flex items-center   h-full">
                  //       <Checkbox checked={value}></Checkbox>
                  //     </div>
                  //   );
                  // },
                },
                {
                  headerName: "Numri i rregullave",
                  field: "number",
                  cellRenderer: ({ value, rowIndex }) => {
                    return (
                      <div
                        className="flex items-center gap-2 cursor-pointer hover:text-esig hover:font-semibold"
                        onClick={() => {
                          setOpen(true);
                        }}
                      >
                        <Image
                          className="cursor-pointer"
                          src="/svg/edit.svg"
                          alt="edit"
                          width={"0"}
                          height={"0"}
                          style={{ width: 17, height: 17 }}
                          priority
                        />
                        {rowIndex + 2} rregulla
                      </div>
                    );
                  },
                },
                // {
                //   headerName: "Niveli",
                //   field: "overriders",
                //   cellRenderer: ({ value, data }) => {
                //     if (value.length === 0) return;
                //     return [data.for, ...value]?.join(" > ");
                //   },
                // },
              ] as ColDef[]
            }
            defaultColDef={{
              resizable: false,
              flex: 1,
            }}
          />
        </div>
      </FormProvider>

      <Modal
        title="Konfiguro rregullat"
        description="Ketu mund te zgjidhni/modikoni konfigurimet e sistemit."
        open={open}
        setOpen={useCallback((arg: boolean) => {
          setOpen(arg);
        }, [])}
        onOk={() => {}}
        destroyOnClose
      >
        <div className="flex flex-col gap-4 my-4">
          <span className="font-semibold text-esig text-lg">
           1. Can Adjust Premium
          </span>
          <div className="flex items-center gap-5">
            <span className="font-semibold w-full">
             2. Niveli: TPL / Varianti 3 / Ilir Dosti
            </span>
            {/* <Input label="Vlera e re" /> */}
            <Checkbox checked={false} />
          </div>
          <span className="font-medium ">
            -- Vlera me siper do te mbishkruaje TPL / Varianti 3 per te gjithe
            agjentet
          </span>
          <AgGrid
            className="h-[200px]"
            rowSelection="single"
            domLayout="normal"
            rowData={[
              {
                name: "Ilir Dosti",
              },
              {
                name: "Makbule Dosti",
              },
              {
                name: "Filan Fisteku",
              },
            ]}
            columnDefs={
              [
                {
                  headerName: "Emri",
                  field: "name",
                },
                {
                  headerName: "Vlera",
                  field: "Can adjust premium",
                  cellRenderer: () => {
                    return (
                      <div className="flex items-center justify-center h-full">
                        <Checkbox checked={true} />
                      </div>
                    );
                  },
                },
              ] as ColDef[]
            }
            defaultColDef={{
              resizable: false,
              flex: 1,
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default Rules;
