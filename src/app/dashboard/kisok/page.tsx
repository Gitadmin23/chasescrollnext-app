"use client"
import CustomButton from '@/components/general/Button'
import GetProduce from '@/components/kisok/getProduce'
import GetRental from '@/components/kisok/getRental'
import { LocationPin, LocationStroke, RentalIcon, ServiceIcon, StoreIcon } from '@/components/svg'
import useCustomTheme from '@/hooks/useTheme'
import { Box, Flex, Grid, Select, Text, useColorMode } from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

export default function KisokPage() {

    const { primaryColor, borderColor, bodyTextColor, secondaryBackgroundColor, headerTextColor } = useCustomTheme()

    const [tab, setTab] = useState<"kiosk" | "service" | "rental">("kiosk")
    const { colorMode, toggleColorMode } = useColorMode();
    const query = useSearchParams();
    const type = query?.get('type');

    const { push } = useRouter()


    const clickHandler = (item: "kiosk" | "service" | "rental") => {
        setTab(item)
        push(`/dashboard/kisok${item !== "kiosk" ? `?type=${item}` : ""}`)
    }

    return (
        <Flex w={"full"} px={"6"} pt={["6", "6", "12", "12"]} pb={"12"} flexDir={"column"} overflowY={"auto"} >
            <Flex pb={"2"} w={"full"} h={"fit-content"} flexDirection={["column", "column", "row", "row"]} gap={"2"} justifyContent={"space-between"} borderBottomWidth={"1px"} borderColor={borderColor} >
                <Text fontSize={"24px"} fontWeight={"700"} ><span style={{ color: primaryColor }} >Chasescroll</span> Fundraising</Text>
            </Flex>
            <Flex py={"6"} justifyContent={"space-between"} borderBottomWidth={"1px"} borderColor={borderColor} >
                <Flex gap={"3"} alignItems={"center"} >
                    <CustomButton onClick={() => clickHandler("kiosk")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <StoreIcon color={!type ? "white" : "black"} />
                            <Text>Kiosk</Text>
                        </Flex>
                    } px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={!type ? primaryColor : "white"} border={"1px"} borderColor={!type ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={!type ? "white" : headerTextColor} width={"fit-content"} />
                    <CustomButton onClick={() => clickHandler("service")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <ServiceIcon color={type === "service" ? "white" : "black"} />
                            <Text>Service</Text>
                        </Flex>
                    } px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={type === "service" ? primaryColor : "white"} border={"1px"} borderColor={type === "service" ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={type === "service" ? "white" : headerTextColor} width={"fit-content"} />
                    <CustomButton onClick={() => clickHandler("rental")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <RentalIcon color={type === "rental" ? "white" : "black"} />
                            <Text>Rental</Text>
                        </Flex>
                    } px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={type === "rental" ? primaryColor : "white"} border={"1px"} borderColor={type === "rental" ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={type === "rental" ? "white" : headerTextColor} width={"fit-content"} />
                </Flex>
                <CustomButton onClick={() => push(type === "kisok" ? "/dashboard/kisok/create" : type === "rental" ? "/dashboard/kisok/create-rental" : "/dashboard/kisok/create")} text={
                    <Flex alignItems={"center"} gap={"2"} >
                        <Text>Create {type === "rental" ? "Rental Service" : "Item"}</Text>
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
            {!type && (
                <GetProduce />
            )}
            {type === "rental" && (
                <GetRental />
            )}
        </Flex>
    )
}