import React, { memo, useCallback, useMemo, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { IParticipantsList } from "./List";
import AgGrid from "@/components/ag/Ag-grid";
import { CustomerModel } from "../type";
import { useCoreContext } from "../context";
import CustomCellRenderer from "./CustomCellRenderer";
import { isPolicyHolder } from ".";
import {
  GridReadyEvent,
  IRowNode,
  RowDragEvent,
  RowHeightParams,
} from "ag-grid-enterprise";

export interface SortableParticipant extends CustomerModel {
  rowHeight?: number | null;
  ownershipPercentage?: number;
  invoiceSplitPercentage?: number;
}

const SortableTable: React.FC<IParticipantsList> = ({
  percentageKey,
  stateKey,
}) => {
  const { data: coreData } = useCoreContext();

  const data: SortableParticipant[] = coreData[stateKey];

  const [rowData, setRowData] = useState<SortableParticipant[]>([]);

  const { toast } = useToast();

  const defaultColDef = useMemo(() => {
    return {
      width: 170,
      filter: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    data.forEach((user: SortableParticipant, index) => {
      user.rowHeight = index === 0 && isPolicyHolder(user) ? 135 : 110;
    });

    setRowData(data as SortableParticipant[]);
  }, []);

  const getRowHeight = useCallback(
    (
      params: RowHeightParams<SortableParticipant>
    ): number | undefined | null => {
      return params.data?.rowHeight;
    },
    []
  );

  const onRowDragEnd = (event: RowDragEvent<SortableParticipant>) => {

    let rowData: SortableParticipant[] = [];

    event.api.forEachNode((node: IRowNode<SortableParticipant>) => {
      if (!node.data) return;
      rowData.push(node.data);
    });

    rowData.forEach(function (dataItem: any, index) {
      dataItem.rowHeight = index === 0 && isPolicyHolder(dataItem) ? 135 : 110;
    });

    setRowData(rowData);

    event.api.refreshCells({ force: true });

  };

  return (
    <div className={"ag-grid-drag"}>
      <AgGrid<SortableParticipant>
        className=''
        domLayout="autoHeight"
        rowData={rowData}
        columnDefs={[
          {
            field: "displayName",
            rowDrag: true,
            flex: 1,
            cellRenderer: CustomCellRenderer,
            cellRendererParams: {
              percentageKey,
              stateKey,
              toast,
              rowData,
              setRowData
            },
          },
        ]}
        defaultColDef={defaultColDef}
        rowDragManaged
        headerHeight={0}
        onGridReady={onGridReady}
        getRowHeight={getRowHeight}
        onRowDragEnd={onRowDragEnd}
        getRowStyle={(params) => {
          
          if (params.node.rowIndex === 0 && isPolicyHolder(params.data)) {
            return { background: "#E4F2FD" };
          }
          return { background: "#fff" };
        }}
      />
    </div>
  );
};

export default SortableTable;
