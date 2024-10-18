"use client"
import useCustomTheme from '@/hooks/useTheme'
import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiOutlineLocationMarker } from 'react-icons/hi';

export default function BookingDetails() {

    const {
        primaryColor,
        mainBackgroundColor,
        secondaryBackgroundColor,
        borderColor
    } = useCustomTheme()

    const handleDateSelect = () => {

    }

    return (
        <Flex w={"full"} h={"full"} flexDir={"column"} p={"8"} overflowY={"auto"} >
            <Flex w="full" roundedTop={"16px"} flexDirection={"column"} pb={"8"} style={{ boxShadow: "0px 4px 4px 0px #0000000A" }} >
                <Flex w={"full"} roundedTop={"16px"} h={"28px"} px={"5"} alignItems={"center"} color={"white"} bgColor={primaryColor} >
                    <Text fontSize={"14px"} fontWeight={"500"} >Booking services on Chasescroll</Text>
                </Flex>
                <Flex w={"full"} p={"8"} >
                    <Flex w={"full"} flexDir={"column"} gap={"5"} >
                        <Text fontSize={"24px"} fontWeight={"500"} >Business information</Text>
                        <Flex maxW={"398px"} flexDir={"column"} gap={"4"} >
                            <Text fontWeight={"500"} >Next Generation Barbers</Text>
                            <Flex w={"398px"} h={"250px"} rounded={"8px"} bgColor={"red"} />
                            <Flex w={"full"} rounded={"8px"} px={"3"} py={"6"} bgColor={secondaryBackgroundColor} >
                                <Text fontSize={"14px"} >Our services include: Make over and haircut and men manicure and pedicure</Text>
                            </Flex>
                            <Flex alignItems={"center"} gap={"3"} >
                                <HiOutlineLocationMarker size={"30px"} />
                                <Text fontSize={"14px"} >
                                143 Historic Town square, Lancaster, 75146
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"5"} >
                        <Text fontSize={"24px"} fontWeight={"500"} >Date & Time</Text>
                        <Flex w={"fit-content"} >
                            <DatePicker
                                // value={}
                                // disabled={name === "End" && !eventdata.startDate}
                                selected={new Date()}
                                dateFormat="MMM d, yyyy h:mm aa"
                                showTimeSelect
                                onChange={handleDateSelect}
                                inline={true}
                            />
                        </Flex>
                        <Flex h={"68px"} w={"full"} borderWidth={"1px"} px={"4"} >
                            <Flex fontSize={"24px"} alignItems={"center"} gap={"4"} >
                                <Text>Price:</Text>
                                <Text color={primaryColor} >N35.00</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex w={"full"} justifyContent={"space-between"} mt={"4px"} px={"8"} >
                    <Button height={"55px"} borderWidth={"1px"} w={"150px"} rounded={"full"} borderColor={borderColor} bgColor={mainBackgroundColor} _hover={{backgroundColor: mainBackgroundColor}} >Back</Button>
                    <Button height={"55px"} borderWidth={"1px"} w={"150px"} rounded={"full"} borderColor={primaryColor} bgColor={primaryColor} color={"white"} _hover={{backgroundColor: primaryColor}} >Next</Button>
                </Flex>
            </Flex>
        </Flex>
    )
}
