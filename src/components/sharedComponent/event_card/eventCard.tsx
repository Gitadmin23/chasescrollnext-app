import { IEventType } from '@/models/Event';
import { Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React from 'react'
import ProductImageScroller from '../productImageScroller';
import moment from 'moment';
import useCustomTheme from '@/hooks/useTheme';
import { textLimit } from '@/utils/textlimit';
import ShareEvent from '../share_event';
import SaveOrUnsaveBtn from '../save_unsave_event_btn';
import InterestedUsers from '../interested_users';
import EventPrice from '../event_price';

export default function EventCardNew({
    event
}: {
    event: IEventType
}) {

    const router = useRouter()

    const { primaryColor, headerTextColor, mainBackgroundColor } = useCustomTheme()

    const clickHandler = () => {
        router.push("/dashboard/event/details/" + event?.id);
    };

    return (
        <Flex as={"button"} flexDir={"column"} onClick={() => clickHandler()} borderWidth={"1px"} rounded={"10px"} w={"full"} >
            <Flex w={"full"} pos={"relative"} >
                <ProductImageScroller images={[event?.currentPicUrl]} createdDate={moment(event?.createdDate)?.fromNow()} userData={event?.createdBy} />
                <Flex w={"40px"} pos={"absolute"} bottom={"4"} right={"4"} h={"40px"} rounded={"full"} bgColor={mainBackgroundColor} justifyContent={"center"} alignItems={"center"} >
                    <SaveOrUnsaveBtn color={headerTextColor} event={event} />
                </Flex>
            </Flex>
            <Flex flexDir={"column"} px={["2", "2", "3"]} pt={["2", "2", "3"]} gap={"1"} pb={["2", "2", "0px"]} >
                <Flex alignItems={"center"} gap={"2"} >
                    <Flex w={"fit-content"} >
                        <Flex
                            width={"50px"}
                            flexDir={"column"}
                            py={"2"}
                            alignItems={"center"}
                            roundedBottom={"20px"}
                            roundedTopLeft={"20px"}
                            borderWidth={"1px"}
                        >
                            <Text
                                fontSize={"12px"}
                                fontWeight={"700"}
                                lineHeight={"10px"}
                                color={primaryColor}
                            >
                                {moment(event?.startDate).format("MMM")}
                            </Text>
                            <Text lineHeight={"24px"} fontWeight={"700"} fontSize={"24px"}>
                                {moment(event?.startDate).format("D")}
                            </Text>
                        </Flex>
                    </Flex>
                    <Text fontSize={"14px"} fontWeight={"700"} >{textLimit(event?.eventName, 40)}</Text>
                    <Flex w={"fit-content"} ml={"auto"} pl={"2"} >
                        <ShareEvent
                            data={event}
                            type="EVENT"
                            // size="18px"
                            showText={false}
                            id={event?.id}
                        />
                    </Flex>
                </Flex>
            </Flex>
            <Flex borderTopWidth={"1px"} w={"full"} mt={"3"} h={"50px"} px={["2", "2", "3"]} alignItems={"center"} >
                {event?.attendeesVisibility && (
                    <InterestedUsers
                        fontSize={16}
                        // color={["#1732F7", "#1732F7", "#1732F7", "#1732F7", "#1732F7"]}
                        event={event}
                        border={"2px"}
                        size={"32px"}
                        refund={true}
                    />
                )}
                <Text color={primaryColor} display={["none", "none", "none", "block", "block"]} ml={"auto"} fontWeight={"600"} fontSize={"14px"} >
                    <EventPrice
                        minPrice={event?.minPrice}
                        maxPrice={event?.maxPrice}
                        currency={event?.currency}
                    />
                </Text>
            </Flex>
        </Flex>
    )
}
