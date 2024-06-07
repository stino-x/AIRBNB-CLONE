'use client'

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
   value: number;
   onChange: (value: number) => void;
   title: string,
   subtitle: string
}

const Counter: React.FC<CounterProps> = ({
   value,
   onChange,
   title,
   subtitle
}) => {
   const onAdd = useCallback(() => {
       onChange(value + 1)
   }, [onChange, value])

   const onReduce = useCallback(() => {
       if (value === 1) {
           return;
       }
       onChange(value - 1)
   }, [onChange, value])

   return (
       <div className="flex item-center flex-row justify-between">
           <div className="flex flex-col">
               <div className="font-medium">
                   {title}
               </div>
               <div className="font-light text-grey-600">
                   {subtitle}
               </div>
           </div>
           <div className="flex flex-row gap-4 items-center">
               <div onClick={onReduce} className="rounded-full border-[1px] cursor-pointer hover:opacity-80 flex items-center justify-center w-10 h-10 text-neutral-600 transition border-neutral-400">
                   <AiOutlineMinus />
               </div>
               <div className="text-neutral-600 text-xl font-light">
                   {value}
               </div>
               <div onClick={onAdd} className="rounded-full border-[1px] cursor-pointer hover:opacity-80 flex items-center justify-center w-10 h-10 text-neutral-600 transition border-neutral-400">
                   <AiOutlinePlus />
               </div>
           </div>
       </div>
   )
}

export default Counter