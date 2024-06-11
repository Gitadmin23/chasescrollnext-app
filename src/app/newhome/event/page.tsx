"use client"
import EventCategory from "@/components/event_component/event_category";
import EventListing from "@/components/event_component/event_listing";
import SearchBar from "@/components/explore_component/searchbar";
import OurPartner from "@/components/landing_component/home/ourpartner";
import HomeLandingPageCarousel from "@/components/landing_component/home_carousel";
import useSearchStore from "@/global-state/useSearchData";
import { Flex, Text } from "@chakra-ui/react";

interface Props {

}

const Eventpage = () => {

    const { event_category } = useSearchStore((state) => state);

    console.log(event_category);


    return (
        <Flex flexDir={"column"} w={"full"}  >
            <Flex display={["flex", "flex", "none"]} pt={"4"} px={"6"} >
                <SearchBar home={true} />
            </Flex>
            <Flex px={["6", "6", "12"]} gap={["4", "4", "0px"]} w={"full"} flexDir={["column-reverse", "column-reverse", "column-reverse"]} justifyContent={"space-between"} alignItems={["start", "start", "start"]} pt={"4"} pb={"2"} >
                <Text color={"#2B2D31"} fontSize={["18px", "18px", "24px"]} lineHeight={["16.94px", "16.94px", "29.05px"]} fontWeight={"500"} >{event_category ? event_category?.replaceAll("_", " ") : "Upcoming Event"}</Text>
                <Flex width={["full", "full", "full"]} justifyContent={"end"} >
                    <EventCategory selector={true} />
                </Flex>
            </Flex>
            {!event_category && (
                <HomeLandingPageCarousel />
            )}
            <Flex bg={"white"} py={[ "4", "4", "9"]} gap={"8"} flexDir={"column"} px={["6", "12"]} >
                {/* <Flex display={["none", "none", "none", "flex"]} w={"full"} >
                    <EventCategory />
                </Flex> */}
                <EventListing limit={true} />
            </Flex>
            <OurPartner />
        </Flex>
    );
}

export default Eventpage;