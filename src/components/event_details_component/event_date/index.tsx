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
        <Box display={"flex"} flexDirection={dashboard ? "row":"column"} gap={dashboard ? "2" : "0px"} borderBottomWidth={dashboard ? "0px":"1px"} borderBottomColor={"#B6B6B6"} roundedBottom={["0px", "0px", "lg"]} px={dashboard? "0px":"2"} alignItems={dashboard? "center":"start"} pb={"2"} >
            <Text fontSize={"sm"} ml={dashboard ? "0px":"3"} fontWeight={"semibold"} >{name}</Text>
            <Flex width={dashboard ? "auto" : "full"} gap={"3"} mt={dashboard ? "0px":"3"} alignItems={"center"} >
                {!dashboard && (
                    <BlueCalendarIcon />
                )}
                <Flex flexDirection={dashboard? "row": "column"} gap={dashboard ? "2" : "0px"} alignItems={dashboard ? "center" : "flex-start"} >
                    <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >{dateFormat(date)}</Text>
                    <Text fontWeight={"semibold"} fontSize={"sm"} color={"brand.chasescrollTextGrey2"} >{timeFormat(date)} ({new Date(date).toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2]})</Text>
                </Flex>
            </Flex>
        </Box>
    )
}

export default EventDate
