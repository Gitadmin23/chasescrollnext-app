"use client"
import EventCategory from "@/components/event_component/event_category";
import EventListing from "@/components/event_component/event_listing";
import SearchBar from "@/components/explore_component/searchbar";
import OurPartner from "@/components/landing_component/home/ourpartner";
import HomeLandingPageCarousel from "@/components/landing_component/home_carousel";
import { Flex, Text } from "@chakra-ui/react";

interface Props {

}

const Eventpage = () => {
    return (
        <Flex flexDir={"column"} w={"full"}  >
            <Flex display={["flex", "flex", "none"]} pt={"4"} px={"6"} >
                <SearchBar home={true} />
            </Flex>
            <Flex px={["6", "6", "12"]} w={"full"} justifyContent={"space-between"} alignItems={"center"} py={"4"} >
                <Text color={"#2B2D31"} fontSize={["14px", "14px", "24px"]} lineHeight={["16.94px", "16.94px", "29.05px"]} fontWeight={"500"} >Upcoming Event</Text>
                <EventCategory selector={true} />
            </Flex>
            <HomeLandingPageCarousel />
            <Flex bg={"white"} py={"9"} gap={"8"} flexDir={"column"} px={["6", "12"]} >
                <EventCategory />
                <EventListing limit={true} />
            </Flex>
            <OurPartner />
        </Flex>
    );
}

export default Eventpage;