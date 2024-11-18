"use client"
import CreateDonationHeader from '@/components/create_donation/create_donation_header';
import DonationTheme from '@/components/create_donation/donation_theme';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import useEventStore from '@/global-state/useCreateEventState';
import useDonationStore from '@/global-state/useDonationState';
import useGetDonationList from '@/hooks/useGetDonationList';
import useCustomTheme from '@/hooks/useTheme';
import { Box, Flex, useColorMode } from '@chakra-ui/react'
import React from 'react'

type Props = {
    params: { slug: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}

export default function CreateDonation({ params }: Props) {

    const id = params.slug

    const {
        secondaryBackgroundColor,
        mainBackgroundColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const { singleData: item, isLoading } = useGetDonationList(id)

    const { data, updateDontion } = useDonationStore((state) => state)

    React.useEffect(() => {
        if (!isLoading) {
            updateDontion([{
                bannerImage: item?.bannerImage,
                creatorID: item?.createdBy?.userId,
                description: item?.description,
                endDate: item?.endDate,
                goal: item?.goal,
                name: item?.name,
                purpose: item?.purpose,
                visibility: item?.visibility,
                funnelID: item?.funnelID
            }])
        }
    }, [isLoading])

    return (
        <LoadingAnimation loading={isLoading} >

            <Flex width={"full"} pt={"74px"} h={["auto", "auto", "auto", "100vh", "100vh"]} display={["none", "none", "none", "none", "flex"]} flexDir={["column", "column", "column", "row"]}  >
                <CreateDonationHeader name="Edit Fundraising" />
                <Flex bgColor={colorMode === 'light' ? "gray.300" : secondaryBackgroundColor} w={"full"} p={["0px", "0px", "0px", "3"]} h={"full"}  >
                    <Flex bgColor={colorMode === 'light' ? "white" : mainBackgroundColor} rounded={["0px", "0px", "0px", "2xl"]} w={"full"} h={"auto"} overflowY={"auto"} >
                        <Box bgColor={colorMode === 'light' ? "white" : mainBackgroundColor} rounded={["0px", "0px", "0px", "2xl"]} w={"full"} px={"3"} h={"fit-content"} >
                            <DonationTheme id={id} />
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
            <Box width={"full"} display={["block", "block", "block", "block", "none"]}  >
                <CreateDonationHeader name="Edit Fundraising" />
                <DonationTheme id={id} />
            </Box>
        </LoadingAnimation>
    )
}