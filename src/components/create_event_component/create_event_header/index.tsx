import CustomButton from '@/components/general/Button';
import useEventStore from '@/global-state/useCreateEventState';
import { Box, Flex, useToast } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import React from 'react'


function CreateEventHeader() {

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
        <Flex justifyContent={"space-around"} py={"5"} width={"full"}  >
            <Box as='button' onClick={() => clickHandler()} py={"2"} width={"150px"} rounded={"md"} _hover={{ color: "#5D70F9", backgroundColor: "#F9FAFB" }} backgroundColor={"transparent"} color={tab === 0 ? "brand.chasescrollBlue" : "#A9ABAF"} >Theme</Box>
            <Box as='button' disabled={getValidationTheme()} onClick={() => getValidationThemeClick()} py={"2"} width={"150px"} rounded={"md"} _hover={{ color: "#5D70F9", backgroundColor: "#F9FAFB" }} backgroundColor={"transparent"} color={tab === 1 ? "brand.chasescrollBlue" : "#A9ABAF"} >Information</Box>
            <Box as='button' disabled={getValidationInfo()} onClick={() => getValidationInfoClick()} py={"2"} width={"150px"} rounded={"md"} _hover={{ color: "#5D70F9", backgroundColor: "#F9FAFB" }} backgroundColor={"transparent"} color={tab === 2 ? "brand.chasescrollBlue" : "#A9ABAF"} >Ticket</Box>
        </Flex>
    )
}

export default CreateEventHeader
