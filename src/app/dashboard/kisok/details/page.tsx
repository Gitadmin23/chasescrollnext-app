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
            <Flex w={"full"} justifyContent={"space-between"} >
                <Text fontSize={"24px"} fontWeight={"700"} >Explore  Marchs on chasescroll Kiosk</Text>
                <Flex w={"fit-content"} gap={4} alignItems={"center"} >
                    <CustomButton alignItems={"center"} text={"List "} px={"15px"} height={"44px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"160px"} />
                    <Flex as={"button"} w={"40px"} h={"40px"} justifyContent={"center"} alignItems={"center"} >
                        <CartIcon />
                    </Flex>
                    <Flex w={"40px"} h={"40px"} backgroundColor={"red"} borderRadius={"full"} />
                </Flex>
            </Flex>
            <Flex w={"full"} gap={"6"} >
                <Flex w={"full"} flexDir={"column"} gap={"4"} >
                    <Flex gap={"1"} alignItems={"center"} >
                        <Text fontSize={"14px"} fontWeight={"500"} >Home</Text>
                        <IoIosArrowForward />
                        <Text fontSize={"14px"} fontWeight={"500"} >Product details</Text>
                        <IoIosArrowForward />
                        <Text fontSize={"14px"} fontWeight={"500"} >Smart Watch</Text>
                    </Flex>
                    <Flex w={"full"} h={"620px"} bgColor={"green"} >

                    </Flex>
                    <Flex gap={"4"} >
                        <Text fontSize={"20px"} fontWeight={"600"} textDecor={"underline"} >Reviews (100)</Text>
                        <Flex h={"32px"} w={"101px"} rounded={"64px"} borderWidth={"1px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} >
                            <Text fontSize={"13px"} fontWeight={"500"} >Good (34)</Text>
                        </Flex>
                        <Flex h={"32px"} w={"101px"} rounded={"64px"} borderWidth={"1px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} >
                            <Text fontSize={"13px"} fontWeight={"500"} >Satisfied (43)</Text>
                        </Flex>
                        <Flex h={"32px"} w={"101px"} rounded={"64px"} borderWidth={"1px"} borderColor={borderColor} justifyContent={"center"} alignItems={"center"} >
                            <Text fontSize={"13px"} fontWeight={"500"} >Satisfied (43)</Text>
                        </Flex>
                    </Flex>
                    <Flex flexDir={"column"} gap={"4"} mt={"4"} >
                        {[1, 2, 3, 4]?.map((item) => (
                            <Flex key={item} flexDir={"column"} gap={"2"} >
                                <Flex gap={"2"} alignItems={"center"} >
                                    <IoStar size={"24px"} color={"#1E1E1E"} />
                                    <IoStar size={"24px"} color={"#1E1E1E"} />
                                    <IoStar size={"24px"} color={"#1E1E1E"} />
                                    <IoStar size={"24px"} color={"#1E1E1E"} />
                                    <IoStar size={"24px"} color={"#D5D6DE"} />
                                </Flex>
                                <Text ><span style={{ fontWeight: "500", fontSize: "20px" }} >Archibong Felix:</span> Lorem ipsum dolor sit amet cons, lorem ipsum dolor sit cons, Lorem ipsum dolor sit amet cons, lorem ipsum dolor sit amet cons, l</Text>
                            </Flex>
                        ))}
                    </Flex>
                </Flex>
                <Flex w={"full"} flexDir={"column"} gap={"4"} >
                    <Text fontSize={"42px"} fontWeight={"700"} >Hoodie for camp x 201</Text>
                    <Flex flexDirection={"column"} gap={"1"} >
                        <Text fontSize={"14px"} fontWeight={"500"} >Product  Description</Text>
                        <Text>{`1pc JELLOO Men'S Smartwatch with 360p TFT Display, 3.68cm Screen, 300mAh Rechargeable Battery, 3ATM Water Resistance, Wireless 5.2, USB Charging, LED Flashlight, Pedometer, Sports Modes, Compatible with iPhone & Android - Ideal Gift for Men`}</Text>
                    </Flex>
                    <Flex gap={4} alignItems={"center"} >
                        <Flex gap={2} alignItems={"center"} >
                            <Text fontSize={"14px"} fontWeight={"500"} >Product Quantity</Text>
                            <Text fontSize={"16px"} color={primaryColor} fontWeight={"600"} >Product Quantity</Text>
                        </Flex>
                        <Flex gap={2} alignItems={"center"} >
                            <Text fontWeight={"500"} >Item Reviews</Text>
                            <IoStar size={"24px"} color={"#1E1E1E"} />
                            <Text fontWeight={"500"} >8.7</Text>
                        </Flex>
                    </Flex>
                    <Flex alignItems={"center"} >
                        <Text fontSize={"24px"} fontWeight={"700"} >N 24,000</Text>
                        <Text color={"#434344"} >N 24,000</Text>
                    </Flex>
                    <Flex w={"full"} gap={"2"} alignItems={"center"} >
                        <Text color={"#434344"} >Event</Text>
                        <Flex w={"full"} h={"1px"} bgColor={"#B6B6B633"} />
                    </Flex>
                    <Flex w={"full"} rounded={"16px"} gap={"3"} borderWidth={"2px"} borderColor={"#F1F1F1"} p={"3"} >
                        <Flex w={"full"} h={"145px"} bgColor={"gray"} rounded="16px" roundedTopRight={"0px"} />
                        <Flex w={"full"} flexDirection={"column"} gap={"1"} >
                            <Flex fontSize={"8px"} fontWeight={"700"} justifyContent={"center"} alignItems={"center"} bgColor={"#233DF31A"} rounded={"32px"} h={"24px"} w={"65px"} >
                                3 Ticket left
                            </Flex>
                            <Text fontSize={"18px"} fontWeight={"600"}  >Designing for Universe musk 2,0</Text>
                            <Text color={headerTextColor} fontSize={"12px"} fontWeight={"500"} >Thursday, August 15 · 7 - 8pm WAT</Text>
                            <Flex alignItems={"center"} gap={"2"} >
                                <LocationIcon_2 />
                                <Text fontSize={"12px"} >State farm arena, ATL</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
