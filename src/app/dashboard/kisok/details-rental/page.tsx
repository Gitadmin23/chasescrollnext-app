"use client"
import CustomButton from '@/components/general/Button'
import { CartIcon, LocationIcon_2 } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { IoStar } from 'react-icons/io5'

export default function KisokDetails() {

    const { primaryColor, borderColor, headerTextColor } = useCustomTheme()

    return (
        <Flex w={"full"} px={"6"} pt={["6", "6", "6", "6"]} pb={"12"} flexDir={"column"} overflowY={"auto"} >
            <Flex w={"full"} alignItems={"center"} justifyContent={"space-between"} >
                <Text fontSize={"24px"} fontWeight={"700"} >Hair Cut Nig</Text>
                <Flex gap={"3"} >
                        <Flex w={"48px"} h={"48px"} rounded={"full"} bgColor={"green"} />
                        <Flex w={"48px"} h={"48px"} rounded={"full"} bgColor={"green"} />
                </Flex>
            </Flex>
        </Flex>
    )
}
