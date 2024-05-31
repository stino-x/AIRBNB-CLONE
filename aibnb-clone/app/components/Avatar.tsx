'use client'
import Image from "next/image"


const Avatar = () => {

    return (
        <Image
        src="https://avatar.iran.liara.run/public"
        className="hidden md:block cursor-pointer rounded-full"
        alt="Avatar"
        width={30}
        height={30}
        />
    );
};

export default Avatar;