import { BlueCalendarIcon } from '@/components/svg'
import { dateFormat, timeFormat } from '@/utils/dateFormat'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    name: string,
    date: any
}

function EventDate(props: Props) {
    const {
        date,
        name
    } = props

    return (
        <Box display={"flex"} flexDirection={"column"} borderBottomWidth={"1px"} roundedBottom={"lg"} px={"2"} alignItems={"center"} pb={"2"} >
            <Text fontSize={"sm"} fontWeight={"semibold"} >{name}</Text>
            <Flex width={"full"} gap={"3"} mt={"3"} alignItems={"center"} >
                <BlueCalendarIcon />
                <Box>
                    <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >{dateFormat(date)}</Text>
                    <Text fontWeight={"semibold"} fontSize={"sm"} color={"brand.chasescrollTextGrey2"} >{timeFormat(date)} (GMT)</Text>
                </Box>
            </Flex>
        </Box>
    )
}

export default EventDate
