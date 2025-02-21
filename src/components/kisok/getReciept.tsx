import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent';
import useCustomTheme from '@/hooks/useTheme';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
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
import ModalLayout from '../sharedComponent/modal_layout';

export default function GetReciept() {

    const { primaryColor, bodyTextColor } = useCustomTheme()
    const { push } = useRouter()
    const userId = localStorage.getItem('user_id') + "";

    const [detail, setDetails] = useState({} as IReceipt)

    const [open, setOpen] = useState(false)

    const { results, isLoading, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({ url: `/reciept/search?userId=${userId}`, limit: 20, filter: "id", name: "getreciept" })

    console.log(results);
    

    return (
        <LoadingAnimation loading={isLoading} length={results?.length} >
            <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} gap={["4","4","6"]} >
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
                                    <Flex rounded={"32px"} h={"20px"} justifyContent={"center"} alignItems={"center"} color={"white"} fontSize={"10px"} bgColor={"#FF9500"} w={"fit-content"} px={"2"} >
                                        ONGOING
                                    </Flex>
                                    <Flex display={["none", "none", "flex"]} >
                                        <CustomButton onClick={() => setOpen(true)} text={"View Details"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
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
                                    <Flex rounded={"32px"} h={"20px"} justifyContent={"center"} alignItems={"center"} color={"white"} fontSize={"10px"} bgColor={"#FF9500"} w={"fit-content"} px={"2"} >
                                        ONGOING
                                    </Flex>
                                    <Flex display={["none", "none", "flex"]} >
                                        <CustomButton onClick={() => setOpen(true)} text={"View Details"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                                    </Flex>
                                </Flex>
                            </Flex>
                        )
                    }
                })}
            </Grid>
            <ModalLayout size={"4xl"} open={open} close={setOpen} closeIcon={true} >
                <Flex flexDir={"column"}  p={"4"} gap={"4"} >
                    <Text fontSize={"18px"} fontWeight={"600"} >Receipt</Text>
                    <Flex w={"full"} gap={"6"} >
                        <Flex w={"full"} >

                        </Flex>
                        <Flex w={"full"} >

                        </Flex>
                    </Flex>
                </Flex>
            </ModalLayout>
        </LoadingAnimation>
    )
}
