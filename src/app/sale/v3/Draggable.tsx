import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Base from "../components/Fields_v2/Base";

const Draggable = ({baseUsers}) => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "displayName",
      rowDrag: true,
      flex: 1,
      cellRenderer: ({ node, data }) => {
        return (
          <>
            <div className={`flex flex-col  border-l  pb-5 pl-5 `}>
              {node.rowIndex === 0 && (
                <div
                  className="mt-2 flex items-center"
                  style={{ lineHeight: 0 }}
                >
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

                <button className="w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none text-esig-error hover:bg-red-50 transition-all duration-100">
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
              </div>
              <Base
                className="bg-red-0"
                label="Perqindja"
                value={data.percentage}
              />
            </div>
          </>
        );
      },
    },
  ]);

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
