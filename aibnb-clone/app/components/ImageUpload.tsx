'use client'
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

declare global {
    var cloudinary: any;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {

    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    return (
        <CldUploadButton
        onSuccess={handleUpload}
        uploadPreset='dijriauv'
        options={{
            maxFiles: 1
        }}>
                    <div className='relative p-20 cursor-pointer hover:opacity-70 transition border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 border-dashed border-2'>
                        <TbPhotoPlus size={50} />
                        <div className='font-semibold text-lg'>
                            Click to Upload
                        </div>
                        {value && (
                            <div className='absolute inset-0 w-full h-full '>
                                <Image
                                alt='upload'
                                src={value}
                                style={{objectFit: 'cover'}}
                                fill
                                />
                            </div>
                        )}
                    </div>
        </CldUploadButton>
    );
};

export default ImageUpload;