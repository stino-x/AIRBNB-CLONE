'use client'
import useCountries from '@/app/hooks/useCountries';
import React, { useState } from 'react';
import Select from 'react-select'

interface CountrySelectProps {
    value?: CountrySelectValue  // The value of the selected country
    onChange?: (value: CountrySelectValue) => void // The function that will be called when the selected country changes
}

export type CountrySelectValue =  {
    flag: string;
    value: string;
    latlng: number[];
    region: string;
    label: string
}

const CountrySelect: React.FC<CountrySelectProps> = ({value, onChange}: CountrySelectProps) => {
    const [selectedCountry, setSelectedCountry] = useState('');

    // Add your component logic here
    const { getAll }  = useCountries();

    return (
        <div>
            {/* Add your JSX code here */}
            <Select
                placeholder="Anywhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value: CountrySelectValue) => onChange && onChange(value)}
                formatOptionLabel={(option: any) => (
                    <div className="flex flex-row gap-3 items-center">
                        <div>
                            {option.flag}
                        </div>
                        <div>
                            {option.label},
                        <span className='ml-1 text-neutral-500'>
                            {option.region}
                        </span>
                        </div>
                    </div>
                )}
                classNames={
                    {
                            control: () => 'p-3 border-2',
                            input: () => 'text-lg',
                            option: () => 'text-lg'
                    }
                }
                theme ={(theme: any) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6'
                    }
                })}
            />
        </div>
    );
};

export default CountrySelect;