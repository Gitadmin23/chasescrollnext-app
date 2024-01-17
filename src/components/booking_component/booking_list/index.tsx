"use client"
import { HeartIcon, LocationStroke, ReviewIcon, ShareIconb } from '@/components/svg'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props { }

function BookingList(props: Props) {
    const { } = props 

    const Router = useRouter()

    return (
        <Box width={"full"} py={"8"} >
            <Flex as={"button"} onClick={()=> Router.push("/dashboard/booking/information")} rounded={"32px"} flexDir={"column"} borderColor={"#D0D4EB"} borderWidth={"1px"} roundedTopRight={"0px"} width={"full"}  >
                <Box p={"2"} >
                    <Flex gap={"1"} alignItems={"center"} >
                        <Box width={"60px"} height={"60px"} rounded={"full"} roundedTopRight={"0px"} bgColor={"gray.300"} />
                        <Box>
                            <Text fontWeight={"bold"} color={"#131418"} >Davids Fus</Text>
                            <Text fontWeight={"normal"} fontSize={"xs"} color={"#5D70F9"} >Business Owner</Text>
                        </Box>
                    </Flex>
                </Box>
                <Box width={"full"} p={"3"} roundedTop={"8px"} borderColor={"#D0D4EB"} borderTopWidth={"1px"}>
                    <Flex width={"full"} bg={"gray.200"} h={"350px"} rounded={"8px"} p={"3"} >
                        <Flex w={"full"} mt={"auto"} gap={"3"} >
                            <Box w={"80px"} h={"87px"} rounded={"8px"} bg={"green.400"} />
                            <Box w={"80px"} h={"87px"} rounded={"8px"} bg={"green.400"} />
                            <Box w={"80px"} h={"87px"} rounded={"8px"} bg={"green.400"} />
                        </Flex>
                    </Flex>
                    <Box width={"full"} px={"2"} mt={"4"} > 
                        <Text fontSize={"2xl"} textAlign={"left"} fontWeight={"bold"} color={"#131418"} >Next Generation Barbers</Text>
                        {/* <Rating /> */}

                        <Flex gap={"1"} py={"10px"} >
                            <LocationStroke />
                            <Text color={"#00000080"} >143 Historic Town square, Lancaster, 75146</Text>
                        </Flex>
                        <Flex justifyContent={"space-between"} w={"full"} py={"3"} >
                            <Flex gap={"3px"} flexDir={"column"} alignItems={"center"} >
                                <Flex justifyContent={"center"} alignItems={"center"} w={"7"} h={"7"} >
                                    <HeartIcon />
                                </Flex>
                                <Text fontWeight={"normal"} fontSize={"xs"} color={"#101828B2"} >3 likes</Text>
                            </Flex>
                            <Flex gap={"3px"} flexDir={"column"} alignItems={"center"} >
                                <Flex justifyContent={"center"} alignItems={"center"} w={"7"} h={"7"} >
                                    <ReviewIcon />
                                </Flex>
                                <Text fontWeight={"normal"} fontSize={"xs"} color={"#101828B2"} >12k Review</Text>
                            </Flex>
                            <Flex gap={"3px"} flexDir={"column"} alignItems={"center"} >
                                <Flex justifyContent={"center"} alignItems={"center"} w={"7"} h={"7"} >
                                    <ShareIconb />
                                </Flex>
                                <Text fontWeight={"normal"} fontSize={"xs"} color={"#101828B2"} >9k Shares</Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
            </Flex>
        </Box>
    )
}

export default BookingList
