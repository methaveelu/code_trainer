'use client'

import { NextUIProvider } from "@nextui-org/react"
import { SessionProvider } from "next-auth/react";


interface ProviderProps {
    children: React.ReactNode;
}

export default function Providers ({children}:ProviderProps){
    return (
        <SessionProvider>
        <NextUIProvider>
            {children}
        </NextUIProvider>
        </SessionProvider>
    )
}

//ensure all react components within app share the state of the nextUI components.
//next import and wrap this provider on layout.tsx's children