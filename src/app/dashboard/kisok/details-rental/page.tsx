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
        <Flex w={"full"} px={"6"} pt={["6", "6", "6", "6"]} gap={"4"} pb={"12"} flexDir={"column"} overflowY={"auto"} >
            <Flex w={"full"} alignItems={"center"} justifyContent={"space-between"} >
                <Text fontSize={"24px"} fontWeight={"700"} >Hair Cut Nig</Text>
                <Flex gap={"3"} >
                    <Flex w={"48px"} h={"48px"} rounded={"full"} bgColor={"green"} />
                    <Flex w={"48px"} h={"48px"} rounded={"full"} bgColor={"green"} />
                </Flex>
            </Flex>
            <Flex w={"full"} height={"344px"} gap={"3"} >
                <Flex w={"full"} rounded={"xl"} bgColor={"blue"} h={"full"} >

                </Flex>
                <Flex w={"full"} h={"full"} gap={"3"} >
                    <Flex w={"full"} h={"full"} rounded={"xl"} bgColor={"green"} >

                    </Flex>
                    <Flex w={"full"} h={"full"} flexDir={"column"} gap={"3"}  >
                        <Flex w={"full"} h={"full"} rounded={"xl"} bgColor={"green"} >

                        </Flex>
                        <Flex w={"full"} h={"full"} rounded={"xl"} bgColor={"green"} >

                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex w={"full"} gap={"4"} >
                <Flex w={"full"} flexDir={"column"} >
                    <Text fontSize={"20px"} fontWeight={"700"} >Details</Text>
                    <Text>Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputatelibero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosquad litora torquent per<br /><br />
                        conubia nostra, per inceptos himenaeos. Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputatelibero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosquad litora torquent per conubia nostra, per inceptos himenaeos.</Text>
                    <Text fontWeight={"700"} >Show more</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}
