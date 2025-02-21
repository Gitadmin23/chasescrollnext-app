"use client"
import CustomButton from '@/components/general/Button'
import GetOrder from '@/components/kisok/getOrder'
import GetProduce from '@/components/kisok/getProduce'
import GetReciept from '@/components/kisok/getReciept'
import GetRental from '@/components/kisok/getRental'
import GetVendorReciept from '@/components/kisok/getVendorReciept'
import { LocationPin, LocationStroke, RentalIcon, ServiceIcon, StoreIcon } from '@/components/svg'
import useProductStore from '@/global-state/useCreateProduct'
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
    const { updateProduct, updateImage, updateRental } = useProductStore((state) => state);

    const { push } = useRouter()

    const userId = localStorage.getItem('user_id') + "";

    const clickHandler = (item: "kiosk" | "service" | "rental") => {
        setTab(item)
        push(`/dashboard/kisok${item !== "kiosk" ? `?type=${item}` : ""}`)
    }

    const routeHandler = (item: string) => {
        push(`/dashboard/kisok${item ? `?type=${item}` : ""}`)
    }

    const createProduct = () => {
        updateProduct({
            creatorID: userId,
            name: "",
            description: "",
            images: [],
            price: null,
            category: "",
            quantity: null,
            hasDiscount: false,
            discountPrice: null,
            publish: true,
            location: "" as any,
        })
        updateRental({
            "userId": userId,
            "name": "",
            "description": "",
            "category": "",
            "location": {} as any,
            "maximiumNumberOfDays": 1,
            "price": null,
            "images": [],
            frequency: "DAILY"
        } as any)
        updateImage([] as any)
        push(type === "kisok" ? "/dashboard/kisok/create" : type === "rental" ? "/dashboard/kisok/create-rental" : "/dashboard/kisok/create")
    }

    return (
        <Flex w={"full"} px={["4", "4", "6"]} pt={["6", "6", "12", "12"]} pb={"12"} flexDir={"column"} overflowY={"auto"} >
            <Flex pb={"2"} w={"full"} h={"fit-content"} flexDirection={["column", "column", "row", "row"]} gap={"2"} justifyContent={"space-between"} borderBottomWidth={"1px"} borderColor={borderColor} >
                <Text fontSize={"24px"} fontWeight={"700"} ><span style={{ color: primaryColor }} >Chasescroll </span> Business</Text>
            </Flex>
            <Flex py={"6"} justifyContent={"space-between"} borderBottomWidth={"1px"} borderColor={borderColor} >
                <Flex gap={"3"} alignItems={"center"} >
                    <CustomButton onClick={() => clickHandler("kiosk")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <StoreIcon color={(type !== "rental" && type !== "myreciept" && type !== "vendorreciept") ? "white" : "black"} />
                            <Text>Kiosk</Text>
                        </Flex>
                    } px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={(type !== "rental" && type !== "myreciept" && type !== "vendorreciept") ? primaryColor : "white"} border={"1px"} borderColor={(type !== "rental" && type !== "myreciept" && type !== "vendorreciept") ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={(type !== "rental" && type !== "myreciept" && type !== "vendorreciept") ? "white" : headerTextColor} width={"fit-content"} />
                    <CustomButton onClick={() => clickHandler("service")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <ServiceIcon color={type === "service" ? "white" : "black"} />
                            <Text>Service</Text>
                        </Flex>
                    } px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={type === "service" ? primaryColor : "white"} border={"1px"} borderColor={type === "service" ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={type === "service" ? "white" : headerTextColor} width={"fit-content"} />
                    <CustomButton onClick={() => clickHandler("rental")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <RentalIcon color={(type === "rental" || type === "myreciept" || type === "vendorreciept" ) ? "white" : "black"} />
                            <Text>Rental</Text>
                        </Flex>
                    } px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={(type === "rental" || type === "myreciept" || type === "vendorreciept" ) ? primaryColor : "white"} border={"1px"} borderColor={(type === "rental" || type === "myreciept" || type === "vendorreciept" ) ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={(type === "rental" || type === "myreciept" || type === "vendorreciept" ) ? "white" : headerTextColor} width={"fit-content"} />
                </Flex>
                <Flex display={["none", "none", "flex"]} >
                    <CustomButton onClick={createProduct} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <Text>Create {type === "rental" ? "Rental Service" : "Item"}</Text>
                        </Flex>
                    } px={"15px"} height={"40px"} fontSize={"sm"} backgroundColor={"white"} border={"1px"} borderColor={borderColor} borderRadius={"32px"} fontWeight={"600"} color={headerTextColor} width={"fit-content"} />
                </Flex>
            </Flex>
            <Flex py={"6"} justifyContent={"space-between"} >
                {(type !== "rental" && type !== "myreciept" && type !== "vendorreciept") && (
                    <Select
                        color={colorMode === "light" ? "#5465E0" : bodyTextColor} backgroundColor={colorMode === "light" ? "#F2F4FF" : secondaryBackgroundColor}
                        focusBorderColor={"#5465E0"}
                        height={"41px"}
                        fontSize={"sm"}
                        value={type === "rental" || !type ? "" : type}
                        rounded={"50px"}
                        onChange={(e) => routeHandler(e.target.value)}
                        width={["full", "auto", "auto"]}
                        textAlign={"center"} >
                        {[{ name: "All", value: "" }, { name: "My Kiosk", value: "mykisok" }, { name: "My Orders", value: "myorder" }]?.map((type: any, index: number) => (
                            <option style={{ fontSize: "12px" }} key={index} value={type?.value}>
                                {type?.name}
                            </option>
                        ))}
                    </Select>
                )}
                {(type === "rental" || type === "myreciept" || type === "vendorreciept" ) && (
                    <Select
                        color={colorMode === "light" ? "#5465E0" : bodyTextColor} backgroundColor={colorMode === "light" ? "#F2F4FF" : secondaryBackgroundColor}
                        focusBorderColor={"#5465E0"}
                        height={"41px"}
                        fontSize={"sm"}
                        value={type}
                        rounded={"50px"}
                        onChange={(e) => routeHandler(e.target.value)}
                        width={["full", "auto", "auto"]}
                        textAlign={"center"} >
                        {[{ name: "All Rental", value: "rental" }, { name: "My Reciept", value: "myreciept" }, { name: "My Rental Reciept", value: "vendorreciept" }]?.map((type: any, index: number) => (
                            <option style={{ fontSize: "12px" }} key={index} value={type?.value}>
                                {type?.name}
                            </option>
                        ))}
                    </Select>
                )}
                {type === "mykisok" && (
                    <CustomButton onClick={() => push("/dashboard/kisok/dashboard")} text={"Dashboard"} px={"30px"} height={"40px"} fontSize={"sm"} backgroundColor={"white"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"fit-content"} />
                )}
            </Flex>
            {!type && (
                <GetProduce />
            )}
            {type === "mykisok" && (
                <GetProduce myproduct={true} />
            )}
            {type === "rental" && (
                <GetRental />
            )}
            {type === "myorder" && (
                <GetOrder />
            )}
            {type === "myreciept" && (
                <GetReciept />
            )}
            {type === "vendorreciept" && (
                <GetVendorReciept />
            )}
        </Flex>
    )
}