'use client'
import SelectEventPage from '@/components/event_component/select_event_page'
import CreateEventBtn from '@/components/sharedComponent/create_event_btn'
import { Box, Flex, useColorMode } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'
import useCustomTheme from "@/hooks/useTheme";
import EventCategory from '@/components/event_component/event_category'

function Layout({ children }: {
    children: ReactNode
}) {

    const pathname = usePathname();
    const route = useRouter();

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex gap={"4"} width={"full"} flexDir={"column"} bg={mainBackgroundColor} px={(pathname !== ("/dashboard/event/create_event") && !pathname?.includes("edit_event") && !pathname?.includes("edit_draft") && pathname !== ("/dashboard/event/create_event_promotion")) ? ["5", "8"] : ""} py={(pathname !== ("/dashboard/event/create_event") && !pathname?.includes("edit_event") && !pathname?.includes("edit_draft") && pathname !== ("/dashboard/event/create_event_promotion")) ? ["4", "4", "6"] : ""} overflowX={"hidden"} >
            {(pathname !== ("/dashboard/event/create_event") && !pathname?.includes("edit_event") && !pathname?.includes("edit_draft") && pathname !== ("/dashboard/event/create_event_promotion") && !pathname?.includes("/event/details") && !pathname?.includes("/event/pastdetails")) && (
                <Flex position={"relative"} width={"full"} justifyContent={"space-between"} gap={"4"} flexDir={["column-reverse", "column-reverse", "row"]} alignItems={["start", "start", "center"]} >
                    <Flex ml={["auto", "auto", "0px"]} >
                        <EventCategory eventpage={true} />
                    </Flex>
                    <Flex ml={["0px", "0px", "auto"]} >
                        <SelectEventPage />
                    </Flex>
                </Flex>
            )}
            {children}
        </Flex>
    )
}

export default Layout

