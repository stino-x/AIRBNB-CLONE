'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen = false,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled = false,
    secondaryAction,
    secondaryActionLabel,
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }
        setShowModal(false);
        setTimeout(onClose, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }
        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }
        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed z-50 inset-0 outline-none focus:outline-none bg-neutral-800/70 pt-4 pb-5">
                <div className="relative md:w-4/6 lg:w-3/6 xl:w-2/5 w-full my-6 mx-auto max-[768px]:mt-[60%] min-[768px]:mt-[10%] mb-[10%]">
                    {/* CONTENT */}
                    <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/* HEADER */}
                            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                                <button className="p-1 border-0 absolute left-9 hover:opacity-70 transition" onClick={handleClose}>
                                    <IoMdClose size={18} />
                                </button>
                                <div className="text-lg font-semibold">{title}</div>
                            </div>
                            {/* BODY */}
                            <div className="relative p-6 flex-auto">{body}</div>
                            {/* FOOTER */}
                            <div className="flex flex-col gap-2 p-6">
                            <div className="flex items-center flex-row gap-4 w-full">
                            {secondaryAction && secondaryActionLabel && (
                                    <Button
                                        label={secondaryActionLabel}
                                        onClick={handleSecondaryAction}
                                        disabled={disabled}
                                        outline
                                    />
                                )}
                                <Button
                                    label={actionLabel}
                                    onClick={handleSubmit}
                                    disabled={disabled}
                                />
                            </div>
                            {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// const MyComponent: React.FC = () => {
//     return (
//         <div>
//             <h1>My Component</h1>
//             <Modal isOpen={true} onClose={() => {}} />
//         </div>
//     );
// };
