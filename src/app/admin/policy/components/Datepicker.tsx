import React from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';

import 'react-datepicker/dist/react-datepicker.css';

const DatePicker_ = ({ control, name, ...rest }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          {...field}
          selected={field.value ? dayjs(field.value).toDate() : null}
          onChange={(date) => field.onChange(dayjs(date).toISOString())}
          {...rest}
        />
      )}
    />
  );
};

export default DatePicker_;
