'use client'
// ToasterProvider.tsx
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// Define the type for the props
interface ToasterProviderProps {
  children: React.ReactNode;
}

// ToasterProvider component
const ToasterProvider: React.FC<ToasterProviderProps> = ({ children }) => {
  const [toastMessage, setToastMessage] = useState<string>('');

  // Function to show toast message
  const showToast = (message: string) => {
    setToastMessage(message);
    // Display the toast message using react-hot-toast
    toast(message);
  };

  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
};

export default ToasterProvider;
