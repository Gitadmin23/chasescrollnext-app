import { Grid, Flex, Text, Image } from '@chakra-ui/react'
import React from 'react'
import CustomButton from '../general/Button'
import { LocationStroke } from '../svg'
import useCustomTheme from '@/hooks/useTheme'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import LoadingAnimation from '../sharedComponent/loading_animation'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { IRental } from '@/models/product'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import moment from 'moment'
import UserImage from '../sharedComponent/userimage'
import BlurredImage from '../sharedComponent/blurred_image'
import { textLimit } from '@/utils/textlimit'
import { formatNumber } from '@/utils/numberFormat'
import { IMAGE_URL } from '@/services/urls'
import ProductImageScroller from '../sharedComponent/productImageScroller'

export default function GetRental() {

    const { primaryColor, bodyTextColor, borderColor } = useCustomTheme()
    const { push } = useRouter()

    const { results, isLoading, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({ url: `/rental/search`, limit: 20, filter: "id", name: "getrental" })

    return (
        <LoadingAnimation loading={isLoading}  >
            <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} gap={["2", "2", "6"]}  >
                {results?.map((item: IRental, index: number) => {
                    if (results?.length === index + 1) {
                        return (
                            <Flex ref={ref} key={index} w={"full"} h={"fit-content"} flexDir={"column"} bgColor={"white"} rounded={"16px"} p={["2", "2", "4"]} borderWidth={["1px", "1px", "1px"]} borderColor={borderColor} gap={["2", "2", "4"]} >
                                <ProductImageScroller images={item?.images} createdDate={moment(item?.createdDate)?.fromNow()} userData={item?.creator} />
                                <Flex w={"full"} h={"fit-content"} flexDir={"column"} gap={2} >
                                    <Flex flexDir={"column"} >
                                        <Text fontSize={["14px", "14px", "24px"]} fontWeight={"600"} textAlign={"left"} display={["none", "none", "block"]} >{textLimit(capitalizeFLetter(item?.name), 20)}</Text>
                                        <Text fontSize={["14px", "14px", "24px"]} fontWeight={"600"} textAlign={"left"} display={["block", "block", "none"]} >{textLimit(capitalizeFLetter(item?.name), 16)}</Text>
                                        <Text display={["none", "none", "flex"]} fontSize={"20px"} fontWeight={"600"} >{textLimit(item?.description, 20)}</Text>
                                    </Flex>
                                    {/* <Text fontSize={"14px"} fontWeight={"700"} color={bodyTextColor} >{textLimit(item?.category, 15)}</Text> */}
                                    <Text fontSize={["14px", "14px", "16px"]} fontWeight={"700"} >{formatNumber(item?.price)}/ {capitalizeFLetter(item?.frequency ? item?.frequency : "Daily")}</Text>
                                    <Flex w={"full"} gap={"2"} alignItems={"center"} >
                                        <LocationStroke />
                                        <Text fontSize={["10px", "14px", "14px"]} fontWeight={"500"} color={bodyTextColor} display={["none", "none", "block"]} >{textLimit(item?.location?.locationDetails, 40)}</Text>
                                        <Text fontSize={["10px", "14px", "14px"]} fontWeight={"500"} color={bodyTextColor} display={["block", "block", "none"]} >{textLimit(item?.location?.locationDetails, 15)}</Text>
                                    </Flex>
                                    <Flex display={["none", "none", "flex"]} >
                                        <CustomButton onClick={() => push("/dashboard/kisok/details-rental/" + item?.id)} text={"View Rental Services"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                                    </Flex>
                                </Flex>
                            </Flex>
                        )
                    } else {
                        return (
                            <Flex key={index} w={"full"} h={"fit-content"} flexDir={"column"} bgColor={"white"} rounded={"16px"} p={["2", "2", "4"]} borderWidth={["1px", "1px", "1px"]} borderColor={borderColor} gap={["2", "2", "4"]} >
                                <ProductImageScroller images={item?.images} createdDate={moment(item?.createdDate)?.fromNow()} userData={item?.creator} />
                                <Flex w={"full"} h={"fit-content"} flexDir={"column"} gap={2} >
                                    <Flex flexDir={"column"} >
                                        <Text fontSize={["14px", "14px", "24px"]} fontWeight={"600"} textAlign={"left"} display={["none", "none", "block"]} >{textLimit(capitalizeFLetter(item?.name), 20)}</Text>
                                        <Text fontSize={["14px", "14px", "24px"]} fontWeight={"600"} textAlign={"left"} display={["block", "block", "none"]} >{textLimit(capitalizeFLetter(item?.name), 16)}</Text>
                                        <Text display={["none", "none", "flex"]} fontSize={"20px"} fontWeight={"600"} >{textLimit(item?.description, 20)}</Text>
                                    </Flex>
                                    {/* <Text fontSize={"14px"} fontWeight={"700"} color={bodyTextColor} >{textLimit(item?.category, 15)}</Text> */}
                                    <Text fontSize={["14px", "14px", "16px"]} fontWeight={"700"} >{formatNumber(item?.price)}/ {capitalizeFLetter(item?.frequency ? item?.frequency : "Daily")}</Text>
                                    <Flex w={"full"} gap={"2"} alignItems={"center"} >
                                        <LocationStroke />
                                        <Text fontSize={["10px", "14px", "14px"]} fontWeight={"500"} color={bodyTextColor} display={["none", "none", "block"]} >{textLimit(item?.location?.locationDetails, 40)}</Text>
                                        <Text fontSize={["10px", "14px", "14px"]} fontWeight={"500"} color={bodyTextColor} display={["block", "block", "none"]} >{textLimit(item?.location?.locationDetails, 15)}</Text>
                                    </Flex>
                                    <Flex display={["none", "none", "flex"]} >
                                        <CustomButton onClick={() => push("/dashboard/kisok/details-rental/" + item?.id)} text={"View Rental Services"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
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
