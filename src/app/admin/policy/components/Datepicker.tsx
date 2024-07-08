import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import Input from "./Input";
import { useOutsideClick } from "../hooks/useOutsideClick";

// Do not extend 'DatePickerProps' since that type from the library 'react-datepicker' was more of a workaround
interface IProps {
  name: string;
  label: string;
}

const DatePicker: React.FC<IProps> = ({ name, label }) => {
  const [date, setDate] = useState<Date | null>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { watch, setValue, register } = useFormContext();

  const ref = useOutsideClick(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const value = watch?.(name);

  useEffect(() => {
    setDate(value || undefined);
  }, [value]);

  const handleChange = (e: Date | null) => {
    setIsOpen(!isOpen);

    setDate(e);

    setValue?.(name, e);
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const onInputChange = (e: any) => {
    if(!e.target.value) return;

    const newYear = parseInt(e.target.value, 10);

    const updatedDate = new Date(e.target.value);

    // bug fix: year of date starts with '1900'
    updatedDate.setFullYear(newYear);

    setDate(updatedDate);
  };

  const onKeyDown = (event: any) => {
    if (event.code === "Enter") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <Input type="hidden" {...register?.(name)} />
      <Input
        type={isOpen ? "date" : "text"}
        label={label}
        onChange={onInputChange}
        value={
          !!date
            ? dayjs(date)
                .clone()
                .format(isOpen ? "YYYY-MM-DD" : "DD/MM/YYYY")
            : undefined
        }
        onClick={handleClick}
        onKeyDown={onKeyDown}
      />
      <div className="absolute top-full left-0 z-50">
        {isOpen && (
          <ReactDatePicker
            dateFormat={"DD/MM/YYYY"}
            selected={date}
            onChange={handleChange}
            inline
          />
        )}
      </div>
    </div>
  );
};

export default DatePicker;
