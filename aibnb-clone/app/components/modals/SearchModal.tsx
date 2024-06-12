'use client'

import React, { useCallback, useMemo, useState } from 'react';
import { Modal } from './Modal';
import useSearchModal from '@/app/hooks/useSearchModal';
import { useRouter, useSearchParams } from 'next/navigation';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import CountrySelect, { CountrySelectValue } from '../Inputs/CountrySelect';
import { formatISO } from 'date-fns';
import qs from 'query-string';
import Heading from '../Heading';
import Calendar from '../Inputs/Calender';
import Counter from '../Inputs/Counter';

interface SearchModalProps {
    // Define the props for the SearchModal component here
}

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal: React.FC<SearchModalProps> = (props) => {
    const searchModal = useSearchModal();
    const router = useRouter();
    const params = useSearchParams();

    const [steps, setSteps] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [location, setLocation] = useState<CountrySelectValue>();
    const [bathroomCount, setBathroomCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(() => {
        return dynamic(() => import('../Map'), {
            ssr: false
        });
    }, [location]);

    const onBack = useCallback(() => {
        setSteps((value) => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setSteps((value) => value + 1);
    }, []);

    const onSubmit = useCallback(() => {
        if (steps !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/listings',
            query: updatedQuery
        }, {
            skipNull: true
        });

        setSteps(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
    }, [steps, onNext, params, location, guestCount, roomCount, bathroomCount, dateRange.startDate, dateRange.endDate, searchModal, router]);


    const actionLabel = useMemo(() => {
        if (steps === STEPS.INFO) {
            return 'Search'
        }

        return 'Next'
    }, [steps])

    const secondaryActionLabel = useMemo(() => {
        if (steps === STEPS.LOCATION) {
            return undefined
        }

        return 'Back'
    }, [steps])

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
            title='where is your place located'
            subtitle='Help guests find you ' />
            <CountrySelect
            value={location}
            onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map
            center={location?.latlng}
            />
        </div>
    )


    if(steps === STEPS.DATE) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                title='where do you plan to go'
                subtitle='Make sure everyone is free' />
                <Calendar 
                value={dateRange}
                onChange={(value) => setDateRange(value.selection)}/>
            </div>
        )
    }

    if (steps === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                title='More Information'
                subtitle='Find your perfect place'/>
                <Counter
                title='Guests'
                subtitle='how many guests do you allow?'
                value={guestCount}
                onChange={(value) => setGuestCount( value)} />
                <br />
                <Counter
                title='Rooms'
                subtitle='how many rooms do you need?'
                value={roomCount}
                onChange={(value) => setRoomCount( value)} />
                <br />
                <Counter
                title='Bathrooms'
                subtitle='how many bathrooms do you need?'
                value={bathroomCount}
                onChange={(value) => setBathroomCount( value)} />
            </div>
        )
    }

    return (
        <Modal 
            isOpen={searchModal.isOpen} 
            secondaryActionLabel={secondaryActionLabel}
            onClose={searchModal.onClose} 
            onSubmit={onSubmit} 
            title='Filters' 
            actionLabel={actionLabel}
            body={bodyContent} 
        />
    );
};

export default SearchModal;
