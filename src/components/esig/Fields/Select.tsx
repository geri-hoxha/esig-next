import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IOptions, IProps } from "./type";
import { Label } from "@/components/ui/label";

interface ISelect extends IProps {
  options: IOptions[];
}

export default function Select_({ label, placeholder, options }: ISelect) {
  return (
    <div className="flex flex-col gap-y-2">
      <Label>{label}</Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.key} value={option.key}>{option.value}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
