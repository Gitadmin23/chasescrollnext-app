import { Flex } from '@chakra-ui/react' 
import EventTicketHeader from './header';
import SelectTicket from './select_ticket'; 
import SubmitEvent from '../submit_event';
import FunnelBtn from './funnel';
import GetCommunity from './funnel/get_community';
import { useState } from 'react';

function EventTicket() {   

    const [isFree, setIsFree] = useState("")

    return (
        <Flex width={"full"} display={"flex"} flexDirection={"column"} alignItems={"center"} pt={"10"} px={"6"} >
            <Flex width={"full"} maxWidth={["full", "full", "600px"]} flexDirection={"column"} justifyContent={"space-between"} gap={"4"} py={"6"} >
                <EventTicketHeader type={setIsFree} />
                <SelectTicket type={isFree} /> 
                <FunnelBtn />
                <GetCommunity />
                <SubmitEvent type={isFree} />
            </Flex>
        </Flex>
    )
}

export default EventTicket
