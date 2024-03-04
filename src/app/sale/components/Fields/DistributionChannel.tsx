import Select from "@/components/esig/Fields/Select";
import { IOptions } from "@/components/esig/Fields/type";

export default function DistributionChannel() {
  const options: IOptions[] = [
    {
      key: "BANK",
      value: "BANK",
    },
    {
      key: "BROKER",
      value: "BROKER",
    },
    {
      key: "AGJENT",
      value: "AGJENT",
    },
  ];

  return (
    <Select
      label="Distribution Channel"
      placeholder="Distribution Channel"
      options={options}
    />
  );
}
