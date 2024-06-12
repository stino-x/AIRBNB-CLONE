'use client'
import useSearchModal from '@/app/hooks/useSearchModal';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

// interface SearchProps {
//     onSearch: (query: string) => void;
// }

const Search = () => {
    const searchmodal = useSearchModal()

    return (
        <div onClick={searchmodal.onOpen} className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor:pointer">
            {/* <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button> */}
            <div className="flex fle-row items-center justify-between">
                <div className="text-sm font-semibold px-6">
                    anywhere
                </div>
                <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                     Anyweek
                </div>
                <div className="text-sm px-6 text-gray-600 flex flex-row items-center gap-3">
                     <div className="hidden sm:block">Add Guests</div>
                     <div className="p-2 bg-rose-500 rounded-full text-white">
                        <BiSearch size={18} />
                     </div>
                </div>
            </div>
        </div>
    );
};

export default Search;