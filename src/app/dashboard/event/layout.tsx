'use client'
import SelectEventPage from '@/components/event_component/select_event_page'
import CreateEventBtn from '@/components/sharedComponent/create_event_btn'
import { Box, Flex } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { ReactNode } from 'react' 

function Layout({ children }: {
    children: ReactNode
}) {

    const pathname = usePathname();
    const route = useRouter()

    return (
        <Box width={"full"} px={(pathname !== ("/dashboard/event/create_event") && !pathname?.includes("edit_event") && !pathname?.includes("edit_draft")) ? ["5", "8"] : ""} py={(pathname !== ("/dashboard/event/create_event") && !pathname?.includes("edit_event") && !pathname?.includes("edit_draft")) ? "8" : ""} overflowX={"hidden"} >
            {(pathname !== ("/dashboard/event/create_event") && !pathname?.includes("edit_event") && !pathname?.includes("edit_draft") && pathname !== ("/dashboard/event/create_event_promotion") && !pathname?.includes("/event/details") && !pathname?.includes("/event/pastdetails") ) && (
                <Flex width={"full"} justifyContent={"space-between"} pb={"8"} alignItems={"center"}  >
                    <SelectEventPage />
                    <CreateEventBtn />
                </Flex>
            )}
            {children}
        </Box>
    )
}

export default Layout

