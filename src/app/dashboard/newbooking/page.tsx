"use client"
import { AddIconWithBorder } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Button, Flex, Grid, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation' 
import React from 'react'

export default function Booking() {

    const {
        primaryColor, secondaryBackgroundColor
    } = useCustomTheme()

    const router = useRouter()

    return (
        <Flex w={"full"} justifyContent={"center"} overflowY={"auto"} >
            <Flex w={"full"} maxW={"666px"} flexDir={"column"} >
                <Flex w={"full"} h={"auto"} flexDir={"column"} gap={"6"} px={["4", "4", "4", "4", "8"]} py={"8"}>
                    <Flex w={"full"} gap={"4"} alignItems={"center"} >
                        <Button bgColor={primaryColor} _hover={{ backgroundColor: primaryColor }} color={"white"} rounded={"full"} fontSize={"16px"} fontWeight={"400"} h={"50px"} w={"160px"} >Categories</Button>
                        <Button onClick={() => router?.push("/dashboard/newbooking/mybooking")} bgColor={secondaryBackgroundColor} _hover={{ backgroundColor: secondaryBackgroundColor }} rounded={"full"} fontSize={"16px"} fontWeight={"400"} h={"50px"} w={"160px"} >My Business</Button>

                        <Flex onClick={() => router.push("/dashboard/newbooking/create")} width={"40px"} height={"40px"} rounded={"full"} as={"button"} backgroundColor={primaryColor} justifyContent={"center"} alignItems={"center"} ml={"auto"} >
                            <AddIconWithBorder />
                        </Flex>
                    </Flex>
                    <Text>Sponsored</Text>
                    <Flex w={"full"} h={"224px"} rounded={"16px"} bg={"gold"} >

                    </Flex>
                    <Text fontSize={"18px"} fontWeight={"700"} >Top Categories</Text>
                    <Grid templateColumns='repeat(3, 1fr)' gap={6} >
                        <Flex w={"full"} gap={"2"} alignItems={"center"} >
                            <Flex w={"40px"} h={"40px"} rounded={"full"} bg={primaryColor} />
                            <Text fontWeight={"500"} fontSize={"18px"} >Event Planners</Text>
                        </Flex>
                        <Flex w={"full"} gap={"2"} alignItems={"center"} >
                            <Flex w={"40px"} h={"40px"} rounded={"full"} bg={primaryColor} />
                            <Text fontWeight={"500"} fontSize={"18px"} >Event Planners</Text>
                        </Flex>
                        <Flex w={"full"} gap={"2"} alignItems={"center"} >
                            <Flex w={"40px"} h={"40px"} rounded={"full"} bg={primaryColor} />
                            <Text fontWeight={"500"} fontSize={"18px"} >Event Planners</Text>
                        </Flex>
                        <Flex w={"full"} gap={"2"} alignItems={"center"} >
                            <Flex w={"40px"} h={"40px"} rounded={"full"} bg={primaryColor} />
                            <Text fontWeight={"500"} fontSize={"18px"} >Event Planners</Text>
                        </Flex>
                        <Flex w={"full"} gap={"2"} alignItems={"center"} >
                            <Flex w={"40px"} h={"40px"} rounded={"full"} bg={primaryColor} />
                            <Text fontWeight={"500"} fontSize={"18px"} >Event Planners</Text>
                        </Flex>
                        <Flex w={"full"} gap={"2"} alignItems={"center"} >
                            <Flex w={"40px"} h={"40px"} rounded={"full"} bg={primaryColor} />
                            <Text fontWeight={"500"} fontSize={"18px"} >Event Planners</Text>
                        </Flex>
                        <Flex w={"full"} gap={"2"} alignItems={"center"} >
                            <Flex w={"40px"} h={"40px"} rounded={"full"} bg={primaryColor} />
                            <Text fontWeight={"500"} fontSize={"18px"} >Event Planners</Text>
                        </Flex>
                    </Grid>
                    <Text fontSize={"18px"} fontWeight={"700"} >All Services</Text>
                    <Grid templateColumns='repeat(3, 1fr)' gap={6} >
                        <Flex w={"full"} gap={"2"} alignItems={"center"} >
                            <Flex w={"40px"} h={"40px"} rounded={"full"} bg={primaryColor} />
                            <Text fontWeight={"500"} fontSize={"18px"} >Event Planners</Text>
                        </Flex>
                        <Flex w={"full"} gap={"2"} alignItems={"center"} >
                            <Flex w={"40px"} h={"40px"} rounded={"full"} bg={primaryColor} />
                            <Text fontWeight={"500"} fontSize={"18px"} >Event Planners</Text>
                        </Flex>
                        <Flex w={"full"} gap={"2"} alignItems={"center"} >
                            <Flex w={"40px"} h={"40px"} rounded={"full"} bg={primaryColor} />
                            <Text fontWeight={"500"} fontSize={"18px"} >Event Planners</Text>
                        </Flex>
                        <Flex w={"full"} gap={"2"} alignItems={"center"} >
                            <Flex w={"40px"} h={"40px"} rounded={"full"} bg={primaryColor} />
                            <Text fontWeight={"500"} fontSize={"18px"} >Event Planners</Text>
                        </Flex>
                        <Flex w={"full"} gap={"2"} alignItems={"center"} >
                            <Flex w={"40px"} h={"40px"} rounded={"full"} bg={primaryColor} />
                            <Text fontWeight={"500"} fontSize={"18px"} >Event Planners</Text>
                        </Flex>
                        <Flex w={"full"} gap={"2"} alignItems={"center"} >
                            <Flex w={"40px"} h={"40px"} rounded={"full"} bg={primaryColor} />
                            <Text fontWeight={"500"} fontSize={"18px"} >Event Planners</Text>
                        </Flex>
                        <Flex w={"full"} gap={"2"} alignItems={"center"} >
                            <Flex w={"40px"} h={"40px"} rounded={"full"} bg={primaryColor} />
                            <Text fontWeight={"500"} fontSize={"18px"} >Event Planners</Text>
                        </Flex>
                    </Grid>
                </Flex>
            </Flex>
        </Flex>
    )
}
