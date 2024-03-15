import React, { Fragment, useState } from "react";
import { createRoot } from "react-dom/client";
import { AgChartsReact } from "ag-charts-react";

function getData() {
  return [
    { asset: "Prime", amount: 60000 },
    { asset: "Deme", amount: 40000 },
  ];
}

const CustomerDonut = () => {
  return (
    <AgChartsReact
      options={{
        data: getData(),
        title: {
          text: "Raporti Prime / Deme",
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
              colors: ["#005CA9", "#9B8AB8"]
            },
            fills: ["#005CA9", "#9B8AB8"],
            innerRadiusRatio: 0.8,
            calloutLabelName: "23423",
            innerLabels: [
              {
                text: "PAMJE 360 ° ",
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

export default CustomerDonut;
