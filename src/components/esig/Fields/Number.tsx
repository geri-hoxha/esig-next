import { Input } from "@/components/ui/input";
import { IProps } from "./type";
import { Label } from "@/components/ui/label";

export function Number({ label, placeholder }: IProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <Label>{label}</Label>
      <Input type="number" placeholder={placeholder} />
    </div>
  );
}
