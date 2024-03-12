"use client"
import CreateEventHeader from '@/components/create_event_component/create_event_header'
import EventInformation from '@/components/create_event_component/event_information'
import EventTheme from '@/components/create_event_component/event_theme'
import EventTicket from '@/components/create_event_component/event_ticket'
import useEventStore from '@/global-state/useCreateEventState'
import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'

interface Props { }

function CreateEvent(props: Props) {
    const { } = props

    const { tab, changeTab } = useEventStore((state) => state);

    React.useEffect(() => {
        changeTab(0)
    }, [])

    return (
        <Flex width={"full"} h={"100vh"} pt={"74px"} overflow={"hidden"} >
            <CreateEventHeader />
            <Flex bgColor={"gray.300"} p={"3"} overflowY={"auto"} > 
                <Flex bgColor={"white"}  px={"3"} h={"fit-content"} rounded={"2xl"} >
                    {tab === 0 && ( 
                        <EventTheme />
                    )}
                    {tab === 1 && (
                        <EventInformation />
                    )}
                    {tab === 2 && (
                        <EventTicket />
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default CreateEvent
