import EventLocationDetail from '@/components/sharedComponent/event_location'
import EventImage from '@/components/sharedComponent/eventimage'
import SaveOrUnsaveBtn from '@/components/sharedComponent/save_unsave_event_btn'
import { dateFormat } from '@/utils/dateFormat'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoCalendarOutline } from "react-icons/io5";
import EventPrice from '../event_price'
import DeleteEvent from '../delete_event'
import useEventStore from '@/global-state/useCreateEventState'

interface Props {
    event: any,
    page?: boolean,
    draft?: boolean,
    my_event?: boolean
}

function ExploreEventCard(props: Props) {
    const {
        event,
        page,
        draft,
        my_event
    } = props

    const router = useRouter()
    const { updateEvent } = useEventStore((state) => state);

    const clickHandler = () => {
        if (draft) {
            updateEvent({
                id: event?.id,
                picUrls: event?.picUrls,
                eventType: event?.eventType,
                eventName: event?.eventName,
                eventDescription: event?.eventDescription,
                joinSetting: event?.joinSetting,
                locationType: event?.locationType,
                currency: event?.currency,
                currentPicUrl: event?.currentPicUrl,
                eventFunnelGroupID: event?.eventFunnelGroupID,
                mediaType: event?.mediaType,
                currentVideoUrl: event?.currentVideoUrl,
                isPublic: event?.isPublic,
                isExclusive: event?.isExclusive,
                mask: event?.mask,
                attendeesVisibility: event?.attendeesVisibility,
                minPrice: event?.minPrice,
                maxPrice: event?.maxPrice,
                startTime: event?.startTime,
                endTime: event?.endTime,
                startDate: event?.startDate,
                endDate: event?.endDate,
                // expirationDate: "",
                location: event?.location,
                productTypeData: event?.productTypeData,
            })
            router.push("/dashboard/event/create_event")
        } else {
            router.push("/dashboard/event/details/" + event?.id)
        }
    }

    return (
        <Box py={["6", "6", "4"]} px={["6", "6", "4"]} roundedBottom={"32px"} flex={"1"} roundedTopLeft={"32px"} borderColor={"brand.chasescrollPalePurple"} borderWidth={"1px"} width={"full"} >
            <Flex flexDirection={["column", "column", "row"]} width={"full"} flex={"1"} alignItems={"center"} justifyContent={"space-between"} >
                <Box as='button' onClick={() => clickHandler()} width={["full", "full", "fit-content"]} >
                    <EventImage data={event} width={["full", "full", page ? "170px" : "230px"]} height={["200px", "200px", "180px"]} />
                </Box>
                <Box width={["full", "full", page ? "full" : "250px"]} mt={["10px", "10px", "0px"]} ml={["0px", "0px", "10px"]} >
                    <Flex as="button" onClick={() => clickHandler()} fontWeight={"semibold"} width={"full"} justifyContent={"space-between"} borderBottomColor={"#D0D4EB"} borderBottom={"1px"} pb={"1"} >
                        <Text fontSize={"18px"} >{event.eventName?.length >= 17 ? event.eventName.slice(0, 17) + "..." : event.eventName}</Text>
                        <Text fontSize={"16px"} >
                            <EventPrice minPrice={event?.minPrice} maxPrice={event?.maxPrice} currency={event?.currency} />
                        </Text>
                    </Flex>
                    <Flex alignItems={"center"} width={"full"} mt={"23px"} mb={"6px"} gap={"1"} >
                        <IoCalendarOutline size={"20px"} />
                        <Text color={"gray.600"} fontSize={"16px"} fontWeight={"medium"}>
                            {dateFormat(event.startDate)}
                        </Text>
                    </Flex>
                    <Flex alignItems={"center"} width={"full"} gap={"3"} justifyContent={"space-between"} >
                        <EventLocationDetail fontsize={"16px"} color={"brand.chasescrollBlue"} location={event?.location} locationType={event?.locationType} length={20} />
                        {(!draft && !my_event) && (
                            <SaveOrUnsaveBtn event={event} />
                        )}
                        {(draft || my_event) && (
                            <DeleteEvent event={event} />
                        )}
                    </Flex>
                    {my_event && (
                        <Flex alignItems={"center"} py={"6px"} fontSize={"sm"} width={"full"} gap={"3"} justifyContent={"space-between"} >
                            <Text fontWeight={"medium"} color={"brand.chasescrollLightGrey2"} >Category: <span style={{color: "#5D70F9", fontWeight: "bold"}} >{event?.eventType?.replaceAll("_", " ")}</span></Text>
                            <Text bg={"brand.chasescrollBgBlue"} color={"brand.chasescrollBlue"} py={"1"} px={"2"} rounded={"md"} >{event?.isOrganizer ? "Organizer" : "Attending"}</Text>
                        </Flex>
                    )} 
                </Box>
            </Flex>
        </Box>
    )
}

export default ExploreEventCard
