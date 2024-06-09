
'use client'
import React from 'react';

import { Range } from 'react-date-range'

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  // Your component logic here

  return (
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden '>
        <div className='flex flex-row gap-1 p-4 items-center'>
            <div className='text-2xl font-semibold'>
                ${price}
            </div>
            <div className='font-light text-neutral-600'>
                night
            </div>
        </div>
        <hr />
        <Calender 
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}/>
    </div>
  );
};

export default ListingReservation;