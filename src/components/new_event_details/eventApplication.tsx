import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import StarRating from '../sharedComponent/StarRating'
import useCustomTheme from '@/hooks/useTheme'
import CustomButton from '../general/Button'
import { IUser } from '@/models/User'
import { IService } from '@/models/Service'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import moment from 'moment'
import { formatNumber } from '@/utils/numberFormat'
import LoadingAnimation from '../sharedComponent/loading_animation'
import { IRental } from '@/models/product'
import { useRouter } from 'next/navigation'

interface IApplication {
    "id": string,
    "createdDate": number,
    "lastModifiedBy": any,
    "createdBy": IUser,
    "lastModifiedDate": number,
    "isDeleted": boolean,
    "status": any,
    "statusCode": number,
    "returnMessage": string,
    "vendor": IUser,
    "service": IService,
    "rental": IRental,
    "eventOrganizer": IUser,
    "applicationStatus": string,
    "applicationType": string
}

export default function EventApplication({ id, type }: { id: string, type?: "SERVICE" | "RENTAL" }) {

    const { primaryColor, mainBackgroundColor, borderColor, headerTextColor } = useCustomTheme()

    const { results, isLoading, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({
        url: `/event-application/search?eventID=${id}&applicationType=${type}`, limit: 20, filter: "id", name: "event-application"
    })

    const { push } = useRouter()

    const clickHandler = (item: string) => {
        if(type === "SERVICE") {
            push(`/dashboard/kisok/service/${item}`)
        } else {
            push(`/dashboard/kisok/details-rental/${item}`)
        }
    }

    return (
        <LoadingAnimation loading={isLoading} length={results?.length} >
            <>
                {type === "SERVICE" && ( 
                    <Flex flexDir={"column"} w={"full"} gap={"3"} >
                        {results?.map((item: IApplication, index: number) => {
                            return (
                                <Flex key={index} flexDir={"column"} gap={"2"} >
                                    <Text fontSize={"18px"} fontWeight={"600"} >{capitalizeFLetter(item?.vendor?.firstName + " " + item?.vendor?.lastName)}</Text>
                                    <Flex gap={"2"} flexDir={"row"} alignItems={"center"} >
                                        <Text fontSize={"14px"} fontWeight={"700"} >{item?.service?.rating}</Text>
                                        <StarRating rate={Number(item?.service?.rating)} />
                                        <Text fontSize={"14px"} >Open <span style={{ color: primaryColor }} >{item?.service?.state}</span></Text>
                                    </Flex>
                                    <Flex w={"full"} pl={"3"} bgColor={primaryColor} rounded={"16px"} h={"fit-content"} borderWidth={"1px"} borderColor={borderColor} >
                                        <Flex w={"full"} bgColor={mainBackgroundColor} justifyContent={"space-between"} h={"117px"} alignItems={"center"} px={"5"} roundedLeft={"0px"} roundedRight={"16px"} >
                                            <Flex flexDir={"column"} fontSize={"14px"} >
                                                <Text fontWeight={"500"} >{capitalizeFLetter(item?.service?.name)}</Text>
                                                <Text>{moment(item?.createdDate)?.fromNow()}</Text>
                                                <Text fontWeight={"500"} >{formatNumber(item?.service?.price)}</Text>
                                            </Flex>
                                            <CustomButton text={"Book Now"} onClick={()=> clickHandler(item?.id)} width={"120px"} borderRadius={"32px"} borderWidth={"1px"} fontSize={"14px"} borderColor={borderColor} height={"40px"} color={headerTextColor} backgroundColor={mainBackgroundColor} />
                                        </Flex>
                                    </Flex>
                                </Flex>
                            )
                        })}
                    </Flex>
                )}
                {type === "RENTAL" && ( 
                    <Flex flexDir={"column"} w={"full"} gap={"3"} >
                        {results?.map((item: IApplication, index: number) => {
                            return (
                                <Flex key={index} flexDir={"column"} gap={"2"} >
                                    <Text fontSize={"18px"} fontWeight={"600"} >{capitalizeFLetter(item?.vendor?.firstName + " " + item?.vendor?.lastName)}</Text>
                                    <Flex gap={"2"} flexDir={"row"} alignItems={"center"} >
                                        <Text fontSize={"14px"} fontWeight={"700"} >{0}</Text>
                                        <StarRating rate={Number(0)} />
                                        <Text fontSize={"14px"} >Open <span style={{ color: primaryColor }} >{item?.rental?.location?.state}</span></Text>
                                    </Flex>
                                    <Flex w={"full"} pl={"3"} bgColor={primaryColor} rounded={"16px"} h={"fit-content"} borderWidth={"1px"} borderColor={borderColor} >
                                        <Flex w={"full"} bgColor={mainBackgroundColor} justifyContent={"space-between"} h={"117px"} alignItems={"center"} px={"5"} roundedLeft={"0px"} roundedRight={"16px"} >
                                            <Flex flexDir={"column"} fontSize={"14px"} >
                                                <Text fontWeight={"500"} >{capitalizeFLetter(item?.rental?.name)}</Text>
                                                <Text>{moment(item?.createdDate)?.fromNow()}</Text>
                                                <Text fontWeight={"500"} >{formatNumber(item?.rental?.price)}</Text>
                                            </Flex>
                                            <CustomButton text={"Book Now"} onClick={()=> clickHandler(item?.id)} width={"120px"} borderRadius={"32px"} borderWidth={"1px"} fontSize={"14px"} borderColor={borderColor} height={"40px"} color={headerTextColor} backgroundColor={mainBackgroundColor} />
                                        </Flex>
                                    </Flex>
                                </Flex>
                            )
                        })}
                    </Flex>
                )}
            </>
        </LoadingAnimation>
    )
}
