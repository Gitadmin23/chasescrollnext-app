import useCustomTheme from '@/hooks/useTheme';
import { IEventType } from '@/models/Event'
import { textLimit } from '@/utils/textlimit';
import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
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
import DonationBtn from './donationBtn';
import EventPrice from '../sharedComponent/event_price';
import PrBtn from './prBtn';
import OrganizerPrBtn from './organizerPrBtn';
import EventMesh from './eventMesh';
import EventDonation from './eventDonation';
import VolunteerBtn from './volunteerBtn';
import useGetPr from '@/hooks/useGetPr';



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
        secondaryBackgroundColor
    } = useCustomTheme();

    const router = useRouter()
    const pathname = usePathname()

    const isAdmin = isOrganizer || eventMemberRole === "ADMIN" || eventMemberRole === "COLLABORATOR"
    const isUser = !isOrganizer && eventMemberRole !== "ADMIN" || eventMemberRole !== "COLLABORATOR"

    const [show, setShow] = useState(false)
    const [textSize, setTextSize] = useState(100)

    const handerTicket = () => {
        setShow(true)
        router?.push("/")
    }

    const { userId, email } = useDetails((state) => state);

    const clickHander = () => {
        if (!email && !userId) {
            router.push("/")
        } else {
            router.back()
        }
    }


    const { data: prId } = useGetPr(props?.id)

    console.log(prId);
    


    return (
        // <Flex w={"full"} flexDir={"column"} pb={"8"} gap={["6", "6", "6", "10", "10"]} pos={"relative"} >
        //     <Flex w={"full"} display={["flex", "flex", "flex"]} pos={"relative"} justifyContent={"center"} alignItems={"center"} >
        //         <Box as='button' position={"absolute"} left={"0px"} onClick={() => clickHander()}>
        //             <MdArrowBackIos color={headerTextColor} size={"24px"} />
        //         </Box>
        //         <Text color={headerTextColor} fontWeight={"semibold"} fontSize={"24px"} lineHeight={"22px"} >{pathname?.includes("past") ? "Past Event Details" : "Event Details"}</Text>
        //     </Flex>
        //     <Flex width={"full"} alignItems={"start"} position={"relative"} justifyContent={"center"} >
        //         <Box height={["230px", "230px", "400px"]} px={["4", "4", "0px"]} mt={["4", "4", "0px"]} position={"relative"} width={"full"} rounded={"16px"} roundedTopRight={"none"} >
        //             <BlurredImage height={["230px", "230px", "400px"]} image={props?.currentPicUrl} />
        //         </Box>
        //     </Flex>
        //     <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
        //         <Button color={headerTextColor} fontSize={"12px"} w={"112px"} bgColor={"#233DF30D"} rounded={"32px"} h={"38px"} >
        //             Trending
        //         </Button>
        //         {!pathname?.includes("past") && (
        //             <Flex w={"fit-content"} h={"fit-content"} gap={"4"} pt={"10"} >
        //                 <SaveOrUnsaveBtn color={headerTextColor} event={props} size='20' />
        //                 <ShareEvent newbtn={true} showText={false} data={props} id={id} type="EVENT" eventName={textLimit(eventName, 17)} />
        //             </Flex>
        //         )}
        //     </Flex>
        //     <Flex flexDirection={["column", "column", "column", "row", "row"]} w={"full"} gap={["6", "6", "6", "10", "10"]} >
        //         <Flex w={"full"} flexDir={"column"} gap={"5"} >

        //             <EventCreator {...props} />
        //             <Flex w={"full"} justifyContent={"space-between"} gap={"7"} >

        //                 {/* Event Name */}
        //                 <Text fontSize={["20px", "20px", "32px", "32px"]} lineHeight={["26px", "26px", "36px", "36px"]} fontWeight={"semibold"} >{eventName}</Text>

        //                 <EventPrice
        //                     font={["13px", "13px", "18px"]}
        //                     minPrice={props?.minPrice}
        //                     maxPrice={props?.maxPrice}
        //                     currency={props?.currency}
        //                 />
        //             </Flex>
        //             {props?.attendeesVisibility && (
        //                 <Flex>
        //                     <InterestedUsers fontSize={16} event={props} border={"2px"} size={"38px"} refund={true} />
        //                 </Flex>
        //             )}


        //             {/* Event Description */}
        //             <Flex flexDir={"column"} >
        //                 <Text fontSize={"16px"} fontWeight={"medium"} >Event Description</Text>
        //                 <Text fontSize={"14px"} >{eventDescription}</Text>
        //             </Flex>

        //             <Flex w={"full"} flexDirection={["column", "column", "row", "row", "row"]} gap={"8"} >

        //                 {/* Event Date */}
        //                 <Flex w={"full"} flexDir={"column"} gap={"2"} >
        //                     <Text fontSize={"16px"} fontWeight={"medium"} >Event Date & Time</Text>
        //                     <Flex alignItems={"center"} gap={"2"} >
        //                         <Flex w={"fit-content"} >
        //                             <Flex w={"8"} h={"8"} color={primaryColor} justifyContent={"center"} alignItems={"center"} >
        //                                 <CalendarIcon />
        //                             </Flex>
        //                         </Flex>
        //                         <Text fontSize={"14px"} >{dateFormat(startDate)} {timeFormat(startDate)} ({new Date(startDate).toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2]}) </Text>
        //                     </Flex>
        //                 </Flex>

        //                 {/* Event Location */}
        //                 {(location?.locationDetails || location?.toBeAnnounced) && (
        //                     <EventLocation {...props} />
        //                 )}

        //             </Flex>

        //             {/* Event Online link */}
        //             {/* {(location?.link && isBought && isOrganizer) && ( */}
        //             {(location?.link) && (
        //                 <Flex w={"full"} flexDir={"column"} gap={"2"} >
        //                     <Text fontSize={"16px"} fontWeight={"medium"} >Join Online</Text>
        //                     {(!isBought && !isOrganizer) ? (

        //                         <Flex alignItems={"center"} gap={"2"} >
        //                             <Flex w={"fit-content"} >
        //                                 <Flex w={"8"} h={"8"} color={primaryColor} justifyContent={"center"} alignItems={"center"} >
        //                                     <LinkIcon />
        //                                 </Flex>
        //                             </Flex>
        //                             {(isBought || isOrganizer) && (
        //                                 <a href={location?.link}  >
        //                                     <Text fontSize={"14px"} color={primaryColor} >{location?.link}</Text>
        //                                 </a>
        //                             )}
        //                             {(!isBought && !isOrganizer) && (
        //                                 <Text fontSize={"14px"} color={primaryColor} >{maxPrice ? "Buy Ticket" : "Register Ticket"} To View Link</Text>
        //                             )}
        //                         </Flex>
        //                     ) : (
        //                         <>
        //                             {location?.links ? (
        //                                 <>
        //                                     {(location?.links?.length > 0) && (
        //                                         <>
        //                                             {location?.links?.map((item, index) => {
        //                                                 return (
        //                                                     <Flex key={index} alignItems={"center"} gap={"2"} >
        //                                                         <Flex w={"fit-content"} >
        //                                                             <Flex w={"8"} h={"8"} color={primaryColor} justifyContent={"center"} alignItems={"center"} >
        //                                                                 <LinkIcon />
        //                                                             </Flex>
        //                                                         </Flex>
        //                                                         {(isBought || isOrganizer) && (
        //                                                             <a href={item}  >
        //                                                                 <Text fontSize={"14px"} color={primaryColor} >{item}</Text>
        //                                                             </a>
        //                                                         )}
        //                                                     </Flex>
        //                                                 )
        //                                             })}
        //                                         </>
        //                                     )}
        //                                 </>
        //                             ) : (
        //                                 <Flex alignItems={"center"} gap={"2"} >
        //                                     <Flex w={"fit-content"} >
        //                                         <Flex w={"8"} h={"8"} color={primaryColor} justifyContent={"center"} alignItems={"center"} >
        //                                             <LinkIcon />
        //                                         </Flex>
        //                                     </Flex>
        //                                     {(isBought || isOrganizer) && (
        //                                         <a href={location?.link}  >
        //                                             <Text fontSize={"14px"} color={primaryColor} >{location?.link}</Text>
        //                                         </a>
        //                                     )}
        //                                 </Flex>
        //                             )}
        //                         </>
        //                     )}
        //                 </Flex>
        //             )}
        //             {/* </Grid> */}
        //             {location?.address && (
        //                 <Flex w={"full"} flexDir={"column"} gap={"2"} >
        //                     <Text fontSize={"16px"} fontWeight={"medium"} >About this Event</Text>
        //                     <Text fontSize={"14px"} >{location?.address}</Text>
        //                 </Flex>
        //             )}
        //         </Flex>
        //         <Flex maxW={["full", "full", "full", "430px", "430px"]} flexDir={"column"} gap={"6"} w={"full"} >
        //             {((eventMemberRole !== "COLLABORATOR") && !isOrganizer && eventMemberRole !== "ADMIN") && (
        //                 <Flex display={["none", "none", "none", "flex", "flex"]} bg={mainBackgroundColor} zIndex={"50"} pos={["relative"]} bottom={"0px"} w={"full"} mt={"8"} flexDir={"column"} rounded={"16px"} gap={"3"} p={"3"} borderWidth={(pathname?.includes("past") && !isOrganizer) ? "0px" : "1px"} borderColor={"#DEDEDE"} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
        //                     {/* {(!pathname?.includes("past") || isOrganizer) && ( */}
        //                     <Text fontWeight={"600"} fontSize={"18px"} >{(isOrganizer || eventMemberRole === "ADMIN" || eventMemberRole === "COLLABORATOR") ? " " : "Ticket  Available"}</Text>
        //                     {/* )} */}
        //                     {(!isBought && (!isOrganizer && eventMemberRole !== "ADMIN" && eventMemberRole !== "COLLABORATOR") && !pathname?.includes("past")) && (
        //                         <SelectTicket data={props} currency={currency} ticket={productTypeData} />
        //                     )}
        //                     {(!isOrganizer && eventMemberRole !== "ADMIN" && eventMemberRole !== "COLLABORATOR") && (
        //                         <GetEventTicket {...props} />
        //                     )} 
        //                 </Flex>
        //             )}

        //             {(!isBought && (!isOrganizer && eventMemberRole !== "ADMIN" && eventMemberRole !== "COLLABORATOR") && !pathname?.includes("past")) && (
        //                 <PrBtn data={props} />
        //             )}

        //             {(isOrganizer || eventMemberRole === "ADMIN" || eventMemberRole === "COLLABORATOR") && (
        //                 <Flex w={"full"} bgColor={secondaryBackgroundColor} display={["none", "none", "flex", "flex"]} rounded={"64px"} alignItems={"center"} h={"86px"} px={"4"} py={"3"} justifyContent={"center"} >
        //                     <OrganizeBtn {...props} />
        //                 </Flex>
        //             )} 

        //             <Flex flexDir={"column"} gap={"4"} >
        //                 <Text fontWeight={"medium"} >Tags</Text>
        //                 <Button color={headerTextColor} fontSize={"12px"} w={"fit-content"} px={"3"} bgColor={secondaryBackgroundColor} rounded={"32px"} h={"38px"} >
        //                     {eventType?.replace("_", " ")}
        //                 </Button>
        //             </Flex>
        //         </Flex>
        //     </Flex>
        //     <EventMap height={"350px"} latlng={location?.latlng ?? ""} />
        //     <Box display={["flex", "flex", "flex", "none", "none"]} h={"300px"} />

        //     {((eventMemberRole !== "COLLABORATOR") && !isOrganizer && eventMemberRole !== "ADMIN") && (
        //         <Flex w={[!isBought ? "auto" : "fit-content"]} display={["flex", "flex", "flex", "none", "none"]} zIndex={"100"} pos={["fixed", "fixed", "fixed", "relative", "relative"]} bgColor={[mainBackgroundColor]} bottom={pathname?.includes("detail") ? "80px" : "30px"} left={[isBought ? "auto" : "4", "4", "4", "4"]} right={"4"} mt={isBought ? "0px" : "8"} flexDir={"column"} rounded={isBought ? "13px" : "16px"} gap={"3"} pb={isBought ? "0px" : "3"} p={[isBought ? "0px" : "3", "3", "3", "3"]} style={{ border: isBought ? "" : `1px solid #DEDEDE`, boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
        //             {!isBought && (
        //                 <Text fontWeight={"600"} fontSize={"18px"} >{(isOrganizer || eventMemberRole === "ADMIN" || eventMemberRole === "COLLABORATOR" || isBought) ? " " : "Ticket  Available"}</Text>
        //             )}
        //             {(!isBought && (!isOrganizer && eventMemberRole !== "ADMIN" && eventMemberRole !== "COLLABORATOR") && !pathname?.includes("past")) && (
        //                 <SelectTicket data={props} currency={currency} ticket={productTypeData} />
        //             )}
        //             {(!isOrganizer && eventMemberRole !== "ADMIN" && eventMemberRole !== "COLLABORATOR") && (
        //                 <GetEventTicket {...props} />
        //             )}
        //             {/* {(isOrganizer || eventMemberRole === "ADMIN" || eventMemberRole === "COLLABORATOR") && (
        //             <OrganizeBtn {...props} />
        //         )} */}
        //         </Flex>
        //     )}
        //     {(isOrganizer || eventMemberRole === "ADMIN" || eventMemberRole === "COLLABORATOR") && (
        //         <Flex w={"auto"} bgColor={secondaryBackgroundColor} display={["flex", "flex", "none", "none"]} zIndex={"100"} pos={["fixed", "fixed", "fixed", "relative", "relative"]} rounded={"64px"} alignItems={"center"} h={"86px"} px={"4"} py={"3"} justifyContent={"center"} left={"4"} right={"4"} bottom={pathname?.includes("detail") ? "80px" : "30px"} >
        //             <OrganizeBtn {...props} />
        //         </Flex>
        //     )}
        // </Flex>
        <Flex w={"full"} flexDir={"column"} pb={"8"} gap={["4", "4", "4", "6", "6"]} pos={"relative"} >
            <Flex width={"full"} alignItems={"start"} position={"relative"} justifyContent={"center"} >
                <Flex as='button' pl={"6px"} position={"absolute"} w={"40px"} h={"40px"} rounded={"full"} bgColor={"white"} justifyContent={"center"} alignItems={"center"} zIndex={"50"} top={"4"} left={"4"} onClick={() => clickHander()}>
                    <MdArrowBackIos color={"black"} size={"18px"} />
                </Flex>
                <Box height={["230px", "230px", "339px"]} px={["4", "4", "0px"]} mt={["4", "4", "0px"]} position={"relative"} width={"full"} rounded={"16px"} roundedTopRight={"none"} >
                    <BlurredImage height={["230px", "230px", "339px"]} image={props?.currentPicUrl} />
                </Box>

               {!pathname?.includes("past") && (
                   <Flex pos={"absolute"} bottom={"6"} right={"6"}  zIndex={"50"} w={"fit-content"} h={"fit-content"} gap={"4"} p={"5px"} px={"2"} rounded={"full"} bgColor={"white"} >
                       <SaveOrUnsaveBtn color={headerTextColor} event={props} size='20' />
                       <ShareEvent newbtn={true} showText={false} data={props} id={prId ? prId+"?type=affiliate" : id} type="EVENT" eventName={textLimit(eventName, 17)} />
                   </Flex>
               )}
            </Flex>
            <Flex gap={"4"} >
                <Flex w={"full"} flexDir={"column"} gap={"6"} >
                    <Text fontSize={["20px", "20px", "32px", "32px"]} lineHeight={["26px", "26px", "36px", "36px"]} fontWeight={"semibold"} >{eventName}</Text>
                    <Flex flexDir={isAdmin ? "column" : "row"} gap={"2"} w={"full"} >
                        <Flex w={[isAdmin ? "full" : "fit-content", isAdmin ? "full" : "fit-content", "full"]} alignItems={["start", "start", "center"]} flexDir={["column", "column", "row"]} justifyContent={["start", "start", "space-between"]} gap={"3"} >
                            <Flex pr={isAdmin ? "3" : "0px"} gap={"3"} w={[isAdmin ? "full" : "fit-content", isAdmin ? "full" : "fit-content", "full"]} alignItems={[isAdmin ? "center" : "start", isAdmin ? "center" : "start", "center"]} flexDir={[isAdmin ? "row" : "column", isAdmin ? "row" : "column", "row"]} justifyContent={[isAdmin ? "space-between" : "start", isAdmin ? "space-between" : "start", "space-between"]}  >
                                <EventCreator {...props} />
                                <Flex mr={isAdmin ? "auto" : "0px"} >
                                    <InterestedUsers fontSize={16} event={props} border={"2px"} size={"38px"} refund={true} />
                                </Flex>
                            </Flex>
                            {(!prId) && (
                                <Flex display={["flex", "flex", "none"]} >
                                    <PrBtn data={props} />
                                </Flex>
                            )}
                            <Flex display={["flex", "flex", "none"]} >
                                {isOrganizer && (
                                    <VolunteerBtn {...props} />
                                )}
                            </Flex>
                        </Flex>
                        <Flex display={["flex", "flex", "none"]} maxW={["full", "full", "full", "430px", "430px"]} flexDir={"column"} gap={"6"} w={"full"} >
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
                                <Flex w={"full"} bgColor={secondaryBackgroundColor} display={["flex", "flex", "none"]} rounded={"64px"} alignItems={"center"} h={"86px"} px={["2", "2", "4"]} py={"3"} justifyContent={"center"} >
                                    <OrganizeBtn {...props} />
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                    {/* Event Description */}
                    <Flex flexDir={"column"} bgColor={secondaryBackgroundColor} p={"4"} rounded={"16px"} gap={"2"} >
                        <Text fontSize={"14px"} fontWeight={"bold"} >Event Description</Text>
                        <Text fontSize={"12px"} >{textLimit(eventDescription, textSize)}<span role='button' style={{ fontWeight: "700" }} onClick={() => setTextSize((prev) => prev === eventDescription?.length ? 100 : eventDescription?.length)} >{eventDescription?.length !== textSize ? "more" : "less"}</span></Text>
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
                        {!prId && (
                            <Flex display={["none", "none", "flex"]} >
                                <PrBtn data={props} />
                            </Flex>
                        )}
                    </Flex>
                    <Flex gap={"2"} w={"fit-content"} py={"3px"} rounded={"16px"} px={"3"} alignItems={"center"} bgColor={secondaryBackgroundColor} >
                        <LinkIcon />
                        <Text fontSize={["12px", "12px", "14px"]} fontWeight={"500"} >https://us06web.zoom.us/j/86888461003</Text>
                    </Flex>
                    <Flex w={"full"} display={["flex", "flex", "none"]} >
                        <EventMesh />
                    </Flex>
                    <EventDonation />
                    <Flex w={"full"} flexDir={"column"} gap={"4"} >
                        <Text fontSize={"14px"} fontWeight={"bold"} >Location and surroundings</Text>
                        <EventMap height={"212px"} latlng={location?.latlng ?? ""} />
                    </Flex>
                    {location?.address && (
                        <Flex w={"full"} flexDir={"column"} gap={"4"} >
                            <Text fontSize={"14px"} fontWeight={"bold"} >About this Event</Text>
                            <Text fontSize={"14px"} >{location?.address}</Text>
                        </Flex>
                    )}
                </Flex>
                <Flex display={["none", "none", "none", "flex"]} w={"full"} alignItems={"end"} flexDir={"column"} gap={"6"} >
                    <Flex maxW={["full", "full", "full", "430px", "430px"]} flexDir={"column"} gap={"6"} w={"full"} >
                        {((eventMemberRole !== "COLLABORATOR") && !isOrganizer && eventMemberRole !== "ADMIN") && (
                            <Flex bg={mainBackgroundColor} zIndex={"50"} pos={["relative"]} bottom={"0px"} w={"full"} mt={"8"} flexDir={"column"} rounded={"16px"} gap={"3"} p={"3"} borderWidth={(pathname?.includes("past") && !isOrganizer) ? "0px" : "1px"} borderColor={"#DEDEDE"} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
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
                            <Flex w={"full"} bgColor={secondaryBackgroundColor} display={["none", "none", "flex", "flex"]} rounded={"64px"} alignItems={"center"} h={"86px"} px={"4"} py={"3"} justifyContent={"center"} >
                                <OrganizeBtn {...props} />
                            </Flex>
                        )}
                    </Flex>
                    <EventMesh />
                </Flex>
            </Flex>
        </Flex>
    )
}
