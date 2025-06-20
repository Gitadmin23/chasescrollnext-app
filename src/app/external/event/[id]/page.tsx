"use client" 
import EventListingEx from "@/components/event_component/event_listing_ex";
import { Flex } from "@chakra-ui/react";

export default function ExternalEvent () {
    return(
        <Flex w={"full"} justifyContent={"start"} alignItems={"start"} p={"6"} >
            <EventListingEx />
        </Flex>
    )
}