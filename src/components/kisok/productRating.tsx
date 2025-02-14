import useCustomTheme from '@/hooks/useTheme'
import { Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoStar } from 'react-icons/io5'
import ReviewData from './reviewData'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import { IUser } from '@/models/User'
import UserImage from '../sharedComponent/userimage'
import { dateFormat } from '@/utils/dateFormat'


interface IReview {
    "id": any,
    "createdDate": number,
    "lastModifiedBy": any,
    "createdBy": any,
    "lastModifiedDate": number,
    "isDeleted": boolean,
    "status": any,
    "statusCode": number,
    "returnMessage": string,
    "user": IUser
    "description": string,
    "rating": number,
    "reviewType": string
}

export default function ProductRating({ item }: { item: string }) {

    const { borderColor, primaryColor } = useCustomTheme()

    const [data, setItem] = useState<Array<IReview>>([])

    const { isLoading } = useQuery(
        ["review"],
        () => httpService.get(`/reviews/search`, {
            params: {
                typeId: item
            }
        }), {
        onSuccess(data) {
            console.log(data);

            setItem(data?.data?.content)
        }
    });

    return (
        <Flex flex={"1"} flexDir={"column"} gap={"3"} flexDirection={"column"} >
            <Flex maxW={"full"} overflowX={"auto"} >
                <Flex alignItems={"center"} gap={"2"} >
                    <FaStar size={"40px"} color='#EFD414' />
                    <Text fontWeight={"700"} >4.0</Text>
                    <Flex w={"fit-content"} >
                        <Flex w={"8px"} h={"8px"} rounded={"full"} bgColor={borderColor} />
                    </Flex>
                    <Text fontWeight={"700"}>{data?.length} Recommendations</Text>
                    <Text fontSize={"14px"} w={"120px"} fontWeight={"500"} ml={"9"} >See Review</Text>
                    <ReviewData item={item} />
                </Flex>
            </Flex>
            <Flex flexDirection={"column"} pt={"6"} gap={"3"} >
                {data?.map((item, index) => {
                    return (
                        <Flex key={index} flexDir={"column"} gap={"2"} >
                            <Flex alignItems={"center"} gap={"2"} >
                                {/* <Flex rounded={"30px"} roundedTopRight={"0px"} h={"41px"} w={"41px"} bgColor={"blue"} /> */}
                                <UserImage border={"1px"} image={item?.user?.data?.imgMain?.value} data={item?.user} size={"41px"} />
                                <Flex flexDir={"column"} >
                                    <Text fontWeight={"600"} fontSize={"14px"} >Lena Kyles</Text>
                                    <Flex flexDir={"row"} gap={"1"} >
                                        {[1, 2, 3, 4, 5]?.map((itemNumb) => {
                                            return (
                                                <Flex key={itemNumb} >
                                                    {(itemNumb > item?.rating) ? (
                                                        <FaRegStar size={"15px"} />
                                                    ) : (
                                                        <FaStar color='#FBBD08' size={"15px"} />
                                                    )}
                                                </Flex>
                                            )
                                        })}
                                    </Flex>
                                    <Text fontSize={"12px"} >{dateFormat(item?.createdDate)}</Text>
                                </Flex>
                            </Flex>
                            <Text fontSize={"14px"} >{item?.description}</Text>
                        </Flex>
                    )
                })}
            </Flex>
        </Flex>
    )
}
