import AgCharts from "@/components/ag/Ag-charts";

function getData() {
  return [
    { asset: "Prime", amount: 60000 },
    { asset: "Deme", amount: 40000 },
    { asset: "Detyrime", amount: 30500 },
  ];
}

const CustomerChart = () => {
  return (
    <AgCharts
      options={{
        data: getData(),
        title: {
          text: "01/01/2024 - 16/03/2024 ",
          fontSize: 12,
          fontWeight: "bold",
        },
        legend: {
          enabled: true,
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
              colors: ["#005CA9", "#9B8AB8", "#008C89"],
            },
            fills: ["#005CA9", "#9B8AB8", "#008C89"],
            innerRadiusRatio: 0.8,
            calloutLabelName: "23423",
            innerLabels: [
              {
                text: "PAMJE 360°",
                color: "#005CA9",
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

export default CustomerChart;
