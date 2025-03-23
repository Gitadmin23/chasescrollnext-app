import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent';
import useCustomTheme from '@/hooks/useTheme';
import { useRouter } from 'next/navigation';
import React from 'react'
import LoadingAnimation from '../sharedComponent/loading_animation';
import { Flex, Grid, Image, Text } from '@chakra-ui/react';
import { IOrder, IProduct } from '@/models/product';
import UserImage from '../sharedComponent/userimage';
import moment from 'moment';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import { formatNumber } from '@/utils/numberFormat';
import { LocationStroke } from '../svg';
import CustomButton from '../general/Button';
import { textLimit } from '@/utils/textlimit';
import { IMAGE_URL } from '@/services/urls';
import { dateFormat } from '@/utils/dateFormat';
import ProductImageScroller from '../sharedComponent/productImageScroller';

export default function GetOrder() {

    const { primaryColor, bodyTextColor } = useCustomTheme()
    const { push } = useRouter()
    const userId = localStorage.getItem('user_id') + "";

    const { results, isLoading, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({ url: `/orders/search?userId=${userId}`, limit: 20, filter: "id", name: "getOrder" })

    console.log(results);


    return (
        <LoadingAnimation loading={isLoading} length={results?.length} >
            <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} gap={["4", "4", "6"]} >
                {results?.map((item: IOrder, index: number) => {
                    if (results?.length === index + 1) {
                        return (
                            <Flex ref={ref} as={"button"} alignItems={"start"} onClick={() => push("/dashboard/kisok/details-order/" + item?.id)} key={index} w={"full"} h={"fit-content"} flexDir={"column"} bgColor={"white"} rounded={"16px"} pb={"5"} gap={"4"} >
                                {/* <Flex w={"full"} h={"full"} alignItems={"center"} gap={2} >
                                    <UserImage image={item?.vendor?.data?.imgMain?.value} font={"16px"} data={item?.vendor} border={"1px"} size={"32px"} />
                                    <Flex flexDir={"column"}>
                                        <Text fontSize={"12px"} fontWeight={"600"} color={primaryColor} >
                                            {capitalizeFLetter(item?.vendor?.firstName) + " " + capitalizeFLetter(item?.vendor?.lastName)}
                                        </Text>
                                        <Text fontSize={"10px"} color={bodyTextColor} >
                                            {moment(item?.product?.createdDate)?.fromNow()}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex w={"full"} h={"210px"} rounded={"8px"} >
                                    <Image rounded={"8px"} borderColor={"#D0D4EB"} objectFit={"cover"} alt={item?.product?.images[0]} width={["full"]} height={"full"} src={IMAGE_URL + item?.product?.images[0]} />
                                </Flex> */}

                                <ProductImageScroller images={item?.product?.images} createdDate={moment(item?.product?.createdDate)?.fromNow()} userData={item?.vendor} />
                                <Flex w={"full"} h={"fit-content"} flexDir={"column"} gap={2} px={"2"} >
                                    <Text fontSize={"14px"} fontWeight={"600"} color={primaryColor} textAlign={"left"} >{capitalizeFLetter(item?.product?.name)}</Text>
                                    <Flex alignItems={"center"} >
                                        <Text fontSize={"14px"} fontWeight={"700"} color={bodyTextColor} >{formatNumber(item?.product?.price)}</Text>
                                        {/* <Text fontSize={"10px"} ml={"auto"} color={bodyTextColor} >{item?.product?.quantity} Avail</Text> */}
                                    </Flex>
                                    <Flex w={"full"} gap={"2"} alignItems={"center"} >
                                        <Text fontSize={"14px"} fontWeight={"500"} color={bodyTextColor} >Order On {dateFormat(item?.createdDate)}</Text>
                                    </Flex>
                                    {/* <Flex rounded={"32px"} h={"20px"} justifyContent={"center"} alignItems={"center"} color={"white"} fontSize={"12px"} bgColor={"#FF9500"} w={"fit-content"} px={"2"} >
                                        {item?.orderStatus}
                                    </Flex> */}
                                    <Flex display={["none", "none", "flex"]} >
                                        <CustomButton onClick={() => push("/dashboard/kisok/details-order/" + item?.id)} text={"View Details"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                                    </Flex>
                                </Flex>
                            </Flex>
                        )
                    } else {
                        return (
                            <Flex as={"button"} alignItems="start" onClick={() => push("/dashboard/kisok/details-order/" + item?.id)} key={index} w={"full"} h={"fit-content"} flexDir={"column"} bgColor={"white"} rounded={"16px"} pb={"5"} gap={"4"} >
                                {/* <Flex w={"full"} h={"full"} alignItems={"center"} gap={2} >
                                    <UserImage image={item?.vendor?.data?.imgMain?.value} font={"16px"} data={item?.vendor} border={"1px"} size={"32px"} />
                                    <Flex flexDir={"column"}>
                                        <Text fontSize={"12px"} fontWeight={"600"} color={primaryColor} >
                                            {capitalizeFLetter(item?.vendor?.firstName) + " " + capitalizeFLetter(item?.vendor?.lastName)}
                                        </Text>
                                        <Text fontSize={"10px"} color={bodyTextColor} >
                                            {moment(item?.product?.createdDate)?.fromNow()}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex w={"full"} h={"210px"} rounded={"8px"} >
                                    <Image rounded={"8px"} borderColor={"#D0D4EB"} objectFit={"cover"} alt={item?.product?.images[0]} width={["full"]} height={"full"} src={IMAGE_URL + item?.product?.images[0]} />
                                </Flex> */}
                                <ProductImageScroller images={item?.product?.images} createdDate={moment(item?.product?.createdDate)?.fromNow()} userData={item?.vendor} />
                                <Flex w={"full"} h={"fit-content"} flexDir={"column"} gap={2} px={"2"} >
                                    <Text fontSize={"14px"} fontWeight={"600"} color={primaryColor} textAlign={"left"} >{capitalizeFLetter(item?.product?.name)}</Text>
                                    <Flex alignItems={"center"} >
                                        <Text fontSize={"14px"} fontWeight={"700"} color={bodyTextColor} >{formatNumber(item?.product?.price)}</Text>
                                        {/* <Text fontSize={"10px"} ml={"auto"} color={bodyTextColor} >{item?.product?.quantity} Avail</Text> */}
                                    </Flex>
                                    <Flex w={"full"} gap={"2"} alignItems={"center"} >
                                        <Text fontSize={"14px"} fontWeight={"500"} color={bodyTextColor} >Order On {dateFormat(item?.createdDate)}</Text>
                                    </Flex>
                                    {/* <Flex rounded={"32px"} h={"20px"} justifyContent={"center"} alignItems={"center"} color={"white"} fontSize={"12px"} bgColor={"#FF9500"} w={"fit-content"} px={"2"} >
                                        ONGOING
                                    </Flex> */}
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
