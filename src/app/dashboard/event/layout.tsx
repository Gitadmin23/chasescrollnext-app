'use client'
import SelectEventPage from '@/components/event_component/select_event_page'
import { Box, Flex } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'
import { BiMessageSquareAdd } from 'react-icons/bi'

function Layout({ children }: {
    children: ReactNode
}) {

    const pathname = usePathname();

    return (
        <Box width={"full"} px={"8"} py={"8"} overflowX={"hidden"} >
            {(!pathname?.includes("details") && !pathname?.includes("create_event")) && (
                <Flex width={"full"} justifyContent={"space-between"} pb={"8"} alignItems={"center"}  >
                    <SelectEventPage />
                    <Flex as={"button"} width={"fit-content"} alignItems={"center"} gap={"2"} >
                        <BiMessageSquareAdd size={"24px"} />
                        Create Event
                    </Flex>
                </Flex>
            )}
            {children}
        </Box>
    )
}

export default Layout
