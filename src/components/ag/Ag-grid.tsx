import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional Theme applied to the grid
import { ColDef, GridOptions, ColGroupDef } from "ag-grid-enterprise";

interface IProps<T> extends GridOptions<T> {
  className?: string;
}

export interface FilterModel {
  filterType: string;
  type: string | null;
  filter: any | null;
  filterTo: number | null;
  dateFrom: string | null;
  dateTo: string | null;
  values: string[] | null;
  operator: string | null;
  condition1: FilterModel | null;
  condition2: FilterModel | null;
}

export const getAgPayload = (
  filterModel: { [key: string]: Partial<FilterModel> } = {}
) => {
  return JSON.stringify({
    startRow: 0,
    endRow: 100,
    filterModel,
    sortModel: [],
  });
};

function AgGrid<T>({ className = '', ...props }: IProps<T>) {
  return (
    // wrapping container with theme & size
    <div
      className={`${className} ag-theme-alpine`} // applying the grid theme
    >
      {/*  @ts-ignore */}
      <AgGridReact<T> {...props} />
    </div>
  );
}

export default AgGrid;
