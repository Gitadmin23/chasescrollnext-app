"use client"
import BookingList from '@/components/new_booking_component/bookingList'
import ListUser from '@/components/new_booking_component/listUser'
import { AddIconWithBorder } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Button, Flex, Text, useColorMode } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Booking() {

    const { colorMode } = useColorMode();
    const { bodyTextColor, primaryColor, secondaryBackgroundColor, mainBackgroundColor, borderColor } = useCustomTheme();

    const router = useRouter()

    return (
        <Flex w={"full"} height={"full"} overflow={"hidden"} bgColor={colorMode !== "dark" ? mainBackgroundColor : mainBackgroundColor} >
            <Flex w={["full", "full", "full", "55%", "55%"]} h={"full"} flexDir={"column"} gap={"4"} overflowY={"auto"} >
                <Flex w={"full"} h={"auto"} flexDir={"column"} gap={"6"}  px={["4", "4", "4", "4", "8"]} py={"8"}>
                    <ListUser />
                    <Flex w={"full"} gap={"4"} alignItems={"center"} >
                        <Button onClick={()=> router?.push("/dashboard/newbooking")} bgColor={secondaryBackgroundColor} _hover={{ backgroundColor: secondaryBackgroundColor }} rounded={"full"} fontSize={"16px"} fontWeight={"400"} h={"50px"} w={"160px"} >Categories</Button>
                        <Button bgColor={primaryColor} _hover={{ backgroundColor: primaryColor }} color={"white"} rounded={"full"} fontSize={"16px"} fontWeight={"400"} h={"50px"} w={"160px"} >My Business</Button>
                        <Flex onClick={() => router.push("/dashboard/newbooking/create")} width={"40px"} height={"40px"} rounded={"full"} as={"button"} backgroundColor={primaryColor} justifyContent={"center"} alignItems={"center"} ml={"auto"} >
                            <AddIconWithBorder />
                        </Flex>
                    </Flex>
                    <BookingList />
                </Flex>
            </Flex>
            <Flex h={"full"} borderLeftColor={borderColor} borderLeftWidth={"1px"} w={["fit-content", "fit-content", "fit-content", "45%", "45%"]}  overflowY={"auto"} display={["none", "none", "none", "flex", "flex"]} px={["4", "4", "4", "4", "8"]} py={"8"} >
                <Flex w={"full"} h={"auto"} gap={"8"} flexDir={'column'}  >
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} h={"fit-content"} >
                        <Text fontSize={"20px"} fontWeight={"600"} >Services in your location</Text>
                        <Text color={primaryColor} fontWeight={"500"} fontSize={"14px"} >See More</Text>
                    </Flex>
                    <BookingList small={true} />
                </Flex>
            </Flex>
        </Flex>
    )
}
