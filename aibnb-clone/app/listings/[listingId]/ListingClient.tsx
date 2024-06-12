
'use client'
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import ListingReservation from '@/app/components/listings/ListingReservation';
// import ListingHead from '../../components/ListingHead';
import { categories } from '@/app/components/navbar/Categories';
import useLoginModal from '@/app/hooks/useLoginModal';
import { Listing, User, Reservation } from '@prisma/client';
import axios from 'axios';
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { IconType } from 'react-icons';
import { Range } from 'react-date-range';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    reservations?: Reservation[];
    currentUser?: User | null;
    listing: Listing & {
        user: User
    }
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser
}) => {

    const loginModal  = useLoginModal();
    const router = useRouter()

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
    
        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });
    
            dates = [...dates, ...range];
        });
    
        return dates;
    }, [reservations]);

    const [isLoading, setisLoading] = useState(false);
    const [totalPrice, settotalPrice] = useState(listing.price);
    const [dateRange, setdateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
    
        setisLoading(true);
    
        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
        .then(() => {
            toast.success('Listing reserved');
            setdateRange(initialDateRange)
            router.push('/trips');
        })
        .catch(() => {
            toast.error('Something went wrong');
        })
        .finally(() => {
            setisLoading(false);
        });
    }, [
        currentUser,
        loginModal,
        totalPrice,
        dateRange,
        listing?.id,
        router
    ]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const daycount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )
            
            if (daycount && listing.price) {
                settotalPrice(daycount  * listing.price)
            }
            else {
                settotalPrice(listing.price)
            }
        }
    }, [dateRange, listing.price])


    const category: { icon: IconType; label: string; description: string; } | null = useMemo(() => {
      return categories.find((item) => item.label === listing.category) || null;
    }, [listing.category])
    return (
        <Container>
            <div className='max-w-screen-lg mx-auto'>
                <div className='flex flex-col gap-6'>
                    <ListingHead 
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}/> 
                    <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                    <ListingInfo 
                    user={listing.user}
                    category={category}
                    description={listing.description}
                    guestCount={listing.guestCount}
                    roomCount={listing.roomCount}
                    bathroomCount={listing.bathroomCount}
                    locationValue={listing.locationValue}/>
                    <div className='order-first mb-10 md:order-last md:col-span-3'>
                    <ListingReservation 
                    price={listing.price}
                    totalPrice={totalPrice}
                    onChangeDate={(value) => setdateRange(value)}
                    dateRange={dateRange}
                    onSubmit={onCreateReservation}
                    disabled={isLoading}
                    disabledDates={disabledDates}/>
                    </div>
                    </div>
                </div>
            </div>
        </Container>
    )
};

export default ListingClient;