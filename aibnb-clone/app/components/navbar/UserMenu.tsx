'use client'
import Avatar from "../Avatar";
import { AiOutlineMenu } from 'react-icons/ai';


const UserMenu = () => {
    const [isOpen, setisOpen] = useState(false);
    
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
                    onClick={() => {}}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 rounded-full cursor-pointer flex flex-row items-center hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserMenu;
