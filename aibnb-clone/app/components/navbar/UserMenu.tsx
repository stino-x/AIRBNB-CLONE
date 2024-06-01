'use client'
import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiOutlineMenu } from 'react-icons/ai';
import MenuItem from "./MenuItem";


const UserMenu = () => {
    const [isOpen, setisOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setisOpen((value) => !value);
    }, [])
    
    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={() => {}}
                    className="hidden md:block px-4 py-3 rounded-full hover:bg-neutral-100 cursor-pointer font-semibold"
                >
                    Airbnb your home
                </div>
                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 rounded-full cursor-pointer flex flex-row items-center hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    onClick={toggleOpen}
                    className=" absolute rounded-xl shadow-md w-[40vw] bg-white overflow-hidden right-0 top-12 text-sm"
                >
                    <div className="flex flex-col cursor-pointer">
                        <>
                        <MenuItem
                        onClick={() => {}}
                        label="Login" />
                        <MenuItem
                        onClick={() => {}}
                        label="Sign up" />
                        </>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
