import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent';
import useCustomTheme from '@/hooks/useTheme';
import { useRouter } from 'next/navigation';
import React from 'react'
import LoadingAnimation from '../sharedComponent/loading_animation';
import { Flex, Grid, Image, Text } from '@chakra-ui/react';
import { IOrder, IReceipt } from '@/models/product';
import UserImage from '../sharedComponent/userimage';
import moment from 'moment';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import { formatNumber } from '@/utils/numberFormat';
import CustomButton from '../general/Button';
import { IMAGE_URL } from '@/services/urls';
import { dateFormat } from '@/utils/dateFormat';
import ProductImageScroller from '../sharedComponent/productImageScroller';

export default function GetVendorReciept() {

    const { primaryColor, bodyTextColor, mainBackgroundColor } = useCustomTheme()
    const { push } = useRouter()
    const userId = localStorage.getItem('user_id') + "";

    const { results, isLoading, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({ url: `/reciept/search?vendorID=${userId}`, limit: 20, filter: "id", name: "getvendorID" })

    console.log(results);


    return (
        <LoadingAnimation loading={isLoading} length={results?.length} >
            <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} gap={["4", "4", "6"]} >
                {results?.map((item: IReceipt, index: number) => {
                    if (results?.length === index + 1) {
                        return (
                            <Flex ref={ref} as={"button"} alignItems={"start"} onClick={() => push("/dashboard/kisok/details-order/" + item?.id)} key={index} w={"full"} h={"fit-content"} flexDir={"column"} bgColor={mainBackgroundColor} rounded={"16px"} pb={"5"} gap={"4"} >
                                <ProductImageScroller images={item?.rental?.images} createdDate={moment(item?.createdDate)?.fromNow()} userData={item?.createdBy} />
                                <Flex w={"full"} h={"fit-content"} flexDir={"column"} gap={2} px={"2"} >
                                    <Text fontSize={"14px"} fontWeight={"600"} color={primaryColor} textAlign={"left"} >{capitalizeFLetter(item?.rental?.name)}</Text>
                                    <Flex alignItems={"center"} >
                                        <Text fontSize={"14px"} fontWeight={"700"} color={bodyTextColor} >{formatNumber(item?.rental?.price)}</Text>
                                        {/* <Text fontSize={"10px"} ml={"auto"} color={bodyTextColor} >{item?.product?.quantity} Avail</Text> */}
                                    </Flex>
                                    <Flex w={"full"} gap={"2"} alignItems={"center"} >
                                        <Text fontSize={"14px"} fontWeight={"500"} color={bodyTextColor} >Order On 20-09 {dateFormat(item?.createdDate)}</Text>
                                    </Flex> 
                                    <Flex display={["none", "none", "flex"]} >
                                        <CustomButton onClick={() => push("/dashboard/kisok/details-order/" + item?.id)} text={"View Details"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                                    </Flex>
                                </Flex>
                            </Flex>
                        )
                    } else {
                        return (
                            <Flex as={"button"} alignItems="start" onClick={() => push("/dashboard/kisok/details-order/" + item?.id)} key={index} w={"full"} h={"fit-content"} flexDir={"column"} bgColor={mainBackgroundColor} rounded={"16px"} pb={"5"} gap={"4"} > 
                                <ProductImageScroller images={item?.rental?.images} createdDate={moment(item?.createdDate)?.fromNow()} userData={item?.createdBy} />
                                <Flex w={"full"} h={"fit-content"} flexDir={"column"} gap={2} px={"2"} >
                                    <Text fontSize={"14px"} fontWeight={"600"} color={primaryColor} textAlign={"left"} >{capitalizeFLetter(item?.rental?.name)}</Text>
                                    <Flex alignItems={"center"} >
                                        <Text fontSize={"14px"} fontWeight={"700"} color={bodyTextColor} >{formatNumber(item?.rental?.price)}</Text>
                                        {/* <Text fontSize={"10px"} ml={"auto"} color={bodyTextColor} >{item?.product?.quantity} Avail</Text> */}
                                    </Flex>
                                    <Flex w={"full"} gap={"2"} alignItems={"center"} >
                                        <Text fontSize={"14px"} fontWeight={"500"} color={bodyTextColor} >Order On 20-09 {dateFormat(item?.createdDate)}</Text>
                                    </Flex>
                                    <Flex rounded={"32px"} h={"20px"} justifyContent={"center"} alignItems={"center"} color={"white"} fontSize={"12px"} bgColor={"#FF9500"} w={"fit-content"} px={"2"} >
                                        ONGOING
                                    </Flex>
                                    <Flex display={["none", "none", "flex"]} >
                                        <CustomButton onClick={() => push("/dashboard/kisok/details-order/" + item?.id)} text={"View Details"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                                    </Flex>
                                </Flex>
                            </Flex>
                        )
                    }
                })}
            </Grid>
        </LoadingAnimation>
    )
}
