
'use client'
import useLoginModal from '@/app/hooks/useLoginModal';
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
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import RegisterModal from './RegisterModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

interface LoginModalProps {
    // Define the props for the LoginModal component here
}

const LoginModal: React.FC<LoginModalProps> = () => {
    // Implement the component logic here
    const LoginModal = useLoginModal();
    const RegisterModal = useRegisterModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);
            if (callback?.ok) {
                toast.success('Logged in')
                router.refresh();
                LoginModal.onClose()
            }

            if (callback?.error) {
                toast.error(callback.error)
            }
        })

    }
    const toggle = useCallback(() => {
        LoginModal.onClose()
        RegisterModal.onOpen()
    }, [LoginModal, RegisterModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title='welcome tback!!' subtitle='Login into your account'  />
             {/* <Input 
                id="name" 
                label="Name" 
                disabled={isLoading} 
                register={register} 
                errors={errors} 
                required 
            /> */}
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
            <Button outline label="contnue with google" icon={FcGoogle} onClick={() => signIn('google')}  />
            <Button outline label="contnue with github" icon={AiFillGithub} onClick={() => signIn('github')}  />
            <div className="text-neutral-500 text-center  mt-4 font-light">
                <div className=" justify-center flex flex-row items-center gap-2">
                    <div>
                        first time using Airbnb?
                    </div>
                    <div className=" text-neutral-800 cursor-pointer hover:underline" onClick={toggle}>
                        Create an Account
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
            isOpen={LoginModal.isOpen}
            onClose={LoginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            title="Login"
            actionLabel="Log in"
            disabled={isLoading}
            body={bodyContent}
            footer={footerContent}
        />
    )
};

export default LoginModal;