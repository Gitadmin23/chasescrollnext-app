import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { IProduct } from '@/models/product';
import { IMAGE_URL } from '@/services/urls';
import { numberFormatNaire } from '@/utils/formatNumberWithK';
import { textLimit } from '@/utils/textlimit';
import { Flex, Checkbox, Text, Image } from '@chakra-ui/react';
import React, { useState } from 'react'
import LoadingAnimation from '../sharedComponent/loading_animation';
import { IEventType } from '@/models/Event';
import { IPinned } from '@/hooks/useProduct';
import { useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { FaCheckSquare } from 'react-icons/fa';
import useCustomTheme from '@/hooks/useTheme';

interface IProps {
    "id": string,
    "createdDate": number,
    "lastModifiedBy": string,
    "createdBy": string,
    "lastModifiedDate": number,
    "isDeleted": boolean,
    "status": string,
    "statusCode": number,
    "returnMessage": string,
    "typeId": string,
    "pinnedItemType": string,
    "returnProductDto": IProduct
}

export default function ListProduct({ setOpen, selectProduct, setSelectProduct, data }: { setOpen?: any, selectProduct: Array<IPinned>, setSelectProduct: any, data?: IEventType }) {

    const userId = localStorage.getItem('user_id') + "";

    const { primaryColor } = useCustomTheme()

    const { results, isLoading, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({ url: `/products/search?creatorID=${userId}`, limit: 20, filter: "id", name: "getProduct" })

    const selectProductHandler = (dataindex: string) => {

        let myArr: any = [...selectProduct]
        const exists = selectProduct.some((item) => item.productId === dataindex);
        if (exists) {
            var index = myArr.findIndex(function (o: IPinned) {
                return o.productId === dataindex;
            })
            myArr.splice(index, 1);
            setSelectProduct(myArr)
        } else {
            setSelectProduct([...myArr, {
                pinnedItemType: "EVENT",
                typeId: data?.id,
                productId: dataindex
            }])
        }
    }

    // // react query
    // const { isRefetching } = useQuery(['all-events-mesh', data?.id], () => httpService.get(`/pin-item/search`, {
    //     params: {
    //         typeId: data?.id
    //     }
    // }), {
    //     onError: (error: any) => {
    //     },
    //     onSuccess: (data: any) => {
    //         // setEventData() 
    //         // setMeshSize(data?.data?.length) 
    //         {data?.data?.map((item: IProps)=> {
    //             setSelectProduct()
    //         })}
    //     }
    // })


    return (
        <LoadingAnimation loading={isLoading} length={results?.length} >
            <Flex w={"full"} maxH={"300px"} flexDir={"column"} gap={"3"} overflowY={"auto"} pos={"relative"} >
                {results?.map((item: IProduct, index: number) => {
                    if (results?.length === index + 1) {
                        return (
                            <Flex ref={ref} as={"button"} key={index} onClick={() => selectProductHandler(item?.id)} w={"full"} borderWidth={"1px"} alignItems={"center"} borderColor={"#EBEDF0"} gap={"2"} p={"4"} rounded={"16px"} >
                                <Flex width={"fit-content"} >
                                    <Flex w={"79px"} h={["79px"]} bgColor={"gray"} rounded={"8px"} >
                                        <Image alt='prod' src={IMAGE_URL + item?.images[0]} rounded={"8px"} />
                                    </Flex>
                                </Flex>
                                <Flex flexDir={"column"} gap={"2px"} >
                                    <Text fontSize={["14px"]} fontWeight={"600"} >{textLimit(item?.name, 20)}</Text>
                                    <Text fontSize={["10px", "10px", "10px"]} >{textLimit(item?.description, 30)}</Text>
                                    <Text fontSize={"12px"} fontWeight={"700"} >{numberFormatNaire(item?.price)}</Text>
                                </Flex>
                                <Flex ml={"auto"} >
                                    {selectProduct.some((items) => items.productId === item?.id) ? (
                                        <FaCheckSquare color={primaryColor} size={"20px"} />
                                    ) : (
                                        <Flex w={"5"} h={"5"} rounded={"5px"} borderWidth={"2px"} />
                                    )}
                                    {/* <Checkbox size={"lg"} onChange={() => selectProductHandler(item?.id)} isChecked={selectProduct.some((items) => items.productId === item?.id)} /> */}
                                </Flex>
                            </Flex>
                        )
                    } else {
                        return (
                            <Flex as={"button"} key={index} onClick={() => selectProductHandler(item?.id)} w={"full"} borderWidth={"1px"} alignItems={"center"} borderColor={"#EBEDF0"} gap={"2"} p={"4"} rounded={"16px"} >
                                <Flex width={"fit-content"} >
                                    <Flex w={"79px"} h={["79px"]} bgColor={"gray"} rounded={"8px"} >
                                        <Image alt='prod' src={IMAGE_URL + item?.images[0]} rounded={"8px"} />
                                    </Flex>
                                </Flex>
                                <Flex flexDir={"column"} gap={"2px"} >
                                    <Text fontSize={["14px"]} fontWeight={"600"} >{textLimit(item?.name, 20)}</Text>
                                    <Text fontSize={["10px", "10px", "10px"]} >{textLimit(item?.description, 30)}</Text>
                                    <Text fontSize={"12px"} fontWeight={"700"} >{numberFormatNaire(item?.price)}</Text>
                                </Flex>
                                <Flex ml={"auto"} >
                                    {selectProduct.some((items) => items.productId === item?.id) ? (
                                        <FaCheckSquare color={primaryColor} size={"20px"} />
                                    ) : (
                                        <Flex w={"5"} h={"5"} rounded={"5px"} borderWidth={"2px"} />
                                    )}
                                    {/* <Checkbox size={"lg"} onChange={() => selectProductHandler(item?.id)} isChecked={selectProduct.some((items) => items.productId === item?.id)} /> */}
                                </Flex>
                            </Flex>
                        )
                    }
                })}
            </Flex>
        </LoadingAnimation>
    )
}
