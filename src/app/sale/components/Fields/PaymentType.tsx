import { IOptions } from "@/components/esig/Fields/type";
import Base from "./Base";

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

  return <Base name="paymentType" label="Payment Type" options={options} />;
}
