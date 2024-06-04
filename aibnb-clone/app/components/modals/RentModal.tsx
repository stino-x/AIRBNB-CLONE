// @ts-nocheck
// @useClient
"use client"

import React, { useMemo, useState } from 'react';
import useRentModal from '@/app/hooks/useRentModal';
import { Modal } from './Modal';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../Inputs/CategoryInput';
import { FieldValues, useForm } from 'react-hook-form';

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const rentmodal = useRentModal();

    const[steps, setsteps] = useState(STEPS.CATEGORY)

    const onNext = () => {
        setsteps((value) => value + 1)
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
                <CountrySelect />
            </div>
        )
    }
    

    return (
        <Modal
            isOpen={rentmodal.isOpen}
            onClose={rentmodal.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            body={bodyContent}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={steps === STEPS.CATEGORY ? undefined : onBack}
            title='Airbnb your home'
        />
    );
};

export default RentModal;
