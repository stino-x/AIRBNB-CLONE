import React from 'react';
import { IconType } from 'react-icons';

interface CategoryInputProps {
    label: string;
    onClick: (value: string) => void;
    selected?: boolean;
    icon: IconType;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ label, onClick, selected, icon: Icon }) => {
    return (
        <div onClick={() => onClick(label)} className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${selected ? 'border-black' : 'border-neutral-200'}`}>
            <Icon size={30} />
            <div className='font-semibold'>{label}</div>
            {/* You can add an input if needed */}
            {/* <input
                type="text"
                id="category"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            /> */}
        </div>
    );
};

export default CategoryInput;
