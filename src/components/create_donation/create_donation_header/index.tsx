import CustomButton from '@/components/general/Button';
import useEventStore from '@/global-state/useCreateEventState';
import { Box, Flex, Text, useColorMode, useToast } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { } from 'next/router';
import React from 'react'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import useCustomTheme from "@/hooks/useTheme";

interface IProps {
    name?: string
}

function CreateDonationHeader({ name }: IProps) {

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const { eventdata, changeTab, image, tab } = useEventStore((state) => state);

    const toast = useToast()

    const pathname = usePathname();

    const router = useRouter()

    const getValidationInfoClick = () => {
        if (pathname?.includes("edit_event_data")) {
            toast({
                description: "Complete all fields in the information section to continue.",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return
        } else {
            if (!eventdata?.startDate) {
                toast({
                    description: "Complete all fields in the information section to continue.",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!eventdata?.endDate) {
                toast({
                    description: "Complete all fields in the information section to continue.",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (eventdata?.startDate > eventdata?.endDate) {
                toast({
                    description: "Complete all fields in the information section to continue.",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!eventdata?.location?.toBeAnnounced) {
                if (!eventdata?.location?.locationDetails && !eventdata?.location?.link) {
                    toast({
                        description: "Complete all fields in the information section to continue.",
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

    const getValidationThemeClick = (item?: number) => {
        if (!pathname?.includes("edit_event_data")) {
            if (!eventdata?.eventName) {
                toast({
                    description: "Complete all fields in the Themes section to continue.",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!eventdata?.eventType) {
                toast({
                    description: "Complete all fields in the Themes section to continue.e",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!eventdata?.eventDescription) {
                toast({
                    description: "Complete all fields in the Themes section to continue.",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else if (!image && !eventdata?.currentPicUrl) {
                toast({
                    description: "Complete all fields in the Themes section to continue.",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else {
                if (item === 1) {
                    changeTab(1)
                } else {
                    getValidationInfoClick()
                }
            }
        }
    }

    const statusHandler = (item: number) => {
        if (tab === 0) {
            getValidationThemeClick(item)
        } else if (tab === 2) {
            getValidationThemeClick(item)
        } else {
            getValidationInfoClick()
        }
    }

    return (
        <Flex position={"relative"} h={["fit-content", "fit-content", "fit-content", "fit-content", "100vh"]} width={["full", "full", "full", "full", "546px"]} >
            <Flex pos={"absolute"} display={["none", "none", "none", "none", "flex"]} top={"4"} w={"full"} h={"30px"} justifyContent={"center"} alignItems={"center"} >
                <Text fontWeight={"bold"} fontSize={"20px"} >Create Donation</Text>
            </Flex>
            <Flex as={"button"} w={"fit-content"} onClick={() => router?.back()} left={"6"} justifyContent={"center"} alignItems={"center"} height={"30px"} pos={"absolute"} display={["none", "none", "none", "none", "flex"]} top={"18px"}  >
                <IoArrowBack size={"25px"} />
            </Flex>
            <Flex justifyContent={"center"} alignItems={"center"} flexDir={"column"} px={["4", "4", "4", "12"]} py={"5"} h={["fit-content", "fit-content", "fit-content", "fit-content", "100vh"]} width={["full", "full", "full", "full", "546px"]}  >
                <Flex maxW={["full", "full", "full", "full", "420px"]} w={"full"} fontWeight={"700"} flexDir={"column"} > 
                    <Text color={headerTextColor} fontSize={["24px", "24px", "24px", "38px"]} lineHeight={["33.6px", "33.6px", "33.6px", "40px"]} >
                        Tells more about your Fundraising.
                    </Text>
                    <Text mt={"4"} fontWeight={"400"} color={bodyTextColor} lineHeight={"19.6px"} fontSize={"14px"} >
                        Whether it's a conference, seminar, or celebration, let us in on the details. Your event matters, and we're here to ensure it gets the spotlight it deserves
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default CreateDonationHeader
