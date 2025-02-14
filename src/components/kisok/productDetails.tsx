"use client"
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Grid, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { IoStar } from 'react-icons/io5'
import CustomButton from '../general/Button'
import { CartIcon, SheildIcon, TruckColoredIcon } from '../svg'
import httpService from '@/utils/httpService'
import { useQuery } from 'react-query'
import LoadingAnimation from '../sharedComponent/loading_animation'
import { IProduct } from '@/models/product'
import { IMAGE_URL } from '@/services/urls'
import { formatNumber } from '@/utils/numberFormat'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import UserImage from '../sharedComponent/userimage'
import ProductRating from './productRating'
import ProductCheckout from './productCheckout'
import { useRouter } from 'next/navigation'

export default function ProductDetails({ id }: { id: string }) {

    const { primaryColor } = useCustomTheme()

    const [item, setItem] = useState({} as IProduct)

    const { back } = useRouter()

    const { isLoading } = useQuery(
        ["products", id],
        () => httpService.get(`/products/search`, {
            params: {
                id: id
            }
        }), {
        onSuccess(data) {
            setItem(data?.data?.content[0])
        }
    }); 

    return (
        <LoadingAnimation loading={isLoading} >
            <Flex w={"full"} px={"6"} pt={["6", "6", "6", "6"]} pb={"12"} gap={"6"} flexDir={"column"} overflowY={"auto"} overflowX={"hidden"} >
                <Flex w={"full"} display={["none", "none", "flex"]} justifyContent={"space-between"} >
                    <Text fontSize={"24px"} fontWeight={"700"} >Explore  Marchs on chasescroll Kiosk</Text>
                    <Flex w={"fit-content"} gap={4} alignItems={"center"} >
                        <CustomButton alignItems={"center"} text={"List "} px={"15px"} height={"44px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"160px"} />
                        <Flex as={"button"} w={"40px"} h={"40px"} justifyContent={"center"} alignItems={"center"} >
                            <CartIcon />
                        </Flex>
                        <Flex w={"40px"} h={"40px"} backgroundColor={"red"} borderRadius={"full"} />
                    </Flex>
                </Flex>
                <Flex w={"full"} gap={"6"} flexDir={["column", "column", "row"]} >
                    <Flex w={"full"} flexDir={"column"} gap={"4"} >
                        <Flex gap={"1"} alignItems={"center"} >
                            <Text onClick={() => back()} fontSize={"14px"} fontWeight={"500"} >Home</Text>
                            <IoIosArrowForward />
                            <Text fontSize={"14px"} fontWeight={"500"} >Product details</Text>
                            <IoIosArrowForward />
                            <Text fontSize={"14px"} fontWeight={"500"} >{item?.name}</Text>
                        </Flex>
                        {item?.images?.length > 0 && (
                            <Flex w={"full"} h={["340px", "340px", "620px"]} pos={"relative"}  >
                                <Image src={IMAGE_URL + item?.images[0]} alt='logo' w={"full"} rounded={"8px"} height={"full"} objectFit={"cover"} />
                                <Grid templateColumns={["repeat(3, 1fr)"]} pos={"absolute"} gap={"3"} insetX={"4"} bottom={"4"} >
                                    {item?.images?.map((subitem: string, index: number) => {
                                        if (index !== 0 && index <= 3) {
                                            return (
                                                <Flex key={index} w={"full"} h={["100px", "150px"]} bgColor={"green"} rounded={"8px"} shadow={"md"} >
                                                    <Image src={IMAGE_URL + subitem} alt='logo' w={"full"} rounded={"8px"} height={"full"} objectFit={"cover"} />
                                                </Flex>
                                            )
                                        }
                                    })}
                                </Grid>
                            </Flex>
                        )}
                        <Flex display={["none", "none", "flex"]} >
                            <ProductRating item={item?.id} />
                        </Flex>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"4"} >
                        <Text fontSize={["24px", "24px", "42px"]} fontWeight={"700"} >{capitalizeFLetter(item?.name)}</Text>
                        <Flex flexDir={["column-reverse", "column-reverse", "column"]} gap={"4"} >
                            <Flex flexDirection={"column"} gap={"1"} >
                                <Text fontSize={"14px"} fontWeight={"600"} >Product  Description</Text>
                                <Text>{item.description}</Text>
                            </Flex>
                            <Flex display={["none", "none", "flex"]} gap={4} alignItems={"center"} >
                                <Flex gap={2} alignItems={"center"} >
                                    <Text fontSize={"14px"} fontWeight={"500"} >Product Quantity</Text>
                                    <Text fontSize={"16px"} color={primaryColor} fontWeight={"600"} >Product Quantity</Text>
                                </Flex>
                                <Flex gap={2} alignItems={"center"} >
                                    <Text fontWeight={"500"} >Item Reviews</Text>
                                    <IoStar size={"24px"} color={"#1E1E1E"} />
                                    <Text fontWeight={"500"} >8.7</Text>
                                </Flex>
                            </Flex>
                            <Flex alignItems={"center"} >
                                <Text fontSize={"24px"} fontWeight={"700"} >{formatNumber(item?.price)}</Text>
                            </Flex>
                        </Flex>
                        <Flex gap={"3"} alignItems={"center"} >
                            <UserImage image={item?.creator?.data?.imgMain?.value} size={"32px"} border={"1px"} data={item?.creator} />
                            <Text fontSize={"12px"} fontWeight={"500"} >Sold by {capitalizeFLetter(item?.creator?.firstName) + " " + capitalizeFLetter(item?.creator?.lastName)}</Text>
                            <CustomButton text={"Message"} fontSize={"xs"} height={"23px"} width={"89px"} borderRadius={"999px"} />
                        </Flex>
                        {/* <Flex w={"full"} gap={"2"} alignItems={"center"} >
                            <Text color={"#434344"} >Event</Text>
                            <Flex w={"full"} h={"1px"} bgColor={"#B6B6B633"} />
                        </Flex>
                        <Flex w={"full"} rounded={"16px"} gap={"3"} borderWidth={"2px"} borderColor={"#F1F1F1"} p={"3"} >
                            <Flex w={"full"} h={"145px"} bgColor={"gray"} rounded="16px" roundedTopRight={"0px"} />
                            <Flex w={"full"} flexDirection={"column"} gap={"1"} >
                                <Flex fontSize={"8px"} fontWeight={"700"} justifyContent={"center"} alignItems={"center"} bgColor={"#233DF31A"} rounded={"32px"} h={"24px"} w={"65px"} >
                                    3 Ticket left
                                </Flex>
                                <Text fontSize={"18px"} fontWeight={"600"}  >Designing for Universe musk 2,0</Text>
                                <Text color={headerTextColor} fontSize={"12px"} fontWeight={"500"} >Thursday, August 15 · 7 - 8pm WAT</Text>
                                <Flex alignItems={"center"} gap={"2"} >
                                    <LocationIcon_2 />
                                    <Text fontSize={"12px"} >State farm arena, ATL</Text>
                                </Flex>
                            </Flex>
                        </Flex> */}
                        <Flex display={["none", "none", "flex"]} >
                            <ProductCheckout item={item} />
                        </Flex>
                        <Flex gap={"3"} mt={"4"} >
                            <Flex w={"28px"} h={"28px"} justifyContent={"center"} alignItems={"center"} >
                                <TruckColoredIcon />
                            </Flex>
                            <Text color={"#0CC23A"} fontWeight={"600"} >Free shipping on all orders</Text>
                        </Flex>
                        <Flex flexDir={"column"} gap={"1"} >
                            <Text fontSize={"14px"} fontWeight={"500"} >Delivery: Feb 4-16</Text>
                            <Text fontSize={"14px"} mt={"3"} >Get a ₦1,600 credit for late delivery</Text>
                            <Text fontWeight={"600"} >Courier company:</Text>
                        </Flex>
                        <Flex gap={"3"} mt={"4"} >
                            <Flex w={"28px"} h={"28px"} justifyContent={"center"} alignItems={"center"} >
                                <SheildIcon />
                            </Flex>
                            <Text color={"#0CC23A"} fontWeight={"600"} >Free shipping on all orders</Text>
                        </Flex>
                        <Flex gap={["2", "2", "5"]} alignItems={["start", "start", "center"]} flexDir={["column", "column", "row"]} >
                            <Text fontWeight={"500"} fontSize={"12px"} >Safe Payment Options</Text>
                            <Text fontWeight={"500"} fontSize={"12px"} >Secure logistics</Text>
                            <Text fontWeight={"500"} fontSize={"12px"} >Purchase protection</Text>
                        </Flex>
                        <Flex display={["flex", "flex", "none"]} >
                            <ProductRating item={item?.id} />
                        </Flex>
                        <Flex display={["flex", "flex", "none"]} >
                            <ProductCheckout item={item} />
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </LoadingAnimation>
    )
}
