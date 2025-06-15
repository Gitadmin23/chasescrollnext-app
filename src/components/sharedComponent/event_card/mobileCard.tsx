import { IEventType } from '@/models/Event'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import EventImage from '../eventimage'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit'
import EventPrice from '../event_price'
import EventLocationDetail from '../event_location'
import { CalendarIcon } from '@/components/svg'
import { dateFormat, timeFormat } from '@/utils/dateFormat'
import InterestedUsers from '../interested_users'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ShareEvent from '../share_event'
import { IoClose } from 'react-icons/io5'
import useCustomTheme from '@/hooks/useTheme'
import DeleteEvent from '../delete_event'
import ProductImageScroller from '../productImageScroller'
import moment from 'moment'

export default function MobileCard(props: IEventType) {

    const {
        eventDescription,
        eventName,
        isOrganizer,
        id,
        endDate,
        eventMemberRole
    } = props;


    const router = useRouter()
    const pathname = usePathname()
    const query = useSearchParams();
    const type = query?.get('type');

    const { mainBackgroundColor, primaryColor, headerTextColor, bodyTextColor } = useCustomTheme()

    const clickHandler = () => {
        if (pathname?.includes("draft")) {
            router?.push(`/dashboard/event/edit_draft/${id}`)
        } else if (new Date(endDate) < (new Date())) {
            router?.push(`/dashboard/event/pastdetails/${id}`)
        } else {
            router?.push(`/dashboard/event/details/${id}`)
        }
    }

    return (
        // <Flex as={"button"} onClick={clickHandler} borderWidth={"1px"} pos={"relative"} rounded={"16px"} p={"5px"} w={"full"} gap={"2"} bgColor={mainBackgroundColor} >
        //     <DeleteEvent id={props?.id} name={props?.eventName + " Event"} isEvent={pathname?.includes("draft") ? false : true} draft={pathname?.includes("draft") ? true : false} isOrganizer={props?.isOrganizer} />
        //     <Flex width={"fit-content"} >
        //         <Flex w={"120px"} h={"104px"} rounded={"16px"} roundedTopRight={"0px"} >
        //             <EventImage data={props} width={["120px"]} borderWidth='2px' height={["104px"]} />
        //         </Flex>
        //     </Flex>
        //     <Flex w={"full"} flexDir={"column"} >
        //         <Flex pb={"2"} borderBottomWidth={"1px"} w={"full"} justifyContent={"space-between"} gap={"2"} >
        //             <Text w={"50%"} textAlign={"start"} fontSize={"14px"} fontWeight={"600"} >{textLimit(capitalizeFLetter(props?.eventName), 20)}</Text>
        //             <Flex flexDir={"column"} w={"fit-content"} pr={"2"} >
        //                 <Text fontSize={"14px"} fontWeight={"600"} >
        //                     <EventPrice
        //                         font={["13px", "13px", "14px"]}
        //                         minPrice={props?.minPrice}
        //                         maxPrice={props?.maxPrice}
        //                         currency={props?.currency}
        //                     />
        //                 </Text>
        //                 <Flex gap={"3"} alignItems={"center"} justifyContent={"end"} >
        //                     {pathname?.includes("my_event") && (
        //                         <>
        //                             {(isOrganizer || eventMemberRole === "ADMIN" || eventMemberRole === "COLLABORATOR" || props?.prStatus === "ACTIVE" || props.isBought) && (
        //                                 <Flex h={"21px"} w={"48px"} rounded={"8px"} bgColor={"#EFF1FE"} color={"#5D70F9"} fontSize={"8px"} justifyContent={"center"} alignItems={"center"} >
        //                                     <Text fontWeight={"700"} >{isOrganizer ? "organizer" : eventMemberRole === "ADMIN" ? "admin" : eventMemberRole === "COLLABORATOR" ? "volunteer" : props?.prStatus === "ACTIVE" ? "affiliate" : "attending"}</Text>
        //                                 </Flex>
        //                             )}
        //                         </>
        //                     )}
        //                     {pathname?.includes("past_event") && (
        //                         <Flex h={"21px"} w={"48px"} rounded={"8px"} bgColor={"#D0D4EB40"} color={"#F04F4F"} fontSize={"8px"} justifyContent={"center"} alignItems={"center"} >
        //                             <Text fontWeight={"700"} >attended</Text>
        //                         </Flex>
        //                     )}
        //                     {pathname?.includes("saved_event") && (
        //                         <Flex h={"21px"} w={"48px"} rounded={"8px"} bgColor={"#EFF1FE"} color={"#5D70F9"} fontSize={"8px"} justifyContent={"center"} alignItems={"center"} >
        //                             <Text fontWeight={"700"} >saved</Text>
        //                         </Flex>
        //                     )}
        //                     {pathname?.includes("draft") && (
        //                         <Flex h={"21px"} w={"48px"} rounded={"8px"} bgColor={"#EFF1FE"} color={"#5D70F9"} fontSize={"8px"} justifyContent={"center"} alignItems={"center"} >
        //                             <Text fontWeight={"700"} >draft</Text>
        //                         </Flex>
        //                     )}
        //                     {(!pathname?.includes("past_event") && !pathname?.includes("draft")) && (
        //                         <ShareEvent
        //                             data={props}
        //                             size='14px'
        //                             type="EVENT"
        //                             showText={false}
        //                             id={props.prStatus === "ACTIVE" ? props.affiliateID + "?type=affiliate" : props?.id}
        //                         />
        //                     )}
        //                 </Flex>
        //             </Flex>
        //         </Flex>
        //         <Flex w={"full"} gap={"2"} pt={"1"} justifyContent={"space-between"} >
        //             <Flex flexDir={"column"} gap={"2px"} >
        //                 <Flex alignItems={"center"} gap={"1"} >
        //                     <CalendarIcon width='13' />
        //                     <Text fontSize={"12px"} >{textLimit(dateFormat(props?.startDate) + "" + timeFormat(props?.startDate), 16)}</Text>
        //                 </Flex>
        //                 <Text fontSize={"14px"}>
        //                     <EventLocationDetail
        //                         // landingcolor={landingcolor}
        //                         iconsize={"13px"}
        //                         fontWeight={"medium"}
        //                         fontsize={"13px"}
        //                         height="auto"
        //                         location={props?.location}
        //                         locationType={props?.locationType}
        //                         isLimited={true}
        //                         length={20}
        //                     />
        //                 </Text>
        //             </Flex>
        //             <Flex pr={"2"} >
        //                 <InterestedUsers fontSize={12} event={props} border={"2px"} size={"28px"} refund={true} />
        //             </Flex>
        //         </Flex>
        //     </Flex>
        // </Flex>
        <Flex as={"button"} onClick={clickHandler} w={"full"} pos={"relative"} flexDir={"column"} bg={mainBackgroundColor} rounded={"16px"} shadow={"xl"} >
            {(type !== "past_event") && (
                <DeleteEvent id={props?.id} name={props?.eventName + " Event"} isEvent={pathname?.includes("draft") ? false : true} draft={pathname?.includes("draft") ? true : false} isOrganizer={props?.isOrganizer} />
            )}
            <ProductImageScroller images={[props?.currentPicUrl]} rounded='16px' createdDate={moment(props?.createdDate)?.fromNow()} userData={props?.createdBy} />
            <Flex w={"full"} flexDir={"column"} px={"2"} >
                <Flex w={"full"} alignItems={"center"} gap={"2"} py={"2"} >
                    <Flex w={"fit-content"} >
                        <Flex
                            width={"50px"}
                            flexDir={"column"}
                            h={"49px"}
                            p={"1"}
                            justifyContent={"center"}
                            borderWidth={"1px"}
                            bgColor={mainBackgroundColor}
                            alignItems={"center"}
                            roundedBottom={"12px"}
                            roundedTopLeft={"12px"}
                        >
                            <Text
                                fontSize={"12px"}
                                color={primaryColor}
                                fontWeight={"600"}
                            >
                                {moment(props?.startDate).format("MMM")}
                            </Text>
                            <Text fontSize={"16px"} color={headerTextColor} fontWeight={"600"} >
                                {moment(props?.startDate).format("D")}
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} >
                        <Flex flexDirection={"column"} justifyContent={"start"} alignItems={"start"} >
                            <Text fontWeight={"600"} >{textLimit(capitalizeFLetter(props?.eventName), 20)}</Text>
                            <Text fontSize={"14px"}>
                                <EventLocationDetail
                                    landingcolor={true}
                                    iconsize={"13px"}
                                    fontWeight={"medium"}
                                    fontsize={"13px"}
                                    height="auto"
                                    location={props?.location}
                                    locationType={props?.locationType}
                                    isLimited={true}
                                    length={20}
                                />
                            </Text>
                        </Flex>
                        <Text fontSize={"14px"} fontWeight={"600"} >
                            <EventPrice
                                font={["13px", "13px", "14px"]}
                                minPrice={props?.minPrice}
                                maxPrice={props?.maxPrice}
                                currency={props?.currency}
                            />
                        </Text>
                    </Flex>
                </Flex>
                {(type === "past_event") && (
                    <Flex w={"full"} borderTopWidth={"1px"} justifyContent={"center"} h={"50px"} px={"2"} alignItems={"center"} roundedBottom={"16px"} >
                        <Text fontWeight={"600"} fontSize={"14px"} color={"#F11317"} >Ended</Text>
                    </Flex>
                )}
                {(type === "my_event") && (
                    <Flex w={"full"} borderTopWidth={"1px"} justifyContent={"space-between"} h={"50px"} px={"2"} alignItems={"center"} roundedBottom={"16px"} >
                        <InterestedUsers fontSize={12} event={props} border={"2px"} size={"28px"} refund={true} />
                        <Text fontWeight={"600"} ml={"auto"} fontSize={"14px"} color={primaryColor} >Edit</Text>
                    </Flex>
                )}
                {(type === "saved_event") && ( 
                    <Flex w={"full"} borderTopWidth={"1px"} justifyContent={"center"} h={"50px"} px={"2"} alignItems={"center"} roundedBottom={"16px"} >
                        <Text fontWeight={"600"} fontSize={"14px"} color={primaryColor} >Saved</Text>
                    </Flex>
                )} 
                {(type === "draft") && ( 
                    <Flex w={"full"} borderTopWidth={"1px"} justifyContent={"center"} h={"50px"} px={"2"} alignItems={"center"} roundedBottom={"16px"} >
                        <Text fontWeight={"600"} fontSize={"14px"} color={primaryColor} >Draft</Text>
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}
