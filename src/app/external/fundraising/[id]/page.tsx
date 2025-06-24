"use client" 
import DonationItemList from "@/components/donation/donationItemList";
import { Flex, Text } from "@chakra-ui/react";

export default function ExternalFundraising () {
    return(
        <Flex w={"full"} justifyContent={"start"} flexDir={"column"} gap={"6"} alignItems={"start"} p={"6"} >
            <Text fontSize={["20px", "20px", "56px"]} textAlign={"center"} fontWeight={"600"} >Fundraising</Text>
            <DonationItemList />
        </Flex>
    )
}