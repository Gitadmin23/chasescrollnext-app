import EventPrice from '@/components/sharedComponent/event_price'
import InterestedUsers from '@/components/sharedComponent/interested_users'
import { formatNumber } from '@/utils/numberFormat'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    name: string,
    currency: string,
    minPrice: string,
    maxPrice: string,
    event?: any
}

function EventHeader(props: Props) {
    const {
        name,
        currency,
        minPrice,
        maxPrice,
        event
    } = props

    return (
        <Flex mt={"12"} justifyContent={"space-between"} alignItems={"center"}>
            <Box>
                <Text fontSize={"24px"} fontWeight={"bold"} >{name}</Text>
                <Text fontSize={"20px"} fontWeight={"semibold"} color={"brand.chasescrollBlue"} > 
                    <EventPrice minPrice={minPrice} maxPrice={maxPrice} currency={currency} />
                </Text>
            </Box> 
            <InterestedUsers fontSize={16} event={event} border={"2px"} size={"38px"} refund={true} />
        </Flex>
    )
}

export default EventHeader
