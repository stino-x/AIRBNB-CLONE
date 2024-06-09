'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Heading from './Heading';
import Button from './Button';

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No listings found",
    subtitle = "Create a listing to get started",
    showReset = false
}) => {
    const router = useRouter()
    const [state, setState] = useState<any>({
        // Define your state properties here
    });

    // Your component logic goes here

    return (
        // Your JSX code goes here
        <div
        className='h-[60vh] gap-2 items-center flex flex-col justify-center'>
            <Heading 
            title={title}
            subtitle={subtitle}/>
            <div className='w-28 mt-4'>
                {showReset && (
                    <Button
                    outline
                    label='Remove all the filters'
                    onClick={() => router.push('/')}/>
                )}
            </div>
        </div>
    );
};

export default EmptyState;