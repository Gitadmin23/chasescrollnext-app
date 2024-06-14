import {Box, Text, useColorMode} from '@chakra-ui/react'
import React from 'react'
import useCustomTheme from "@/hooks/useTheme";

interface Props {
    name: string,
    data: string
 }

function OtherEventInfo(props: Props) {
    const {
        name,
        data
     } = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box width={"full"} py={"3"} >
            <Text fontSize={"18px"} fontWeight={"bold"} color={headerTextColor}  >{name}</Text>
            <Text fontWeight={"medium"} mt={"2"} color={colorMode === 'light' ? "#5B5858":bodyTextColor} >{data}</Text>
        </Box>
    )
}

export default OtherEventInfo
