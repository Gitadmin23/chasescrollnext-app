"use client"
import CustomButton from '@/components/general/Button'
import GetOrder from '@/components/kisok/getOrder'
import GetProduce from '@/components/kisok/getProduce'
import GetReciept from '@/components/kisok/getReciept'
import GetRental from '@/components/kisok/getRental'
import GetVendorReciept from '@/components/kisok/getVendorReciept'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { LocationPin, LocationStroke, RentalIcon, ServiceIcon, StoreIcon } from '@/components/svg'
import useProductStore from '@/global-state/useCreateProduct'
import useCustomTheme from '@/hooks/useTheme'
import BookingsRequest from '@/Views/dashboard/booking/BookingRequest'
import Bookings from '@/Views/dashboard/booking/Bookings'
import Businesses from '@/Views/dashboard/booking/Businesses'
import MyBusiness from '@/Views/dashboard/booking/MyBusiness'
import { Box, Button, Flex, Grid, Input, Select, Text, useColorMode } from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

export default function KisokPage() {

    const { primaryColor, borderColor, bodyTextColor, secondaryBackgroundColor, headerTextColor, mainBackgroundColor } = useCustomTheme()

    const [tab, setTab] = useState<"kiosk" | "service" | "rental">("kiosk")
    const { colorMode, toggleColorMode } = useColorMode();
    const query = useSearchParams();

    const [open, setOpen] = useState(false)
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
            state: ""
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
            frequency: "DAILY",
        } as any)
        updateImage([] as any)
        push(type === "kisok" ? "/dashboard/kisok/create" : type === "rental" ? "/dashboard/kisok/create-rental" : (type === "service" || type === "myservice" || type === "mybooking") ? "/dashboard/kisok/create-service" : "/dashboard/kisok/create")
    }

    return (
        <Flex w={"full"} px={["4", "4", "6"]} pt={["6", "6", "12", "12"]} pb={"12"} flexDir={"column"} overflowY={"auto"} >
            <Flex w={"full"} alignItems={"center"} flexDirection={"column"} gap={"3"} >
                <Flex w={"fit-content"} gap={"1"} alignItems={"center"} bgColor={secondaryBackgroundColor} p={"2"} rounded={"full"} >
                    <CustomButton onClick={() => clickHandler("kiosk")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <StoreIcon color={(type === null || type === "mykisok" || type === "myorder") ? "white" : "black"} />
                            <Text>Kiosk</Text>
                        </Flex>
                    } height={["38px", "38px", "48px"]} fontSize={"sm"} backgroundColor={(type === null || type === "mykisok" || type === "myorder") ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={(type === null || type === "mykisok" || type === "myorder") ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={(type === null || type === "mykisok" || type === "myorder") ? "white" : headerTextColor} width={["107px", "107px", "175px"]} />
                    <CustomButton onClick={() => clickHandler("service")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <ServiceIcon color={(type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") ? "white" : "black"} />
                            <Text>Service</Text>
                        </Flex>
                    } height={["38px", "38px", "48px"]} fontSize={"sm"} backgroundColor={(type === "service" || type === "myservice" || type === "mybooking") ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={(type === "service" || type === "myservice" || type === "mybooking") ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={(type === "service" || type === "myservice" || type === "mybooking") ? "white" : headerTextColor} width={["107px", "107px", "175px"]} />
                    <CustomButton onClick={() => clickHandler("rental")} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <RentalIcon color={(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? "white" : "black"} />
                            <Text>Rental</Text>
                        </Flex>
                    } height={["38px", "38px", "48px"]} fontSize={"sm"} backgroundColor={(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? primaryColor : secondaryBackgroundColor} border={"0px"} borderColor={(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? "transparent" : borderColor} borderRadius={"32px"} fontWeight={"600"} color={(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? "white" : headerTextColor} width={["107px", "107px", "175px"]} />
                </Flex>
                <Text fontSize={["16px", "16px", "24px"]} fontWeight={"700"} >what are you looking for?</Text>
                <Flex display={["flex", "flex", "none"]} w={"full"} gap={"3"} alignItems={"center"} >
                    <CustomButton onClick={() => setOpen(true)} text={`Filter ${(type === null || type === "mykisok" || type === "myorder") ? "Product" : (type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") ? "Service" : "Rental"} `} color={headerTextColor} fontSize={"14px"} backgroundColor={"White"} borderWidth={"1px"} borderRadius={"999px"} />
                </Flex>
                <Flex display={["none", "none", "flex"]} w={"fit-content"} borderWidth={"1px"} borderColor={borderColor} rounded={"full"} h={"fit-content"} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
                    <Select h={"80px"} w={"200px"} roundedLeft={"full"} borderRightWidth={"1px"} borderWidth={"0px"} borderRightColor={borderColor} >
                        <option>Rivers</option>
                    </Select>
                    <Select h={"80px"} w={"200px"} outline={"none"} rounded={"0px"} borderWidth={"0px"} borderLeftWidth={"1px"} borderRightColor={borderColor} >
                        <option>Rivers</option>
                    </Select>
                    <Input placeholder={"Search business name"} h={"80px"} w={"200px"} outline={"none"} rounded={"0px"} borderWidth={"0px"} borderLeftWidth={"1px"} borderRightColor={borderColor} />
                    <Button h={"80px"} w={"140px"} color={"white"} outline={"none"} bgColor={primaryColor} roundedRight={"full"} borderRightWidth={"1px"} borderWidth={"0px"} borderRightColor={borderColor} >
                        Search
                    </Button>
                </Flex>
            </Flex>
            <Flex py={"6"} justifyContent={"space-between"} display={["flex", "flex", "none"]} >
                {(type === null || type === "mykisok" || type === "myorder") && (
                    <Select
                        color={colorMode === "light" ? "#5465E0" : bodyTextColor} backgroundColor={colorMode === "light" ? "#F2F4FF" : secondaryBackgroundColor}
                        focusBorderColor={"#5465E0"}
                        height={"41px"}
                        fontSize={"sm"}
                        value={type ? type : ""}
                        rounded={"50px"}
                        onChange={(e) => routeHandler(e.target.value)}
                        width={["auto", "auto", "auto"]}
                        textAlign={"center"} >
                        {[{ name: "All", value: "" }, { name: "My Kiosk", value: "mykisok" }, { name: "My Orders", value: "myorder" }]?.map((type: any, index: number) => (
                            <option style={{ fontSize: "14px" }} key={index} value={type?.value}>
                                {type?.name}
                            </option>
                        ))}
                    </Select>
                )}
                {(type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") && (
                    <Select
                        color={colorMode === "light" ? "#5465E0" : bodyTextColor} backgroundColor={colorMode === "light" ? "#F2F4FF" : secondaryBackgroundColor}
                        focusBorderColor={"#5465E0"}
                        height={"41px"}
                        fontSize={"sm"}
                        value={type}
                        rounded={"50px"}
                        onChange={(e) => routeHandler(e.target.value)}
                        width={["auto", "auto", "auto"]}
                        textAlign={"center"} >
                        {[{ name: "All Services", value: "service" }, { name: "My Services", value: "myservice" }, { name: "My Booking", value: "mybooking" }, { name: "My Request", value: "myrequest" }]?.map((type: any, index: number) => (
                            <option style={{ fontSize: "14px" }} key={index} value={type?.value}>
                                {type?.name}
                            </option>
                        ))}
                    </Select>
                )}
                {(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") && (
                    <Select
                        color={colorMode === "light" ? "#5465E0" : bodyTextColor} backgroundColor={colorMode === "light" ? "#F2F4FF" : secondaryBackgroundColor}
                        focusBorderColor={"#5465E0"}
                        height={"41px"}
                        fontSize={"sm"}
                        value={type}
                        rounded={"50px"}
                        onChange={(e) => routeHandler(e.target.value)}
                        width={["auto", "auto", "auto"]}
                        textAlign={"center"} >
                        {[{ name: "All Rental", value: "rental" }, { name: "My Rental", value: "myrental" }, { name: "My Reciept", value: "myreciept" }, { name: "My Rental Reciept", value: "vendorreciept" }]?.map((type: any, index: number) => (
                            <option style={{ fontSize: "14px" }} key={index} value={type?.value}>
                                {type?.name}
                            </option>
                        ))}
                    </Select>
                )}
                {/* {type === "mykisok" && (
                    <CustomButton onClick={() => push("/dashboard/kisok/dashboard")} text={"Dashboard"} px={"30px"} height={"48px"} fontSize={"sm"} backgroundColor={"white"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"fit-content"} />
                )} */}

                <Flex display={["flex", "flex", "flex"]} >
                    <CustomButton onClick={createProduct} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <Text>Create {type === "rental" ? "Rental" : (type === "service" || type === "myservice" || type === "mybooking") ? "Service" : "Item"}</Text>
                        </Flex>
                    } px={"15px"} height={"40px"} fontSize={"sm"} borderRadius={"32px"} fontWeight={"600"} width={"fit-content"} />
                </Flex>
            </Flex>

            <Flex w={"full"} py={"6"} gap={"3"} display={["none", "none", "flex"]} pos={"relative"} justifyContent={"center"} rounded={"full"} >
                {(type === null || type === "mykisok" || type === "myorder") && (
                    <Flex bg={secondaryBackgroundColor} p={"1"} rounded={"full"} >
                        {[{ name: "All", value: "" }, { name: "My Kiosk", value: "mykisok" }, { name: "My Orders", value: "myorder" }, { name: "My Dashboard", value: "mydashboard" }]?.map((item, index) => (
                            <Button onClick={() => routeHandler(item?.value)} _hover={{}} rounded={"full"} width={["150px", "150px", "150px"]} fontSize={"14px"} height={"35px"} key={index} bgColor={type === item?.value ? mainBackgroundColor : (!type && item?.name === "All") ? mainBackgroundColor : secondaryBackgroundColor} color={!tab ? "brand.chasescrollBlue" : bodyTextColor} >
                                {item?.name}
                            </Button>
                        ))}
                    </Flex>
                )}
                {(type === "service" || type === "myservice" || type === "mybooking" || type === "myrequest") && (
                    <Flex bg={secondaryBackgroundColor} p={"1"} rounded={"full"} >
                        {[{ name: "All Services", value: "service" }, { name: "My Services", value: "myservice" }, { name: "My Booking", value: "mybooking" }, { name: "My Request", value: "myrequest" }]?.map((item: any, index: number) => (
                            <Button onClick={() => routeHandler(item?.value)} _hover={{}} rounded={"full"} width={["150px", "150px", "150px"]} fontSize={"14px"} height={"35px"} key={index} bgColor={type === item?.value ? mainBackgroundColor : secondaryBackgroundColor} color={!tab ? "brand.chasescrollBlue" : bodyTextColor} >
                                {item?.name}
                            </Button>
                        ))}
                    </Flex>
                )}
                {(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") && (
                    <Flex bg={secondaryBackgroundColor} p={"1"} rounded={"full"} >
                        {[{ name: "All Rental", value: "rental" }, { name: "My Rental", value: "myrental" }, { name: "My Reciept", value: "myreciept" }, { name: "My Rental Reciept", value: "vendorreciept" }]?.map((item: any, index: number) => (
                            <Button onClick={() => routeHandler(item?.value)} _hover={{}} rounded={"full"} width={["150px", "150px", "150px"]} fontSize={"14px"} height={"35px"} key={index} bgColor={type === item?.value ? mainBackgroundColor : secondaryBackgroundColor} color={!tab ? "brand.chasescrollBlue" : bodyTextColor} >
                                {item?.name}
                            </Button>
                        ))}
                    </Flex>
                )} 
                <Flex  >
                    <CustomButton onClick={createProduct} text={
                        <Flex alignItems={"center"} gap={"2"} >
                            <Text>Create {type === "rental" ? "Rental" : (type === "service" || type === "myservice" || type === "mybooking") ? "Service" : "Item"}</Text>
                        </Flex>
                    } px={"15px"} height={"40px"} fontSize={"sm"} borderRadius={"32px"} fontWeight={"600"} width={"fit-content"} />
                </Flex>
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
            {type === "myrental" && (
                <GetRental myrental={true} />
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
            {type === "service" && (
                <Businesses />
            )}
            {type === "myservice" && (
                <MyBusiness />
            )}
            {type === "mybooking" && (
                <Bookings />
            )}
            {type === "myrequest" && (
                <BookingsRequest />
            )}
            <ModalLayout open={open} close={setOpen} rounded='16px' closeIcon={true} >
                <Flex w={"full"} flexDir={"column"} gap={"3"} p={6} >
                    <Input h={"48px"} placeholder={`Search by ${(type === "rental" || type === "myrental" || type === "myreciept" || type === "vendorreciept") ? "Business" : (type === "service" || type === "myservice" || type === "mybooking") ? "Business" : "Product"} Name`} rounded={"full"} />
                    <Flex w={"full"} gap={"3"} >
                        <Select h={"48px"} rounded={"full"} placeholder='Select Category' w={"full"} >
                            <option>Test</option>
                        </Select>
                        <Select h={"48px"} rounded={"full"} placeholder='Select State' w={"full"} >
                            <option>Test</option>
                        </Select>
                    </Flex>
                    <CustomButton text={"Search"} borderRadius={"999px"} height={"58px"} />
                </Flex>
            </ModalLayout>
        </Flex>
    )
}