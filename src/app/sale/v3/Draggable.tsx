import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Base from "../components/Fields_v2/Base";
import numeral from "numeral";
import { DELETE, SET, UPDATE } from "@/context/reducer";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { GridApi } from "ag-grid-enterprise";

const Draggable = ({ baseUsers, percentageKey, dispatch, stateKey }) => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState<GridApi>();
  const { toast } = useToast();

  const onPercentageChange = (e, data) => {
    const value = Number(e.target.value ?? 0) / 100;

    const leaderParticipant = rowData.at(0);

    if (value > leaderParticipant[percentageKey]) {
      return toast({
        variant: "destructive",
        title: `Perqindja nuk mund te jete me e madhe se perqindja e liderit!`,
      });
    }

    const users = rowData.map((item: any) => {
      if (item.id === data.id) {
        return {
          ...item,
          [percentageKey]: value,
        };
      }

      return item;
    });

    const sum = users.reduce((accumulator, currentValue, index) => {
      if (index === 0) return 0;
      return accumulator + currentValue[percentageKey];
    }, 0);

    const users2 = users.map((item: any) => {
      if (item.id === leaderParticipant.id) {
        return {
          ...leaderParticipant,
          [percentageKey]: 1 - sum,
        };
      }

      return item;
    });

    setRowData(users2);

    dispatch({
      type: SET,
      payload: {
        key: stateKey,
        item: users2,
      },
    });
  };

  const deleteParticipant = (data: any) => {
    dispatch({
      type: DELETE,
      payload: {
        key: stateKey,
        identifier: { value: data.id },
      },
    });

    const leaderParticipant = rowData.at(0);

    const x = [...rowData].filter((item) => item.id !== data.id);

    toast({
      title: `Pjesemarresi: ${data.displayName} u fshi nga lista!`,
      description: "Klikoni 'Undo' nese ishte gabimisht.",
      action: (
        <ToastAction
          className="bg-esig text-white hover:bg-esig-fluorite"
          onClick={() => {
            // using the power of closures
            dispatch({
              type: SET,
              payload: { key: stateKey, item: baseUsers },
            });

            setRowData(rowData);
          }}
          altText="Goto schedule to undo"
        >
          Undo
        </ToastAction>
      ),
    });

    const sum = x.reduce((accumulator, currentValue, index) => {
      if (index === 0) return 0;
      return accumulator + currentValue[percentageKey];
    }, 0);

    const users2 = x.map((item: any) => {
      if (item.id === leaderParticipant.id) {
        return {
          ...leaderParticipant,
          [percentageKey]: 1 - sum,
        };
      }

      return item;
    });

    dispatch({
      type: UPDATE,
      payload: {
        key: stateKey,
        item: {
          ...leaderParticipant,
          [percentageKey]: 1 - sum,
        },
        identifier: { value: leaderParticipant.id },
      },
    });

    setRowData(users2);
  };

  const Ome = ({ node, data }) => {
    console.log(data);

    return (
      <>
        <div className={`flex flex-col  border-l  pb-5 pl-5 `}>
          {node.rowIndex === 0 && (
            <div className="mt-2 flex items-center" style={{ lineHeight: 0 }}>
              <Image
                src="/svg/info.svg"
                alt="edit"
                width={"0"}
                height={"0"}
                style={{ width: 20, height: 20 }}
                priority
              />
              <span className="text-esig font-bold pl-2">Lider</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-4  mt-2 mb-4 ">
            <span className="font-bold text-lg text-gray-600 truncate w-3/5">
              {data.displayName}
            </span>

            {node.rowIndex !== 0 && (
              <button
                onClick={() => deleteParticipant(data)}
                className="w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none text-esig-error hover:bg-red-50 transition-all duration-100"
              >
                <div className="flex items-center gap-x-1">
                  <Image
                    src="/svg/close.svg"
                    alt="edit"
                    width={"0"}
                    height={"0"}
                    style={{ width: 20, height: 20 }}
                    priority
                  />
                  <span>Fshij</span>
                </div>
              </button>
            )}
          </div>
          <Base
            className="bg-red-0"
            label="Perqindja"
            value={numeral(Number((data[percentageKey] ?? 0) * 100)).format(
              "0.00"
            )}
            suffix={"%"}
            readOnly={node.rowIndex === 0}
            onChange={(e) => onPercentageChange(e, data)}
          />
        </div>
      </>
    );
  };

  const columnDefs = [
    {
      field: "displayName",
      rowDrag: true,
      flex: 1,
      cellRenderer: Ome,
    },
  ];

  const defaultColDef = useMemo(() => {
    return {
      width: 170,
      filter: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    baseUsers.forEach(function (dataItem: any, index) {
      dataItem.rowHeight = index === 0 ? 135 : 110;
    });

    setRowData(baseUsers);

    setGridApi(params.api);
  }, []);

  const getRowHeight = useCallback((params) => {
    return params.data.rowHeight;
  }, []);

  const onRowDragEnd = (event) => {
    event.api.refreshCells({ force: true });

    let rowData = [];
    event.api.forEachNode((node) => rowData.push(node.data));

    rowData.forEach(function (dataItem: any, index) {
      dataItem.rowHeight = index === 0 ? 135 : 110;
    });

    setRowData(rowData);
  };

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={"ag-theme-alpine drag"}>
        <AgGridReact
          domLayout="autoHeight"
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowDragManaged
          headerHeight={0}
          onGridReady={onGridReady}
          getRowHeight={getRowHeight}
          getRowStyle={(params) => {
            if (params.node.rowIndex === 0) {
              return { background: "#E8F5FE" };
            }
            return { background: "#fff" };
          }}
          onRowDragEnd={onRowDragEnd}
        />
      </div>
    </div>
  );
};

export default Draggable;
