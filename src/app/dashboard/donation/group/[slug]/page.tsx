import DonationGroupDetails from '@/components/donation/donationGroupDetails'
import { Flex } from '@chakra-ui/react'
import React from 'react'

type Props = {
    params: { slug: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}

export default function FundraisingGroup(
    { params }: Props,
) {

    const id = params.slug
 
    return (
        <Flex w={"full"} overflowY={"auto"} >
            <DonationGroupDetails id={id} />
        </Flex>
    )
}
