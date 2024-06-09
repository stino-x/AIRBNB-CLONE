'use client'
import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiOutlineMenu } from 'react-icons/ai';
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps {
    currentUser?: User | null
}


const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const [isOpen, setisOpen] = useState(false);
    const registerModal = useRegisterModal()
    const LoginModal = useLoginModal()
    const rentmodal = useRentModal()
    const toggleOpen = useCallback(() => {
        setisOpen((value) => !value);
    }, [])

    const onRent = useCallback(() => {
        setisOpen((value) => !value)
        if(!currentUser){
            return LoginModal.onOpen();
        }
        rentmodal.onOpen()
    }, [currentUser, LoginModal, rentmodal])
    
    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
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
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    onClick={toggleOpen}
                    className=" absolute rounded-xl shadow-md w-[40vw] bg-white overflow-hidden right-0 top-12 text-sm"
                >
                    <div className="flex flex-col cursor-pointer">
                        {!currentUser ? (
                             <>
                             <MenuItem
                             onClick={LoginModal.onOpen}
                             label="Login" />
                             <MenuItem
                             onClick={registerModal.onOpen}
                             label="Sign up" />
                             </>
                             
                        ) : (
                            <>
                            <MenuItem
                            onClick={() => {}}
                            label="My trips" />
                            <MenuItem
                            onClick={() => {}}
                            label="My favourites" />
                            <MenuItem
                            onClick={() => {}}
                            label="My reservations" />
                            <MenuItem
                            onClick={() => {}}
                            label="My properties" />
                            <MenuItem
                            onClick={rentmodal.onOpen}
                            label="Airbnb my home" />
                            <hr />
                            <MenuItem
                            onClick={() => signOut()}
                            label="Logout" />
                            </>
                        )} 
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
