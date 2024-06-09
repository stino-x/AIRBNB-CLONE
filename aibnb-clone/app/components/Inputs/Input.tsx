'use client'
import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';
interface InputProps {
    id: string;
    label: string;
    disabled?: boolean;
    type?: string;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors?: FieldErrors;
}

const Input: React.FC<InputProps> = ({ id, type = "text", label, disabled, formatPrice, required, register, errors }) => {
    return (
        <div className="w-full relative">
            {formatPrice && (
                <BiDollar size={24} className="text-neutral-700 absolute top-5 left-2"/>
            )}
             <input
                className={`peer w-full p-4 pt-6 border font-light bg-white rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
                ${formatPrice ? 'pl-9' : 'pl-4'} 
                ${errors && errors[id] ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-300 focus:border-black'}`
                }
                id={id}
                type={type}
                disabled={disabled}
                placeholder=' '
                {...register(id, { required })}
            />
            <label 
                htmlFor={id} 
                className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] 
                ${formatPrice ? 'left-9' : 'left-4'} 
                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                peer-focus:scale-75 peer-focus:-translate-y-4 
                ${errors && errors[id] ? 'text-rose-500' : 'text-zinc-400'}`}
            >
                {label}
            </label>
            {/* {errors && errors[id] && (
                <p className="text-rose-500 text-xs mt-1">
                    {errors[id].message || `${label} is required`}
                </p>
            )} */}
        </div>
    );
};

export default Input;