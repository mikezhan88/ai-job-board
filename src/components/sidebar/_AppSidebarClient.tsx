"use client"
import { ReactNode } from "react"
import { SidebarProvider, SidebarTrigger    } from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"

export function AppSidebarClient({children}: {children: ReactNode}) {
    const isMobile = useIsMobile()

    if (isMobile) {
        return <div className="flex flex-col w-full">
            <div className="p-2 border-b flex items-center gap-1">
            <SidebarTrigger/>
            <span className='text-2xl'>MZ Jobs</span>
            </div>
            <div className="flex-1 flex">{children}</div>
        </div>
    }
    return children
}