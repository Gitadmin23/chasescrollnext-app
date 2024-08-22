'use client'
import SelectEventPage from '@/components/event_component/select_event_page'
import CreateEventBtn from '@/components/sharedComponent/create_event_btn'
import {Box, Flex, useColorMode} from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'
import useCustomTheme from "@/hooks/useTheme";

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
        <Box width={"full"} bg={mainBackgroundColor} px={(pathname !== ("/dashboard/event/create_event") && !pathname?.includes("edit_event") && !pathname?.includes("edit_draft")&& pathname !== ("/dashboard/event/create_event_promotion")) ? ["5", "8"] : ""} py={(pathname !== ("/dashboard/event/create_event") && !pathname?.includes("edit_event") && !pathname?.includes("edit_draft")&& pathname !== ("/dashboard/event/create_event_promotion")) ? "8" : ""} overflowX={"hidden"} >
            {(pathname !== ("/dashboard/event/create_event") && !pathname?.includes("edit_event") && !pathname?.includes("edit_draft") && pathname !== ("/dashboard/event/create_event_promotion") && !pathname?.includes("/event/details") && !pathname?.includes("/event/pastdetails") ) && (
                <Flex position={"relative"} width={"full"} justifyContent={"space-between"} gap={"4"} flexDir={["row", "row", "row"]} pb={"8"} alignItems={["start", "start" ,"center"]}  >
                    <SelectEventPage />
                    {/* <CreateEventBtn /> */}
                </Flex>
            )}
            {children}
        </Box>
    )
}

export default Layout

