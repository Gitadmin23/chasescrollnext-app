"use client"
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react' 
import { IRental } from '@/models/product'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import LoadingAnimation from '../sharedComponent/loading_animation'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { IMAGE_URL } from '@/services/urls'
import UserImage from '../sharedComponent/userimage' 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import { FaStar } from 'react-icons/fa'
import RentalCheckout from './rentalCheckout'
import ProductRating from './productRating'

export default function RentalDetail({ id }: { id: string }) {

    const { primaryColor, borderColor, secondaryBackgroundColor } = useCustomTheme()
    const [qty, setQty] = useState(1)
    const [item, setItem] = useState({} as IRental) 

    const { isLoading, isRefetching, refetch, data } = useQuery(
        ["rental", id],
        () => httpService.get(`/rental/search`, {
            params: {
                id: id
            }
        }), {
        onSuccess(data) {
            setItem(data?.data?.content[0])
        }
    }
    ); 

    return (
        <LoadingAnimation loading={isLoading} >
            <Flex w={"full"} px={"6"} pos={"relative"} h={"full"} pt={["6", "6", "6", "6"]} gap={"4"} pb={"12"} flexDir={"column"} overflowY={"auto"} >
                <Flex w={"full"} alignItems={"center"} justifyContent={"space-between"} >
                    <Text fontSize={"24px"} fontWeight={"700"} >{capitalizeFLetter(item?.name)}</Text>
                    <Flex gap={"3"} >
                        <Flex w={"48px"} h={"48px"} rounded={"full"} bgColor={"green"} />
                        <Flex w={"48px"} h={"48px"} rounded={"full"} bgColor={"green"} />
                    </Flex>
                </Flex>
                {item?.images?.length > 0 && (
                    <Flex w={"full"} h={"fit-content"} >
                        <Flex w={"full"} height={["228px", "228px", "344px"]} gap={"3"} >
                            <Flex w={"full"} rounded={"xl"} bgColor={"gray"} h={"full"} >
                                <Image src={IMAGE_URL + item?.images[0]} alt='logo' w={"full"} rounded={"8px"} height={"full"} objectFit={"cover"} />
                            </Flex>
                            {item?.images?.length > 1 && (
                                <Flex display={["none", "none", "flex"]} w={"full"} h={"full"} gap={"3"} >
                                    <Flex w={"full"} h={"full"} rounded={"xl"} bgColor={"green"} >
                                        <Image src={IMAGE_URL + item?.images[1]} alt='logo' w={"full"} rounded={"8px"} height={"full"} objectFit={"cover"} />
                                    </Flex>
                                    {item?.images?.length > 2 && (
                                        <Flex w={"full"} h={"full"} flexDir={"column"} gap={"3"}  >
                                            <Flex w={"full"} h={"48.1%"} rounded={"xl"} >
                                                <Image src={IMAGE_URL + item?.images[2]} alt='logo' w={"full"} rounded={"8px"} height={"full"} objectFit={"cover"} />
                                            </Flex>
                                            {item?.images?.length > 3 &&
                                                <Flex w={"full"} h={"48.1%"} rounded={"xl"} >
                                                    <Image src={IMAGE_URL + item?.images[3]} alt='logo' w={"full"} rounded={"8px"} height={"full"} objectFit={"cover"} />
                                                </Flex>
                                            }
                                        </Flex>
                                    )}
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                )}
                <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                    <Flex w={"full"} gap={"4"} flexDir={"column"} >
                        <Text fontSize={"20px"} fontWeight={"700"} >Details</Text>
                        <Text>{capitalizeFLetter(item?.description)}</Text>
                        {/* <Text fontWeight={"700"} mt={"4"} >Show more</Text> */}
                        <Flex w={"full"} alignItems={"center"} gap={"3"} >
                            <UserImage size={"48px"} image={item?.creator?.data?.imgMain?.value} data={item?.creator} />
                            <Flex flexDirection={"column"} >
                                <Text fontSize={"18px"} fontWeight={"600"} >{capitalizeFLetter(item?.creator?.firstName) + " " + capitalizeFLetter(item?.creator?.lastName)}</Text>
                                <Text fontSize={"13px"} >Joined Nov 2017 <span style={{ fontSize: "12px" }} >( 23+ Clients Served )</span></Text>
                            </Flex>
                        </Flex>
                        <ProductRating item={item} reviewType="RENTAL" />
                    </Flex>
                    <Flex w={"fit-content"} >
                        <Flex w={"413px"} flexDirection={"column"} >
                            <Flex display={["none", "none", "flex"]} >
                                <RentalCheckout setQty={setQty} item={item} qty={qty} />
                            </Flex> 
                        </Flex>
                    </Flex>
                </Flex>
                {/* <Flex w={"full"} gap={"6"} pt={"8"} flexDir={["column", "column", "row"]}  > 
                    <ProductRating item={item} reviewType="RENTAL" />
                </Flex> */}
                <Flex w={"full"} mt={"56"} display={["flex", "flex", "none"]} />
                <Flex display={["flex", "flex", "none"]} position={"fixed"} bottom={"20"} insetX={"0px"} px={"4"} w={"full"} >
                    <RentalCheckout setQty={setQty} item={item} qty={qty} />
                </Flex>
            </Flex>
        </LoadingAnimation>
    )
}
