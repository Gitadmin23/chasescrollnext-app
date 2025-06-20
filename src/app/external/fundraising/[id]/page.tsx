"use client" 
import DonationItemList from "@/components/donation/donationItemList";
import { Flex } from "@chakra-ui/react";

export default function ExternalFundraising () {
    return(
        <Flex w={"full"} justifyContent={"start"} alignItems={"start"} p={"6"} > 
            <DonationItemList />
        </Flex>
    )
}