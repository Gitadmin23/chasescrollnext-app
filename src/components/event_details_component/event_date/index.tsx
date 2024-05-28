import { BlueCalendarIcon } from '@/components/svg'
import { dateFormat, timeFormat } from '@/utils/dateFormat'
import { Box, Flex, Text } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'

interface Props {
    name: string,
    date: any,
    dashboard?: boolean
}

function EventDate(props: Props) {
    const {
        date,
        name,
        dashboard
    } = props 

    return (
        <Box display={"flex"} flexDirection={"column"} borderBottomWidth={dashboard ? "0px":"1px"} borderBottomColor={"#B6B6B6"} roundedBottom={["0px", "0px", "lg"]} px={"2"} alignItems={dashboard? "center":"start"} pb={"2"} >
            <Text fontSize={"sm"} display={dashboard ? "none" :"block"} ml={dashboard ? "0px":"3"} fontWeight={"semibold"} >{name}</Text>
            <Flex width={"full"} gap={"3"} mt={"3"} alignItems={"center"} >
                <BlueCalendarIcon />
                <Box>
                    <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >{dateFormat(date)}</Text>
                    <Text fontWeight={"semibold"} fontSize={"sm"} color={"brand.chasescrollTextGrey2"} >{timeFormat(date)} ({new Date(date).toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2]})</Text>
                </Box>
            </Flex>
        </Box>
    )
}

export default EventDate
