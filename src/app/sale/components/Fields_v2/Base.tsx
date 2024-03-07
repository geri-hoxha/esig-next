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
    <>
      <div className="flex items-end">
        {label ? (
          <div className="flex shrink-0">
            <Label className="text-[13p2]" htmlFor={name}>
              {label}
            </Label>
          </div>
        ) : null}

        <div  className="flex-1 border-gray-300 border-b-[1px] border-dashed mx-2 w-full "></div>

        {type === "date" ? (
          <Datepicker placeholder={placeholder} />
        ) : options.length === 0 ? (
          <div className="w-1/2">
            <div className="relative z-0">
    <input  type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-esig peer" placeholder=" " />
    <label for="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"></label>
</div>
            {/* <Input
              type={type}
              id={name}
              placeholder={placeholder}
              className="w-full bg-transparent rounded-none !rounded-t border-0 border-b-2 border-gray-600"
            /> */}
          </div>
        ) : (
          <div className="w-1/2">
            <Select>
              <SelectTrigger className="">
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
          </div>
        )}
      </div>
    </>
  );
};

export default Base;



// const Input = ({}) => {
//   return (
//     <div className="relative">
//     {icon && (
//       <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
//         {icon}
//       </div>
//     )}
//     <input
//       type={type}
//       className={cn(
//         "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
//         !!icon ? "pl-10" : '',
//         className
//       )}
//       ref={ref}
//       {...props}
//     />
//   </div>
//   )
// }