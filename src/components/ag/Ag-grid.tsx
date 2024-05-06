import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { ColDef, GridOptions } from "ag-grid-enterprise";
import { ColGroupDef } from "ag-grid-community";

interface IProps<T> extends GridOptions<T> {
  className?: string;
}

function AgGrid<T>({ className = 'h-[500px]', ...props }: IProps<T>) {
  return (
    // wrapping container with theme & size
    <div
      className={`${className} ag-theme-quartz`} // applying the grid theme
    >
      {/*  @ts-ignore */}
      <AgGridReact<T>
        {...props}
      />
    </div>
  );
}

export default AgGrid;
