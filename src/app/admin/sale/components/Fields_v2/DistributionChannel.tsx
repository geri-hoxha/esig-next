import { IOptions } from "@/components/esig/Fields/type";
import Base from "./Base";

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

  return <Base name="distributionChannel" label="Distribution Channel" options={options} />;
}
