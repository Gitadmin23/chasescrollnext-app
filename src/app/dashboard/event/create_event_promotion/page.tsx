"use client"
import CreateEventHeader from '@/components/create_event_component/create_event_header'
import EventInformation from '@/components/create_event_component/event_information'
import EventTheme from '@/components/create_event_component/event_theme'
import EventTicket from '@/components/create_event_component/event_ticket'
import useEventStore from '@/global-state/useCreateEventState'
import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'

interface Props { }

function CreateEvent(props: Props) {
    const { } = props

    const { tab, changeTab } = useEventStore((state) => state);
    const { eventdata, updateEvent } = useEventStore((state) => state);

    React.useEffect(() => {
        changeTab(0)

        let clone: any = { ...eventdata } 
        clone.productTypeData[0].rerouteURL = "https://"
        clone.productTypeData[0].ticketType = ""

        updateEvent(clone)
    }, [])

    console.log(eventdata);
    

    return (
        <Box width={"full"} >
            <CreateEventHeader />
            {tab === 0 && (
                <EventTheme />
            )}
            {tab === 1 && (
                <EventInformation />
            )}
            {tab === 2 && (
                <EventTicket promotion={true} />
            )}
        </Box>
    )
}

export default CreateEvent
