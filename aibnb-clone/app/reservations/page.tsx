import React from 'react';
import { Reservation } from '@prisma/client';
import getCurrentUSer from '../actions/getCurrentUser';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import getReservations from '../actions/getReservations';
import ReservationsClient from './ReservationsClient';

interface Props {
    // Define the props for your component here
}

const ReservationsPage: React.FC<Props> = async () => {
    // Add your component logic here
    const currentuser = await getCurrentUSer();

    if (!currentuser) {
        return (
            <ClientOnly>
                <EmptyState 
                title='unauthorised'
                subtitle='Please login'/>
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        authorId: currentuser.id
    })

    
    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState 
                title='No reservations found'
                subtitle='Looks like you have no reservations'/>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
                <EmptyState 
                title='No reservations found'
                subtitle='Looks like you have no reservations'/>
                <ReservationsClient 
                reservations={reservations}
                currentUser={currentuser}/>
        </ClientOnly>
    );
};

export default ReservationsPage;