import { Flex } from '@chakra-ui/react' 
import EventTicketHeader from './header';
import SelectTicket from './select_ticket'; 
import SubmitEvent from '../submit_event';
import FunnelBtn from './funnel';
import GetCommunity from './funnel/get_community';

function EventTicket() {   

    return (
        <Flex width={"full"} display={"flex"} flexDirection={"column"} alignItems={"center"} pt={"10"} px={"6"} >
            <Flex width={"full"} maxWidth={["full", "full", "600px"]} flexDirection={"column"} justifyContent={"space-between"} gap={"4"} py={"6"} >
                <EventTicketHeader />
                <SelectTicket /> 
                <FunnelBtn />
                <GetCommunity />
                <SubmitEvent />
            </Flex>
        </Flex>
    )
}

export default EventTicket
