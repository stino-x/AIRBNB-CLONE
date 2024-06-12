'use client'

import React, { createContext, useState } from 'react';
import { Toaster } from 'react-hot-toast';

// Create a context for the toaster
export const ToasterContext = createContext<{
    showToast: (message: string) => void;
}>({
    showToast: () => {},
});

// ToasterProvider component
const ToasterProvider: React.FC = ({ children }) => {
    const [toastMessage, setToastMessage] = useState<string>('');

    // Function to show toast message
    const showToast = (message: string) => {
        setToastMessage(message);
    };

    return (
        <Toaster />
    );
};

export default ToasterProvider;