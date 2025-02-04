"use client"
import CustomButton from '@/components/general/Button'
import { CartIcon, LocationIcon_2 } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoIosAdd, IoIosArrowForward, IoIosRemove } from 'react-icons/io'
import { IoStar } from 'react-icons/io5'

export default function KisokDetails() {

    const { primaryColor, borderColor, headerTextColor, secondaryBackgroundColor } = useCustomTheme()
    const [qty, setQty] = useState(1)

    return (
        <Flex w={"full"} px={"6"} h={"full"} pt={["6", "6", "6", "6"]} gap={"4"} pb={"12"} flexDir={"column"} overflowY={"auto"} >
            <Flex w={"full"} alignItems={"center"} justifyContent={"space-between"} >
                <Text fontSize={"24px"} fontWeight={"700"} >Hair Cut Nig</Text>
                <Flex gap={"3"} >
                    <Flex w={"48px"} h={"48px"} rounded={"full"} bgColor={"green"} />
                    <Flex w={"48px"} h={"48px"} rounded={"full"} bgColor={"green"} />
                </Flex>
            </Flex>
            <Flex w={"full"} h={"fit-content"} >
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
            </Flex>
            <Flex w={"full"} gap={"4"} >
                <Flex w={"full"} gap={"4"} flexDir={"column"} >
                    <Text fontSize={"20px"} fontWeight={"700"} >Details</Text>
                    <Text>Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputatelibero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosquad litora torquent per<br /><br />
                        conubia nostra, per inceptos himenaeos. Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputatelibero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosquad litora torquent per conubia nostra, per inceptos himenaeos.</Text>
                    <Text fontWeight={"700"} mt={"4"} >Show more</Text>
                    <Flex w={"full"} alignItems={"center"} gap={"3"} >
                        <Flex w={"48px"} h={"48px"} rounded={"full"} bgColor={"blue"} />
                        <Flex flexDirection={"column"} >
                            <Text fontSize={"18px"} fontWeight={"600"} >Service from the Next Generation Barbers </Text>
                            <Text fontSize={"13px"} >Joined Nov 2017 <span style={{ fontSize: "12px" }} >( 23+ Clients Served )</span></Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex w={"fit-content"} >
                    <Flex w={"413px"} flexDirection={"column"} >
                        <Flex w={"full"} rounded={"16px"} flexDirection={"column"} borderWidth={"1px"} p={"24px"} gap={"4"} borderColor={borderColor} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
                            <Text fontSize={"14px"} >Starting Price <span style={{ fontSize: "24px" }} >NGN 1000</span></Text>
                            <Flex alignItems={"center"} gap={"3"} >
                                <Text fontWeight={"500"} >Numbers of days</Text>
                                <Flex rounded={"39px"} alignItems={"center"} padding={"12px"} gap={"3"} >
                                    <Flex as={"button"} onClick={()=> setQty((prev)=> prev === 1 ? 1 : prev - 1)} w={"46px"} h={"39px"} rounded={"78px"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor}  >
                                        <IoIosRemove />
                                    </Flex>
                                    <Text fontSize={"18px"} >{qty}</Text>
                                    <Flex  as={"button"} onClick={()=> setQty((prev)=> prev + 1)} w={"46px"} h={"39px"} rounded={"78px"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor}  >
                                        <IoIosAdd />
                                    </Flex>
                                </Flex>
                            </Flex>
                            <CustomButton text={"NGN 300 Pay"} borderRadius={"999px"} height={"55px"} />
                        </Flex>
                        <Flex>
                            <Text>Service Menu List </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
