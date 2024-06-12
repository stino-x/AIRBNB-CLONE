'use client'
import { Listing, Reservation, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import Container from '../components/Container';
import Heading from '../components/Heading';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

interface ReservationsClientProps {
    reservations: (Reservation & { listing: Listing })[];
    currentUser: User;
}

const ReservationsClient: React.FC<ReservationsClientProps> = (props) => {
    const { reservations, currentUser } = props
    const router = useRouter()

    const [deletingId, setdeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setdeletingId(id)

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('reservation cancelled')
            router.refresh()
        })
        .catch((error) => {
            toast.error(error?.responese?.data?.error)
        })
        .finally(() => {
            setdeletingId('')
        })
    }, [router])

    return (
        <Container>
            <Heading 
            title='Reservations'
            subtitle='Bookings on your properties'/>
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {reservations.map((reservation) => (
                    <ListingCard 
                    key={reservation.id}
                    data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId === reservation.id}
                    actionLabel="cancel guest reservation"
                    currentUser={currentUser}/>
                ))}
            </div>
        </Container>
    );
};

export default ReservationsClient;