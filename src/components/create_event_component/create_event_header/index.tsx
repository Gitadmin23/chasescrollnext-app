import CustomButton from '@/components/general/Button';
import useEventStore from '@/global-state/useCreateEventState';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import React from 'react'

interface IProps {
    name?: string
}

function CreateEventHeader({ name }: IProps) {

    const { eventdata, changeTab, image, tab } = useEventStore((state) => state);

    const toast = useToast()

    const pathname = usePathname();

    const getValidationInfo = () => {
        if (!eventdata?.startDate) {
            return true
        } else if (!eventdata?.endDate) {
            return true
        } else if (!eventdata?.location?.toBeAnnounced) {
            if (!eventdata?.location?.locationDetails && !eventdata?.location?.link) {
                return true
            }
        } else if (pathname?.includes("edit_event_data")) {
            return true
        } else {
            return false
        }
    }

    const getValidationTheme = () => {
        if (!eventdata?.eventName) {
            return true
        } else if (!eventdata?.eventType) {
            return true
        } else if (!eventdata?.eventDescription) {
            return true
        } else {
            return false
        }
    }


    const getValidationInfoClick = () => {
        if (pathname?.includes("edit_event_data")) {
            toast({
                description: "You can only edit the information tab because users have already bought this event",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return
        } else {
            if (!eventdata?.startDate) {
                toast({
                    description: "Please Enter Event Starting Date",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!eventdata?.endDate) {
                toast({
                    description: "Please Enter Event Ending Date",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (eventdata?.startDate > eventdata?.endDate) {
                toast({
                    description: "End date and time cannot earlier than Start date and time",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!eventdata?.location?.toBeAnnounced) {
                if (!eventdata?.location?.locationDetails && !eventdata?.location?.link) {
                    toast({
                        description: "Please Enter Event Location",
                        status: 'error',
                        isClosable: true,
                        duration: 5000,
                        position: 'top-right',
                    });
                    return
                } else {
                    changeTab(2)
                }
            } else {
                changeTab(2)
            }
        }
    }

    const clickHandler = () => {
        if (pathname?.includes("edit_event_data")) {
            toast({
                description: "You can only edit the information tab because users have already bought this event",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return
        } else {
            changeTab(0)
        }
    }

    const getValidationThemeClick = () => {
        if (!pathname?.includes("edit_event_data")) {
            if (!eventdata?.eventName) {
                toast({
                    description: "Please Enter Event Name",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!eventdata?.eventType) {
                toast({
                    description: "Please Enter Event Type",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!eventdata?.eventDescription) {
                toast({
                    description: "Please Enter Event Description",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!image && !eventdata?.currentPicUrl) {
                toast({
                    description: "Please Enter Event Image",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else {
                changeTab(1)
            }
        }
    }

    return (
        <Flex position={"relative"} h={["fit-content", "fit-content", "fit-content", "100vh"]} width={["full", "full", "full", "546px"]} >
            <Flex justifyContent={"center"} alignItems={"center"} flexDir={"column"} px={["4", "4", "4", "12"]} py={"5"} h={["fit-content", "fit-content", "fit-content", "100vh"]} width={["full", "full", "full", "546px"]}  >
                <Flex w={"full"} display={["flex", "flex", "flex", "none"]} py={"3"} justifyContent={"space-around"} >
                    <Box as='button' onClick={() => clickHandler()} py={"2"} width={"150px"} rounded={"md"} _hover={{ color: "#5D70F9", backgroundColor: "#F9FAFB" }} backgroundColor={"transparent"} color={tab === 0 ? "brand.chasescrollBlue" : "#A9ABAF"} >Theme</Box>
                    <Box as='button' disabled={getValidationTheme()} onClick={() => getValidationThemeClick()} py={"2"} width={"150px"} rounded={"md"} _hover={{ color: "#5D70F9", backgroundColor: "#F9FAFB" }} backgroundColor={"transparent"} color={tab === 1 ? "brand.chasescrollBlue" : "#A9ABAF"} >Information</Box>
                    <Box as='button' disabled={getValidationInfo()} onClick={() => getValidationInfoClick()} py={"2"} width={"150px"} rounded={"md"} _hover={{ color: "#5D70F9", backgroundColor: "#F9FAFB" }} backgroundColor={"transparent"} color={tab === 2 ? "brand.chasescrollBlue" : "#A9ABAF"} >Ticket</Box>
                </Flex>

                <Flex pos={"absolute"} display={["flex", "flex", "flex", "none"]} top={"4"} w={"full"} justifyContent={"center"} alignItems={"center"} >

                    <Text fontWeight={"bold"} fontSize={"20px"} >{name}</Text>
                </Flex>

                <Flex maxW={["full", "full", "full", "385px"]} w={"full"} fontWeight={"700"} flexDir={"column"} >
                    <Text color={"#1732F7"} fontSize={"24px"} display={["none", "none", "none", "block"]} lineHeight={"33.6px"} >{tab === 0 ? "Theme" : tab === 1 ? "Information" : "Ticket"}</Text>
                    <Text color={"#121212"} fontSize={["24px", "24px", "24px", "38px"]} lineHeight={["33.6px", "33.6px", "33.6px", "53.2px"]} >
                        {tab === 0 ? "Tell Us More about your Event" : tab === 1 ? "Discover the Details" : "Effortlessly Invite Attendees with Ticket Generation"}
                    </Text>
                    <Text mt={"4"} fontWeight={"400"} color={"#626262"} lineHeight={"19.6px"} fontSize={"14px"} >
                        {tab === 0 ?
                            "Whether it's a conference, seminar, or celebration, let us in on the details. Your event matters, and we're here to ensure it gets the spotlight it deserves." :
                            tab === 1 ? "Find out the location and schedule for the upcoming event." : "Streamline Attendance with Seamless Ticket Generation and Invitations"}
                    </Text>
                    <Text fontWeight={"400"} mt={"4"} color={"#626262"} lineHeight={"19.6px"} fontSize={"14px"} >Step {tab + 1}/3</Text>
                    <Flex w={"full"} rounded={"32px"} mt={"3"} h={"10px"} bgColor={"#D9D9D9"} >
                        <Box w={tab === 0 ? "35%" : tab === 1 ? "60%" : "100%"} bgColor={"#5465E0"} rounded={"32px"} />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default CreateEventHeader
