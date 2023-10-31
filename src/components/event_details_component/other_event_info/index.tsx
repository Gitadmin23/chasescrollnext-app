import { Box, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    name: string,
    data: string
 }

function OtherEventInfo(props: Props) {
    const {
        name,
        data
     } = props

    return (
        <Box width={"full"} py={"3"} >
            <Text fontSize={"18px"} fontWeight={"bold"}  >{name}</Text>
            <Text fontWeight={"medium"} mt={"2"} color={"#5B5858"} >{data}</Text>
        </Box>
    )
}

export default OtherEventInfo
