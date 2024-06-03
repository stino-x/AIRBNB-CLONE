import React from 'react';
import Container from '../Container';
import { TbBeach } from 'react-icons/tb';
import { GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import CategoryBox from '../CategoryBox';
import { IconType } from "react-icons";

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
    }
];

const Categories = () => {
    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((category) => (
                    <CategoryBox key={category.label} label={category.label} description={category.description} icon={category.icon} />
                ))}
            </div>
        </Container>
    );
};

export default Categories;
