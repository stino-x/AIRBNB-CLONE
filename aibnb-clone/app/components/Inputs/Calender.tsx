// Calendar.tsx
import React, { useState } from 'react';
import { Range, RangeKeyDict } from 'react-date-range';

interface CalendarProps {
  value: Range | null;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict | null) => void;
}

const Calendar: React.FC<CalendarProps> = ({ value, disabledDates, onChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onChange(date);
  };

  // Add your calendar rendering logic here

  return (
        <DateRange 
        />
  );
};

export default Calendar;