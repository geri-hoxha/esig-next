import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import 'react-datepicker/dist/react-datepicker.css';
import Input from './Input';
import { useOutsideClick } from '../hooks/useOutsideClick';

// Do not extend 'DatePickerProps' since that type from the library 'react-datepicker' was more of a workaround
interface IProps {
  name: string;
  label: string;
}

const DatePicker: React.FC<IProps> = ({ name, label }) => {

  const [date, setDate] = useState<Date | null>();

  const [inputValue, setInputValue] = useState<string>(' ');

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    watch,
    setValue,
    register
  } = useFormContext();

  const ref = useOutsideClick(() => {
    if (isOpen) setIsOpen(false);
  });

  const value = watch?.(name);

  useEffect(() => {
    setDate(value || undefined)
    setInputValue(!!date ? dayjs(date).clone().format('DD/MM/YYYY') : ' ')
  }, [value])

  const handleChange = (e: Date | null) => {

    setIsOpen(!isOpen);

    setDate(e);

    setInputValue(e);

    setValue?.(name, e);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const onInputChange = (e:any) => {
     
   console.log(e.target.value)
  }

  return (
    <>
      <div className='relative' ref={ref}>
        <Input type="hidden" {...register?.(name)} />
        <Input label={label} onChange={onInputChange} value={inputValue} onClick={handleClick} pattern="[\d/]" />
        <div className='absolute top-full left-0 z-50'>
          {isOpen && (
            <ReactDatePicker selected={date} onChange={handleChange} inline />
          )}
        </div>
      </div>
    </>
  );
};

export default DatePicker;
