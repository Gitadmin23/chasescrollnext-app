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
import { cleanup } from '@/utils/cleanupObj'

export default function GetRental({ myrental, name, state, category }: { myrental?: boolean, name?: string, state?: string, category?: string }) {

    const { primaryColor, bodyTextColor, borderColor, mainBackgroundColor } = useCustomTheme()
    const { push } = useRouter()

    const userId = localStorage.getItem('user_id') + "";

    const { results, isLoading, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({
        url: `/rental/search${myrental ? `?userId=${userId}` : ""}`, limit: 20, filter: "id", name: "getrental", paramsObj: cleanup({
            name: name,
            category: category,
            state: state
        })
    })

    const clickHandler = (item: string) => {
        push("/dashboard/kisok/details-rental/" + item)
    }

    return (
        <LoadingAnimation loading={isLoading}  >
            <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} gap={["2", "2", "6"]}  >
                {results?.map((item: IRental, index: number) => {
                    if (results?.length === index + 1) {
                        return ( 
                            <Flex ref={ref} as={"button"} flexDir={"column"} onClick={() => clickHandler(item?.id)} borderWidth={"1px"} rounded={"10px"} bgColor={mainBackgroundColor} key={index} w={"full"} >
                                <ProductImageScroller images={item?.images} createdDate={moment(item?.createdDate)?.fromNow()} userData={item?.creator} />
                                <Flex flexDir={"column"} px={["2", "2", "3"]} pt={["2", "2", "3"]} gap={"1"} pb={["2", "2", "0px"]} >
                                    <Text fontSize={["14px", "14px", "17px"]} fontWeight={"600"} textAlign={"left"} display={["none", "none", "block"]} >{textLimit(capitalizeFLetter(item?.name), 20)}</Text>
                                    <Text fontSize={["14px", "14px", "17px"]} fontWeight={"600"} textAlign={"left"} display={["block", "block", "none"]} >{textLimit(capitalizeFLetter(item?.name), 16)}</Text>
                                    <Text display={["none", "none", "flex"]} fontSize={"12px"} color={bodyTextColor} fontWeight={"600"} >{textLimit(item?.description, 20)}</Text>
                                    <Flex w={"full"} gap={["2px", "2px", "1"]} alignItems={"center"} >
                                         <LocationStroke />
                                         <Text fontSize={["10px", "12px", "12px"]} fontWeight={"500"} color={bodyTextColor} display={["none", "none", "block"]} >{textLimit(item?.location?.locationDetails, 40)}</Text>
                                         <Text fontSize={["10px", "12px", "12px"]} fontWeight={"500"} color={bodyTextColor} display={["block", "block", "none"]} >{textLimit(item?.location?.locationDetails, 15)}</Text>
                                     </Flex>
                                </Flex>
                                <Flex as={"button"} onClick={() => clickHandler(item?.id)} w={"full"} display={["none", "none", "flex"]} color={primaryColor} borderTopWidth={"1px"} fontFamily={"14px"} mt={2} fontWeight={"600"} py={"2"} justifyContent={"center"} >
                                    View Service
                                </Flex>
                            </Flex>
                        )
                    } else {
                        return ( 
                            <Flex as={"button"} flexDir={"column"} onClick={() => clickHandler(item?.id)} borderWidth={"1px"} rounded={"10px"} bgColor={mainBackgroundColor} key={index} w={"full"} >
                                <ProductImageScroller images={item?.images} createdDate={moment(item?.createdDate)?.fromNow()} userData={item?.creator} />
                                <Flex flexDir={"column"} px={["2", "2", "3"]} pt={["2", "2", "3"]} gap={"1"} pb={["2", "2", "0px"]} >
                                    <Text fontSize={["14px", "14px", "17px"]} fontWeight={"600"} textAlign={"left"} display={["none", "none", "block"]} >{textLimit(capitalizeFLetter(item?.name), 20)}</Text>
                                    <Text fontSize={["14px", "14px", "17px"]} fontWeight={"600"} textAlign={"left"} display={["block", "block", "none"]} >{textLimit(capitalizeFLetter(item?.name), 16)}</Text>
                                    <Text display={["none", "none", "flex"]} fontSize={"12px"} color={bodyTextColor} fontWeight={"600"} >{textLimit(item?.description, 20)}</Text>
                                    <Flex w={"full"} gap={["2px", "2px", "1"]} alignItems={"center"} >
                                         <LocationStroke />
                                         <Text fontSize={["10px", "12px", "12px"]} fontWeight={"500"} color={bodyTextColor} display={["none", "none", "block"]} >{textLimit(item?.location?.locationDetails, 40)}</Text>
                                         <Text fontSize={["10px", "12px", "12px"]} fontWeight={"500"} color={bodyTextColor} display={["block", "block", "none"]} >{textLimit(item?.location?.locationDetails, 15)}</Text>
                                     </Flex>
                                </Flex>
                                <Flex as={"button"} onClick={() => clickHandler(item?.id)} w={"full"} display={["none", "none", "flex"]} color={primaryColor} borderTopWidth={"1px"} fontFamily={"14px"} mt={2} fontWeight={"600"} py={"2"} justifyContent={"center"} >
                                    View Service
                                </Flex>
                            </Flex>
                        )
                    }
                })}
            </Grid>
        </LoadingAnimation>
    )
}
