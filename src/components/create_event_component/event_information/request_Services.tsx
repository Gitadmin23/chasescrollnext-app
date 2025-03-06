import CustomButton from '@/components/general/Button'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function RequestServices() {

    const { primaryColor } = useCustomTheme()

    return (
        <Flex w={"full"} flexDir={"column"} >
            <Flex w={"full"} justifyContent={"space-between"} gap={"2"} alignItems={"center"} >
                <Text fontSize={"14px"} fontWeight={"500"} >Request services and rental for this event:</Text>
                <CustomButton text={""} rounded={"16px"} backgroundColor={"#F7F8FE"} color={primaryColor} width={"112px"} />
            </Flex>
        </Flex>
    )
}
