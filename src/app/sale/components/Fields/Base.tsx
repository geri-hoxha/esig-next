import { IOptions } from "@/components/esig/Fields/type";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HTMLInputTypeAttribute } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Datepicker from "@/components/esig/Fields/Datepicker";

export interface IField {
  name: string;
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  options?: IOptions[];
}

const Base = ({
  name,
  label,
  placeholder,
  type = "text",
  options = [],
}: IField) => {
  return (
    <div>
      {label ? (
        <Label className="text-xs uppercase font-mono" htmlFor={name}>
          {label}
        </Label>
      ) : null}
      {type === "date" ? (
        <Datepicker placeholder={placeholder} />
      ) : options.length === 0 ? (
        <Input type={type} id={name} placeholder={placeholder} />
      ) : (
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.key} value={option.key}>
                {option.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default Base;
