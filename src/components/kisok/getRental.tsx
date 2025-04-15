"use client"
import { Grid, Flex, Text, Image } from '@chakra-ui/react'
import React from 'react'
import CustomButton from '../general/Button'
import { LocationStroke } from '../svg'
import useCustomTheme from '@/hooks/useTheme'
import { useParams, useRouter } from 'next/navigation'
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
import useProductStore from '@/global-state/useCreateProduct'
import DeleteEvent from '../sharedComponent/delete_event'
import { IoMdCheckmark } from 'react-icons/io'

export default function GetRental({ myrental, name, state, category, isSelect, selected, setSelected }: { myrental?: boolean, name?: string, state?: string, category?: string, isSelect?: boolean, selected?: any, setSelected?: any }) {

    const { primaryColor, bodyTextColor, borderColor, mainBackgroundColor } = useCustomTheme()
    const { push } = useRouter()
    const { rentaldata, updateRental } = useProductStore((state) => state);

    const userId = localStorage.getItem('user_id') + "";
    const param = useParams();
    const id = param?.slug;

    const { results, isLoading, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({
        url: `/rental/search${myrental ? `?userId=${id ? id : userId}` : ""}`, limit: 20, filter: "id", name: "getMyrental", paramsObj: cleanup({
            name: name,
            category: category,
            state: state
        })
    })

    const clickHandler = (item: IRental) => {
        if (isSelect) {
            let clone = [...selected]

            if (selected?.includes(item?.id)) {
                clone = clone?.filter((subitem: string) => subitem !== item?.id)
                setSelected(clone)
            } else {
                clone = [...clone, item?.id]
                setSelected(clone)
            }
        } else {
            if (myrental) {
                updateRental({
                    ...rentaldata,
                    name: item?.name,
                    description: item?.description,
                    images: item?.images,
                    price: item?.price,
                    category: item?.category,
                    location: item?.location as any,
                    maximiumNumberOfDays: item?.maximiumNumberOfDays,
                    frequency: item?.frequency + "",
                    state: item?.location?.state
                })
                push("/dashboard/kisok/edit/" + item?.id + "/rental")
            } else {
                push("/dashboard/kisok/details-rental/" + item?.id)
            }
        }
    }

    let newResult = results?.filter((item: IRental) => item?.creator?.userId !== userId)

    return (
        <LoadingAnimation loading={isLoading} length={(myrental ? results : newResult)?.length} >
            <Grid w={"full"} templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} gap={["2", "2", "4"]}  >
                {(myrental ? results : newResult)?.map((item: IRental, index: number) => {
                    if ((myrental ? results : newResult)?.length === index + 1) {
                        return (
                            <Flex ref={ref} as={"button"} flexDir={"column"} onClick={() => clickHandler(item)} borderWidth={"1px"} rounded={"10px"} bgColor={mainBackgroundColor} key={index} w={"full"} pos={"relative"} >
                                {!isSelect && (
                                    <DeleteEvent id={item?.id} isRental={true} name={item?.name + " Rental"} isOrganizer={myrental ? true : false} />
                                )}
                                {isSelect && (
                                    <Flex pos={"absolute"} zIndex={"30"} top={"3"} right={"3"} w={"5"} h={"5"} justifyContent={"center"} alignItems={"center"} bgColor={selected?.includes(item?.id) ? primaryColor : "white"} rounded={"6px"} >
                                        <IoMdCheckmark size={"15px"} color='white' />
                                    </Flex>
                                )}
                                <ProductImageScroller images={item?.images} createdDate={moment(item?.createdDate)?.fromNow()} userData={item?.creator} />
                                <Flex flexDir={"column"} px={["2", "2", "3"]} pt={["2", "2", "3"]} gap={"1"} pb={["2", "2", "0px"]} >
                                    <Text fontSize={["14px", "14px", "17px"]} fontWeight={"600"} textAlign={"left"} display={["none", "none", "block"]} >{textLimit(capitalizeFLetter(item?.name), 20)}</Text>
                                    <Text fontSize={["14px", "14px", "17px"]} fontWeight={"600"} textAlign={"left"} display={["block", "block", "none"]} >{textLimit(capitalizeFLetter(item?.name), 16)}</Text>
                                    <Text display={["none", "none", "flex"]} fontSize={"12px"} color={bodyTextColor} fontWeight={"600"} >{textLimit(item?.category?.replaceAll("_", " "), 30)}</Text>
                                    <Flex w={"full"} gap={["2px", "2px", "1"]} alignItems={"center"} >
                                        <LocationStroke />
                                        <Text fontSize={["10px", "12px", "12px"]} fontWeight={"500"} color={bodyTextColor} display={["none", "none", "block"]} >{textLimit(item?.location?.locationDetails, 40)}</Text>
                                        <Text fontSize={["10px", "12px", "12px"]} fontWeight={"500"} color={bodyTextColor} display={["block", "block", "none"]} >{textLimit(item?.location?.locationDetails, 15)}</Text>
                                    </Flex>
                                    <Flex justifyContent={"end"} alignItems={"center"} >
                                        <Text fontWeight={"600"} fontSize={"14px"} >{formatNumber(item?.price)} <span style={{ color: bodyTextColor, fontSize: "12px", fontWeight: "normal" }} >{item?.frequency !== "HOURLY" ? "Per day" : "Per hour"}</span></Text>
                                    </Flex>
                                </Flex>
                                {myrental && (
                                    <Flex as={"button"} onClick={() => clickHandler(item)} w={"full"} display={["none", "none", "flex"]} color={primaryColor} borderTopWidth={"1px"} fontFamily={"14px"} mt={2} fontWeight={"600"} py={"2"} justifyContent={"center"} >
                                        Edit Service
                                    </Flex>
                                )}
                                {!myrental && (
                                    <Flex as={"button"} onClick={() => clickHandler(item)} w={"full"} display={["none", "none", "flex"]} color={primaryColor} borderTopWidth={"1px"} fontFamily={"14px"} mt={2} fontWeight={"600"} py={"2"} justifyContent={"center"} >
                                        View Service
                                    </Flex>
                                )}
                            </Flex>
                        )
                    } else {
                        return (
                            <Flex as={"button"} flexDir={"column"} onClick={() => clickHandler(item)} borderWidth={"1px"} rounded={"10px"} bgColor={mainBackgroundColor} key={index} w={"full"} pos={"relative"} >
                                {!isSelect && (
                                    <DeleteEvent id={item?.id} isRental={true} name={item?.name + " Rental"} isOrganizer={myrental ? true : false} />
                                )}
                                {isSelect && (
                                    <Flex pos={"absolute"} zIndex={"30"} top={"3"} right={"3"} w={"5"} h={"5"} justifyContent={"center"} alignItems={"center"} bgColor={selected?.includes(item?.id) ? primaryColor : "white"} rounded={"6px"} >
                                        <IoMdCheckmark size={"15px"} color='white' />
                                    </Flex>
                                )}
                                <ProductImageScroller images={item?.images} createdDate={moment(item?.createdDate)?.fromNow()} userData={item?.creator} />
                                <Flex flexDir={"column"} px={["2", "2", "3"]} pt={["2", "2", "3"]} gap={"1"} pb={["2", "2", "0px"]} >
                                    <Text fontSize={["14px", "14px", "17px"]} fontWeight={"600"} textAlign={"left"} display={["none", "none", "block"]} >{textLimit(capitalizeFLetter(item?.name), 20)}</Text>
                                    <Text fontSize={["14px", "14px", "17px"]} fontWeight={"600"} textAlign={"left"} display={["block", "block", "none"]} >{textLimit(capitalizeFLetter(item?.name), 16)}</Text>
                                    <Text display={["none", "none", "flex"]} fontSize={"12px"} color={bodyTextColor} fontWeight={"600"} >{textLimit(item?.category?.replaceAll("_", " "), 30)}</Text>
                                    <Flex w={"full"} gap={["2px", "2px", "1"]} alignItems={"center"} >
                                        <LocationStroke />
                                        <Text fontSize={["10px", "12px", "12px"]} fontWeight={"500"} color={bodyTextColor} display={["none", "none", "block"]} >{textLimit(item?.location?.locationDetails, 40)}</Text>
                                        <Text fontSize={["10px", "12px", "12px"]} fontWeight={"500"} color={bodyTextColor} display={["block", "block", "none"]} >{textLimit(item?.location?.locationDetails, 15)}</Text>
                                    </Flex>
                                    <Flex justifyContent={"end"} alignItems={"center"} >
                                        <Text fontWeight={"600"} fontSize={"14px"} >{formatNumber(item?.price)} <span style={{ color: bodyTextColor, fontSize: "12px", fontWeight: "normal" }} >{item?.frequency !== "HOURLY" ? "Per day" : "Per hour"}</span></Text>
                                    </Flex>
                                </Flex>
                                {myrental && (
                                    <Flex as={"button"} onClick={() => clickHandler(item)} w={"full"} display={["none", "none", "flex"]} color={primaryColor} borderTopWidth={"1px"} fontFamily={"14px"} mt={2} fontWeight={"600"} py={"2"} justifyContent={"center"} >
                                        Edit Service
                                    </Flex>
                                )}
                                {!myrental && (
                                    <Flex as={"button"} onClick={() => clickHandler(item)} w={"full"} display={["none", "none", "flex"]} color={primaryColor} borderTopWidth={"1px"} fontFamily={"14px"} mt={2} fontWeight={"600"} py={"2"} justifyContent={"center"} >
                                        View Service
                                    </Flex>
                                )}
                            </Flex>
                        )
                    }
                })}
            </Grid>
        </LoadingAnimation>
    )
}
