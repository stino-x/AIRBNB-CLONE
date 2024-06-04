'use client'
import React from 'react';
import Container from '../Container';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiBarn, GiBoatFishing, GiCactus, GiCampingTent, GiCastle, GiCaveEntrance, GiForest, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import CategoryBox from '../CategoryBox';
import { IconType } from "react-icons";
import { useParams, usePathname } from 'next/navigation';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { useSearchParams } from 'next/navigation';

interface Category {
    label: string;
    description: string;
    icon: IconType;
}

// interface CategoriesProps {
//     categories: Category[];
// }

export const categories: Category[] = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property has windmills'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This property has a pool'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is in the Countryside'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is close to a lake'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an island'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has skiing facilities'
    },
    {
        label: 'Castle',
        icon: GiCastle,
        description: 'This property is in a castle'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property has camping actiivities'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property has skiing facilities'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'This property is in a cave'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is in a desert'
    },
    {
        label: 'Barn',
        icon: GiBarn,
        description: 'This property is in the barn'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This property is luxurious'
    },
];

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';
    console.log('THIS IS THE CURRENT CATEGORY'+ category)

    if (!isMainPage) {
        return null; 
    }
    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox key={item.label} selected={category === item.label} label={item.label} description={item.description} icon={item.icon} />
                ))}
            </div>
        </Container>
    );
};

export default Categories;
