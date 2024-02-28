"use client";
import React, { useState } from "react";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";

function getData() {
  return [
    { asset: "Sales", amount: 75000 },
    { asset: "Claims", amount: 25000 },
  ];
}

// Chart Component
const ChartExample = () => {
  // Chart Options: Control & configure the chart
  const [chartOptions, setChartOptions] = useState<AgChartOptions>({
    // Data: Data to be displayed in the chart
    data: [
      { month: "Jan", avgTemp: 2.3, iceCreamSales: 162000 },
      { month: "Mar", avgTemp: 6.3, iceCreamSales: 302000 },
      { month: "May", avgTemp: 16.2, iceCreamSales: 800000 },
      { month: "Jul", avgTemp: 22.8, iceCreamSales: 1254000 },
      { month: "Sep", avgTemp: 14.5, iceCreamSales: 950000 },
      { month: "Nov", avgTemp: 8.9, iceCreamSales: 200000 },
    ],
    // Series: Defines which chart type and data to use
    series: [{ type: "bar", xKey: "month", yKey: "iceCreamSales" }],
  });

  const [options, setOptions] = useState<AgChartOptions>({
    data: getData(),
    title: {
      text: "Raporti shitje/deme",
    },
    series: [
      {
        type: "pie",
        angleKey: "amount",
        calloutLabelKey: "asset",
        sectorLabelKey: "amount",
        sectorLabel: {
          color: "white",
          fontWeight: "bold",
          formatter: ({ value }: any) => `$${(value / 1000).toFixed(0)}K`,
        },
      },
    ],
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
      <div>
        <AgChartsReact options={chartOptions} />
      </div>
      <div>
        <AgChartsReact options={options} />
      </div>
    </div>
  );
};

export default ChartExample;
