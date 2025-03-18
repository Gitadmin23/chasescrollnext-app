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
import { usePathname, useRouter } from 'next/navigation'
import ShareEvent from '../share_event'
import { IoClose } from 'react-icons/io5'

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
        <Flex as={"button"} onClick={clickHandler} borderWidth={"1px"} pos={"relative"} rounded={"16px"} p={"5px"} w={"full"} gap={"2"} >
            {props?.interestedUsers?.length === 0 && (
                <Flex w={"6"} h={"6"} justifyContent={"center"} alignItems={"center"} pos={"absolute"} top={"-14px"} right={"-8px"} zIndex={"50"} bg={"#F2A09B66"} color={"#F50A0A"} rounded={"full"} >
                    <IoClose size={"14px"} />
                </Flex>
            )}
            <Flex width={"fit-content"} >
                <Flex w={"120px"} h={"104px"} rounded={"16px"} roundedTopRight={"0px"} >
                    <EventImage data={props} width={["120px"]} borderWidth='2px' height={["104px"]} />
                </Flex>
            </Flex>
            <Flex w={"full"} flexDir={"column"} >
                <Flex pb={"2"} borderBottomWidth={"1px"} w={"full"} justifyContent={"space-between"} gap={"2"} >
                    <Text w={"50%"} textAlign={"start"} fontSize={"14px"} fontWeight={"600"} >{textLimit(capitalizeFLetter(props?.eventName), 20)}</Text>
                    <Flex flexDir={"column"} w={"fit-content"} pr={"2"} >
                        <Text fontSize={"14px"} fontWeight={"600"} >
                            <EventPrice
                                font={["13px", "13px", "14px"]}
                                minPrice={props?.minPrice}
                                maxPrice={props?.maxPrice}
                                currency={props?.currency}
                            />
                        </Text>
                        <Flex gap={"3"} alignItems={"center"} justifyContent={"end"} >
                            {pathname?.includes("my_event") && (
                                <Flex h={"21px"} w={"48px"} rounded={"8px"} bgColor={"#EFF1FE"} color={"#5D70F9"} fontSize={"8px"} justifyContent={"center"} alignItems={"center"} >
                                    <Text fontWeight={"700"} >organizer</Text>
                                </Flex>
                            )}
                            {pathname?.includes("past_event") && (
                                <Flex h={"21px"} w={"48px"} rounded={"8px"} bgColor={"#D0D4EB40"} color={"#F04F4F"} fontSize={"8px"} justifyContent={"center"} alignItems={"center"} >
                                    <Text fontWeight={"700"} >attended</Text>
                                </Flex>
                            )}
                            {pathname?.includes("saved_event") && (
                                <Flex h={"21px"} w={"48px"} rounded={"8px"} bgColor={"#EFF1FE"} color={"#5D70F9"} fontSize={"8px"} justifyContent={"center"} alignItems={"center"} >
                                    <Text fontWeight={"700"} >saved</Text>
                                </Flex>
                            )}
                            {pathname?.includes("draft") && (
                                <Flex h={"21px"} w={"48px"} rounded={"8px"} bgColor={"#EFF1FE"} color={"#5D70F9"} fontSize={"8px"} justifyContent={"center"} alignItems={"center"} >
                                    <Text fontWeight={"700"} >draft</Text>
                                </Flex>
                            )}
                            {(!pathname?.includes("past_event") && !pathname?.includes("draft")) && (
                                <ShareEvent
                                    data={props}
                                    size='14px'
                                    type="EVENT"
                                    showText={false}
                                    id={props?.id}
                                />
                            )}
                        </Flex>
                    </Flex>
                </Flex>
                <Flex w={"full"} gap={"2"} pt={"1"} justifyContent={"space-between"} >
                    <Flex flexDir={"column"} gap={"2px"} >
                        <Flex alignItems={"center"} gap={"1"} >
                            <CalendarIcon width='13' />
                            <Text fontSize={"12px"} >{textLimit(dateFormat(props?.startDate) + "" + timeFormat(props?.startDate), 16)}</Text>
                        </Flex>
                        <Text fontSize={"14px"}>
                            <EventLocationDetail
                                // landingcolor={landingcolor}
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
                    <Flex pr={"2"} >
                        <InterestedUsers fontSize={12} event={props} border={"2px"} size={"28px"} refund={true} />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
