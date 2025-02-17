"use client"
import DonationDetails from '@/components/donation/donationDetails'
import DonationGroupDetails from '@/components/donation/donationGroupDetails'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import useGetSingleDonationList from '@/hooks/useGetSingleDonation'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function GetDonationInfo({ id }: { id: string }) {

    const { singleData: item, isLoading } = useGetSingleDonationList(id)

    return (
        <LoadingAnimation loading={isLoading} >
            <Flex w={"full"} overflowY={"auto"} >
                {/* {item?.totalInGroup ? (
                    <DonationGroupDetails id={id} notAuth={true} />
                ) : ( */}
                    <DonationDetails id={id} notAuth={true} />
                {/* )} */}
            </Flex>
        </LoadingAnimation>
    )
}
