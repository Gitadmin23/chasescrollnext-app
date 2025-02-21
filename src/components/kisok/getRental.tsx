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

export default function GetRental() {

    const { primaryColor, bodyTextColor } = useCustomTheme()
    const { push } = useRouter()

    const { results, isLoading, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({ url: `/rental/search`, limit: 20, filter: "id", name: "getrental" })

    console.log(results);


    return (
        <LoadingAnimation loading={isLoading}  >
            <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} gap={"6"} >
                {results?.map((item: IRental, index: number) => {
                    if (results?.length === index + 1) {
                        return (
                            <Flex ref={ref} key={index} w={"full"} h={"fit-content"} flexDir={"column"} bgColor={"white"} rounded={"16px"} p={"4"} gap={"4"} style={{ boxShadow: "0px 4px 4px 0px #0000000D" }} >
                                <Flex w={"full"} h={"full"} alignItems={"center"} gap={2} >
                                    <UserImage image={item?.creator?.data?.imgMain?.value} font={"16px"} data={item?.creator} border={"1px"} size={"32px"} />
                                    <Flex flexDir={"column"}>
                                        <Text fontSize={"14px"} fontWeight={"600"} color={primaryColor} >
                                            {capitalizeFLetter(item?.creator?.firstName) + " " + capitalizeFLetter(item?.creator?.lastName)}
                                        </Text>
                                        <Text fontSize={"12px"} color={bodyTextColor} >
                                            {moment(item?.createdDate)?.fromNow()}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex w={"full"} h={"210px"} rounded={"8px"} >
                                    <Image rounded={"8px"} borderColor={"#D0D4EB"} objectFit={"cover"} alt={item?.images[0]} width={["full"]} height={"full"} src={IMAGE_URL + item?.images[0]} />
                                </Flex>
                                <Flex w={"full"} h={"fit-content"} flexDir={"column"} gap={2} >
                                    <Flex flexDir={"column"} >
                                        <Text fontSize={"14px"} fontWeight={"600"}  >{textLimit(capitalizeFLetter(item?.name), 20)}</Text>
                                        <Text fontSize={"24px"} fontWeight={"600"} >{textLimit(item?.description, 20)}</Text>
                                    </Flex>
                                    {/* <Text fontSize={"14px"} fontWeight={"700"} color={bodyTextColor} >{textLimit(item?.category, 15)}</Text> */}
                                    <Text fontSize={"24px"} fontWeight={"600"} >{formatNumber(item?.price)}/ {capitalizeFLetter(item?.frequency ? item?.frequency : "Daily")}</Text>
                                    <Flex w={"full"} gap={"2"} alignItems={"center"} >
                                        <LocationStroke />
                                        <Text fontSize={"14px"} fontWeight={"500"} color={bodyTextColor} >{item?.location?.locationDetails}</Text>
                                    </Flex>
                                    <CustomButton onClick={() => push("/dashboard/kisok/details-rental/" + item?.id)} text={"View Rental Services"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                                </Flex>
                            </Flex>
                        )
                    } else {
                        return (
                            <Flex key={index} w={"full"} h={"fit-content"} flexDir={"column"} bgColor={"white"} rounded={"16px"} p={"4"} gap={"4"} style={{ boxShadow: "0px 4px 4px 0px #0000000D" }} >
                                <Flex w={"full"} h={"full"} alignItems={"center"} gap={2} >
                                    <UserImage image={item?.creator?.data?.imgMain?.value} font={"16px"} data={item?.creator} border={"1px"} size={"32px"} />
                                    <Flex flexDir={"column"}>
                                        <Text fontSize={"14px"} fontWeight={"600"} color={primaryColor} >
                                            {capitalizeFLetter(item?.creator?.firstName) + " " + capitalizeFLetter(item?.creator?.lastName)}
                                        </Text>
                                        <Text fontSize={"12px"} color={bodyTextColor} >
                                            {moment(item?.createdDate)?.fromNow()}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex w={"full"} h={"210px"} rounded={"8px"} >
                                    <Image rounded={"8px"} borderColor={"#D0D4EB"} objectFit={"cover"} alt={item?.images[0]} width={["full"]} height={"full"} src={IMAGE_URL + item?.images[0]} />
                                </Flex>
                                <Flex w={"full"} h={"fit-content"} flexDir={"column"} gap={2} >
                                    <Flex flexDir={"column"} >
                                        <Text fontSize={"14px"} fontWeight={"600"}  >{textLimit(capitalizeFLetter(item?.name), 20)}</Text>
                                        <Text fontSize={"24px"} fontWeight={"600"} >{textLimit(item?.description, 20)}</Text>
                                    </Flex>
                                    <Text fontSize={"14px"} fontWeight={"700"} color={bodyTextColor} >{textLimit(item?.category, 15)}</Text>
                                    <Text fontSize={"24px"} fontWeight={"600"} >{formatNumber(item?.price)}/ {capitalizeFLetter(item?.frequency ? item?.frequency : "Daily")}</Text>
                                    <Flex w={"full"} gap={"2"} alignItems={"center"} >
                                        <LocationStroke />
                                        <Text fontSize={"14px"} fontWeight={"500"} color={bodyTextColor} >{textLimit(item?.location?.locationDetails, 30)}</Text>
                                    </Flex>
                                    <CustomButton onClick={() => push("/dashboard/kisok/details-rental/" + item?.id)} text={"View Rental Services"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                                </Flex>
                            </Flex>
                        )
                    }
                })}
            </Grid>
        </LoadingAnimation>
    )
}
