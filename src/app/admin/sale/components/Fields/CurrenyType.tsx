import { IOptions } from "@/components/esig/Fields/type";
import Base from "./Base";

export default function CurrencyType() {
  const options: IOptions[] = [
    {
      key: "ALL",
      value: "ALL",
    },
    {
      key: "EUR",
      value: "EUR",
    },
    {
      key: "USD",
      value: "USD",
    },
  ];

  return <Base name="currencyType" label="Currency Type" options={options} />;
}
