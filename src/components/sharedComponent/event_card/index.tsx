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
import InterestedUsers from '../interested_users'
import ShareEvent from '../share_event'
import useSearchStore from '@/global-state/useSearchData'
import { useDetails } from '@/global-state/useUserDetails'
import BlurredImage from '../blurred_image'

interface Props {
    event: any,
    page?: boolean,
    draft?: boolean,
    search?: boolean,
    my_event?: boolean,
    searchbar?: boolean,
    date?: boolean,
    profile?: boolean,
    past?: boolean,
    dashboard?: boolean,
}

function ExploreEventCard(props: Props) {
    const {
        event,
        page,
        draft,
        my_event,
        search,
        searchbar,
        date,
        profile,
        past,
        dashboard
    } = props

    const router = useRouter()
    const { updateEvent } = useEventStore((state) => state);
    const { setSearchValue } = useSearchStore((state) => state);

    const { userId, email } = useDetails((state) => state);

    const clickHandler = () => {
        if (!userId && !email) {
            router.push("/event/" + event?.id)
        } else if (draft) {
            router.push("/dashboard/event/edit_draft/" + event?.id)

        } else if (dashboard) {
            router.push("/dashboard/settings/event-dashboard/" + event?.id)
        } else if (past) { 
            router.push("/dashboard/event/pastdetails/" + event?.id)
        } else {
            router.push("/dashboard/event/details/" + event?.id)
        }
        setSearchValue("")
    }

    return (
        <Box boxShadow={page ? "md" : "none"} as='button' onClick={() => clickHandler()} py={searchbar ? "2" : ["6", "6", "4"]} px={["6", "6", "4"]} roundedBottom={"32px"} flex={"1"} roundedTopLeft={"32px"} borderColor={"brand.chasescrollPalePurple"} borderBottomWidth={searchbar ? " " : "1px"} maxWidth={["400px", "400px", "full"]} width={"full"} >
            <Flex flexDirection={["column", "column", page ? "column" : "row"]} width={"full"} flex={"1"} alignItems={"center"} justifyContent={"space-between"} >
                <Box width={["full", "full", "full"]} >

                <BlurredImage height={searchbar ? "80px" : ["230px", "230px", page ? "220px" : my_event ? "180px" : "150px"]} image={event?.currentPicUrl} />
                    {/* <EventImage date={date} data={event} searchbar={searchbar} width={searchbar ? "90px" : ["full", "full", page ? "full" : "230px"]} height={searchbar ? "80px" : ["230px", "230px", page ? "220px" : my_event ? "180px" : "150px"]} /> */}
                </Box>
                <Box width={searchbar ? "full" : ["full", "full", page ? "full" : "full"]} mt={["10px", "10px", page ? "10px" : "0px", page ? "10px" : "0px"]} ml={["0px", "0px", page ? "0px" : "10px", page ? "0px" : "10px"]} >
                    <Flex fontWeight={"semibold"} width={"full"} justifyContent={"space-between"} borderBottomColor={"#D0D4EB"} borderBottom={search ? "1px" : "0px"} pb={"1"} >
                        <Text fontSize={searchbar ? "16px" : "18px"} >{event.eventName?.length >= 17 ? event.eventName.slice(0, 13) + "..." : event.eventName}</Text>
                        <Text fontSize={searchbar ? "14px" : "14px"} >
                            <EventPrice minPrice={event?.minPrice} maxPrice={event?.maxPrice} currency={event?.currency} />
                        </Text>
                    </Flex>
                    {!date && (
                        <Flex alignItems={"center"} width={"full"} mt={searchbar ? "-4px" : "10px"} mb={"4px"} gap={"1"} >
                            <Box width={"fit-content"} >
                                <Box width={searchbar ? "16px" : "20px"} display={"flex"} justifyContent={"center"} alignItems={"center"}  >
                                    <IoCalendarOutline size={searchbar ? "16px" : "20px"} />
                                </Box>
                            </Box>
                            <Text color={"gray.600"} fontSize={searchbar ? "13px" : "16px"} fontWeight={"medium"}>
                                {dateFormat(event.startDate)}
                            </Text>
                        </Flex>
                    )}
                    <Flex alignItems={"center"} width={"full"} pb={"1"} gap={"3"} justifyContent={"space-between"} >
                        <EventLocationDetail iconsize={searchbar ? "16px" : "20px"} fontWeight={"medium"} fontsize={searchbar ? "13px" : page ? "14px" : "16px"} color={"rgba(18, 18, 18, 0.80)"} location={event?.location} locationType={event?.locationType} length={20} />
                        {(!draft && !profile && !my_event) && (
                            <Flex alignItems={"center"} gap={"3"} >
                                <ShareEvent data={event} type="EVENT" size='18px' id={event?.id} />
                                {(userId && email) && (
                                    <SaveOrUnsaveBtn event={event} />
                                )}
                            </Flex>
                        )}
                        {((my_event) && !profile && event?.isOrganizer && !event?.isBought) && (
                            <DeleteEvent draft={draft} event={event} />
                        )}
                        {(draft) && (
                            <DeleteEvent draft={draft} event={event} />
                        )}
                    </Flex>
                    {page && (
                        <InterestedUsers fontSize={14} event={event} border={"2px"} size={"28px"} />
                    )}

                    {my_event && (
                        <Flex justifyContent={"space-between"} gap={"3"} flexDirection={"column"} width={"full"} >
                            <Flex gap={"2"} fontSize={"sm"} alignItems={"center"} >
                                <Text>Category:</Text>
                                <Text color={"brand.chasescrollBlue"} fontWeight={"bold"}  >
                                    {event?.eventType?.replace("_", " ")}
                                </Text>
                            </Flex>
                            <Flex alignItems={"center"} gap={"3"} > 
                                <Flex rounded={"md"} px={"2"} py={"1"} width={"fit-content"} bgColor={"brand.chasescrollBgBlue"} color={"brand.chasescrollBlue"} gap={"2"} fontSize={"sm"} alignItems={"center"} >
                                    {event?.isOrganizer ? "Organizer" : "Attending"}
                                </Flex>
                                {my_event && (
                                    <ShareEvent data={event} type="EVENT" size='18px' id={event?.id} />
                                )}
                            </Flex>
                        </Flex>
                    )}
                </Box>
            </Flex>
        </Box>
    )
}

export default ExploreEventCard
