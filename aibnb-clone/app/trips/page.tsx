import React from 'react';
import getCurrentUSer from '../actions/getCurrentUser';
import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';
import getReservations from '../actions/getReservations';
import TripsClient from './TripsClient';

interface Props {
    // Define the props for your component here
}

const TripsPage: React.FC<Props> = async () => {
    const currentUser = await getCurrentUSer()
    
    if (!currentUser) {
        return(
            <ClientOnly>
                <EmptyState 
                title='unauthorised'
                subtitle='please login'/>
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id
    });

    if (reservations.length === 0) {
        return (
            <ClientOnly>
            <EmptyState 
            title='No trips found'
            subtitle='Looks like you havent had any trips'/>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <TripsClient 
            reservations={reservations}
            currentUser={currentUser} 
            />
        </ClientOnly>
    );
};

export default TripsPage;