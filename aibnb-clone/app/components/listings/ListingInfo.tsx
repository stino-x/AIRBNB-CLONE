'use client'

import useCountries from '@/app/hooks/useCountries';
import { User } from '@prisma/client';
import React from 'react';
import { IconType } from 'react-icons';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory ';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../Map'), { ssr: false });

interface ListingInfoProps {
    category: {
        icon: IconType;
        label: string,
        description: string,
    } | null;
    description: string;
    guestCount: number;
    bathroomCount: number;
    roomCount: number;
    locationValue: string;
    user: User;
}

const ListingInfo: React.FC<ListingInfoProps> = (props) => {
    const { user, category, description, roomCount, guestCount, bathroomCount, locationValue } = props;
    const { getByValue } = useCountries()
    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <div className='col-span-4 flex flex-col gap-8'>
            <div className=' flex flex-col gap-2'>
                <div className='text-xl font-semibold flex-row items-center gap-2'>
                <div className='text-2xl font-bold'>Hosted by: {user?.name}</div>
                {/* <div className='text-neutral-500'>{description}</div> */}
                <Avatar src={user?.image}/>
                </div>
                <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
                    {/* <div className='flex flex-row gap-2 items-center'>
                        <category.icon className='fill-neutral-500'/>
                        <div>{category?.label}</div>
                    </div> */}
                        <div>{guestCount} guests</div>
                        <div>{bathroomCount} bathrooms</div>
                        <div>{roomCount} rooms</div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory 
                icon={category.icon}
                label={category.label}
                description={category.description}/>
            )}
            <hr />
            <div className='text-lg font-light text-neutral-500'>
                {description}
            </div>
            <hr />
            <Map center={coordinates}/>
            <div className='text-lg font-light text-neutral-500'>
                {coordinates?.join(', ')}
            </ div>
        </div>
    );
};

export default ListingInfo;

