import { Input } from "@/components/ui/input";
import { IProps } from "./type";
import { Label } from "@/components/ui/label";

export function Text({ label, placeholder }: IProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <Label>{label}</Label>
      <Input type="text" placeholder={placeholder} />
    </div>
  );
}
