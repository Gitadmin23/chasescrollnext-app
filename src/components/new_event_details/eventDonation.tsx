import useCustomTheme from '@/hooks/useTheme'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import DonationGraph from '../donation/donationGraph'
import { IDonation, IDonationList } from '@/models/donation'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit'
import CustomButton from '../general/Button'
import { IEventType } from '@/models/Event'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import { IMAGE_URL } from '@/services/urls'
import ShareEvent from '../sharedComponent/share_event'
import DonationBtn from '../donation/donationBtn'

export default function EventDonation({ checkbox, item }: { checkbox?: boolean, item: IEventType }) {

    const { borderColor, bodyTextColor, secondaryBackgroundColor } = useCustomTheme()

    const [eventData, setEventData] = useState({} as {
        "id": string,
        "createdDate": number,
        "lastModifiedBy": string,
        "createdBy": string,
        "lastModifiedDate": number,
        "isDeleted": boolean,
        "status": string,
        "statusCode": number,
        "returnMessage": string,
        "user": string,
        "fundRaiser": IDonationList,
        "eventID": string
    })


    // react query
    const { isLoading, isRefetching } = useQuery(['all-donation', item?.id], () => httpService.get(`/pinned-fundraisers/get-pinned-event-fundraising/${item?.id}`, {
        params: {
            id: item?.id
        }
    }), {
        onError: (error: any) => {
        },
        onSuccess: (data: any) => {
            setEventData(data?.data[0])

            console.log(data);

        }
    })


    return (
        <Flex role="button" display={eventData?.fundRaiser?.name ? "flex" : "none"} flexDir={["row"]} w={"full"} rounded={"16px"} gap={["2", "2", "4"]} borderWidth={"1px"} borderColor={borderColor} px={["2", "2", "4"]} py={"4"} alignItems={"center"} >
            <Flex w={"fit-content"} >
                <Flex w={["80px", "80px", "150px"]} height={["80px", "80px", "150px"]} bgColor={secondaryBackgroundColor} rounded={"8px"} borderWidth={"1px"} borderColor={borderColor} >
                    <Image rounded={"8px"} objectFit="cover" alt={eventData?.fundRaiser?.name} width={"full"} height={["80px", "80px", "150px"]} src={IMAGE_URL + eventData?.fundRaiser?.bannerImage} />
                </Flex>
            </Flex>
            <Flex w={"full"} flexDir={"column"} gap={2} pr={"3"} >
                <Flex w={"full"} justifyContent={"space-between"} gap={"3"} alignItems={"center"} >
                    <Flex flexDir={"column"} >
                        <Text fontSize={["10px", "10px", "12px"]} color={bodyTextColor} >Fundraising</Text>
                        <Text fontWeight={"600"} fontSize={["12px", "12px", "14px"]} >{textLimit(capitalizeFLetter(eventData?.fundRaiser?.name), 30)}</Text>
                    </Flex>
                    <ShareEvent newbtn={true} showText={false} size='20px' data={eventData?.fundRaiser} id={eventData?.fundRaiser?.id} type="EVENT" eventName={textLimit(eventData?.fundRaiser?.name, 17)} />
                </Flex>
                <DonationGraph item={eventData?.fundRaiser} IsEvent={true} />
            </Flex>
            {!checkbox && (
                <DonationBtn item={eventData?.fundRaiser} user={eventData?.fundRaiser?.createdBy} event={true} />
            )}

        </Flex>
    )
}