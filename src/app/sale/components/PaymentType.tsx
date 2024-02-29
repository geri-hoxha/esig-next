import Select from "@/components/esig/Fields/Select";
import { IOptions } from "@/components/esig/Fields/type";

export default function PaymentType() {
  const options: IOptions[] = [
    {
      key: "CSH",
      value: "CSH",
    },
    {
      key: "UXH",
      value: "UXH",
    },
  ];

  return (
    <Select
      label="Payment Type"
      placeholder="Payment Type"
      options={options}
    />
  );
}
