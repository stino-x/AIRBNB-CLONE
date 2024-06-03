'use client'
import Image from "next/image"

interface AvatarProps {
    src: string | null | undefined
}


const Avatar: React.FC<AvatarProps> = ({
    src
}) => {

    return (
        <Image
        src={src || "https://avatar.iran.liara.run/public"}
        className="hidden md:block cursor-pointer rounded-full"
        alt="Avatar"
        width={30}
        height={30}
        />
    );
};

export default Avatar;