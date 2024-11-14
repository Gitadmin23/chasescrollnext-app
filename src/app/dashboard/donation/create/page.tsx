"use client"
import CreateDonationHeader from '@/components/create_donation/create_donation_header';
import DonationTheme from '@/components/create_donation/donation_theme';
import useEventStore from '@/global-state/useCreateEventState';
import useCustomTheme from '@/hooks/useTheme';
import { Box, Flex, useColorMode } from '@chakra-ui/react'
import React from 'react'

export default function CreateDonation() {


    const {
        secondaryBackgroundColor,
        mainBackgroundColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const { tab, changeTab } = useEventStore((state) => state);

    React.useEffect(() => {
        changeTab(0)
    }, [])

    return (
        <>
            <Flex width={"full"}  pt={"74px"} h={["auto", "auto", "auto", "100vh", "100vh"]} display={["none", "none", "none", "none", "flex"]} flexDir={["column", "column", "column", "row"]}  >
                <CreateDonationHeader name="Create Fundraising" />
                <Flex bgColor={colorMode === 'light' ? "gray.300" : secondaryBackgroundColor} w={"full"} p={["0px", "0px", "0px", "3"]} h={"full"}  >
                    <Flex bgColor={colorMode === 'light' ? "white" : mainBackgroundColor} rounded={["0px", "0px", "0px", "2xl"]} w={"full"} h={"auto"} overflowY={"auto"} >
                        <Box bgColor={colorMode === 'light' ? "white" : mainBackgroundColor} rounded={["0px", "0px", "0px", "2xl"]} w={"full"} px={"3"} h={"fit-content"} >
                            {tab === 0 && (
                                <DonationTheme />
                            )} 
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
            <Box width={"full"} display={["block", "block", "block", "block", "none"]}  >
                <CreateDonationHeader name="Create Fundraising" />
                {tab === 0 && (
                    <DonationTheme />
                )} 
            </Box>
        </>
    )
}