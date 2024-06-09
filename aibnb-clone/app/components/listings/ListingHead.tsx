import useCountries from '@/app/hooks/useCountries';
import { User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import Heading from '../Heading';
import HeartButton from '../HeartButton';

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser: User | null | undefined;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue)

  return (
    // <div className="listing-head">
    //   <div className="listing-image">
    //     <Image
    //       src={imageSrc}
    //       alt={title}
    //       width={600}
    //       height={400}
    //       layout="responsive"
    //       className="object-cover"
    //     />
    //   </div>
    //   <div className="listing-details">
    //     <h1>{title}</h1>
    //     <p>{locationValue}</p>
    //   </div>
    //   {/* Assuming you may want to add the HeartButton component here */}
    //   <HeartButton ListingId={id} currentUser={currentUser} />
    // </div>
    <>
    <Heading 
    title={title}
    subtitle={`${location?.region} , ${location?.label}`}/>
    <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <Image 
        alt='image'
        className='object-cover w-full'
        fill
        src={imageSrc}
        />
        <div className='absolute top-5 right-5'>
          <HeartButton
          ListingId={id}
          currentUser={currentUser}
          />
        </div>
    </div>
    </>
  );
};

export default ListingHead;
