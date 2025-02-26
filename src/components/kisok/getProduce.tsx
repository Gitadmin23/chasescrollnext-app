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
import { textLimit } from '@/utils/textlimit'
import { IMAGE_URL } from '@/services/urls'
import useProductStore from '@/global-state/useCreateProduct'

export default function GetProduct({ myproduct }: { myproduct?: boolean }) {

    const { primaryColor, bodyTextColor, borderColor, secondaryBackgroundColor } = useCustomTheme()
    const { productdata, updateProduct } = useProductStore((state) => state);
    const { push } = useRouter()
    const userId = localStorage.getItem('user_id') + "";

    const { results, isLoading, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({ url: `/products/search${myproduct ? `?creatorID=${userId}` : ``}`, limit: 20, filter: "id", name: "getProduct" })

    const clickHandler = (item: IProduct) => {
        console.log(item);

        if (myproduct) {
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
        } else {
            push("/dashboard/kisok/details/" + item?.id)
        }
    }

    return (
        <LoadingAnimation loading={isLoading} length={results?.length} >
            <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} gap={["4", "4", "6"]} >
                {results?.map((item: IProduct, index: number) => {
                    if (results?.length === index + 1) {
                        return (
                            <Flex as={"button"} alignItems="start" onClick={() => clickHandler(item)} key={index} p={["0px", "0px", "4"]} borderWidth={["0px", "0px", "1px"]} borderColor={borderColor} w={"full"} h={"fit-content"} flexDir={"column"} bgColor={"white"} rounded={"16px"} pb={"5"} gap={"4"} >
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
                                <Flex w={"full"} h={"210px"} bgColor={secondaryBackgroundColor} justifyContent={"center"} rounded={"8px"} >
                                    <Image rounded={"8px"} borderColor={"#D0D4EB"} objectFit={"contain"} alt={item?.images[0]} borderWidth={"1px"} width={["auto"]} height={"full"} src={IMAGE_URL + item?.images[0]} />
                                </Flex>
                                <Flex w={"full"} h={"fit-content"} flexDir={"column"} gap={2} px={"2"} >
                                    <Text fontSize={["14px", "14px", "24px"]} fontWeight={"600"} textAlign={"left"} display={["none", "none", "block"]} >{capitalizeFLetter(item?.name)}</Text>
                                    <Text fontSize={["14px", "14px", "24px"]} fontWeight={"600"} textAlign={"left"} display={["block", "block", "none"]} >{textLimit(capitalizeFLetter(item?.name), 16)}</Text>
                                    <Flex alignItems={"center"} >
                                        <Text fontSize={["14px", "14px", "16px"]} fontWeight={"700"} color={bodyTextColor} >{formatNumber(item?.price)}</Text>
                                        <Text fontSize={"12px"} ml={"auto"} color={bodyTextColor} >{item?.quantity} Available</Text>
                                    </Flex>
                                    <Flex w={"full"} gap={"2"} alignItems={"center"} >
                                        <LocationStroke />
                                        <Text fontSize={["10px", "14px", "14px"]} fontWeight={"500"} color={bodyTextColor} display={["none", "none", "block"]} >{textLimit(item?.location?.locationDetails, 40)}</Text>
                                        <Text fontSize={["10px", "14px", "14px"]} fontWeight={"500"} color={bodyTextColor} display={["block", "block", "none"]} >{textLimit(item?.location?.locationDetails, 15)}</Text>
                                    </Flex>
                                    <Flex display={["none", "none", "flex"]} >
                                        <CustomButton onClick={() => clickHandler(item)} text={myproduct ? "Edit Product" : "Order Now"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                                    </Flex>
                                </Flex>
                            </Flex>
                        )
                    } else {
                        return (
                            <Flex as={"button"} alignItems="start" onClick={() => clickHandler(item)} key={index} p={["0px", "0px", "4"]} borderWidth={["0px", "0px", "1px"]} borderColor={borderColor} w={"full"} h={"fit-content"} flexDir={"column"} bgColor={"white"} rounded={"16px"} pb={"5"} gap={"4"} >
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
                                <Flex w={"full"} h={"210px"} bgColor={secondaryBackgroundColor} justifyContent={"center"} rounded={"8px"} >
                                    <Image rounded={"8px"} borderColor={"#D0D4EB"} objectFit={"contain"} alt={item?.images[0]} borderWidth={"1px"} width={["auto"]} height={"full"} src={IMAGE_URL + item?.images[0]} />
                                </Flex>
                                <Flex w={"full"} h={"fit-content"} flexDir={"column"} gap={2} px={"2"} >
                                    <Text fontSize={["14px", "14px", "24px"]} fontWeight={"600"} textAlign={"left"} display={["none", "none", "block"]} >{capitalizeFLetter(item?.name)}</Text>
                                    <Text fontSize={["14px", "14px", "24px"]} fontWeight={"600"} textAlign={"left"} display={["block", "block", "none"]} >{textLimit(capitalizeFLetter(item?.name), 16)}</Text>
                                    <Flex alignItems={"center"} >
                                        <Text fontSize={["14px", "14px", "16px"]} fontWeight={"700"} color={bodyTextColor} >{formatNumber(item?.price)}</Text>
                                        <Text fontSize={"12px"} ml={"auto"} color={bodyTextColor} >{item?.quantity} Available</Text>
                                    </Flex>
                                    <Flex w={"full"} gap={"2"} alignItems={"center"} >
                                        <LocationStroke />
                                        <Text fontSize={["10px", "14px", "14px"]} fontWeight={"500"} color={bodyTextColor} display={["none", "none", "block"]} >{textLimit(item?.location?.locationDetails, 40)}</Text>
                                        <Text fontSize={["10px", "14px", "14px"]} fontWeight={"500"} color={bodyTextColor} display={["block", "block", "none"]} >{textLimit(item?.location?.locationDetails, 15)}</Text>
                                    </Flex>
                                    <Flex display={["none", "none", "flex"]} >
                                        <CustomButton onClick={() => clickHandler(item)} text={myproduct ? "Edit Product" : "Order Now"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
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
