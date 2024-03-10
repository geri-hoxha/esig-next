import { IOptions } from "@/components/esig/Fields/type";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HTMLInputTypeAttribute, ReactNode } from "react";
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
  icon?: ReactNode;
  options?: IOptions[];
  className?: string;
}

const Base = ({
  name,
  label,
  placeholder,
  icon = undefined,
  className = '',
  type = "text",
  options = [],
}: IField) => {

  let iconDiv;
  let pl10 = '';
  if (icon !== undefined) {
    iconDiv = (
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </div>
    )
    pl10 = 'pl-10';
  }

  return (
    <div className="w-full">
      <div className="relative rounded-md shadow-sm">
        <label
          htmlFor={name}
          className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
        >
          {label}
        </label>
        {iconDiv}
        {
          type == 'select'
            ? <select
              id={name}
              name={name}
              className={`block w-full rounded-md border-0 py-1.5 ${pl10} text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-esig sm:text-sm sm:leading-6 ${className}`}
              defaultValue="Leke"
            >
              <option>Leke</option>
              <option>Euro</option>
              <option>Dollar Amerikan</option>
            </select>
            : <input
              type={type}
              name={name}
              id={name}
              className={`block w-full rounded-md border-0 py-1.5 ${pl10} text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-esig sm:text-sm sm:leading-6 ${className}`}
              placeholder={placeholder}
            />
        }
      </div>
    </div>

    // <>
    //   <div className={`flex items-end w-full ${className}`}>
    //     {type === "date" ? (
    //       <Datepicker placeholder={placeholder} />
    //     ) : options.length === 0 ? (
    //       <div className="w-full">
    //         <div className="relative z-0">
    //           <input
    //             type="text"
    //             id={name}
    //             // border-gray-400 kur eshte i plotesuar 
    //             className={`block pt-2.5 pb-0.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-esig peer ${className}`}
    //             placeholder=" "
    //           />
    //           <label
    //             htmlFor={name}
    //             className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-esig peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
    //           >
    //             {label}
    //           </label>
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="w-1/2">
    //         <Select>
    //           <SelectTrigger className="">
    //             <SelectValue placeholder={placeholder} />
    //           </SelectTrigger>
    //           <SelectContent>
    //             {options.map((option) => (
    //               <SelectItem key={option.key} value={option.key}>
    //                 {option.value}
    //               </SelectItem>
    //             ))}
    //           </SelectContent>
    //         </Select>
    //       </div>
    //     )}
    //   </div>
    // </>
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
