"use client"
import EventListing from "@/components/event_component/event_listing";
import { Flex } from "@chakra-ui/react";

export default function ExternalEvent () {
    return(
        <Flex w={"full"} justifyContent={"start"} alignItems={"start"} p={"6"} >
            <EventListing />
        </Flex>
    )
}