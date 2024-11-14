import DonationDetails from '@/components/donation/donationDetails'
import { Flex } from '@chakra-ui/react'
import React from 'react'

type Props = {
    params: { slug: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function generateMetadata(
    { params }: Props,
) {
    // read route params
    const id = params.slug
 
    return (
        <Flex w={"full"} overflowY={"auto"} >
            <DonationDetails id={id} />
        </Flex>
    )
}
