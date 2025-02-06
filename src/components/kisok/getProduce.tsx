import { Grid, Flex, Text, Image } from '@chakra-ui/react'
import React from 'react'
import CustomButton from '../general/Button'
import { LocationStroke } from '../svg'
import useCustomTheme from '@/hooks/useTheme'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import LoadingAnimation from '../sharedComponent/loading_animation'
import { IProduct } from '@/models/product'
import BlurredImage from '../sharedComponent/blurred_image'
import { formatNumber } from '@/utils/numberFormat'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import moment from 'moment'
import UserImage from '../sharedComponent/userimage'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'

export default function GetProduct({ myproduct }:{ myproduct?: boolean }) {

    const { primaryColor, bodyTextColor } = useCustomTheme()
    const { push } = useRouter()
    const userId = localStorage.getItem('user_id') + "";

    const { results, isLoading, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({ url: `/products/search${myproduct ? `?creatorID=${userId}` : ``}`, limit: 20, filter: "id", name: "getProduct" })


    return (
        <LoadingAnimation loading={isLoading} >
            <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} gap={"6"} >
                {results?.map((item: IProduct, index: number) => {
                    if (results?.length === index + 1) {
                        return ( 
                            <Flex ref={ref} key={index} w={"full"} h={"fit-content"} flexDir={"column"} bgColor={"white"} rounded={"16px"} p={"4"} gap={"4"} style={{ boxShadow: "0px 4px 4px 0px #0000000D" }} >
                                <Flex w={"full"} h={"full"} alignItems={"center"} gap={2} >
                                    <UserImage image={item?.createdBy?.data?.imgMain?.value} font={"16px"} data={item?.createdBy} border={"1px"} size={"32px"} />
                                    <Flex flexDir={"column"}>
                                        <Text fontSize={"14px"} fontWeight={"600"} color={primaryColor} >
                                            {capitalizeFLetter(item?.createdBy?.firstName) + " " + capitalizeFLetter(item?.createdBy?.lastName)}
                                        </Text>
                                        <Text fontSize={"12px"} color={bodyTextColor} >
                                            {moment(item?.createdDate)?.fromNow()}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex w={"full"} h={"210px"} rounded={"8px"} >
                                    <BlurredImage height={["210px"]} image={item?.images[0]} />
                                </Flex>
                                <Flex w={"full"} h={"fit-content"} flexDir={"column"} gap={2} >
                                    <Text fontSize={"24px"} fontWeight={"600"} color={primaryColor} >{capitalizeFLetter(item?.name)}</Text>
                                    <Flex alignItems={"center"} >
                                        <Text fontSize={"14px"} fontWeight={"700"} color={bodyTextColor} >{formatNumber(item?.price)}</Text>
                                        {/* <Text fontSize={"14px"} fontWeight={"700"} ml={"1"} color={"#B6B6B6"} textDecor={"strikethrough"} >₦33,029</Text> */}
                                        <Text fontSize={"10px"} ml={"auto"} color={bodyTextColor} >{item?.quantity} Avail</Text>
                                    </Flex>
                                    <Flex w={"full"} gap={"2"} alignItems={"center"} >
                                        <LocationStroke />
                                        {/* <Text fontSize={"14px"} fontWeight={"500"} color={bodyTextColor} >{item}</Text> */}
                                    </Flex>
                                    <CustomButton onClick={() => push("/dashboard/kisok/details/"+item?.id)} text={"Order Now"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                                </Flex>
                            </Flex>
                        )
                    } else {
                        return ( 
                            <Flex ref={ref} key={index} w={"full"} h={"fit-content"} flexDir={"column"} bgColor={"white"} rounded={"16px"} p={"4"} gap={"4"} style={{ boxShadow: "0px 4px 4px 0px #0000000D" }} >
                                <Flex w={"full"} h={"full"} alignItems={"center"} gap={2} >
                                    <UserImage image={item?.createdBy?.data?.imgMain?.value} font={"16px"} data={item?.createdBy} border={"1px"} size={"32px"} />
                                    <Flex flexDir={"column"}>
                                        <Text fontSize={"14px"} fontWeight={"600"} color={primaryColor} >
                                            {capitalizeFLetter(item?.createdBy?.firstName) + " " + capitalizeFLetter(item?.createdBy?.lastName)}
                                        </Text>
                                        <Text fontSize={"12px"} color={bodyTextColor} >
                                            {moment(item?.createdDate)?.fromNow()}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex w={"full"} h={"210px"} rounded={"8px"} >
                                    <BlurredImage height={["210px"]} image={item?.images[0]} />
                                </Flex>
                                <Flex w={"full"} h={"fit-content"} flexDir={"column"} gap={2} >
                                    <Text fontSize={"24px"} fontWeight={"600"} color={primaryColor} >{capitalizeFLetter(item?.name)}</Text>
                                    <Flex alignItems={"center"} >
                                        <Text fontSize={"14px"} fontWeight={"700"} color={bodyTextColor} >{formatNumber(item?.price)}</Text>
                                        {/* <Text fontSize={"14px"} fontWeight={"700"} ml={"1"} color={"#B6B6B6"} textDecor={"strikethrough"} >₦33,029</Text> */}
                                        <Text fontSize={"10px"} ml={"auto"} color={bodyTextColor} >{item?.quantity} Avail</Text>
                                    </Flex>
                                    <Flex w={"full"} gap={"2"} alignItems={"center"} >
                                        <LocationStroke />
                                        {/* <Text fontSize={"14px"} fontWeight={"500"} color={bodyTextColor} >{item}</Text> */}
                                    </Flex>
                                    <CustomButton onClick={() => push("/dashboard/kisok/details/"+item?.id)} text={"Order Now"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                                </Flex>
                            </Flex>
                        )
                    }
                })}
            </Grid>
        </LoadingAnimation>
    )
}
