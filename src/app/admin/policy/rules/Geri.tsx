import { useState } from "react";
import Select from "../components/Select";

const Geri = ({ger,icon,options = [], onChange, label }) => {
 
 console.log(ger)

  return (
    <Select
      value={ger}
      icon={icon}
      onChange={(e) => {
        console.log(e.target.value)
        onChange(e.target.value);
       }}
      options={options.map((o) => {
        return {
            value: o.value,
            key: o.title
        }
      })}
      label={label}
    />
  );
};

export default Geri;
