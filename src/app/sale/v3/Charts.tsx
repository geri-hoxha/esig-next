import { AgChartsReact } from "ag-charts-react";
import { useState } from "react";
import { AgChartOptions } from "ag-charts-community";
import 'ag-charts-enterprise';

import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey('your_license_key');

const data = [
  {
    name: "Premium",
    premium: 300,
  },
  {
    name: "Sum Insured",
    sumInsured: 3000,
  },
];

const SimpleChartBar = () => {
  const [options, setOptions] = useState<AgChartOptions>({
    autoSize: true,
    data: data,
    theme: "ag-polychroma",
    series: [
      {
        type: "bar",
        direction: "horizontal",
        xKey: "name",
        yKey: "premium",
        yName: "Premium",
        showInLegend: false,
      },
      {
        type: "bar",
        direction: "horizontal",
        xKey: "name",
        yKey: "sumInsured",
        yName: "Sum Insured",
        showInLegend: false,
      },
    ],
  });

  return (
    <div className="h-36 -mt-5">
      <AgChartsReact options={options} />
    </div>
  );
};

const RangeBar = () => {
  const [options, setOptions] = useState<AgChartOptions>({
    data: [
      { department: "Franzhiza", low: 500, high: 2700 },
      { department: "Pjesa e zbritshme", low: 0, high: 6000 },
      { department: "Ne ngjarje", low: 0, high: 0 },
      { department: "Ne persona", low: 2000, high: 5000 },
      { department: "Ne periudhe", low: 1000, high: 4000 },

    ],
    series: [
      {
        type: "range-bar",
        xKey: "department",
        yLowKey: "low",
        yHighKey: "high",
        label: {
          padding: 10,
          formatter: ({ itemId, value }) => {
            return `$${value.toFixed(0)}K ${itemId === "low" ? "↓" : "↑"}`;
          },
        },
      },
    ],
  });

  return (
    <div className="h-96 my-5">
      <AgChartsReact debug options={options} />
    </div>
  );
};

export { SimpleChartBar, RangeBar };
