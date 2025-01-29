"use client"
import CustomButton from '@/components/general/Button'
import { LocationPin, LocationStroke, RentalIcon, ServiceIcon, StoreIcon } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Grid, Select, Text, useColorMode } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function KisokPage() {

    const { primaryColor, borderColor, bodyTextColor, secondaryBackgroundColor, headerTextColor } = useCustomTheme()

    const [tab, setTab] = useState<"kiosk" | "service" | "rental">("kiosk")
    const { colorMode, toggleColorMode } = useColorMode();

    const router = useRouter()

    return (
        <Flex w={"full"} px={"6"} pt={["6", "6", "12", "12"]} pb={"12"} flexDir={"column"} overflowY={"auto"} >
            <Flex pb={"2"} w={"full"} h={"fit-content"} flexDirection={["column", "column", "row", "row"]} gap={"2"} justifyContent={"space-between"} borderBottomWidth={"1px"} borderColor={borderColor} >
                <Text fontSize={"24px"} fontWeight={"700"} ><span style={{ color: primaryColor }} >Chasescroll</span> Fundraising</Text>
            </Flex>
            <Flex py={"6"} justifyContent={"space-between"} borderBottomWidth={"1px"} borderColor={borderColor} >
                <Flex gap={"3"} alignItems={"center"} >
                    <CustomButton onClick={() => setTab("kiosk")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <StoreIcon color={tab === "kiosk" ? "white" : "black"} />
                            <Text>Kiosk</Text>
                        </Flex>
                    } px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={tab === "kiosk" ? primaryColor : "white"} border={"1px"} borderColor={tab === "kiosk" ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={tab === "kiosk" ? "white" : headerTextColor} width={"fit-content"} />
                    <CustomButton onClick={() => setTab("service")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <ServiceIcon color={tab === "service" ? "white" : "black"} />
                            <Text>Service</Text>
                        </Flex>
                    } px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={tab === "service" ? primaryColor : "white"} border={"1px"} borderColor={tab === "service" ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={tab === "service" ? "white" : headerTextColor} width={"fit-content"} />
                    <CustomButton onClick={() => setTab("rental")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <RentalIcon color={tab === "rental" ? "white" : "black"} />
                            <Text>Rental</Text>
                        </Flex>
                    } px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={tab === "rental" ? primaryColor : "white"} border={"1px"} borderColor={tab === "rental" ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={tab === "rental" ? "white" : headerTextColor} width={"fit-content"} />
                </Flex>
                <CustomButton onClick={() => setTab("rental")} text={
                    <Flex alignItems={"center"} gap={"2"} >
                        <RentalIcon color={tab === "rental" ? "white" : "black"} />
                        <Text>Create Item</Text>
                    </Flex>
                } px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={"white"} border={"1px"} borderColor={borderColor} borderRadius={"32px"} fontWeight={"600"} color={headerTextColor} width={"fit-content"} />
            </Flex>
            <Flex py={"6"} >

                <Select
                    color={colorMode === "light" ? "#5465E0" : bodyTextColor} backgroundColor={colorMode === "light" ? "#F2F4FF" : secondaryBackgroundColor}
                    focusBorderColor={"#5465E0"}
                    height={"41px"}
                    fontSize={"sm"}
                    rounded={"50px"}
                    width={["full", "auto", "auto"]}
                    textAlign={"center"}
                    placeholder='All' >
                    {["First", "Second", "Third", "Fourth"]?.map((type: any, index: number) => (
                        <option style={{ fontSize: "12px" }} key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </Select>
            </Flex>
            <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} gap={"6"} >
                {["First", "Second", "Third", "Fourth"]?.map((type: any, index: number) => (
                    <Flex key={index} w={"full"} h={"fit-content"} flexDir={"column"} bgColor={"white"} rounded={"16px"} p={"4"} gap={"4"} style={{ boxShadow: "0px 4px 4px 0px #0000000D" }} >
                        <Flex w={"full"} h={"full"} alignItems={"center"} gap={2} >
                            <Flex w={"32px"} h={"32px"} bgColor={"red"} rounded={"full"} roundedTopRight={"0px"} />
                            <Flex flexDir={"column"}>
                                <Text fontSize={"14px"} fontWeight={"600"} color={primaryColor} >
                                    Miracle Jason
                                </Text>
                                <Text fontSize={"12px"} color={bodyTextColor} >
                                    2 hours ago
                                </Text>
                            </Flex>
                        </Flex>
                        <Flex w={"full"} h={"210px"} bgColor={"blue"} rounded={"8px"} >

                        </Flex>
                        <Flex w={"full"} h={"fit-content"} flexDir={"column"} gap={2} >
                            <Text fontSize={"24px"} fontWeight={"600"} color={primaryColor} >Hoodie for camp x 201</Text>
                            <Flex alignItems={"center"} >
                                <Text fontSize={"14px"} fontWeight={"700"} color={bodyTextColor} >₦33,029</Text>
                                <Text fontSize={"14px"} fontWeight={"700"} ml={"1"} color={"#B6B6B6"} textDecor={"strikethrough"} >₦33,029</Text>
                                <Text fontSize={"10px"} ml={"auto"} color={bodyTextColor} >3 Avail</Text>
                            </Flex>
                            <Flex w={"full"} gap={"2"} alignItems={"center"} >
                                <LocationStroke />
                                <Text fontSize={"14px"} fontWeight={"500"} color={bodyTextColor} >27 Abacha Road , Abuja Ng</Text>
                            </Flex>
                            <CustomButton onClick={()=> router?.push("/dashboard/kisok/details")} text={"Order Now"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                        </Flex>
                    </Flex>
                ))}
            </Grid>
        </Flex>
    )
}