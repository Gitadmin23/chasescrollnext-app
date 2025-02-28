import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent';
import useCustomTheme from '@/hooks/useTheme';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import LoadingAnimation from '../sharedComponent/loading_animation';
import { Flex, Grid, Image, Text, Textarea } from '@chakra-ui/react';
import { IOrder, IReceipt } from '@/models/product';
import UserImage from '../sharedComponent/userimage';
import moment from 'moment';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import { formatNumber } from '@/utils/numberFormat';
import CustomButton from '../general/Button';
import { IMAGE_URL } from '@/services/urls';
import { dateFormat, timeFormat } from '@/utils/dateFormat';
import ModalLayout from '../sharedComponent/modal_layout';
import { numberFormat } from '@/utils/formatNumberWithK';
import { textLimit } from '@/utils/textlimit';

export default function GetReciept() {

    const { primaryColor, headerTextColor, bodyTextColor, secondaryBackgroundColor } = useCustomTheme()
    const { push } = useRouter()
    const userId = localStorage.getItem('user_id') + ""; 
    const [textSize, setTextSize] = useState(40)

    const [detail, setDetails] = useState({} as IReceipt)

    const [open, setOpen] = useState(false)

    const { results, isLoading, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({ url: `/reciept/search?userId=${userId}`, limit: 20, filter: "id", name: "getreciept" })

    const clickHander = (item: IReceipt) => {
        setDetails(item)
        setOpen(true)
    }


    return (
        <LoadingAnimation loading={isLoading} length={results?.length} >
            <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} gap={["4", "4", "6"]} >
                {results?.map((item: IReceipt, index: number) => {
                    if (results?.length === index + 1) {
                        return (
                            <Flex ref={ref} as={"button"} alignItems={"start"} onClick={() => setOpen(true)} key={index} w={"full"} h={"fit-content"} flexDir={"column"} bgColor={"white"} rounded={"16px"} pb={"5"} gap={"4"} >
                                <Flex w={"full"} h={"full"} alignItems={"center"} gap={2} >
                                    <UserImage image={item?.createdBy?.data?.imgMain?.value} font={"16px"} data={item?.createdBy} border={"1px"} size={"32px"} />
                                    <Flex flexDir={"column"} alignItems={"start"} >
                                        <Text fontSize={"12px"} fontWeight={"600"} color={primaryColor} >
                                            {capitalizeFLetter(item?.createdBy?.firstName) + " " + capitalizeFLetter(item?.createdBy?.lastName)}
                                        </Text>
                                        <Text fontSize={"10px"} color={bodyTextColor} >
                                            {moment(item?.createdDate)?.fromNow()}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex w={"full"} h={"210px"} rounded={"8px"} >
                                    <Image rounded={"8px"} borderColor={"#D0D4EB"} objectFit={"cover"} alt={item?.rental?.images[0]} width={["full"]} height={"full"} src={IMAGE_URL + item?.rental?.images[0]} />
                                </Flex>
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
                                        <CustomButton onClick={() => clickHander(item)} text={"View Details"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                                    </Flex>
                                </Flex>
                            </Flex>
                        )
                    } else {
                        return (
                            <Flex as={"button"} alignItems="start" onClick={() => setOpen(true)} key={index} w={"full"} h={"fit-content"} flexDir={"column"} bgColor={"white"} rounded={"16px"} pb={"5"} gap={"4"} >
                                <Flex w={"full"} h={"full"} alignItems={"center"} gap={2} >
                                    <UserImage image={item?.createdBy?.data?.imgMain?.value} font={"16px"} data={item?.createdBy} border={"1px"} size={"32px"} />
                                    <Flex flexDir={"column"} alignItems={"start"} >
                                        <Text fontSize={"12px"} fontWeight={"600"} color={primaryColor} >
                                            {capitalizeFLetter(item?.createdBy?.firstName) + " " + capitalizeFLetter(item?.createdBy?.lastName)}
                                        </Text>
                                        <Text fontSize={"10px"} color={bodyTextColor} >
                                            {moment(item?.rental?.createdDate)?.fromNow()}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex w={"full"} h={"210px"} rounded={"8px"} >
                                    <Image rounded={"8px"} borderColor={"#D0D4EB"} objectFit={"cover"} alt={item?.rental?.images[0]} width={["full"]} height={"full"} src={IMAGE_URL + item?.rental?.images[0]} />
                                </Flex>
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
                                        <CustomButton onClick={() => clickHander(item)} text={"View Details"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                                    </Flex>
                                </Flex>
                            </Flex>
                        )
                    }
                })}
            </Grid>

            <ModalLayout open={open} close={setOpen} closeIcon={true} >
                <Flex flexDir={"column"} p={"4"} gap={"4"} fontSize={"14px"}  >
                    <Flex w={"full"} h={"210px"} justifyContent={"center"} alignItems={"center"} rounded={"8px"} bgColor={"#00000066"} >
                        <Image rounded={"8px"} borderColor={"#D0D4EB"} objectFit={"cover"} alt={detail?.rental?.images[0]} width={["fit-content"]} height={"full"} src={IMAGE_URL + detail?.rental?.images[0]} />
                    </Flex>
                    <Flex flexDirection={"column"} gap={"1"} >
                        <Text color={primaryColor} fontWeight={"700"} >Customer Name: <span style={{ fontWeight: "500", color: headerTextColor }} >{capitalizeFLetter(detail?.createdBy?.firstName) + " " + capitalizeFLetter(detail?.createdBy?.lastName)}</span></Text>
                        <Text fontWeight={"600"} >Description: <span style={{ fontWeight: "500" }} >{textLimit(capitalizeFLetter(detail?.rental?.description), textSize)}<span role='button' style={{ color: primaryColor, fontSize: "12px", fontWeight: "600" }} onClick={() => setTextSize((prev) => prev === 40 ? detail?.rental?.description?.length + 1 : 40)} >{detail?.rental?.description?.length > 40 ? (textSize < detail?.rental?.description?.length ? "show more" : "...show less") : ""}</span></span></Text>

                        {/* <Text fontSize={"14px"} >{textLimit(capitalizeFLetter(detail?.rental?.description), textSize)}<span role='button' style={{ color: primaryColor, fontSize: "12px", fontWeight: "600" }} onClick={() => setTextSize((prev) => prev === 40 ? detail?.rental?.description?.length + 1 : 40)} >{detail?.rental?.description?.length > 40 ? (textSize < detail?.rental?.description?.length ? "show more" : "show less") : ""}</span></Text> */}
                        <Text fontWeight={"600"} >Start Date:  <span style={{ fontWeight: "500" }}>{dateFormat(detail?.startDate)}</span></Text>
                        <Text fontWeight={"600"} >End Date: <span style={{ fontWeight: "500" }}>{dateFormat(detail?.endDate)}</span></Text>
                    </Flex>
                    <Flex w={"full"} gap={"1"} bgColor={secondaryBackgroundColor} flexDir={"column"} p={"2"} >
                        <Text color={primaryColor} fontWeight={"700"} >Payment Summary</Text>
                        <Text mt={"1"} >Subtotal: {numberFormat(detail?.price)}</Text>
                        <Text>Total: {numberFormat(detail?.price)}</Text>
                    </Flex>
                    <Flex flexDir={"column"} gap={"1"} >
                        <Text fontWeight={"600"} >Shipped To :  <span style={{ fontWeight: "500" }} >{detail?.address?.landmark}</span></Text>
                        <Text fontWeight={"600"} >Street Address: <span style={{ fontWeight: "500" }} >{detail?.rental?.location?.locationDetails}</span></Text>
                    </Flex>
                    <Flex w={"full"} justifyContent={"end"} >

                    <CustomButton text={"Download"} width={"200px"} height={"45px"} fontSize={"sm"} borderRadius={"999px"} />
                    </Flex>
                </Flex>
            </ModalLayout>
        </LoadingAnimation>
    )
}
