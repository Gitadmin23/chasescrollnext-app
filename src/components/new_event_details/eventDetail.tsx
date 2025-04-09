import useCustomTheme from '@/hooks/useTheme';
import { IEventType } from '@/models/Event'
import { textLimit } from '@/utils/textlimit';
import { Box, Button, Flex, Grid, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdArrowBackIos } from 'react-icons/md';
import BlurredImage from '../sharedComponent/blurred_image';
import ShareEvent from '../sharedComponent/share_event';
import { useDetails } from '@/global-state/useUserDetails';
import { usePathname, useRouter } from 'next/navigation';
import { dateFormat, timeFormat } from '@/utils/dateFormat';
import InterestedUsers from '../sharedComponent/interested_users';
import { CalendarIcon, LinkIcon, LocationIcon_2, LocationPin, LocationStroke } from '../svg';
import EventLocation from './eventLocation';
import EventMap from '../event_details_component/event_map_info';
import EventCreator from './eventCreator';
import SaveOrUnsaveBtn from '../sharedComponent/save_unsave_event_btn';
import useModalStore from '@/global-state/useModalSwitch';
import SelectTicket from './selectEventTicket';
import GetEventTicket from './getEventBtn';
import OrganizeBtn from './organizeBtn';
import DonationBtn from './donationBtn';
import EventPrice from '../sharedComponent/event_price';
import PrBtn from './prBtn';
import OrganizerPrBtn from './organizerPrBtn';
import EventMesh from './eventMesh';
import EventDonation from './eventDonation';
import VolunteerBtn from './volunteerBtn';
import useGetPr from '@/hooks/useGetPr';
import DescriptionPage from '../sharedComponent/descriptionPage';
import LoadingAnimation from '../sharedComponent/loading_animation';
import { IoIosArrowForward } from 'react-icons/io';
import { IMAGE_URL } from '@/services/urls';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import ViewRequest from './viewRequest';
import InviteCollaborator from './inviteCollaborator';
import EventLocationDetail from '../sharedComponent/event_location';



export default function EventDetail(props: IEventType) {

    const {
        eventName,
        eventDescription,
        startDate,
        endDate,
        location,
        id,
        currency,
        productTypeData,
        eventType,
        isBought,
        isOrganizer,
        maxPrice,
        eventMemberRole,
        donationEnabled
    } = props

    const {
        headerTextColor,
        primaryColor,
        mainBackgroundColor,
        secondaryBackgroundColor,
        borderColor
    } = useCustomTheme();

    const { push, back } = useRouter()
    const pathname = usePathname()

    const isAdmin = isOrganizer || eventMemberRole === "ADMIN" || eventMemberRole === "COLLABORATOR"
    const isUser = !isOrganizer && eventMemberRole !== "ADMIN" || eventMemberRole !== "COLLABORATOR"

    const [show, setShow] = useState(false)
    const [meshSize, setMeshSize] = useState(0)

    const handerTicket = () => {
        setShow(true)
        push("/")
    }

    const { userId, email } = useDetails((state) => state);

    const clickHander = () => {
        if (!email && !userId) {
            push("/")
        } else {
            back()
        }
    }


    const { data: prId } = useGetPr(props?.id)

    return (
        <Flex w={"full"} flexDir={"column"} pos={"relative"} gap={"4"} px={["0px", "0px", "6"]} pb={["400px", "400px", "6"]} py={"6"} >

            <Flex gap={"1"} alignItems={"center"} pb={"3"} >
                <Text role='button' onClick={() => back()} fontSize={"14px"} color={primaryColor} fontWeight={"500"} >Back</Text>
                <IoIosArrowForward />
                <Text fontSize={"14px"} fontWeight={"500"} >Event details</Text>
                <IoIosArrowForward />
                <Text fontSize={"14px"} fontWeight={"500"} >{eventName}</Text>
            </Flex>
            <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                <Flex w={"full"} flexDir={"column"} gap={"4"} >
                    <Flex borderWidth={"1px"} borderColor={borderColor} position={"relative"} w={"full"} h={["340px", "340px", "520px"]} pos={"relative"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor} rounded={"8px"} px={"1"} py={["1", "1", "3"]} >
                        <Image src={IMAGE_URL + props?.picUrls} alt='logo' rounded={"8px"} height={"full"} objectFit={"contain"} />

                        {!pathname?.includes("past") && (
                            <Flex pos={"absolute"} bottom={"6"} right={"6"} zIndex={"50"} w={"fit-content"} h={"fit-content"} gap={"4"} p={"5px"} px={"2"} rounded={"full"} bgColor={mainBackgroundColor} >
                                <SaveOrUnsaveBtn color={headerTextColor} event={props} size='20' />
                                <ShareEvent newbtn={true} showText={false} data={props} id={prId ? prId + "?type=affiliate" : id} type="EVENT" eventName={textLimit(eventName, 17)} />
                            </Flex>
                        )}
                    </Flex>
                </Flex>
                <Flex w={"full"} flexDir={"column"} gap={"3"} >
                    <Text fontWeight={"700"} fontSize={["16px", "16px", "24px"]} >{capitalizeFLetter(eventName)}</Text>
                    <Flex w={"full"} flexDir={["column-reverse", "column-reverse", "column"]} gap={"2"} >
                        <DescriptionPage limit={200} label='Event Details' description={eventDescription} />
                        <Flex flexDir={isAdmin ? "column" : "row"} gap={"2"} w={"full"} >
                            <Flex w={[isAdmin ? "full" : "fit-content", isAdmin ? "full" : "full", "full"]} alignItems={["start", "start", "center"]} flexDir={["column", "column", "row"]} justifyContent={["start", "start", "space-between"]} gap={"3"} >
                                <Flex gap={"3"} w={[isAdmin ? "full" : "fit-content", isAdmin ? "full" : "full", "full"]} alignItems={[isAdmin ? "center" : "start", isAdmin ? "center" : "start", "center"]} flexDir={[isAdmin ? "row" : "column", isAdmin ? "row" : "column", "row"]} justifyContent={[isAdmin ? "space-between" : "start", isAdmin ? "space-between" : "start", "space-between"]}  >
                                    <EventCreator {...props} />
                                    <Flex display={["flex", "flex", "none"]} flexDir={"column"} gap={"2"} mr={isAdmin ? "auto" : "0px"} >
                                        <InterestedUsers fontSize={16} event={props} border={"2px"} size={"28px"} refund={true} />

                                        {(!isOrganizer && eventMemberRole !== "ADMIN" && eventMemberRole !== "COLLABORATOR") && (
                                            <PrBtn data={props} />
                                        )}
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex display={["flex", "flex", "none"]} maxW={["full", "full", "full", "430px", "430px"]} flexDir={"column"} gap={"2"} w={"full"} >
                                {((eventMemberRole !== "COLLABORATOR") && !isOrganizer && eventMemberRole !== "ADMIN") && (
                                    <Flex bg={mainBackgroundColor} zIndex={"50"} pos={["relative"]} bottom={"0px"} w={"full"} flexDir={"column"} rounded={"16px"} gap={"3"} p={"3"} borderWidth={(pathname?.includes("past") && !isOrganizer) ? "0px" : "1px"} borderColor={"#DEDEDE"} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
                                        {/* {(!pathname?.includes("past") || isOrganizer) && ( */}
                                        {/* )} */}
                                        {(!isBought && (!isOrganizer && eventMemberRole !== "ADMIN" && eventMemberRole !== "COLLABORATOR") && !pathname?.includes("past")) && (
                                            <SelectTicket data={props} currency={currency} ticket={productTypeData} />
                                        )}
                                        {(!isOrganizer && eventMemberRole !== "ADMIN" && eventMemberRole !== "COLLABORATOR") && (
                                            <GetEventTicket {...props} />
                                        )}
                                    </Flex>
                                )}
                                {isAdmin && (
                                    <OrganizeBtn {...props} />
                                )}
                                {isOrganizer && (
                                    <VolunteerBtn {...props} />
                                )}
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex alignItems={"center"} gap={"3"} >
                        <Flex w={"full"} flexDir={"column"} gap={"4"} >
                            <Flex gap={"2"} alignItems={"center"} >
                                <Text fontWeight={"600"} w={"90px"} >Start Date:</Text>
                                <CalendarIcon color={primaryColor} />
                                <Text fontSize={["12px", "12px", "14px"]} >{dateFormat(startDate)} {timeFormat(startDate)}</Text>
                            </Flex>
                            <Flex gap={"2"} alignItems={"center"}>
                                <Text fontWeight={"600"} w={"90px"} >End Date:</Text>
                                <CalendarIcon color={primaryColor} />
                                <Text fontSize={["12px", "12px", "14px"]} >{dateFormat(endDate)} {timeFormat(endDate)}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex w={"full"} justifyContent={"space-between"} gap={"4"} >
                        <Flex display={["none", "none", "flex"]} w={"full"} flexDir={"column"} gap={"6"} >
                            <Flex maxW={["full", "full", "full", "430px", "430px"]} flexDir={"column"} gap={"6"} w={"full"} >
                                {((eventMemberRole !== "COLLABORATOR") && !isOrganizer && eventMemberRole !== "ADMIN") && (
                                    <Flex bg={mainBackgroundColor} zIndex={"50"} pos={["relative"]} bottom={"0px"} w={"full"} flexDir={"column"} rounded={"16px"} gap={"3"} p={"3"} borderWidth={(pathname?.includes("past") && !isOrganizer) ? "0px" : "1px"} borderColor={"#DEDEDE"} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
                                        {(!isBought && (!isOrganizer && eventMemberRole !== "ADMIN" && eventMemberRole !== "COLLABORATOR") && !pathname?.includes("past")) && (
                                            <SelectTicket data={props} currency={currency} ticket={productTypeData} />
                                        )}
                                        {(!isOrganizer && eventMemberRole !== "ADMIN" && eventMemberRole !== "COLLABORATOR") && (
                                            <GetEventTicket {...props} />
                                        )}
                                    </Flex>
                                )}
                                {isAdmin && (
                                    <OrganizeBtn {...props} />
                                )}
                            </Flex>
                            {isOrganizer && (
                                <VolunteerBtn {...props} />
                            )}
                            {(!isOrganizer && eventMemberRole !== "ADMIN" && eventMemberRole !== "COLLABORATOR") && (
                                <Flex w={"150px"} >
                                    <PrBtn data={props} />
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                <Flex w={"full"} flexDir={"column"} gap={"3"} >
                    <Flex display={["flex", "flex", "none"]} w={"full"} gap={"2"} flexDir={"column"} >
                        <Flex maxW={["400px"]} rounded={"32px"} py={"2"} px={"3"} bgColor={secondaryBackgroundColor} w={"full"} gap={"2"} alignItems={"center"} >
                            <LocationStroke />
                            <Text fontSize={"14px"} fontWeight={"500"} >{location?.toBeAnnounced ? "To Be Announced" : location?.locationDetails}</Text>
                        </Flex>
                        {location?.link && (
                            <Flex maxW={["400px"]} rounded={"32px"} py={"2"} px={"3"} bgColor={secondaryBackgroundColor} w={"full"} gap={"2"} alignItems={"center"} >
                                <LinkIcon />
                                <Text fontSize={"14px"} fontWeight={"500"} ><a target="_blank" href={location?.link} >Click Me</a></Text>
                            </Flex>
                        )}
                    </Flex>
                    <Flex w={"full"} maxW={"500px"} gap={"2"} flexDir={["column", "column", "row"]} >
                        <Flex w={"full"} display={["flex", "flex", "none"]} >
                            <EventMesh setMeshSize={setMeshSize} data={props} />
                        </Flex>
                        <EventDonation item={props} />
                        {isOrganizer && (
                            <Flex w={"fit-content"} mt={"auto"} height={["auto", "auto", "130px"]} >
                                <ViewRequest {...props} />
                            </Flex>
                        )}
                    </Flex>
                    <Flex w={"full"} flexDir={"column"} gap={"2"} >
                        <Flex display={["none", "none", "flex"]} w={"full"} gap={"2"} flexDir={"column"} >
                            <Flex maxW={["400px"]} rounded={"32px"} py={"2"} px={"3"} bgColor={secondaryBackgroundColor} w={"full"} gap={"2"} alignItems={"center"} >
                                <LocationStroke />
                                <Text fontSize={"14px"} fontWeight={"500"} >{location?.toBeAnnounced ? "To Be Announced" : location?.locationDetails}</Text>
                            </Flex>
                            {location?.link && (
                                <Flex maxW={["400px"]} rounded={"32px"} py={"2"} px={"3"} bgColor={secondaryBackgroundColor} w={"full"} gap={"2"} alignItems={"center"} >
                                    <LinkIcon />
                                    <Text fontSize={"14px"} fontWeight={"500"} ><a target="_blank" href={location?.link} >Click Me</a></Text>
                                </Flex>
                            )}
                        </Flex>
                        {location?.latlng && (
                            <Flex flexDir={"column"} gap={"2"} >
                                <Text fontSize={"14px"} fontWeight={"bold"} >Location and surroundings</Text>
                                <EventMap height={"212px"} latlng={location?.latlng ?? ""} />
                            </Flex>
                        )}
                    </Flex>
                </Flex>
                <Flex w={"full"} display={["none", "none", "flex"]} flexDir={"column"} >
                    <EventMesh setMeshSize={setMeshSize} data={props} />
                    <Flex w={"full"} h={"8"} />
                </Flex>
            </Flex>
        </Flex>
    )
}
