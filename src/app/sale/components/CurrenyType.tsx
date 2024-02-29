import Select from "@/components/esig/Fields/Select";
import { IOptions } from "@/components/esig/Fields/type";

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

  return (
    <Select
      label="Currency Type"
      placeholder="Currency Type"
      options={options}
    />
  );
}
