'use client'

import { hostname } from "os";
import { useEffect, useState } from "react";

interface ClientonlyProps {
    children: React.ReactNode;
}

const ClientOnly: React.FC<ClientonlyProps> = ({children}) => {
    const [hasMounted, sethasMounted] = useState(false)
    useEffect(() => {
        sethasMounted(true)
    }, [])
    if(!hasMounted) {
        return null;
    }
    return (
       <>
       {children}
       </>
    )
}
export default ClientOnly