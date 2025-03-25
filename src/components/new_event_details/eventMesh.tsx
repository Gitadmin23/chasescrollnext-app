import useCustomTheme from '@/hooks/useTheme'
import { Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import ModalLayout from '../sharedComponent/modal_layout'
import { truncate } from 'lodash'
import CustomButton from '../general/Button'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import { IEventType } from '@/models/Event'
import { IUser } from '@/models/User'
import { IProduct } from '@/models/product'
import { textLimit } from '@/utils/textlimit'
import { IMAGE_URL } from '@/services/urls'
import { formatNumber } from '@/utils/numberFormat'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { useRouter } from 'next/navigation'

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

export default function EventMesh({ data }: { data: IEventType }) {

    const { primaryColor } = useCustomTheme()
    const [open, setOpen] = useState(false)

    const { push } = useRouter()

    const [eventData, setEventData] = useState<Array<IProps>>([])


    // react query
    const { isLoading, isRefetching } = useQuery(['all-events-mesh', data?.id], () => httpService.get(`/pin-item/search`, {
        params: {
            typeId: data?.id
        }
    }), {
        onError: (error: any) => {
        },
        onSuccess: (data: any) => {
            setEventData(data?.data)

            console.log(data);

        }
    })

    return (
        <Flex position={"relative"} display={eventData?.length === 0 ? "none" : "flex"} flexDir={"column"} w={"full"} mb={"6"} gap={"3"} >
            <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                <Text fontSize={["14px", "14px", "20px"]} fontWeight={"bold"} >Shop the Summer shoot version 2 store</Text>
                <Text fontSize={"12px"} color={primaryColor} as={"button"} >See all</Text>
            </Flex>
            <Flex w={"full"} height={"180px"} />
            <Flex position={"absolute"} top={["9", "9", "12"]} maxW={"full"} overflowX={"auto"} sx={
                {
                    '::-webkit-scrollbar': {
                        display: "none"
                    }
                }
            } >
                <Flex w={"fit-content"} gap={"2"} >
                    {eventData?.map((item, index) => {
                        return (
                            <Flex key={index} onClick={() => setOpen(true)} w={["170px", "170px", "230px"]} borderWidth={"1px"} borderColor={"#EBEDF0"} flexDir={"column"} gap={"2"} p={"4"} rounded={"16px"} >
                                <Flex w={"full"} h={["101px", "101px", "176px"]} bgColor={"red"} rounded={"8px"} >
                                    <Image alt="logo" src={IMAGE_URL + item?.returnProductDto?.images[0]} />
                                </Flex>
                                <Flex flexDir={"column"} >
                                    <Text fontSize={"14px"} fontWeight={"700"} >{formatNumber(item?.returnProductDto?.price)}</Text>
                                    <Text fontSize={["12px", "12px", "14px"]} >{capitalizeFLetter(textLimit(item?.returnProductDto?.name, 20))}</Text>
                                </Flex>

                                <ModalLayout rounded='16px' size={"sm"} open={open} close={setOpen} closeIcon={true} >
                                    <Flex flexDir={"column"} gap={"2"} p={"4"} >
                                        <Text fontWeight={"600"} >Product Details </Text>
                                        <Flex w={"full"} h={"193px"} rounded={"8px"} bgColor={"red"} >
                                            <Image alt="logo" src={IMAGE_URL + item?.returnProductDto?.images[0]} />
                                        </Flex>
                                        <Text fontSize={"24px"} fontWeight={"600"} >{capitalizeFLetter(textLimit(item?.returnProductDto?.name, 20))}</Text>
                                        <Text fontSize={"14px"} fontWeight={"700"} >{formatNumber(item?.returnProductDto?.price)}</Text>
                                        <Text fontSize={"14px"} fontWeight={"700"} >About this Product</Text>
                                        <Text fontSize={"12px"} >{capitalizeFLetter(textLimit(item?.returnProductDto?.description, 40))}</Text>
                                        <Flex w={"full"} mt={"2"} >
                                            <CustomButton onClick={()=> push(`/dashboard/kisok/details/${item?.returnProductDto?.id}`)} text={"Order Now"} />
                                        </Flex>
                                    </Flex>
                                </ModalLayout>
                            </Flex>
                        )
                    })}
                </Flex>
            </Flex>
        </Flex>
    )
}
