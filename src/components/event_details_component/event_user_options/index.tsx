import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import SelectTicket from '../select_ticket'
import { useRouter } from 'next/navigation' 

interface Props {
    isOrganizer: boolean,
    currency: any,
    ticket: any,
    selectedticket: any,
    setCategory: any,
    isBought: boolean,
    event: any
}

function EventUserOption(props: Props) {
    const {
        isOrganizer,
        currency,
        ticket,
        selectedticket,
        setCategory,
        isBought,
        event
    } = props

    const router = useRouter() 

    const clickHandler = () => { 
        router.push("/dashboard/event/edit_event/"+event?.id)
    }

    return (
        <Box my={"auto"} >
            {isOrganizer && (
                <Flex flexDirection={["column", "column", "row"]} width={"full"} justifyContent={"center"} alignItems={"center"} gap={"3"} >
                    <Button onClick={()=> router.push("/dashboard/settings/event-dashboard/"+event?.id)} width={"full"} bg={"brand.chasescrollBlue"} height={"49px"} color={"white"} fontSize={"sm"} fontWeight={"semibold"} >My Dashboard</Button>
                    <Button onClick={() => clickHandler()} _disabled={{ opacity: "0.4" }} width={"full"} bg={"brand.chasescrollBlue"} height={"49px"} color={"white"} fontSize={"sm"} fontWeight={"semibold"} >Edit Event</Button>
                </Flex>
            )}
            {!isBought && (
                <>
                    {(!isOrganizer) && (
                        <SelectTicket data={event} ticket={ticket} selectedticket={selectedticket} currency={currency} setCategory={setCategory} />
                    )}
                </>
            )}
        </Box>
    )
}

export default EventUserOption
