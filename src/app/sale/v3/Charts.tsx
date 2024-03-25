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

 

function getData() {
  return [
    { asset: "Franzhisa", amount: 60000 },
    { asset: "Pjesa e zbritshme", amount: 40000 },
    { asset: "Ne ngjarje", amount: 30500 },
  ];
}

const RangeBar = () => {
  return (
    <AgChartsReact
      options={{
        data: getData(),
        title: {
          text: "Primi 300 Euro ka keto limite:",
          fontSize: 12,
          fontWeight: 'bold',
          },
        legend: {
          enabled: true,
          item: {
            label: {
            //   formatter: (params) => {
            //     return "my legend goes here";
            //   },
            },
          },
        },
        series: [
          {
            type: "donut",
            calloutLabelKey: "asset",
            angleKey: "amount",
            calloutLabel: {
              formatter: (params) => {
                return params.value;
              },
            },
            calloutLine: {
              length: 10,
              colors: ["#005CA9", "#9B8AB8", '#008C89']
            },
            fills: ["#005CA9", "#9B8AB8", "#008C89"],
            innerRadiusRatio: 0.8,
            calloutLabelName: "23423",
            innerLabels: [
              {
                text: "SI: 200.000 Euro",
                color: "#005CA9"
              },
            ],
            innerCircle: {
              fill: "#f0f9ff",
            },
          },
        ],
      }}
    />
  );
};

const SublimitsChart = () => {
  const [options, setOptions] = useState<AgChartOptions>({
    autoSize: true,
    data: [
      {
        name: "Nenmbulimi 1",
        sublimit1: 3000,
      },
      {
        name: "Nenmbulimi 2",
        sublimit2: 5000,
      },
      {
        name: "Nenmbulimi 3",
        sublimit3: 7000,
      },
      {
        name: "Nenmbulimi 4",
        sublimit4: 2000,
      },
    ],
    theme: "ag-polychroma",
    series: [
      {
        type: "bar",
        direction: "horizontal",
        xKey: "name",
        yKey: "sublimit1",
        yName: "sublimit1",
        showInLegend: false,
      },
      {
        type: "bar",
        direction: "horizontal",
        xKey: "name",
        yKey: "sublimit2",
        yName: "sublimit2",
        showInLegend: false,
      },
 
      {
        type: "bar",
        direction: "horizontal",
        xKey: "name",
        yKey: "sublimit3",
        yName: "sublimit3",
        showInLegend: false,
      },
      {
        type: "bar",
        direction: "horizontal",
        xKey: "name",
        yKey: "sublimit4",
        yName: "sublimit4",
        showInLegend: false,
      },
 
    ],
  });

  return (
      <AgChartsReact options={options} />
  );
}


export { SimpleChartBar, RangeBar, SublimitsChart };
