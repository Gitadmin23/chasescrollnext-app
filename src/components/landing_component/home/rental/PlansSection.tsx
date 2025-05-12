import useCustomTheme from '@/hooks/useTheme'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function PlansSection() {

    const { primaryColor } = useCustomTheme()

    return (
        <Flex color={"white"} w={"full"} gap={["4", "4", "6"]} px={["6", "6", "20"]} py={["6", "6", "24"]} >
            <Flex w={"full"} flexDirection={"column"} gap={["4", "6", "6"]} bgColor={"#C68241"} rounded={["12px", "12px", "32px"]} px={["3", "3", "6"]} pb={["8", "8", "28"]} pt={["8", "8", "10"]} >
                <Text maxW={"1000px"} fontWeight={"700"} fontSize={["32px", "32px", "46px"]} lineHeight={"120%"} >{`You're safe with us`}</Text>
                <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                        <Flex w={"44px"} h={"44px"} rounded={"full"} borderWidth={"1px"} borderColor={"white"} >

                        </Flex>
                        <Text maxW={"311px"} fontSize={["24px", "24px", "32px"]} fontWeight={"700"} lineHeight={"120%"} >Wide Selection</Text>
                        <Text maxW={"311px"} fontSize={"14px"} >{`From tables, chairs, venue, projectors, sound equipments to lighting and apartments. Find everything you need in one place.`}</Text>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                        <Flex w={"44px"} h={"44px"} rounded={"full"} borderWidth={"1px"} borderColor={"white"} >

                        </Flex>
                        <Text maxW={"311px"} fontSize={["24px", "24px", "32px"]} fontWeight={"700"} lineHeight={"120%"} >Flexible Options</Text>
                        <Text maxW={"311px"} fontSize={"14px"} >{`Choose rental durations and delivery options that works for your event timeline.`}</Text>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                        <Flex w={"44px"} h={"44px"} rounded={"full"} borderWidth={"1px"} borderColor={"white"} >

                        </Flex>
                        <Text maxW={"311px"} fontSize={["24px", "24px", "32px"]} fontWeight={"700"} lineHeight={"120%"} >No Ownership Hassles</Text>
                        <Text maxW={"311px"} fontSize={"14px"} >No need to buy, store, or maintain—just rent, use, and return.</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
