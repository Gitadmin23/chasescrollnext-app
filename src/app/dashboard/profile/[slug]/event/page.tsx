"use client"
import GetEventById from '@/components/sharedComponent/user_event_by_id'
import PastEventById from '@/components/sharedComponent/user_event_by_id/pastEventById';
import useCustomTheme from '@/hooks/useTheme';
import { Button, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'

function Network({ params }: { params: { slug: string } }) {


    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();

    const [tab, setTab] = useState(false)

    return (
        <Flex width={"full"} flexDir={"column"} gap={"4"} >
            <Flex w={"full"} pb={"10"} >
                <Flex w={"70%"} mx={"auto"} pos={"relative"} >
                    {/* < */}
                    <Flex bg={secondaryBackgroundColor} p={"1"} mx={"auto"} rounded={"md"} >
                        <Button onClick={() => setTab(false)} _hover={{}} width={["150px", "200px", "200px"]} height={"43px"} bgColor={!tab ? mainBackgroundColor : secondaryBackgroundColor} color={!tab ? "brand.chasescrollBlue" : bodyTextColor} >
                            My Event
                        </Button>
                        <Button onClick={() => setTab(true)} _hover={{}} width={["150px", "200px", "200px"]} height={"43px"} bgColor={tab ? mainBackgroundColor : secondaryBackgroundColor} color={tab ? "brand.chasescrollBlue" : bodyTextColor} >
                            Past Event
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
            {!tab && (
                <GetEventById profile={true} user_index={params?.slug} />
            )}
            {tab && (
                <PastEventById />
            )}
        </Flex>
    )
}

export default Network
