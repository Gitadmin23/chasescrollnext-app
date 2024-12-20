import CustomButton from '@/components/general/Button';
import useEventStore from '@/global-state/useCreateEventState';
import { Box, Flex, Text, useColorMode, useToast } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { } from 'next/router';
import React from 'react'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import useCustomTheme from "@/hooks/useTheme";
import DonationTermAndCondition from '@/components/donation/donationTermAndCondition';

interface IProps {
    name?: string
}

function CreateDonationHeader({ name }: IProps) {

    const {
        bodyTextColor,
        headerTextColor,
        primaryColor
    } = useCustomTheme();

    const router = useRouter()

    return (
        <Flex position={"relative"} h={["fit-content", "fit-content", "fit-content", "fit-content", "100vh"]} width={["full", "full", "full", "full", "546px"]} >
            <Flex pos={"absolute"} display={["none", "none", "none", "none", "flex"]} top={"4"} w={"full"} h={"30px"} justifyContent={"center"} alignItems={"center"} >
                <Text fontWeight={"bold"} fontSize={"20px"} >{name}</Text>
            </Flex>
            <Flex as={"button"} w={"fit-content"} onClick={() => router?.back()} left={"6"} justifyContent={"center"} alignItems={"center"} height={"30px"} pos={"absolute"} display={["none", "none", "none", "none", "flex"]} top={"18px"}  >
                <IoArrowBack size={"25px"} />
            </Flex>
            <Flex justifyContent={"center"} alignItems={"center"} flexDir={"column"} px={["4", "4", "4", "12"]} py={"5"} h={["fit-content", "fit-content", "fit-content", "fit-content", "100vh"]} width={["full", "full", "full", "full", "546px"]}  >
                <Flex maxW={["full", "full", "full", "full", "420px"]} w={"full"} fontWeight={"700"} flexDir={"column"} >
                    <Text color={headerTextColor} fontSize={["24px", "24px", "24px", "38px"]} lineHeight={["33.6px", "33.6px", "33.6px", "40px"]} >
                        Tells Us More About Your Fundraising.
                    </Text>
                    <Text my={"4"} fontWeight={"400"} color={bodyTextColor} lineHeight={"19.6px"} fontSize={"14px"} >
                        {`Whether it is a crowdfunding, community fundraising or charity fundraising, let us in on the details. Your fundraising matters and we're here to ensure it gets the spotlight it deserves.`}
                    </Text>

                    <Flex w={"full"} justifyContent={"center"} >
                        <DonationTermAndCondition />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default CreateDonationHeader
