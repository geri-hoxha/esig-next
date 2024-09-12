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
import Geri from "./Geri";
import { ITooltipParams } from "ag-grid-community";

const Tooltip: React.FC<{ value: string }> = ({ value }) => {
  console.log(value);
  return (
    <div>
      <span>{value}</span>
    </div>
  );
};

const Rules = () => {
  const [entities, setEntities] = useState<string[][]>([]);
  const [rowData, setRowData] = useState({});
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [erin, setErin] = useState({});

  useEffect(() => {
    init();
  }, []);

  const init = async (arg: string = "", _index: number = 0) => {
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

        return updatedSelectedValue.map((value, i) => {
          return {
            selectedType: value,
            selectedId: erin?.[i] || "",
          };
        });
      }

      return [];
    };

    const response = await request("/common/rules/definitions", {
      method: "POST",
      body: getParams(),
    });

    if (modifiedEntity < entities.length) {
      const updated = entities.map((entity, index) => {
        if (response.nextTypes.length === 0 && index > _index) {
          return [];
        }

        if (_index + 1 === index) {
          return response.nextTypes;
        }

        return entity;
      });

      return setEntities(updated.filter((x) => x.length > 0));
    }

    if (response.nextTypes.length === 0) return;

    setEntities([...entities, response.nextTypes]);

    const ome = response.currentObjects.map((x) => {
      return {
        ...x,
        for: "Agency",
        overwrite: ["Product", "ProductTemplate"],
        value__: "TRUE",
      };
    });

    setRowData({
      ...rowData,
      [_index]: ome.filter((x) => x.originalType === arg),
    });
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
                  icon={
                    <div
                      className={`w-3 h-3 rounded-full  ml-2 ${
                        index === 0
                          ? "bg-sky-400"
                          : index === 1
                          ? "bg-orange-400"
                          : "bg-green-400"
                      }`}
                    ></div>
                  }
                  label="Entiteti"
                  onChange={(e) => {
                    init(e.target.value, index);
                  }}
                />
              );
            })}
          </div>
          <div className="grid grid-cols-4 gap-4 mt-5">
            {entities.map((x, i: number) => {
              if (!selected[i]) return null;
              return (
                <Geri
                  ger={erin[i]}
                  options={rowData[i]}
                  icon={
                    <div
                      className={`w-3 h-3 rounded-full  ml-2 ${
                        i === 0
                          ? "bg-sky-400"
                          : i === 1
                          ? "bg-orange-400"
                          : "bg-green-400"
                      }`}
                    ></div>
                  }
                  onChange={(e) => {
                    setErin({
                      ...erin,
                      [i]: e,
                    });
                  }}
                  label={selected[i]}
                />
              );
            })}
          </div>
          <br />
          <AgGrid
            className="h-[150px] md:h-[370px]"
            rowSelection="single"
            domLayout="normal"
            rowData={rowData[0]}
            columnDefs={
              [
                {
                  headerName: "Emri",
                  field: "key ",
                  minWidth: 300,
                  cellRenderer: ({ data, ...other }) => {
                    if (other.rowIndex === 0) {
                      return (
                        <div className="flex flex-col truncate justify-center h-full">
                          <span className="font-medium leading-8">
                            can.Sell-product
                          </span>
                          <div className="leading-6 h-20 truncate break-words">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting <br /> industry. Lorem Ipsum has been
                            the industry's standard dummy text ever <br /> since
                            the 1500s, when an unknown printer took a galley of
                            type and scrambled it to make a type
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div className="flex flex-col truncate justify-center h-full">
                        <span className="font-medium leading-8">
                          can.Adjust-premium-product
                        </span>
                        <div className="leading-6 h-20 truncate break-words">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting <br /> industry. Lorem Ipsum has been the
                          industry's standard dummy text ever
                        </div>
                      </div>
                    );
                  },
                },
                {
                  headerName: "Zgjedhja",
                  field: "for",
                  tooltipComponent: "customTooltip",
                  tooltipValueGetter: (params: ITooltipParams) => {
                    return (
                      <div className="bg-white border p-4 rounded-md border-gray-400 flex flex-col gap-5 max-w-xs">
                        <span>
                          <span className="font-bold">1. Minikasco</span>Lorem
                          Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum
                        </span>

                        <span>
                          <span className="font-bold">2. Skerdi Jareci</span>Lorem
                          Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum
                        </span>

                      </div>
                    );
                  },
                  cellRenderer: ({ value, rowIndex }) => {
                    if (rowIndex === 0) {
                      return (
                        <div className="flex flex-col gap-5 h-full justify-center">
                          <span className="leading-none border-b-4 font-medium w-max pb-0 border-sky-400">
                            Minikasko
                          </span>
                          <span className="leading-none border-b-4 font-medium w-max pb-0 border-orange-400">
                            Erin Hoxha
                          </span>
                        </div>
                      );
                    }
                    return (
                      <div className="flex flex-col gap-3 h-full justify-center">
                        <span className="leading-none border-b-4 font-medium w-max pb-0 border-sky-400">
                          Minikasko
                        </span>
                      </div>
                    );
                  },
                },
                {
                  headerName: "Mund te mbishkruhet nga",
                  field: "overwrite",
                  cellRenderer: ({ value, rowIndex }) => {
                    return (
                      <div className="flex items-center  cursor-pointer h-full">
                        {value.map((x, i) => {
                          if (i === 0) {
                            return (
                              <>
                                <span className="text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-green-400 bg-green-100 text-green-800">
                                  {x}
                                </span>
                                +
                              </>
                            );
                          }
                          return (
                            <span className="ml-2   text-xs font-medium me-2 px-2.5 py-0.5 rounded   border border-orange-400 bg-orange-100 text-orange-800">
                              {x}
                            </span>
                          );
                        })}
                      </div>
                    );
                  },
                },
                {
                  headerName: "Vlera aktuale",
                  field: "value",
                  cellRenderer: () => {
                    return (
                      <div className="flex items-center justify-center h-full">
                        <Checkbox checked={true} />
                      </div>
                    );
                  },
                },
                {
                  headerName: "Te gjitha vlerat",
                  field: "all",
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
                          src="/svg/eye.svg"
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
              ] as ColDef[]
            }
            defaultColDef={{
              resizable: false,
              flex: 1,
            }}
            rowHeight={120}
            tooltipShowDelay={500}
            components={{
              customTooltip: Tooltip,
            }}
            tooltipMouseTrack 
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
              resizable: true,
              flex: 1,
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default Rules;
