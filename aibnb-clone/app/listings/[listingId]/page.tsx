import getCurrentUSer from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react';
import ListingClient from './ListingClient';
import getReservations from '@/app/actions/getReservations';

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: {params: IParams}) => {
    // Add your component logic here
    console.log('ListingPage params:', JSON.stringify(params));
    const listing = await getListingById(params);

    const reservations = await getReservations(params)

    const currentuser = await getCurrentUSer()

    if(!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ListingClient 
            listing={listing}
            currentUser={currentuser}
            reservations={reservations}
            />
        </ClientOnly>
    );
};

export default ListingPage;