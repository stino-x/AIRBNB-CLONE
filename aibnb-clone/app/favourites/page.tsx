import React from 'react';
import { Reservation } from '@prisma/client';
import getCurrentUSer from '../actions/getCurrentUser';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import getReservations from '../actions/getReservations';
import getFavouriteListings from '../actions/getFavouriteListings';
import FavouritesClient from './FavouriteClient';
// import ReservationsClient from './ReservationsClient';

interface Props {
    // Define the props for your component here
}

const ListingPage: React.FC<Props> = async () => {
    // Add your component logic here
    const listings = await getFavouriteListings()
    const currentuser = await getCurrentUSer();

    
    if (listings?.length === 0) {
        return (
            <ClientOnly>
                <EmptyState 
                title='No favourites found'
                subtitle='Looks like you have no favourite listings'/>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavouritesClient 
            listings={listings}
            currentUser={currentuser}/>
        </ClientOnly>
    );
};

export default ListingPage;