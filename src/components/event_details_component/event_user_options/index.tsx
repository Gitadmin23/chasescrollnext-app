import { Box, Button, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import SelectTicket from '../select_ticket'
import { useRouter } from 'next/navigation'
import ViewClickYser from '../view_click_user'

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
    const [listOfClicks, setListOfClicks] = useState(0)

    const clickHandler = () => {
        router.push("/dashboard/event/edit_event/" + event?.id)
    }

    console.log(event?.productTypeData);

    useEffect(() => {
        event?.productTypeData?.map((item: any) => {
            let count = item?.clickThroughCount + listOfClicks

            setListOfClicks(count)
        })
    }, [])

    return (
        <Box my={"auto"} >
            {isOrganizer && (
                <Flex flexDirection={["column", "column", "row"]} width={"full"} justifyContent={"center"} alignItems={"center"} gap={"3"} >
                    {!event?.productTypeData[0]?.rerouteURL ?
                        <Button onClick={() => router.push("/dashboard/settings/event-dashboard/" + event?.id)} width={"full"} bg={"brand.chasescrollBlue"} height={"49px"} color={"white"} fontSize={"sm"} fontWeight={"semibold"} >My Dashboard</Button> :
                        <ViewClickYser ticket={ticket} data={event} listOfClicks={listOfClicks} />
                    }
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
