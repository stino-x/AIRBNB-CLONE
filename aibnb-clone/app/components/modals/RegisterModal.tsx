
'use client'
import useRegisterModal from '@/app/hooks/useRegisterModal';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Modal } from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';

interface RegisterModalProps {
    // Define the props for the RegisterModal component here
}

const RegisterModal: React.FC<RegisterModalProps> = () => {
    // Implement the component logic here
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/register', data)
        .then(() => {
            registerModal.onClose()
        })
        .catch((error) => {
            // console.log(error)
            toast.error('Something went wrong')
        })
        .finally(() => {
            setIsLoading(false);       
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title='wlecome to airbnb' subtitle='create an account'  />
             <Input 
                id="name" 
                label="Name" 
                disabled={isLoading} 
                register={register} 
                errors={errors} 
                required 
            />
            <Input 
                id="email" 
                label="Email" 
                type="email" 
                disabled={isLoading} 
                register={register} 
                errors={errors} 
                required 
            />
             <Input 
                id="password" 
                label="Password" 
                type="password" 
                disabled={isLoading} 
                register={register} 
                errors={errors} 
                required 
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline label="contnue with google" icon={FcGoogle} onClick={() => {}}  />
            <Button outline label="contnue with github" icon={AiFillGithub} onClick={() => {}}  />
            <div className="text-neutral-500 text-center  mt-4 font-light">
                <div className=" justify-center flex flex-row items-center gap-2">
                    <div>
                        Already have an account
                    </div>
                    <div className=" text-neutral-800 cursor-pointer hover:underline" onClick={registerModal.onClose}>
                        Log in
                    </div>
                </div>
            </div>
            <p className="text-gray-500 text-sm">
                By registering, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
            </p>
        </div>
    )

    return (
        <Modal
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            title="Register"
            actionLabel="Register"
            disabled={isLoading}
            body={bodyContent}
            footer={footerContent}
        />
    )
};

export default RegisterModal;