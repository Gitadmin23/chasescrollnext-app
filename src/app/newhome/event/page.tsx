"use client"
import EventCategory from "@/components/event_component/event_category";
import EventListing from "@/components/event_component/event_listing";
import HomeFooter from "@/components/home_event_section/home_footer";
import HomeLandingPageCarousel from "@/components/landing_component/home_carousel";
import { Flex, Text } from "@chakra-ui/react";

interface Props {

}

const Eventpage = () => {
    return (
        <Flex flexDir={"column"} w={"full"}  >
            <Flex px={"12"} w={"full"} justifyContent={"space-between"} alignItems={"center"} py={"4"} >
                <Text color={"#2B2D31"} fontSize={"24px"} lineHeight={"29.05px"} fontWeight={"500"} >Upcoming Event</Text>
                <EventCategory selector={true} />
            </Flex>
            <HomeLandingPageCarousel />
            <Flex bg={"white"} py={"9"} gap={"8"} flexDir={"column"} px={["6", "12"]} >
                <EventCategory />
                <EventListing limit={true} />
            </Flex>
            <HomeFooter />
        </Flex>
    );
}

export default Eventpage;