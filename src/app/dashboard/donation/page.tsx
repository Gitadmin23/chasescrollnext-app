"use client"
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function Donation() {

    const {
        primaryColor,
        bodyTextColor,
        borderColor
    } = useCustomTheme()

    return (
        <Flex w={"full"} px={"6"} pt={"12"} flexDir={"column"} >
            <Flex pb={"2"} w={"full"} h={"fit-content"} borderBottomWidth={"1px"} borderColor={borderColor} >
                <Text fontSize={"24px"} fontWeight={"700"} ><span style={{color: primaryColor}} >Chasescroll</span> Fund Raising</Text>
            </Flex>
            <Flex py={"4"} >
                <Text  >Fund Raising Campaign  ongoing </Text>
            </Flex>
        </Flex>
    )
}