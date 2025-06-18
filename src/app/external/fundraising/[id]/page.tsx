"use client"
import DonationItemGroup from "@/components/donation/donationItemGroup"; 
import { Flex } from "@chakra-ui/react";

export default function ExternalFundraising () {
    return(
        <Flex w={"full"} justifyContent={"start"} alignItems={"start"} p={"6"} > 
            <DonationItemGroup publicData={true} /> 
        </Flex>
    )
}