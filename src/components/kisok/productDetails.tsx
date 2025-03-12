"use client"
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Grid, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { IoStar } from 'react-icons/io5'
import CustomButton from '../general/Button'
import { CartIcon, Edit2Icon, SheildIcon, TruckColoredIcon } from '../svg'
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
import useProduct from '@/hooks/useProduct'
import useProductStore from '@/global-state/useCreateProduct'
import { textLimit } from '@/utils/textlimit'

export default function ProductDetails({ id }: { id: string }) {

    const { primaryColor, secondaryBackgroundColor } = useCustomTheme()

    const [item, setItem] = useState({} as IProduct)

    const { back } = useRouter()
    const { userId } = useProduct()
    const { productdata, updateProduct } = useProductStore((state) => state);
    const { push } = useRouter()

    const [ sizeOfText, setSizeOfText ] = useState(200)

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

    const clickHandler = (item: IProduct) => {
        updateProduct({
            ...productdata,
            name: item?.name,
            description: item?.description,
            images: item?.images,
            price: item?.price,
            category: item?.category,
            location: item?.location as any,
            quantity: item?.quantity,
        })
        push("/dashboard/kisok/edit/" + item?.id)
    }

    return (
        <LoadingAnimation loading={isLoading} >
            <Flex pos={"relative"} w={"full"} px={"6"} pt={["6", "6", "6", "6"]} pb={"12"} gap={"6"} flexDir={"column"} overflowY={"auto"} overflowX={"hidden"} >
                  
                <Flex w={"full"} gap={"6"} flexDir={["column", "column", "row"]} >
                    <Flex w={"full"} flexDir={"column"} gap={"4"} >
                        <Flex gap={"1"} alignItems={"center"} >
                            <Text role='button' onClick={() => back()} fontSize={"14px"} fontWeight={"500"} >Home</Text>
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
                                                <Flex key={index} w={"full"} h={["100px", "150px"]} bgColor={"black"} rounded={"8px"} shadow={"md"} >
                                                    <Image src={IMAGE_URL + subitem} alt='logo' w={"full"} rounded={"8px"} height={"full"} objectFit={"cover"} />
                                                </Flex>
                                            )
                                        }
                                    })}
                                </Grid>
                            </Flex>
                        )}
                        <Flex display={["none", "none", "flex"]} >
                            <ProductRating item={item} reviewType="PRODUCT" />
                        </Flex>
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"4"} >
                        <Text fontSize={["24px", "24px", "42px"]} fontWeight={"700"} >{capitalizeFLetter(item?.name)}</Text>
                        <Flex flexDir={["column-reverse", "column-reverse", "column"]} gap={"4"} >
                            <Flex bgColor={secondaryBackgroundColor} p={"4"} rounded={"16px"} flexDirection={"column"} gap={"1"} >
                                <Text fontSize={"14px"} fontWeight={"600"} >Product  Description</Text>
                                <Text fontSize={"12px"} >{textLimit(item.description, sizeOfText)} {item?.description?.length > sizeOfText && ( <span style={{fontWeight: "700"}} role='button' onClick={()=> setSizeOfText((prev)=> prev === item.description?.length ? 200 : item.description?.length)} >{item.description?.length === sizeOfText ? "less" : "more"}</span>)}</Text>
                            </Flex> 
                            <Flex alignItems={"center"} >
                                <Text fontSize={"24px"} fontWeight={"700"} >{formatNumber(item?.price)}</Text>
                            </Flex>
                        </Flex>
                        <Flex gap={"3"} alignItems={"center"} >
                            <UserImage image={item?.creator?.data?.imgMain?.value} size={"32px"} font={"14px"} border={"1px"} data={item?.creator} />
                            <Text fontSize={"12px"} fontWeight={"500"} >Sold by {capitalizeFLetter(item?.creator?.firstName) + " " + capitalizeFLetter(item?.creator?.lastName)}</Text>
                            {userId !== item?.creator?.userId && (
                                <CustomButton text={"Message"} fontSize={"xs"} height={"23px"} width={"89px"} borderRadius={"999px"} />
                            )}
                        </Flex>
                        {userId !== item?.creator?.userId && (
                            <Flex display={["none", "none", "flex"]} >
                                <ProductCheckout item={item} />
                            </Flex>
                        )}
                        {/* {userId === item?.creator?.userId && (
                            <CustomButton onClick={() => clickHandler(item)} text={"Edit Product"} height={"50px"} fontSize={"sm"} width={"200px"} borderRadius={"9999px"} />
                        )} */}

                        <Flex gap={"3"} mt={"4"} >
                            <Flex w={"28px"} h={"28px"} justifyContent={"center"} alignItems={"center"} >
                                <TruckColoredIcon />
                            </Flex>
                            <Text color={"#0CC23A"} fontWeight={"600"} >Shipping on all orders:</Text>
                        </Flex>
                        <Flex flexDir={"column"} gap={"3"} >
                            <Text fontSize={"14px"} fontWeight={"500"} >{`Seller-Fulfilled Shipping - The seller handles the entire shipping process and not Chasescroll.`}</Text>
                            <Text fontSize={"14px"} fontWeight={"500"} >Verify that items are in good condition and meet the expected quality standards before authorizing payment.</Text> 
                            <Text fontSize={"14px"} fontWeight={"500"} >Please inform us if you encounter any issues at support@chasescroll.com</Text> 
                        </Flex>  
                        <Flex display={["flex", "flex", "none"]} >
                            <ProductRating item={item} reviewType="PRODUCT" />
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
