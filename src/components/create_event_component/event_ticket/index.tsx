import useEventStore from '@/global-state/useCreateEventState'; 
import { Box, Checkbox, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import EventTicketHeader from './header';
import SelectTicket from './select_ticket'; 
import SubmitEvent from '../submit_event';

function EventTicket() { 

    const { eventdata } = useEventStore((state) => state); 

    const getValidationInfo =()=> {

        if(!eventdata?.productTypeData[0].totalNumberOfTickets){
            true
        } else if(!eventdata?.productTypeData[0].ticketType){
            true
        } else if(!eventdata?.productTypeData[0].minTicketBuy){
            true
        } else if(!eventdata?.productTypeData[0].maxTicketBuy){
            true
        } else {
            return false
        }
    }

    return (
        <Flex width={"full"} display={"flex"} flexDirection={"column"} alignItems={"center"} pt={"10"} px={"6"} >
            <Flex width={"full"} maxWidth={["full", "full", "600px"]} flexDirection={"column"} justifyContent={"space-between"} gap={"4"} py={"6"} >
                <EventTicketHeader />
                <SelectTicket /> 
                <SubmitEvent />
            </Flex>
        </Flex>
    )
}

export default EventTicket
