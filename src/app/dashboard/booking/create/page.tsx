"use client"
import StepFour from '@/components/booking_component/create_booking_component/step_four'
import StepOne from '@/components/booking_component/create_booking_component/step_one'
import StepThree from '@/components/booking_component/create_booking_component/step_three'
import StepTwo from '@/components/booking_component/create_booking_component/step_two'
import { BackIcon } from '@/components/svg'
import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

interface Props { }

function CreateBooking(props: Props) {
    const { } = props

    const [tab, setTab] = useState(0)

    return (
        <Box w={"full"} >
            <Flex alignItems={"center"}  >
                <Box w={"50px"} >
                    <BackIcon />
                </Box>
                <Text color={"#292D32"} fontWeight={"bold"} fontSize={"2xl"} >Set-up your business on Chasescroll</Text>
            </Flex>
            <Box px={"50px"} >
                <Text my={"2"} color={"#101828B2"} fontSize={"lg"} >This will help your get business discovered  by Event planners/Attendees on  Chasescroll.</Text>
                <Text mt={"6"}>{(tab !== 3 && tab !== 2) ? "Create Booking Profile" : tab !== 3 ? "Create Booking Profile" : "Verify" }</Text>
                <Flex width={"full"} gap={"3"} alignItems={"center"} >
                    <Box w={"full"} h={"3"} rounded={"8px"} bgColor={"#E3E4E9"} >
                        <Box w={tab === 0 ? "25%" : tab === 1 ? "50%" : tab === 2 ? "65%" : "80%"} h={"3"} rounded={"8px"} bgColor={"#5D70F9"} />
                    </Box>
                    <Box w={"fit-content"} >
                        <Text>{tab+1}/4</Text>
                    </Box>
                </Flex>
                <Flex w={"full"} py={"8"}  >
                    {tab === 0 && ( 
                        <StepOne next={setTab} />
                    )}
                    {tab === 1 && ( 
                        <StepTwo next={setTab} />
                    )}
                    {tab === 2 && ( 
                        <StepThree next={setTab} />
                    )}
                    {tab === 3 && ( 
                        <StepFour next={setTab} />
                    )} 
                </Flex>
            </Box>
        </Box>
    )
}

export default CreateBooking