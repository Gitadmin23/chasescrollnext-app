'use client'
import TabController from '@/components/booking_component/detail_component/tab_controller'
import { Box, Flex, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

function Layout({ children }: {
    children: ReactNode
}) {
    return (
        <Box width={"full"} px={["5", "8"]} py={"8"} overflowX={"hidden"} >
            <Flex rounded={"16px"} w={"full"} h={"300px"} bg={"gray.300"} >
                <Flex mt={"auto"} w={"100%"} h={"40px"} roundedBottom={"16px"} position={"relative"} justifyContent={"center"} alignItems={"center"} bg={"#5D70F9"} color={"white"} >
                    <Text fontWeight={"medium"} >Promote Now</Text>
                </Flex>
            </Flex>
            <Text fontWeight={"bold"} fontSize={"2xl"} color={"#131418"} mt={"4"} >Next Generation Barbers</Text>
            <Text color={"#101828B2s"} >143 Historic Town square, Lancaster, 75146</Text>
            <TabController />
            <Box width={"full"} mt={"6"} >
                {children}
            </Box>
        </Box>
    )
}

export default Layout