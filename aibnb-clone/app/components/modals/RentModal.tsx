// @ts-nocheck
// @useClient
"use client"

import React, { useMemo, useState } from 'react';
import useRentModal from '@/app/hooks/useRentModal';
import { Modal } from './Modal';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../Inputs/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CountrySelect from '../Inputs/CountrySelect';
import Map from '../Map';
import dynamic from 'next/dynamic';
import Counter from '../Inputs/Counter';
import ImageUpload from '../ImageUpload';
import Input from '../Inputs/Input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const router = useRouter();
    const rentmodal = useRentModal();

    let[steps, setsteps] = useState(STEPS.CATEGORY)
    const[isLoading, setisLoading] = useState(false)

    const onNext = () => {
        setsteps((value) => value + 1)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (steps !== STEPS.PRICE) {
            return onNext();
        }

        setisLoading(true)

        axios.post('/api/listings', data)
        .then(() => {
            toast.success('Listing Created');
            router.refresh();
            reset();
            setsteps(STEPS.CATEGORY);
            rentmodal.onClose();
        })
        .catch(() => {
            toast.error('something is wrong')
        })
        .finally(() => {
            setisLoading(false);
        })
    }

    const {
        register,
        watch,
        setValue,
        reset,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            description: '',
            price: 1,
            roomCount: 1,
            bathroomCount: 1,
            guestCount: 1,
            imageSrc: '',
            title: '',

        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false,
    }), [location]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setsteps((value) => value - 1)
    }

    const actionLabel = useMemo(() => {
        if (steps === STEPS.PRICE) {
            return 'Create'
        }

        return 'Next'
    }, [steps])

    const secondaryActionLabel = useMemo(() => {
        if (steps === STEPS.CATEGORY) {
            return undefined
        }

        return 'Back'
    }, [steps])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title='which bests describes your place'
                subtitle='pick one category' />
            <div className="grid grid-cols-1 overflow-y-auto gap-3 md:grid-cols-2 max-h-[50vh] ">
                {categories.map((item) => (
                    <div key={item.label} className='col-span-1'>
                        <CategoryInput
                        selected={category ===  item.label}
                        label={item.label}
                        icon={item.icon}
                        onClick={(category) => {setCustomValue('category', category)}} />
                    </div>
                ))}
            </div>
        </div>
    );

    if(steps === STEPS.LOCATION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                title='where is your place located'
                subtitle='Help guests find you ' />
                <CountrySelect
                value={location}
                onChange={(value) => setCustomValue('location', value)}
                />
                <Map
                center={location?.latlng}
                />
            </div>
        )
    }

    if (steps === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                title='Share basics about your place'
                subtitle='what amenities do you have'/>
                <Counter
                title='Guests'
                subtitle='how many guests do you allow?'
                value={guestCount}
                onChange={(value) => setCustomValue('guestCount', value)} />
                <br />
                <Counter
                title='Rooms'
                subtitle='how many rooms do you have?'
                value={roomCount}
                onChange={(value) => setCustomValue('roomCount', value)} />
                <br />
                <Counter
                title='Bathrooms'
                subtitle='how many bathrooms do you have?'
                value={bathroomCount}
                onChange={(value) => setCustomValue('bathroomCount', value)} />
            </div>
        )
    }


    if (steps === STEPS.IMAGES) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                title='Add a photo of your place'
                subtitle='show what your place looks like'/>
                <ImageUpload
                value={imageSrc}
                onChange={(value) => setCustomValue('imageSrc', value)} />
            </div>
        )
    }
    
    if (steps === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                title='Hoe would you describe your place'
                subtitle='short and sweet works best'/>
                <Input 
                id='title'
                label='title'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
                <hr />
                <Input 
                id='description'
                label='description'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
            </div>
        )
    }

    if (steps === STEPS.PRICE) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                title='Now set your price'
                subtitle='how much do you charge per night'/>
                <Input 
                id='price'
                label='price'
                formatPrice
                type='number'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
            </div>
        )
    }


    return (
        <Modal
            isOpen={rentmodal.isOpen}
            onClose={rentmodal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            body={bodyContent}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={steps === STEPS.CATEGORY ? undefined : onBack}
            title='Airbnb your home'
        />
    );
};

export default RentModal;
