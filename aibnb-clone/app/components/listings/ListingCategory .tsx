'use client'
import React from 'react';
import { IconType } from 'react-icons';

interface ListingCategoryProps {
    icon: IconType;
    label: string;
    description: string;
}

const ListingCategory: React.FC<ListingCategoryProps> = (props) => {
    const { icon: Icon, label, description } = props;

    return (
        <div className='flex flex-col gap-6'>
            <div className='flex flex-row  gap-4 items-center'>
                <Icon size={40} className='text-neutral-600'/>
                <div className='flex flex-col'>
                    <div className='text-lg font-semibold'>
                        {label}
                    </div>
                    <div className='text-neutral-500 font-light'>
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingCategory;