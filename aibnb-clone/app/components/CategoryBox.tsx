'use client'

import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string"

interface CategoryBoxProps {
    label: string;
    description: string;
    icon: IconType;
    selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ label, selected, icon:Icon }) => {
    const router = useRouter()
    const params = useParams()
    const handleClick = useCallback(() => {
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        if (params instanceof URLSearchParams && params.get('category') === label) {
            delete updatedQuery.category
        }

        const url = qs.stringifyUrl(
            {
                url: '/',
                query: updatedQuery
            }, {skipNull: true}
        )
        router.push(url)
    }, [label, params, router])
    return (
        <div onClick={handleClick} className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
        ${selected ?  "text-neutral-800" : "text-neutral-500"}
        ${selected ?  "border-b-neutral-800" : "border-transparent"}`}>

            <Icon size={26} />
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
    );
};

export default CategoryBox;