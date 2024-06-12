import React from 'react';
import getCurrentUSer from '../actions/getCurrentUser';
import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';
import getReservations from '../actions/getReservations';
import TripsClient from './PropertiesClient';
import getLisitings from '../actions/getLisitings';
import PropertiesClient from './PropertiesClient';

interface Props {
    // Define the props for your component here
}

const PropertiesPage: React.FC<Props> = async () => {
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

    const listings = await getLisitings({
        userId: currentUser.id
    });

    if (listings.length === 0) {
        return (
            <ClientOnly>
            <EmptyState 
            title='No Properties found'
            subtitle='Looks like you havent had any Properties'/>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient 
            listings={listings}
            currentUser={currentUser} 
            />
        </ClientOnly>
    );
};

export default PropertiesPage;