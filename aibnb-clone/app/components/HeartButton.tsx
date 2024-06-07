import React, { useState } from 'react';
import { Listing, User } from '@prisma/client';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface HeartButtonProps {
    ListingId: string;
    currentUser: User;
}

const HeartButton: React.FC<HeartButtonProps> = ({
    ListingId: string,
    currentUser
}) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleButtonClick = () => {
        setIsLiked(!isLiked);
    };

    return (
        <div onClick={handleButtonClick} className='relative hover:opacity-80 transition cursor-pointer'>
            {isLiked ? '❤️' : '🤍'}
            <AiOutlineHeart
            size={28}
            className='fill-white absolute -top-[2px] -right-[2px] ' />
            <AiFillHeart 
            size={24}
            className={
                isLiked ? 'fill-rose-500' : 'fill-neutral-500/70'
            }/>
        </div>
    );
};

export default HeartButton;