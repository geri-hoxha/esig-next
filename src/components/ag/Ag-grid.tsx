import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import { useState } from "react";
import type { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { ColGroupDef, GridOptions } from "ag-grid-enterprise";

interface IProps<T>  extends GridOptions {
  rowData: T[];
  colDefs: (ColDef<T> | ColGroupDef<T>)[] | null;
  heightClass?: string;
}

function AgGrid<T>({ rowData, colDefs, heightClass = 'h-[500px]', ...other }: IProps<T>) {

  return (
    // wrapping container with theme & size
    <div
      className={`${heightClass} ag-theme-quartz`} // applying the grid theme
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        {...other}
       />
    </div>
  );
}

export default AgGrid;
