"use client" 
import EventListingEx from "@/components/event_component/event_listing_ex";
import { Flex, Text } from "@chakra-ui/react";

export default function ExternalEvent () {
    return(
        <Flex w={"full"} justifyContent={"start"} flexDir={"column"} gap={"6"} alignItems={"start"} p={"6"} >
            <Text fontSize={"20px"} fontWeight={"600"} >Events</Text>
            <EventListingEx />
        </Flex>
    )
}