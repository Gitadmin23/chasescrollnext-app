"use client"
import React, { useState } from 'react'
import LoadingAnimation from '../sharedComponent/loading_animation';
import { Flex, Image, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { IOrder } from '@/models/product';
import { useRouter } from 'next/navigation';
import { dateFormat } from '@/utils/dateFormat';
import { numberFormat, numberFormatNaire } from '@/utils/formatNumberWithK';
import { formatNumber } from '@/utils/numberFormat';
import { IMAGE_URL } from '@/services/urls';
import UserImage from '../sharedComponent/userimage';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import { SheildIcon, TruckColoredIcon } from '../svg';
import { IoArrowBack } from 'react-icons/io5';

export default function OrderDetail({ id }: { id: string }) {
    const [item, setItem] = useState({} as IOrder)

    const { back } = useRouter()

    const { isLoading } = useQuery(
        ["order", id],
        () => httpService.get(`/orders/search`, {
            params: {
                id: id
            }
        }), {
        onSuccess(data) {
            setItem(data?.data?.content[0])
        }
    });

    return (
        <LoadingAnimation loading={isLoading} >
            <Flex w={"full"} px={"6"} pt={["6", "6", "6", "6"]} pb={"12"} gap={"6"} flexDir={"column"} overflowY={"auto"} overflowX={"hidden"} >
                <Flex w={"full"} display={["none", "none", "flex"]} justifyContent={"space-between"} >
                    <Text fontSize={"24px"} fontWeight={"700"} >Explore  Marchs on chasescroll Kiosk</Text>
                    <Flex w={"fit-content"} gap={4} alignItems={"center"} >
                        {/* <CustomButton alignItems={"center"} text={"List "} px={"15px"} height={"44px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"160px"} />
                        <Flex as={"button"} w={"40px"} h={"40px"} justifyContent={"center"} alignItems={"center"} >
                            <CartIcon />
                        </Flex> */}
                        <Flex w={"40px"} h={"40px"} backgroundColor={"red"} borderRadius={"full"} />
                    </Flex>
                </Flex>
                <Flex w={"full"} gap={"2"} flexDir={["column"]} >
                    <Flex gap={"3"} alignItems={"center"} >
                        <Flex as={"button"} onClick={() => back()} bgColor={"#FAFAFA"} w={"44px"} h={"44px"} justifyContent={"center"} alignItems={"center"} rounded={"full"} borderWidth={"1px"} borderColor={"#E7E7E7"} zIndex={"30"} left={"4"}  >
                            <IoArrowBack size={"20px"} />
                        </Flex>
                        <Text fontWeight={"500"} >Order Details</Text>
                    </Flex>
                    <Text fontWeight={"500"} mt={"4"} >Order nº {item?.id}</Text>
                    <Text fontWeight={"500"}>{item?.quantity} Items</Text>
                    <Text fontWeight={"500"}>Placed on {dateFormat(item?.createdDate)}</Text>
                    <Text fontWeight={"500"}>Total: {numberFormatNaire(item?.total)}</Text>
                </Flex>
                <Text fontSize={"24px"} >Items in your order</Text>
                <Flex w={"full"} gap={"4"} py={"4"} borderBottomWidth={"1px"} borderTopWidth={"1px"} >
                    <Flex alignItems={"center"} w={"full"} gap={"3"}  >
                        <Flex w={"full"} h={"211px"} >
                            <Image w={"full"} h={"full"} rounded={"12px"} src={IMAGE_URL + item?.product?.images[0]} alt='image' />
                        </Flex>
                        <Flex w={"full"} flexDir={"column"} gap={"2"} >
                            <Text fontSize={"24px"} fontWeight={"600"} >{item?.product?.name}</Text>
                            <Text fontSize={"14px"} fontWeight={"700"} >{formatNumber(item?.product?.price)}</Text>
                            <Text fontSize={"14px"} fontWeight={"500"} >Order On {dateFormat(item?.createdDate)}</Text>
                            <Flex rounded={"32px"} h={"20px"} justifyContent={"center"} alignItems={"center"} color={"white"} fontSize={"12px"} bgColor={"#FF9500"} w={"fit-content"} px={"2"} >
                                {item?.orderStatus}
                            </Flex>

                        </Flex>
                    </Flex>
                    <Flex w={"full"} pl={4} borderLeftWidth={"1px"} flexDir={"column"} gap={"2"} >
                        <Text fontSize={"24px"} fontWeight={"600"} >Payment Method</Text>
                        <Text fontWeight={"500"} >Pay with Bank Transfer on Delivery</Text>
                        <Text fontWeight={"500"} >Items total: {formatNumber(item?.total)}</Text>
                        <Text fontWeight={"500"} >Delivery Fees: {formatNumber("0")}</Text>
                        <Text fontWeight={"500"} >Total: {formatNumber(item?.total)}</Text>
                    </Flex>
                </Flex>
                <Flex w={"full"} flexDirection={"column"} gap={"4"} py={"4"} >
                    <Text fontSize={"24px"} >Delivery Information</Text>
                    <Flex w={"full"} gap={"4"} >
                        <Flex w={"full"} flexDir={"column"} gap={"4"} >
                            <Text fontWeight={"500"} >Shipping Details</Text>
                            <Text fontWeight={"500"} >Delivery between 17 September and 19 September.</Text>
                            <Text fontWeight={"500"} >Delivery Beside Area 11 Shopping Mall ABUJA- GARKI AREA 11, Federal Capital Territory</Text>
                            <Flex w={"full"} h={"full"} alignItems={"center"} gap={2} >
                                <UserImage image={item?.user?.data?.imgMain?.value} font={"16px"} data={item?.user} border={"1px"} size={"32px"} />
                                <Flex flexDir={"column"}>
                                    <Text fontSize={"12px"} >order by</Text>
                                    <Text fontSize={"14px"} fontWeight={"600"}>
                                        {capitalizeFLetter(item?.vendor?.firstName) + " " + capitalizeFLetter(item?.vendor?.lastName)}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex w={"full"} flexDir={"column"} gap={"3"} >
                            <Flex gap={"3"} >
                                <Flex w={"28px"} h={"28px"} justifyContent={"center"} alignItems={"center"} >
                                    <TruckColoredIcon />
                                </Flex>
                                <Text color={"#0CC23A"} fontWeight={"600"} >Free shipping on all orders</Text>
                            </Flex>
                            <Flex flexDir={"column"} gap={"1"} >
                                <Text fontSize={"14px"} fontWeight={"500"} >Delivery: Feb 4-16</Text>
                                <Text fontSize={"14px"} mt={"3"} >Get a ₦1,600 credit for late delivery</Text>
                            </Flex>
                            <Flex gap={"3"} mt={"4"} >
                                <Flex w={"28px"} h={"28px"} justifyContent={"center"} alignItems={"center"} >
                                    <SheildIcon />
                                </Flex>
                                <Text color={"#0CC23A"} fontWeight={"600"} >Free shipping on all orders</Text>
                            </Flex>
                            <Flex gap={["2", "2", "5"]} alignItems={["start", "start", "center"]} flexDir={["column", "column", "row"]} >
                                <Text fontWeight={"500"} fontSize={"12px"} >Safe Payment Options</Text>
                                <Text fontWeight={"500"} fontSize={"12px"} >Secure logistics</Text>
                                <Text fontWeight={"500"} fontSize={"12px"} >Purchase protection</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </LoadingAnimation>
    )
}