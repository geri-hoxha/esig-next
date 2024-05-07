'use client'

import Image from "next/image";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import { ChangeEvent, useEffect, useState } from "react";
import Loader from "../components/Loader";
import AgGrid from "@/components/ag/Ag-grid";
import { CustomerModel } from "../type";
import { RowClickedEvent, ColDef } from "ag-grid-enterprise";
import _request from "@/request";
import { token } from "@/components/esig/Navbar/Currencies";
import { useFormContext } from "react-hook-form";

const columnDefs: ColDef<CustomerModel>[] = [
  {
    headerName: "NIPT",
    field: "taxNumber",
    maxWidth: 120,
    cellStyle: {
      fontSize: 14,
      padding: 3,
    },
    cellRenderer: ({ data }: any) => {
      return (
        <div className="flex items-center gap-2">
          <Image
            src={`${
              data.contactType === "Person"
                ? "/svg/person.svg"
                : "/svg/building.svg"
            }`}
            alt="contactType"
            width={"0"}
            className="fill-gray-700	"
            height={"0"}
            style={{ width: 20, height: 20 }}
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

const Table: React.FC = () => {
  const { reset } = useFormContext<CustomerModel>();

  const [rowData, setRowData] = useState<CustomerModel[]>([]);

  const [radioGroup, setRadioGroup] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [searchedValue, setSeachedValue] = useState<string>("");

  useEffect(() => {
    return () => {
      setRowData([]);
      setSeachedValue("");
      reset();
    };
  });

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSeachedValue(event.target.value);
  };

  const radioGroupChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setRadioGroup(event.target.value);
  };

  const onRowClicked = (params: RowClickedEvent<CustomerModel>) => {
    reset(params.data); // update your defaultValues && form values
  };

  const onSearchClick = async () => {
    if (!searchedValue) return;

    try {
      setLoading(true);

      const response = await _request("/customer/ag", token, {
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
              filter: searchedValue,
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
    <div className="flex flex-col  gap-4">
      <Checkbox
        type="radio"
        id="search"
        defaultChecked
        value="searchWithName"
        checked={radioGroup === "searchWithName"}
        onChange={radioGroupChange}
      >
        <>Kerko me emer</>
      </Checkbox>
      <Checkbox
        type="radio"
        id="search"
        value="searchWithNipt"
        checked={radioGroup === "searchWithNipt"}
        onChange={radioGroupChange}
      >
        <>Kerko me Nipt</>
      </Checkbox>
      <div className="flex items-center gap-2 mt-2">
        <Input label="Emri / Nipt i klientit" onChange={onSearchChange} />
        <div className="bg-esig p-2 rounded-md" onClick={onSearchClick}>
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
      <Loader loading={loading}>
        <AgGrid<CustomerModel>
          className="h-[150px] md:h-[350px]"
          rowSelection="single"
          domLayout="normal"
          onRowClicked={onRowClicked}
          rowData={rowData}
          columnDefs={columnDefs}
        />
      </Loader>
    </div>
  );
};

export default Table;
