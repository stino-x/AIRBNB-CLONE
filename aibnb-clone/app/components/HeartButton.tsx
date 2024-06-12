import React, { useState } from 'react';
import { Listing, User } from '@prisma/client';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useFavourite from '../hooks/useFavourite';

interface HeartButtonProps {
    ListingId: string;
    currentUser: User | null | undefined;
}

const HeartButton: React.FC<HeartButtonProps> = ({
    ListingId = '',
    currentUser
}) => {
    const { hasFavourited, toggleFavourite } = useFavourite({
        ListingId,
        currentUser
    })
    // const [isLiked, setIsLiked] = useState(false);
    console.log('HeartButton render:', { hasFavourited, ListingId, currentUser });

    // const handleButtonClick = () => {
    //     setIsLiked(!isLiked);
    // };

    return (
        <div onClick={toggleFavourite} className='relative hover:opacity-80 transition cursor-pointer'>
            <AiOutlineHeart
            size={28}
            className='fill-white absolute -top-[2px] -right-[2px] ' />
            <AiFillHeart 
            size={24}
            className={
                hasFavourited ? 'fill-rose-500' : 'fill-neutral-500/70'
            }/>
        </div>
    );
};

export default HeartButton;