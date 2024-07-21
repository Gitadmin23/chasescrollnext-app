import EventLocationDetail from "@/components/sharedComponent/event_location";
import EventImage from "@/components/sharedComponent/eventimage";
import SaveOrUnsaveBtn from "@/components/sharedComponent/save_unsave_event_btn";
import { dateFormat } from "@/utils/dateFormat";
import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import EventPrice from "../event_price";
import DeleteEvent from "../delete_event";
import useEventStore from "@/global-state/useCreateEventState";
import InterestedUsers from "../interested_users";
import ShareEvent from "../share_event";
import useSearchStore from "@/global-state/useSearchData";
import { useDetails } from "@/global-state/useUserDetails";
import BlurredImage from "../blurred_image";
import useCustomTheme from "@/hooks/useTheme";
import moment from "moment";
import { textLimit } from "@/utils/textlimit";
import ModalLayout from "../modal_layout";
import CustomButton from "@/components/general/Button";
import ViewTicket from "@/components/event_details_component/event_modal/view_ticket";

interface Props {
    event: any;
    page?: boolean;
    draft?: boolean;
    search?: boolean;
    my_event?: boolean;
    searchbar?: boolean;
    date?: boolean;
    profile?: boolean;
    past?: boolean;
    dashboard?: boolean;
    eventdashboard?: boolean;
    landing?: boolean;
    limit?: boolean,
    landingcolor?: boolean
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
        dashboard,
        landing,
        limit,
        eventdashboard,
        landingcolor
    } = props;

    const router = useRouter();
    const { setSearchValue } = useSearchStore((state) => state);

    const { userId, email } = useDetails((state) => state);

    let token = localStorage.getItem("token");

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const clickHandler = () => {
        if (draft) {
            router.push("/dashboard/event/edit_draft/" + event?.id);
        } else if (dashboard) {
            router.push("/dashboard/settings/event-dashboard/" + event?.id);
        } else if (past) {
            router.push("/dashboard/event/pastdetails/" + event?.id);
        } else if (token) {
            router.push("/dashboard/event/details/" + event?.id);
        } else if (!userId && !email) {
            sessionStorage.setItem("clicked", "true") + "";
            router.push("/event/" + event?.id);
        } else {
            router.push("/dashboard/event/details/" + event?.id);
        }
        setSearchValue("");
    };

    const [showModal, setShowModal] = useState(false)

    const viewTicket = (event: any) => {
        event.stopPropagation();
        setShowModal((prev) => !prev)
    }

    return (
        <Flex
            boxShadow={page ? "md" : "none"}
            cursor={"pointer"}
            onClick={() => clickHandler()}
            py={searchbar ? (landing ? "0px" : "2") : ["6", "6", "4"]}
            //   px={landing ? "" : ["6", "6", "4"]}
            roundedBottom={"32px"}
            roundedTopLeft={"32px"}
            borderColor={borderColor}
            color={landingcolor ? "black" :headerTextColor}
            borderBottomWidth={searchbar ? " " : "0.5px"}
            // maxWidth={[landingcolor? "full":"400px", landing? "full":"400px", "full"]}
            width={"full"}
            height={"full"} 
        >
            <Flex
                flexDirection={[searchbar? "row":"column", searchbar? "row":"column", page ? "column" : "row"]}
                width={"full"}
                // flex={"1"}
                alignItems={"center"}
                color={landingcolor? "black" : ""}

                // justifyContent={searchbar? "":"space-between"}
            >
                <Box width={[searchbar? "fit-content":"full", searchbar? "fit-content": "full", page ? "full" : "fit-content"]}>
                    {page ? (
                        <BlurredImage
                            height={
                                searchbar
                                    ? "80px"
                                    : [
                                        "230px",
                                        "230px",
                                        page ? "220px" : my_event ? "180px" : "150px",
                                    ]
                            }
                            image={event?.currentPicUrl}
                        />
                    ) : (
                        <EventImage
                            date={date}
                            data={event}
                            searchbar={searchbar}
                            width={searchbar ? "90px" : ["full", "full", page ? "full" : "230px"]}
                            height={
                                searchbar
                                    ? "80px"
                                    : [
                                        "230px",
                                        "230px",
                                        page ? "220px" : my_event ? "180px" : "150px",
                                    ]
                            }
                        />
                    )}
                </Box>
                {(!landing && !eventdashboard) && (
                    <Box
                        width={
                            searchbar ? "full" : ["full", "full", page ? "full" : "full"]
                        }
                        px={"4"} 
                        mt={["10px", "10px", page ? "10px" : "0px", page ? "10px" : "0px"]}
                        ml={["0px", "0px", page ? "0px" : "10px", page ? "0px" : "10px"]}
                    >
                        <Flex
                            fontWeight={"semibold"}
                            width={"full"}
                            justifyContent={"space-between"}
                            borderBottomColor={"#D0D4EB"}
                            borderBottom={search ? "1px" : "0px"}
                            pb={"1"}
                        >
                            <Text fontSize={searchbar ? "16px" : "18px"}>
                                {event.eventName?.length >= 17
                                    ? event.eventName.slice(0, 13) + "..."
                                    : event.eventName}
                            </Text>
                            <Box fontSize={searchbar ? "14px" : "14px"}>
                                <EventPrice
                                    minPrice={event?.minPrice}
                                    maxPrice={event?.maxPrice}
                                    currency={event?.currency}
                                />
                            </Box>
                        </Flex>
                        {!date && (
                            <Flex
                                alignItems={"center"}
                                width={"full"}
                                mt={searchbar ? "-4px" : "10px"}
                                mb={"4px"}
                                gap={"1"}
                            >
                                <Box width={"fit-content"}>
                                    <Box
                                        width={searchbar ? "16px" : "20px"}
                                        display={"flex"}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                    >
                                        <IoCalendarOutline size={searchbar ? "16px" : "20px"} />
                                    </Box>
                                </Box>
                                <Text
                                    color={landingcolor? "black" : colorMode === "light" ? "gray.600" : bodyTextColor}
                                    fontSize={searchbar ? "13px" : "16px"}
                                    fontWeight={"medium"}
                                >
                                    {dateFormat(event.startDate)}
                                </Text>
                            </Flex>
                        )}
                        {!eventdashboard && (
                            <Flex
                                alignItems={"center"}
                                width={"full"}
                                pb={"1"}
                                gap={"3"}
                                justifyContent={"space-between"}
                            >
                                <EventLocationDetail
                                landingcolor={landingcolor}
                                    iconsize={searchbar ? "16px" : "20px"}
                                    fontWeight={"medium"}
                                    fontsize={searchbar ? "13px" : page ? "14px" : "16px"}
                                    color={landingcolor? "black" : "rgba(18, 18, 18, 0.80)"}
                                    location={event?.location}
                                    locationType={event?.locationType}
                                    length={20}
                                />
                                {!draft && !profile && !my_event && (
                                    <Flex alignItems={"center"} gap={"3"}>
                                        <ShareEvent
                                            data={event}
                                            type="EVENT"
                                            size="18px"
                                            id={event?.id} 
                                        />
                                        {userId && email && !past && (
                                            <SaveOrUnsaveBtn event={event} />
                                        )}
                                    </Flex>
                                )}
                                {my_event &&
                                    !profile &&
                                    event?.isOrganizer &&
                                    !event?.isBought && <DeleteEvent draft={draft} event={event} />}
                                {draft && <DeleteEvent draft={draft} event={event} />}
                            </Flex>
                        )}
                        {page && (
                            <InterestedUsers
                                fontSize={14}
                                event={event}
                                border={"2px"}
                                size={"28px"}
                            />
                        )}

                        {(my_event || past) && (
                            <Flex
                                justifyContent={"space-between"}
                                gap={"3"}
                                flexDirection={"column"}
                                width={"full"}
                            >
                                {!past && (
                                    <Flex
                                        gap={"2"}
                                        fontSize={"sm"}
                                        alignItems={"center"}
                                        color={bodyTextColor}
                                    >
                                        <Text>Category:</Text>
                                        <Text color={"brand.chasescrollBlue"} fontWeight={"bold"}>
                                            {event?.eventType?.replace("_", " ")}
                                        </Text>
                                    </Flex>
                                )}
                                <Flex
                                    alignItems={"center"}
                                    gap={"3"}
                                    justifyContent={[
                                        "space-between",
                                        "space-between",
                                        "space-between",
                                        "",
                                    ]}
                                >
                                    {event?.isOrganizer &&
                                        !event?.admins?.some((obj: any) =>
                                            Object.values(obj).some(
                                                (val) =>
                                                    typeof val === "string" && val.includes(userId),
                                            ),
                                        ) &&
                                        !event?.collaborators?.some((obj: any) =>
                                            Object?.values(obj)?.some(
                                                (val) =>
                                                    typeof val === "string" && val?.includes(userId),
                                            ),
                                        ) && (
                                            <Flex
                                                rounded={"md"}
                                                px={"2"}
                                                py={"1"}
                                                width={"fit-content"}
                                                bgColor={past ? "#F04F4F" : "brand.chasescrollBgBlue"}
                                                color={past ? "white" : "brand.chasescrollBlue"}
                                                gap={"2"}
                                                fontSize={"sm"}
                                                alignItems={"center"}
                                            >
                                                {event?.isOrganizer
                                                    ? "Organizer"
                                                    : past
                                                        ? "Attended"
                                                        : "Attending"}
                                            </Flex>
                                        )}
                                    {event?.admins?.some((obj: any) =>
                                        Object?.values(obj)?.some(
                                            (val) => typeof val === "string" && val?.includes(userId),
                                        ),
                                    ) && (
                                            <Flex
                                                height={"23px"}
                                                px={"2"}
                                                justifyContent={"center"}
                                                alignItems={"center"}
                                                fontWeight={"bold"}
                                                fontSize={"xs"}
                                                rounded={"32px"}
                                                bg={"#DCF9CF66"}
                                                color={"#3EC30F"}
                                            >
                                                Admin
                                            </Flex>
                                        )}
                                    {event?.collaborators?.some((obj: any) =>
                                        Object?.values(obj)?.some(
                                            (val) => typeof val === "string" && val.includes(userId),
                                        ),
                                    ) && (
                                            <Flex
                                                height={"23px"}
                                                px={"2"}
                                                justifyContent={"center"}
                                                alignItems={"center"}
                                                fontWeight={"bold"}
                                                fontSize={"xs"}
                                                rounded={"32px"}
                                                bg={"#FDF3CF6B"}
                                                color={"#FDB806"}
                                            >
                                                Volunteer
                                            </Flex>
                                        )}
                                    {my_event && (
                                        <ShareEvent
                                            data={event}
                                            type="EVENT"
                                            size="18px"
                                            id={event?.id}
                                        />
                                    )}
                                    {(my_event && !event?.isOrganizer) && (
                                        <CustomButton backgroundColor={"#3EC259"} onClick={viewTicket} px={"4"} text={"View Ticket"} width={"auto"} />
                                    )}
                                </Flex>
                            </Flex>
                        )}
                    </Box>
                )}

                {/* {eventdashboard && (
                    <Flex flexDir={"column"} w={"full"} height={"full"} px={"4"} pt={"6"}>
                        <Flex
                            w={"full"}
                            gap={"4"}
                            py={"1"}
                            pb={"4"}
                        >
                            <Flex w={"fit-content"} flexDir={"column"} fontWeight={"bold"}>
                                <Flex
                                    width={"50px"}
                                    flexDir={"column"}
                                    py={"2px"}
                                    borderWidth={"1px"}
                                    alignItems={"center"}
                                    roundedBottom={"2xl"}
                                    roundedTopLeft={"2xl"}
                                >
                                    <Text
                                        fontSize={"11.37px"}
                                        lineHeight={"14.81px"}
                                        color={"#3D37F1"}
                                    >
                                        {moment(event?.startDate).format("MMM")}
                                    </Text>
                                    <Text fontSize={"28.43px"} mt={"-1"} lineHeight={"37.01px"}>
                                        {moment(event?.startDate).format("D")}
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex w={"full"} flexDir={"column"}>
                                <Text lineHeight={"24px"} fontWeight={"700"} textAlign={"left"}>
                                    {textLimit(event?.eventName, limit ? 30 : 16)}
                                </Text>
                                <Text fontSize={"14px"}>
                                    {textLimit(event?.eventDescription, limit ? 70 : 35)}
                                </Text>
                            </Flex>
                        </Flex>
                        <Flex
                            w={"full"}
                            h={"40px"}
                            mt={"auto"}
                            pt={"2"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            borderTopWidth={"1px"}
                            borderTopColor={"#EFF1FE"}
                        >
                            <InterestedUsers
                                fontSize={16}
                                color={["white", "white", "#1732F7", "#1732F7", "#1732F7"]}
                                event={event}
                                border={"2px"}
                                size={"32px"}
                            />
                            <Flex ml={"auto"}>
                                <EventPrice
                                    minPrice={event?.minPrice}
                                    maxPrice={event?.maxPrice}
                                    currency={event?.currency}
                                />
                            </Flex>
                        </Flex>
                    </Flex>
                )} */}
                {landing && (
                    <Flex flexDir={"column"} w={"full"} height={"full"} px={"4"} pt={"6"}>
                        <Flex
                            w={"full"}
                            gap={"4"}
                            py={"1"}
                            pb={"4"}
                            alignItems={"center"}
                        >
                            <Flex w={"fit-content"} flexDir={"column"} fontWeight={"bold"}>
                                <Flex
                                    width={"50px"}
                                    flexDir={"column"}
                                    py={"2px"}
                                    borderWidth={"1px"}
                                    alignItems={"center"}
                                    roundedBottom={"2xl"}
                                    roundedTopLeft={"2xl"}
                                >
                                    <Text
                                        fontSize={"11.37px"}
                                        lineHeight={"14.81px"}
                                        color={"#3D37F1"}
                                    >
                                        {moment(event?.startDate).format("MMM")}
                                    </Text>
                                    <Text fontSize={"28.43px"} mt={"-1"} lineHeight={"37.01px"}>
                                        {moment(event?.startDate).format("D")}
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex w={"full"} flexDir={"column"}>
                                <Text lineHeight={"24px"} fontWeight={"700"} textAlign={"left"}>
                                    {textLimit(event?.eventName, limit ? 30 : 16)}
                                </Text>
                                <Text fontSize={"14px"}>
                                    {textLimit(event?.eventDescription, limit ? 70 : 35)}
                                </Text>
                            </Flex>
                            {eventdashboard && (
                                <Box width={"fit-content"} >
                                    <SaveOrUnsaveBtn event={event} />
                                </Box>
                            )}
                        </Flex>
                        <Flex
                            w={"full"}
                            h={"40px"}
                            mt={"auto"}
                            pt={"2"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            borderTopWidth={"1px"}
                            borderTopColor={"#EFF1FE"}
                        >
                            <InterestedUsers
                                fontSize={16}
                                color={["white", "white", "#1732F7", "#1732F7", "#1732F7"]}
                                event={event}
                                border={"2px"}
                                size={"32px"}
                            />
                            <Flex ml={"auto"}>
                                <EventPrice
                                    minPrice={event?.minPrice}
                                    maxPrice={event?.maxPrice}
                                    currency={event?.currency}
                                />
                            </Flex>
                        </Flex>
                    </Flex>
                )}
            </Flex>
            <ModalLayout size={["md", "md", "3xl"]} open={showModal} close={setShowModal} >
                <ViewTicket
                    user_index={userId}
                    click={viewTicket}
                    data={event} />
            </ModalLayout>
        </Flex>
    );
}

export default ExploreEventCard;
