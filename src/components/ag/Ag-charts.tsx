import { AgChartProps, AgChartsReact } from "ag-charts-react";

interface IProps<T> extends AgChartProps{

}

function AgCharts<T>({ ...props }: IProps<T>) {
    return (
        <AgChartsReact {...props} />
    )
}

export default AgCharts;