import EventPrice from '@/components/sharedComponent/event_price'
import { formatNumber } from '@/utils/numberFormat'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    name: string,
    currency: string,
    minPrice: string,
    maxPrice: string
}

function EventHeader(props: Props) {
    const {
        name,
        currency,
        minPrice,
        maxPrice
    } = props

    return (
        <Flex mt={"12"} justifyContent={"space-between"} alignItems={"center"}>
            <Box>
                <Text fontSize={"24px"} fontWeight={"bold"} >{name}</Text>
                <Text fontSize={"20px"} fontWeight={"medium"} color={"brand.chasescrollBlue"} > 
                    <EventPrice minPrice={minPrice} maxPrice={maxPrice} currency={currency} />
                </Text>
            </Box>
        </Flex>
    )
}

export default EventHeader
