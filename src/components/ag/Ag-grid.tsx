import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import { useState } from "react";
import type { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

interface IProps<T> {
  rowData: T[];
  colDefs: ColDef[];
}

function AgGrid<T>({ rowData, colDefs }: IProps<T>) {

  return (
    // wrapping container with theme & size
    <div
      className="max-h-[500px] ag-theme-quartz" // applying the grid theme
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        domLayout="autoHeight"
      />
    </div>
  );
}

export default AgGrid;
