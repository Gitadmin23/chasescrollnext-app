import useCustomTheme from '@/hooks/useTheme';
import { IEventType } from '@/models/Event'
import { textLimit } from '@/utils/textlimit';
import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react'
import React from 'react'
import { MdArrowBackIos } from 'react-icons/md';
import BlurredImage from '../sharedComponent/blurred_image';
import ShareEvent from '../sharedComponent/share_event';
import { useDetails } from '@/global-state/useUserDetails';
import { usePathname, useRouter } from 'next/navigation';
import { dateFormat, timeFormat } from '@/utils/dateFormat';
import InterestedUsers from '../sharedComponent/interested_users';
import { CalendarIcon, LinkIcon } from '../svg';
import EventLocation from './eventLocation';
import EventMap from '../event_details_component/event_map_info';
import EventCreator from './eventCreator';
import SaveOrUnsaveBtn from '../sharedComponent/save_unsave_event_btn';
import useModalStore from '@/global-state/useModalSwitch';
import SelectTicket from './selectEventTicket';
import GetEventTicket from './getEventBtn';
import OrganizeBtn from './organizeBtn';



export default function EventDetail(props: IEventType) {

    const {
        eventName,
        eventDescription,
        startDate,
        location,
        id,
        currency,
        productTypeData,
        eventType,
        isBought,
        isOrganizer
    } = props

    const {
        headerTextColor,
        primaryColor,
        mainBackgroundColor,
        secondaryBackgroundColor
    } = useCustomTheme();

    const router = useRouter()
    const pathname = usePathname()

    const { userId, email } = useDetails((state) => state);

    const clickHander = () => {
        if (!email && !userId) {
            router.push("/")
        } else {
            router.back()
        }
    }

    console.log(props);



    return (
        <Flex w={"full"} flexDir={"column"} gap={["6", "6", "6", "10", "10"]} pos={"relative"} >
            <Flex w={"full"} display={["flex", "flex", "flex"]} pos={"relative"} justifyContent={"center"} alignItems={"center"} >
                <Box as='button' position={"absolute"} left={"0px"} onClick={() => clickHander()}>
                    <MdArrowBackIos color={headerTextColor} size={"24px"} />
                </Box>
                <Text color={headerTextColor} fontWeight={"semibold"} fontSize={"24px"} lineHeight={"22px"} >{pathname?.includes("past") ? "Past Event Details" : "Event Details"}</Text>
            </Flex>
            <Flex width={"full"} alignItems={"start"} position={"relative"} justifyContent={"center"} >
                <Box height={["230px", "230px", "400px"]} px={["4", "4", "0px"]} mt={["4", "4", "0px"]} position={"relative"} width={"full"} rounded={"16px"} roundedTopRight={"none"} >
                    <BlurredImage height={["230px", "230px", "400px"]} image={props?.currentPicUrl} />
                </Box>
            </Flex>
            <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                <Button color={headerTextColor} fontSize={"12px"} w={"112px"} bgColor={"#233DF30D"} rounded={"32px"} h={"38px"} >
                    Trending
                </Button>
                {!pathname?.includes("past") && (
                    <Flex w={"fit-content"} h={"fit-content"} gap={"4"} pt={"10"} >
                        <SaveOrUnsaveBtn color={headerTextColor} event={props} size='20' />
                        <ShareEvent newbtn={true} showText={false} data={props} id={id} type="EVENT" eventName={textLimit(eventName, 17)} />
                    </Flex>
                )}
            </Flex>
            <Flex flexDirection={["column", "column", "column", "row", "row"]} w={"full"} gap={["6", "6", "6", "10", "10"]} >
                <Flex w={"full"} flexDir={"column"} gap={"5"} >

                    <EventCreator {...props} />
                    <Flex w={"full"} justifyContent={"space-between"} >
                        {/* <Text >{dateFormat(startDate)}</Text> */}

                        {/* Event Name */}
                        <Text fontSize={"32px"} fontWeight={"semibold"} >{eventName}</Text>
                        {props?.attendeesVisibility && (
                            <InterestedUsers fontSize={16} event={props} border={"2px"} size={"38px"} refund={true} />
                        )}
                    </Flex>


                    {/* Event Description */}
                    <Flex flexDir={"column"} >
                        <Text fontSize={"16px"} fontWeight={"medium"} >Event Description</Text>
                        <Text fontSize={"14px"} >{eventDescription}</Text>
                    </Flex>

                    <Flex w={"full"} flexDirection={["column", "column", "row", "row", "row"]} gap={"8"} >

                        {/* Event Date */}
                        <Flex w={"full"} flexDir={"column"} gap={"2"} >
                            <Text fontSize={"16px"} fontWeight={"medium"} >Event Date & Time</Text>
                            <Flex alignItems={"center"} gap={"2"} >
                                <Flex w={"fit-content"} >
                                    <Flex w={"8"} h={"8"} color={primaryColor} justifyContent={"center"} alignItems={"center"} >
                                        <CalendarIcon />
                                    </Flex>
                                </Flex>
                                <Text fontSize={"14px"} >{dateFormat(startDate)} {timeFormat(startDate)} ({new Date(startDate).toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2]}) </Text>
                            </Flex>
                        </Flex>

                        {/* Event Location */}
                        {(location?.locationDetails || location?.toBeAnnounced) && (
                            <EventLocation {...props} />
                        )}

                    </Flex>

                    {/* Event Online link */}
                    {/* {(location?.link && isBought && isOrganizer) && ( */}
                    {(location?.link) && (
                        <Flex w={"full"} flexDir={"column"} gap={"2"} >
                            <Text fontSize={"16px"} fontWeight={"medium"} >Join Online</Text>
                            <Flex alignItems={"center"} gap={"2"} >
                                <Flex w={"fit-content"} >
                                    <Flex w={"8"} h={"8"} color={primaryColor} justifyContent={"center"} alignItems={"center"} >
                                        <LinkIcon />
                                    </Flex>
                                </Flex>
                                {isBought && (
                                    <a href={location?.link}  >
                                        <Text fontSize={"14px"} color={primaryColor} >{location?.link}</Text>
                                    </a>
                                )}
                                {!isBought && (
                                    <Text fontSize={"14px"} color={primaryColor} >Register To View Link</Text>
                                )}
                            </Flex>
                        </Flex>
                    )}
                    {/* </Grid> */}
                    {location?.address && (
                        <Flex w={"full"} flexDir={"column"} gap={"2"} >
                            <Text fontSize={"16px"} fontWeight={"medium"} >About this Event</Text>
                            <Text fontSize={"14px"} >{location?.address}</Text>
                        </Flex>
                    )}
                </Flex>
                <Flex maxW={["full", "full", "full", "430px", "430px"]} flexDir={"column"} gap={"6"} w={"full"} >

                    <Flex display={["none", "none", "none", "flex", "flex"]} bg={mainBackgroundColor} zIndex={"50"} pos={["sticky", "sticky", "sticky", "relative", "relative"]} bottom={"0px"} w={"full"} mt={"8"} flexDir={"column"} rounded={"16px"} gap={"3"} p={"3"} borderWidth={(pathname?.includes("past") && !isOrganizer) ? "0px" : "1px"} borderColor={"#DEDEDE"} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
                        {(!pathname?.includes("past") || isOrganizer) && (
                            <Text fontWeight={"600"} fontSize={"18px"} >{(isOrganizer) ? " " : "Ticket  Available"}</Text>
                        )}
                        {(!isBought && !isOrganizer && !pathname?.includes("past")) && (
                            <SelectTicket data={props} currency={currency} ticket={productTypeData} />
                        )}
                        {(!isOrganizer && !pathname?.includes("past")) && (
                            <GetEventTicket {...props} />
                        )}
                        {isOrganizer && (
                            <OrganizeBtn {...props} />
                        )}
                    </Flex>
                    <Flex flexDir={"column"} gap={"4"} >
                        <Text fontWeight={"medium"} >Tags</Text>
                        <Button color={headerTextColor} fontSize={"12px"} w={"fit-content"} px={"3"} bgColor={secondaryBackgroundColor} rounded={"32px"} h={"38px"} >
                            {eventType?.replace("_", " ")}
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
            <EventMap height={"350px"} latlng={location?.latlng ?? ""} />

            <Flex display={["flex", "flex", "flex", "none", "none"]} pos={["sticky", "sticky", "sticky", "relative", "relative"]} bgColor={mainBackgroundColor} bottom={"0px"} w={"full"} mt={"8"} flexDir={"column"} rounded={"16px"} gap={"3"} p={"3"} style={{ border: "1px solid #DEDEDE", boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
                {(!pathname?.includes("past") || isOrganizer) && (
                    <Text fontWeight={"600"} fontSize={"18px"} >{(isOrganizer) ? " " : "Ticket  Available"}</Text>
                )}
                {(!pathname?.includes("past") || isOrganizer) && (
                    <Text fontWeight={"600"} fontSize={"18px"} >{(isOrganizer) ? " " : "Ticket  Available"}</Text>
                )}
                {(!isBought && !isOrganizer && !pathname?.includes("past")) && (
                    <SelectTicket data={props} currency={currency} ticket={productTypeData} />
                )}
                {(!isOrganizer && !pathname?.includes("past")) && (
                    <GetEventTicket {...props} />
                )}
                {isOrganizer && (
                    <OrganizeBtn {...props} />
                )}
            </Flex>
        </Flex>
    )
}