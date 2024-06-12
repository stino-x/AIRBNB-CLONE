'use client'
import React, { useState } from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; 

interface CalendarProps {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

const Calendar: React.FC<CalendarProps> = ({ value, disabledDates, onChange }) => {

  return (
        <DateRange 
        rangeColors={['#262626']}
        disabledDates={disabledDates}
        onChange={onChange}
        ranges={[value]}
        minDate={new Date()}
        date={new Date()}
        direction='vertical'
        showDateDisplay={false}
        />
  );
};

export default Calendar;